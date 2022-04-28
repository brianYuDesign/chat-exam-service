import http from "http";
import express, { ErrorRequestHandler, Request } from "express";
import { Server } from "socket.io";
import cors from "cors";
import bodyParser from "body-parser";
import logger from "./logger";
import database from "./database";
import chatService from "./services/chat.service";
import { publisher, subscriber } from "./pubsub";
import userRoutes from "./routes/user.routes";
import chatRoutes from "./routes/chat.routes";

const startApp = async () => {
  await logger.init();
  await database.init();
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());

  const server = http.createServer(app);

  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  let clientCount = 0;
  subscriber.subscribe("CREATE_MESSAGE");

  subscriber.on("message", async (channel: any, message: string) => {
    const data = JSON.parse(message);
    if (channel === "CREATE_MESSAGE") {
      const { chatId, userId, content } = data;
      io.sockets.to(chatId).emit("CREATE_MESSAGE", data);
    }
  });

  io.on("connection", (socket) => {
    // Join a conversation
    const { chatId } = socket.handshake.query as { chatId: string };

    clientCount++;
    console.log(chatId, "connected", clientCount);
    socket.join(chatId);

    socket.on(
      "SEND_MESSAGE",
      async (data: { chatId: number; userId: number; content: string }) => {
        await chatService.createChatMessage(data);
      }
    );

    // Leave the room if the user closes the socket
    socket.on("disconnect", () => {
      clientCount--;
      console.log(`Client ${socket.id} diconnected`, clientCount);
      socket.leave(chatId);
    });
  });

  app.use(async (req, res, next) => {
    logger.debug({
      type: "request",
      originalUrl: req.originalUrl,
    });
    next();
  });

  app.get("/app/health", async (req, res) =>
    res.status(200).json({ code: "00", message: "hi" })
  );

  app.use(((error, req, res, next) => {
    logger.error({
      type: "error",
      originalUrl: req.originalUrl,
      msg:
        error instanceof Error ? error.stack ?? error.message : String(error),
    });
    res.status(500).json({
      code: "99",
      message: error instanceof Error ? error.message : String(error),
    });
  }) as ErrorRequestHandler);

  app.use("/user", userRoutes);
  app.use("/chat", chatRoutes);

  const port = process.env.RUN_PORT;
  server.listen(port, () =>
    logger.info({ message: "server is running!", port })
  );
};

startApp();

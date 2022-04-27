import express, { ErrorRequestHandler, Request } from "express";
import { v4 } from "uuid";
import logger from "./logger";
import database from "./database";

export const startApp = async () => {
  await logger.init();
  await database.init();
  const app = express();

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

  const port = process.env.RUN_PORT;
  app.listen(port, () => logger.info({ message: "server is running!", port }));
};

startApp();

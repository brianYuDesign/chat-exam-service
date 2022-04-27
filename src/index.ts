import express, { ErrorRequestHandler, Request } from "express";
import { v4 } from "uuid";
import logger from "./logger";
import database from "./database";

export const startApp = async () => {
  await logger.init();
  await database.init();
  const app = express();

  app.use(async (req, res, next) => {
    const traceId = (res.locals.traceId = getTraceId(req));
    logger.debug({
      type: "request",
      traceId,
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
      traceId: res.locals.traceId,
      tracePath: res.locals.tracePath,
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

const getTraceId = (req: Request) =>
  String(req.headers["x-trace-id"] || "") ||
  String(req.headers["x-request-id"] || "") ||
  v4();

startApp();

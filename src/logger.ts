import log4js from "log4js";

class Logger {
  private log!: log4js.Logger;
  async init() {
    log4js.configure({
      appenders: {
        console: { type: "stdout" },
        dateFile: {
          type: "dateFile",
          pattern: ".yyyy-MM-dd",
          numBackups: 7,
          filename: `${process.env.LOG_FILE_PATH}/log.log`,
        },
      },
      categories: {
        default: { appenders: ["dateFile", "console"], level: "trace" },
        prod: { appenders: ["dateFile", "console"], level: "debug" },
      },
    });
    this.log = log4js.getLogger(
      process.env.NODE_ENV !== "development" ? "prod" : "default"
    );
    this.log.level = String(process.env.LOG_LEVEL);
  }
  debug(msg: any) {
    this.log.debug("[debug]" + JSON.stringify(msg));
  }
  info(msg: any) {
    this.log.info("[info]" + JSON.stringify(msg));
  }
  error(msg: any) {
    this.log.error("[error]" + JSON.stringify(msg));
  }
  warn(msg: any) {
    this.log.error("[warn]" + JSON.stringify(msg));
  }
}

export default new Logger();

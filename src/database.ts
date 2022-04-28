import { Connection, ConnectionOptions, createConnection } from "typeorm";

const config = {
  type: "mysql",
  host: String(process.env.DB_HOST),
  port: Number(process.env.DB_PORT),
  database: String(process.env.DB_DATABASE_NAME),
  username: String(process.env.DB_USERNAME),
  password: String(process.env.DB_PASSWORD),
  logging: String(process.env.DB_LOGGING) === "true",
  synchronize: true,
  entities:
    process.env.NODE_ENV === "development"
      ? ["src/entities/**/*.ts"]
      : ["dist/entities/**/*.js"],
};

class Database {
  connection: Connection | undefined;

  async init() {
    this.connection = await createConnection(config as ConnectionOptions);
  }

  getConnection() {
    return this.connection as Connection;
  }
}

export default new Database();

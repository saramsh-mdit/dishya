import "reflect-metadata";
import { DataSource } from "typeorm";

const entitiesPath = __dirname + "/entities/*{.js,.ts}";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  username: "postgres",
  password: "postgres",
  port: 5432,
  database: "college",
  synchronize: true,
  // logging: true,
  entities: [entitiesPath],
  subscribers: [],
  migrations: [],
});

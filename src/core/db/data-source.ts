import { DataSource, DataSourceOptions } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { join } from 'path'
import * as dotenv from "dotenv";
dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
    type: "mysql",
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [
        join(__dirname, "../../**/*.entity{.js,.ts}")
    ],
    migrations: [join(__dirname, "./migrations/*{.js,.ts}")],
    namingStrategy: new SnakeNamingStrategy(),
    logging: (process.env.LOGGING === 'true') ? true : false
}

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
import express from "express";
import { toNumber } from "lodash";
import { Pool } from "pg";
import pino from "pino";
import { PostgreSqlConnection } from "ts-sql-query/connections/PostgreSqlConnection";
import { PgPoolQueryRunner } from "ts-sql-query/queryRunners/PgPoolQueryRunner";

const pool = new Pool({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  port: toNumber(process.env.DB_PORT),
  password: process.env.DB_PASSWORD,
});

export class DBConnection extends PostgreSqlConnection<"DBConnection"> {
  allowEmptyString = true;
}

export const connection = new DBConnection(new PgPoolQueryRunner(pool));

export const logger = pino();

const app = express();

app.use(express.json());

// ------------------------------
// Add endpoints here
// ------------------------------

// ------------------------------
app.listen(8080);

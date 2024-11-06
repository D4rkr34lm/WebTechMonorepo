import { initApi } from "./core/api/api";
import { initDB } from "./core/db/db";

async function startBackend() {
  initApi();
  initDB();
}

startBackend();

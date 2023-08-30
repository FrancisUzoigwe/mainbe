import express from "express";
import env from "dotenv";
import { DB } from "./config/DB";
import { mainApp } from "./mainApp";
env.config();
const app = express();
const port: number = parseInt(process.env.PORT!);
const realPort = port;

mainApp(app);
const Server = app.listen(realPort, () => {
  console.log("Pluto ways is active on port", realPort);
  DB();
});

process.on("uncaughtException", (error) => {
  console.log("");
  console.log("Server is shutting down due to uncaught exception", error);

  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  console.log("");
  console.log("Server is shutting down due to uncaught exception", reason);

  Server.close(() => {
    process.exit(1);
  });
});

import express from "express";
import dbConnect from "./config/dbConnect.js";
import routes from "./routes/index.js";

const conn = await dbConnect();

conn.on("error", (error) => {
  console.error(`Error: ${error}`);
});

conn.once("open", () => {
  console.log("MongoDB Connected");
});

const app = express();

routes(app);

export default app;
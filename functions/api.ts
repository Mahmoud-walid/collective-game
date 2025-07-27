import { Request, Response } from "express";
import app from "../src/server";

const serverless = require("serverless-http");

app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "Welcome to Netlify Function root!" });
});

app.get("/hello", (_req: Request, res: Response) => {
  res.json({ message: "Hello from Netlify Function!" });
});

module.exports.handler = serverless(app);

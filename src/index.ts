import express, { Express, Request, Response } from "express";
import Moralis from "moralis";
import Routes from "./routes/routes";
import { WebSocketController } from "./controllers/WebSocketController";
import { AccountController } from "./controllers/AccountController";
import { stat } from "fs";

const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  return res.send("MINTSAFE BACKEND");
});

app.use("/api", Routes);


Moralis.start({
  apiKey:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjNhNzA3YWVmLTg2YjktNDMxMC05YzY5LTgyNGZjNDA1NGNhMyIsIm9yZ0lkIjoiMzQxMjc2IiwidXNlcklkIjoiMzUwODM4IiwidHlwZUlkIjoiYTAwMzA4NzAtYjJmYi00MjkxLTkwMzQtYjY1YzFjMGQyZjBlIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2ODU5MzU5ODYsImV4cCI6NDg0MTY5NTk4Nn0.8eN_GmC4ZViKPJHjKr-AE08MsJo5iprElJyMQ2-QfaI",
}).then(() => {
  const server = app.listen(3000, () => {
    console.log("Server running");
  });

  const webSocketController = new WebSocketController();
  webSocketController.start(server);
});

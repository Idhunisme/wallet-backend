import { Request, Response } from "express";
import axios from "axios";

export class NewsController {
    public static async getNews(req: Request, res: Response) {
        const apiUrl = `https://cryptopanic.com/api/v1/posts/?auth_token=4db940b48373020082d2c2add7fe475bcff2306d&public=true`;

  try {
    let response = await axios.get(apiUrl);
    return res.status(200).json(response.data["results"]);
  } catch (error) {
    return res.status(500).json({ error: "An error occurred" });
  }
    }
}
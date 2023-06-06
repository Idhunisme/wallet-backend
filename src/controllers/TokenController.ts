import { Request, Response } from "express";
import axios from "axios";

export class TokenController {
  public static async getTokenPrice(req: Request, res: Response) {
    const { query } = req;
    let contract: String = `${query.contract}`;
    const apiUrl = `https://api.dexscreener.com/latest/dex/tokens/${query.contract}`;

    try {
      let response = await axios.get(apiUrl);
      const tokens = response.data["pairs"];

      const filteredTokens = tokens.shift();

      if (contract.includes(",")) {
        const uniqueTokens = Array.from(
          new Set(tokens.map((item: any) => item.baseToken.address))
        ).map((address: unknown) =>
          tokens.find(
            (item: any) => item.baseToken.address === (address as string)
          )
        );

        return res.status(200).json(uniqueTokens);
      } else {
        return res.status(200).json(filteredTokens);
      }
    } catch (error) {
      return res.status(500).json({ error: "An error occurred" });
    }
  }
}

import { Request, Response } from "express";
import axios from "axios";

export class DappsController {
    public static async getDapps(req:Request, res: Response) {
        const { query } = req;
        const apiUrl = `https://api.dappradar.com/4tsxo4vuhotaojtl/dapps?chain=${query.chain}`;
        const headers = {
          "X-BLOBR-KEY": "DBxLPKxFrzfvwCPyVk5batVqhsHTjpeI",
        };
      
        try {
          let dapps = await axios.get(apiUrl, {
            headers,
          });
      
          return res.status(200).json(dapps.data["results"]);
        } catch (error) {
          console.log(error);
          return res.status(500).json({ error: "An error occurred" });
        }
    }
}
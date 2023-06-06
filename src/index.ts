import express, { Express, Request, Response } from "express";
import axios from "axios";
import Moralis from "moralis";
import { EvmChain, EvmAddressInput } from "@moralisweb3/common-evm-utils";

const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  return res.send("MINTSAFE BACKEND");
});

app.get("/nft", async (req: Request, res: Response) => {
  const { query } = req;
  let address: EvmAddressInput = `${query.address}`;
  let network: any = query.chain;

  try {
    const chain = EvmChain.create(network);
    const response = await Moralis.EvmApi.nft.getWalletNFTs({
      address,
      chain,
    });

    const result = response.raw;
    const finalRes = result["result"];

    return res.status(200).json(finalRes);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "An error occurred" });
  }
});

app.get("/dapps", async (req: Request, res: Response) => {
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
});

app.get("/token", async (req: Request, res: Response) => {
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
});

app.get('/')

Moralis.start({
  apiKey:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjNhNzA3YWVmLTg2YjktNDMxMC05YzY5LTgyNGZjNDA1NGNhMyIsIm9yZ0lkIjoiMzQxMjc2IiwidXNlcklkIjoiMzUwODM4IiwidHlwZUlkIjoiYTAwMzA4NzAtYjJmYi00MjkxLTkwMzQtYjY1YzFjMGQyZjBlIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2ODU5MzU5ODYsImV4cCI6NDg0MTY5NTk4Nn0.8eN_GmC4ZViKPJHjKr-AE08MsJo5iprElJyMQ2-QfaI",
}).then(() =>
  app.listen(3000, () => {
    console.log("Server running");
  })
);

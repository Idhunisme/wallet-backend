const express = require("express");
const Moralis = require("moralis").default;
const axios = require("axios");

const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("NFT BACKEND");
});

app.get("/nft", async (req, res) => {
  try {
    const { query } = req;

    const address = query.address;

    const chain = query.chain;

    const response = await Moralis.EvmApi.nft.getWalletNFTs({
      address,
      chain,
    });

    const result = response.raw;
    const finalRes = result["result"];

    return res.status(200).json(finalRes);
  } catch (error) {
    console.log(error);
    console.log("something went wrong");
    return res.status(400).json();
  }
});

app.get("/dapps", async (req, res) => {
  const {query} = req
  const apiUrl =
    `https://api.dappradar.com/4tsxo4vuhotaojtl/dapps?chain=${query.chain}`;
  const headers = {
    "X-BLOBR-KEY": "DBxLPKxFrzfvwCPyVk5batVqhsHTjpeI",
  };

  try {
    let dapps = await axios.get(apiUrl, {
      headers,
    });
    console.log(dapps);
    //    if(dapps) {
    return res.status(200).json(dapps.data['results']);
    //    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "An error occurred" });
  }
});

Moralis.start({
  apiKey:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjNhNzA3YWVmLTg2YjktNDMxMC05YzY5LTgyNGZjNDA1NGNhMyIsIm9yZ0lkIjoiMzQxMjc2IiwidXNlcklkIjoiMzUwODM4IiwidHlwZUlkIjoiYTAwMzA4NzAtYjJmYi00MjkxLTkwMzQtYjY1YzFjMGQyZjBlIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2ODU5MzU5ODYsImV4cCI6NDg0MTY5NTk4Nn0.8eN_GmC4ZViKPJHjKr-AE08MsJo5iprElJyMQ2-QfaI",
}).then(() => {
  app.listen(3000, () => {
    console.log(`Listening for API Calls`);
  });
});

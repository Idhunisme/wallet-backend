const express = require("express");
const Moralis = require("moralis").default;

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

    let NFTS;

    const address = query.address;

    const chain = query.chain;

    const response = await Moralis.EvmApi.nft.getWalletNFTs({
      address,
      chain,
    });

    const result = response.raw;

    return res.status(200).json({ result });
  } catch (error) {
    console.log(error);
    console.log("something went wrong");
    return res.status(400).json();
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

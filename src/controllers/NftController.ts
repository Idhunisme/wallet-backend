import { Request, Response } from "express";
import { EvmChain, EvmAddressInput } from "@moralisweb3/common-evm-utils";
import Moralis from "moralis";

export class NftController {
  public static async getNft(req: Request, res: Response) {
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
  }
}

import Web3 from "web3";
import { Request, Response } from "express";
import { convertToEther } from "../utils/utils";
import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";

export class AccountController {
  public static async getEthBalance(req: Request, res: Response) {
    const { query } = req;
    const web3: Web3 = new Web3(query.rpc as string);
    let address: String = `${query.address}`;

    try {
      const balance = await web3.eth.getBalance(address as string);
      const chainId = await web3.eth.getChainId();
      const result = web3.utils.fromWei(balance, "ether");

      return res.status(200).json({
        balance: result,
        address: address,
        chainId: chainId.toString(),
      });
    } catch (error) {
      return res.status(404).json({
        erros: ["not.found"],
      });
    }
  }

  public static async getTokenBalance(req: Request, res: Response) {
    const { query } = req;
    const web3: Web3 = new Web3(query.rpc as string);
    const contractAddress = query.contractAddress;
    const walletAddress = query.walletAddress;

    try {
      const tokenAbi = require("../abi/contract-abi.json");
      const tokenContract = new web3.eth.Contract(
        tokenAbi,
        contractAddress as string
      );

      const name = await tokenContract.methods.name().call();
      const balance = await tokenContract.methods
        .balanceOf(walletAddress)
        .call();

      return res.status(200).json({
        name: name,
        balance: convertToEther(balance, 18, query.rpc as string),
      });
    } catch (error) {
      return res.status(404).json({
        erros: ["not.found"],
      });
    }
  }

  public static async getEthTransaction(
    req: Request,
    res: Response
  ): Promise<any> {
    const { query } = req;
    const chain = EvmChain.create(query.chainId as string);
    const address = query.address;

    try {
      const response = await Moralis.EvmApi.transaction.getWalletTransactions({
        address: address as string,
        chain: chain,
      });


      return res.status(200).json(response);
    } catch (error) {
      return res.status(404).json({
        erros: ["not.found"],
      });
    }
  }
  public static async getTokenTransfer(
    req: Request,
    res: Response
  ): Promise<any> {
    const { query } = req;
    const chain = EvmChain.create(query.chainId as string);
    const address = query.address;
    const contractAddress = query.contract;

    try {
      const response = await Moralis.EvmApi.token.getWalletTokenTransfers({
        address: address as string,
        chain: chain,
      });

     if(contractAddress) {
      const items = [];

      for (const item of response["result"]) {
        if (item.address.equals(contractAddress as string)) {
          items.push(item);
        }
      }
      return res.status(200).json(items);
     } else {
      return res.status(200).json(response['result']);
     }

     
    } catch (error) {
      return res.status(404).json({
        erros: ["not.found"],
      });
    }
  }
}

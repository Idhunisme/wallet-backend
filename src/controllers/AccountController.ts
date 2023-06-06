import Web3 from "web3";
import { Request, Response } from "express";

export class AccountController {



  public static async getEthBalance(req: Request, res: Response) {
    const { query } = req;
    const web3: Web3 = new Web3(query.rpc as string);
    let address: String = `${query.address}`;

    try {
      const balance = await web3.eth.getBalance(address as string);
      const chainId = await web3.eth.getChainId();
      const result = web3.utils.fromWei(balance, "ether");

      return res
        .status(200)
        .json({
          balance: result,
          address: address,
          chainId: chainId.toString(),
        });
    } catch (error) {
      console.error("Error getting ETH balance:", error);
      throw error;
    }
  }

  // public static async getTokenBalance(req: Request, res: Response) {
  //   const contractAbi = [
  //     {
  //       "constant": true,
  //       "inputs": [
  //           {
  //               "name": "_owner",
  //               "type": "address"
  //           }
  //       ],
  //       "name": "balanceOf",
  //       "outputs": [
  //           {
  //               "name": "balance",
  //               "type": "uint256"
  //           }
  //       ],
  //       "payable": false,
  //       "stateMutability": "view",
  //       "type": "function"
  //   },

  //     // ... other functions ...
  //   ];


  //   const {query} = req;
  //   const web3: Web3 = new Web3(query.rpc as string);
  //   let address: String = `${query.address}`;
  //   let contractAddress: String = `${query.contractAddress}`;



  //   const contract = new web3.eth.Contract(contractAbi,contractAddress)

  // }

  // public async getEthTransaction(address: string): Promise<any> {
  //  try {
  //   let block = await this.web3.eth.getBlock(5422867);

  //   console.log({block})
  //   const txHashList = []

  //   if (block != null && block.transactions != null) {
  //     for (let txHash of block.transactions) {
  //       let tx = await this.web3.eth.getTransaction(txHash);
  //       if (address == tx.to || address == tx.from) {
  //         txHashList.push(txHash)
  //         // console.log(
  //         //   "from: " +
  //         //     tx.from.toLowerCase() +
  //         //     " to: " +
  //         //     tx.to.toLowerCase() +
  //         //     " value: " +
  //         //     tx.value
  //         // );

  //         return txHashList;
  //       }
  //     }
  //   }

  //   return [];
  //  } catch (error) {
  //   console.log(error)
  //  }

  // }
}

import Web3 from "web3";

export function convertToEther(
  balance: string,
  decimals: number,
  rpc: string
): string {
  const web3: Web3 = new Web3(rpc);
  const kanjud = "kanjudbadag"

  const etherValue = web3.utils.fromWei(balance);

  return etherValue;
}

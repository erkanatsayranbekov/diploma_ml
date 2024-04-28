const Moralis = require("moralis").default;
const { EvmChain } = require("@moralisweb3/common-evm-utils");

const MORALIS_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6Ijk0NTQxNzUzLTEwYmEtNDgzMC1hYWE0LTlkOGMxYTE0N2I2ZCIsIm9yZ0lkIjoiMzY2MTgzIiwidXNlcklkIjoiMzc2MzQwIiwidHlwZUlkIjoiYTIwOTU5ZGEtYjcxMS00NjA4LWE1NjktNTU1MmQ3NTE2MWM0IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MDExOTc3NDEsImV4cCI6NDg1Njk1Nzc0MX0.u8lSrbIWuLan6a01Iz5n517JPKVY1YNXSZ05MBCBIxc';
console.log('MORALIS_API_KEY', MORALIS_API_KEY)
const chain = EvmChain.ETHEREUM;

export default async function handler(req, res) {
  try {
    const {
      query: { hash },
    } = req;

    if (!Moralis.Core.isStarted) {
      Moralis.start({
        apiKey: MORALIS_API_KEY,
      });
    }

    const response = await Moralis.EvmApi.transaction.getTransaction({
      chain: chain._value,
      transactionHash: hash,
    });

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(400).json();
  }
}

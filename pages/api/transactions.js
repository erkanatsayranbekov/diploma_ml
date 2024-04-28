const Moralis = require("moralis").default;
const { EvmChain } = require("@moralisweb3/common-evm-utils");

const MORALIS_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6Ijk0NTQxNzUzLTEwYmEtNDgzMC1hYWE0LTlkOGMxYTE0N2I2ZCIsIm9yZ0lkIjoiMzY2MTgzIiwidXNlcklkIjoiMzc2MzQwIiwidHlwZUlkIjoiYTIwOTU5ZGEtYjcxMS00NjA4LWE1NjktNTU1MmQ3NTE2MWM0IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MDExOTc3NDEsImV4cCI6NDg1Njk1Nzc0MX0.u8lSrbIWuLan6a01Iz5n517JPKVY1YNXSZ05MBCBIxc';
const chain = EvmChain.ETHEREUM;

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default async function handler(req, res) {
  try {
    if (!Moralis.Core.isStarted) {
      Moralis.start({
        apiKey: MORALIS_API_KEY,
      });
    }

    // Get the latest block
    const _latestBlock = await Moralis.EvmApi.block.getDateToBlock({
      date: Date.now(),
      chain: "0x1", //chain: chain._value,
    });
    const latestBlockNum = _latestBlock.toJSON().block;

    let blockInfo = {};

    // Timeout to prevent Moralis rate limit
    await timeout(1000);

    // Get the latest block data
    const blockData = await Moralis.EvmApi.block.getBlock({
      chain: "0x1", //chain: chain._value,
      blockNumberOrHash: latestBlockNum,
    });

    // Block info
    blockInfo.block = {
      blockNumber: blockData.toJSON().number,
      totalTransactions: blockData.toJSON().transaction_count,
      gasUsed: blockData.toJSON().gas_used,
      miner: blockData.toJSON().miner,
      time: blockData.toJSON().timestamp,
    };

    // Block Transactions
    blockInfo.transactions = blockData
      .toJSON()
      .transactions.filter((i) => i.value > 0);

    return res.status(200).json(blockInfo);
  } catch (error) {
    console.log(error);
    return res.status(400).json();
  }
}

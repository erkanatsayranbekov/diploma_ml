import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { formatDistanceStrict } from "date-fns";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { DUMMY_TRANSACTIONS } from "../src/utils/dummy";
import { gasToEth, smallerString, weiToEth } from "../src/utils/helpers";

import { phishers } from "../src/utils/phishers";

const colums = [
  { field: "id", headerName: "ID", width: 60, filterable: false },
  {
    field: "hash",
    headerName: "Txn hash",
    width: 230,
    filterable: false,
    renderCell: (params) => {
      return (
        <Link
          href={`/transaction-details/${params.value}`}
          style={{ textDecoration: "none" }}
        >
          {smallerString(params.value, 9, -15)}
        </Link>
      );
    },
  },
  { field: "block", headerName: "Block", width: 110, filterable: false },
  { field: "timestamp", headerName: "Age", width: 170, filterable: false },
  { field: "from_address", headerName: "From", width: 150, filterable: false },
  { field: "to_address", headerName: "To", width: 150, filterable: false },
  { field: "value", headerName: "Value", width: 130, filterable: false },
  { field: "fee", headerName: "Txn Fee", width: 130, filterable: false },
  { field: "probability", headerName: "Fraud Probability", width: 130, filterable: false },
];

export function getBiasedFloat(from_address, to_address) {
  if (phishers.has(from_address) || phishers.has(to_address)) {
    return Math.round((Math.random() * 0.1 + 0.85) * 100) / 100;
  }
  return Math.round((Math.random() * 0.2) * 100) / 100;
}

const Transactions = () => {
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState(DUMMY_TRANSACTIONS);


  useEffect(() => {
    const fetchTransactions = () => {
      setLoading(true);

      fetch("api/transactions").then(async (res) => {
        const _json = await res.json();

        const _transactions = _json.transactions?.map?.((t, idx) => ({
          id: idx + 1,
          hash: t.hash,
          block: t.block_number,
          timestamp: formatDistanceStrict(
            new Date(t.block_timestamp),
            new Date(),
            {
              addSuffix: true,
              includeSeconds: true,
            }
          ),
          from_address: smallerString(t.from_address, 5, -8),
          to_address: smallerString(t.to_address, 5, -8),
          value: weiToEth(t.value),
          fee: gasToEth(t.gas, t.gas_price),
          probability: `${getBiasedFloat(t.from_address, t.to_address)}%`,
        }));

        setTransactions(_transactions);
        setLoading(false);
      });
    };

    fetchTransactions();

    const interval = setInterval(() => fetchTransactions(), 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Container sx={{ py: 8, maxWidth: 1200 }}>
      <Stack spacing={3} alignItems="center" sx={{ textAlign: "center" }}>
        <Typography variant="h4">Latest Transactions</Typography>
      </Stack>

      <Paper sx={{ height: 800, mt: 5 }}>
        <DataGrid
          rows={transactions}
          columns={colums}
          autoPageSize
          loading={loading}
        />
      </Paper>
    </Container>
  );
};

export default Transactions;

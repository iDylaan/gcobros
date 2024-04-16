import React from "react";
import {
  Box,
  Typography,
  Button,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import ui from "./index.module.css";
import Palette from "../../constants/palette";
import { useRouter } from "next/router.js";
import { useState, useEffect } from "react";

import { readLastThreePaymentsByDomain } from "../../pages/api/transactions/transactionApi";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const epochToDate = (epochDate) => {
  const date = new Date(epochDate * 1000);

  const day = date.toLocaleString("en-US", { day: "numeric" });
  const month = date.toLocaleString("es-MX", { month: "long" });
  const year = date.toLocaleString("en-US", { year: "numeric" });

  return `${day} de ${
    month.charAt(0).toUpperCase() + month.slice(1)
  } del ${year}`;
};

export default function TransactionCard({ domain }) {
  const router = useRouter();

  const [transactionData, setTransactionData] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  function transactions() {
    router.push("/transaction_details");
  }

  useEffect(() => {

    if (domain.length < 1) {
      return;
    }

    readLastThreePaymentsByDomain(domain).then((customerTransactions) => {
      if (customerTransactions === null) {
        return setTransactionData([]);
      }
      setTransactionData(customerTransactions);
    });
  }, [domain]);

  return (
    <>
      <Box className={ui.mainBox}>
        <TableContainer className={ui.tableContainer}>
          <Table direction="asc" className={ui.table}>
            <TableBody>
              <TableRow>
                <TableCell colSpan={2}>
                <Typography className={ui.cardTitle}>Transacciones</Typography>
                </TableCell>
              </TableRow>
            </TableBody>
            <TableBody>
              {transactionData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((transaction) => (
                  <TableRow
                    key={transaction.id}
                    sx={{
                      "&:last-child td, &:last-child th": {
                        border: 0,
                        borderBottom: "none",
                      },
                    }}
                  >
                    <TableCell className={ui.periodo} width={"50%"}>
                      {epochToDate(transaction.created)}
                    </TableCell>
                    <TableCell className={ui.monto} width={"50%"}>
                      {transaction.currency.toUpperCase()}{" "}
                      {formatter.format(transaction.amount / 100)}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          {transactionData.length === 0 ? (
            <Box className={ui.notTransactionsBox}>
              <Typography
                className={ui.notTransactionsMessage}
                color={Palette.grey}
              >
                No hay transacciones para mostrar
              </Typography>
            </Box>
          ) : null}
          <Box className={ui.showTransactionBox}>
            <Button
              className={ui.showTransactionButton}
              onClick={transactions}
              sx={{ borderRadius: "0px 0px 5px 5px" }}
            >
              <Typography className={ui.buttonText}>VER TRANSACCION</Typography>
            </Button>
          </Box>
        </TableContainer>
      </Box>
    </>
  );
}

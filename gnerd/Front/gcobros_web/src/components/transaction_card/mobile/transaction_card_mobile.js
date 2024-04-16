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
import { useRouter } from "next/router.js";
import Palette from "../../../constants/palette";
import { readAllTransactionByDomain, readLastThreePaymentsByDomain } from "../../../pages/api/transactions/transactionApi";

import { useState, useEffect } from "react";
import { epochToDate } from "../../../helper/dateFormatter";
import { currencyFormatter, formatter } from "../../../helper/currencyFormatter";

export default function MobileTransactionCard({ customerId, domain }) {
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
      setTransactionData(customerTransactions)
    })
  }, [domain])

  return (
    <>
      <Box className={ui.mainBox}>
        <TableContainer className={ui.tableEmpty}>
          <Table className={ui.table}>
            <Typography className={ui.cardTitle}>Transacciones</Typography>
            <TableBody>
              {transactionData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((transaction) => (
                <TableRow
                  key={transaction.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell className={ui.periodo} width="50%">{epochToDate(transaction.created)}</TableCell>
                  <TableCell className={ui.monto} width="50%" sx={{minWidth:"160px"}}>
                    {transaction.currency.toUpperCase()} {currencyFormatter.format(transaction.amount / 100)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {transactionData.length === 0 ? (
            <Box className={ui.notTransactionsBox}>
              <Typography
                className={ui.notTransactionsMessage}
                sx={{ color: Palette.grey }}
              >
                No hay transacciones para mostrar
              </Typography>
            </Box>
          ) : null}
          <Box className={ui.showTransactionBox}>
            <Button className={ui.showTransactionButton} onClick={transactions}>
              <Typography className={ui.buttonText}>
                Ver transacciones
              </Typography>
            </Button>
          </Box>
        </TableContainer>
      </Box>
    </>
  );
}

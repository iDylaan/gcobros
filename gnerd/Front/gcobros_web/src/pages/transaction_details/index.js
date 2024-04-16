//Componentes
import Navbar from "../../components/navbar/navbar.js";
import Transiction_Details_Mobile from "../../components/transaction_details_mobile/transaction_details_mobile.js";
//Mui material
import {
  Typography,
  Box,
  Stack,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  useMediaQuery,
} from "@mui/material";
import TablePagination from "@mui/material/TablePagination";

//Icons
import ui from "./index.module.css";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { readAllTransactionByDomain } from "../api/transactions/transactionApi.js";
import {
  epochFirstDayMonth,
  epochLastDayMonth,
  epochToDate,
  epochToPeriod,
} from "../../helper/dateFormatter.js";
import { currencyFormatter } from "../../helper/currencyFormatter.js";
import { useRouter } from "next/router.js";
import { getStatusTransaction } from "../../helper/statusFormatter.js";

export default function Transiction_Details() {
  const router = useRouter();
  const { data, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  });

  //Mobile mode
  const isMobileScreen = useMediaQuery("(max-width: 750px)");

  //Data Base
  const [transactionData, setTransactionData] = useState([]);
  const [customerId, setCustomerId] = useState("");

  //Rows per page
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    if (status !== "authenticated") {
      return;
    }
    const domain = data?.user?.email?.split("@").pop();
    readAllTransactionByDomain(domain).then((result) => {
      result === null ? null : setTransactionData(result);
    });
  }, [customerId, status, data]);

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, transactionData.length - page * rowsPerPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      {isMobileScreen ? (
        <Transiction_Details_Mobile transactionData={transactionData} />
      ) : (
        <Stack spacing={6}>
          <Navbar />
          <Box
            sx={{
              height: 400,
              width: "100%",
              paddingLeft: 5,
              paddingRight: 5,
            }}
          >
            <Stack spacing={3}>
              <Typography
                variant="h1"
                fontSize="clamp(1rem, 2rem, 2.25rem)"
                marginLeft="20px"
              >
                Transacciones
              </Typography>

              <TableContainer>
                <Table arial-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" className={ui.tableTitles}>
                        Periodo de Cobro
                      </TableCell>
                      <TableCell align="center" className={ui.tableTitles}>
                        Fecha de Pago
                      </TableCell>
                      <TableCell align="center" className={ui.tableTitles}>
                        Monto
                      </TableCell>
                      <TableCell align="center" className={ui.tableTitles}>
                        Estatus
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {transactionData
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((transaction) => (
                        <TableRow
                          key={transaction.id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell
                            align="center"
                            className={ui.periodoDeCobro}
                          >
                            {epochToPeriod(transaction.created)}
                          </TableCell>
                          <TableCell align="center">
                            {epochToDate(transaction.created)}
                          </TableCell>
                          <TableCell align="center">
                            {`${transaction.currency.toUpperCase()} ${currencyFormatter.format(transaction.amount / 100)}`}
                          </TableCell>
                          <TableCell align="center">
                            <Typography
                              className={ui.estatus}
                              sx={{
                                backgroundColor:
                                getStatusTransaction(transaction.status).toUpperCase() == "APROBADO"
                                    ? "#EDF7ED"
                                    : "#FFF4E5",
                                color:
                                getStatusTransaction(transaction.status).toUpperCase() == "APROBADO"
                                    ? "#76AB79"
                                    : "#F18932",
                              }}
                            >
                              {getStatusTransaction(transaction.status)}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[6, 12, 24]}
                component="div"
                count={transactionData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Stack>
          </Box>
        </Stack>
      )}
    </>
  );
}

import * as React from 'react';
import {
Typography,
Box,
Stack,
TableContainer, Table, TableBody, TableRow, TableCell,

} from '@mui/material';
import ui from "./index.module.css";
import MobileNavbar from "../navbar/mobile/mobile_navbar"
import { epochToPeriod, epochToDate } from '../../helper/dateFormatter';
import { getStatusTransaction } from '../../helper/statusFormatter';
import { currencyFormatter } from '../../helper/currencyFormatter';

export default function Transiction_Details_Mobile({ transactionData }) {

    return (
        <Stack spacing={3}>
            <MobileNavbar />
            <Typography
                variant="h6"
                paddingLeft="20px"
                align="center"
            >
                Transacciones
            </Typography>
            <Box
                sx={{
                    width: '100%',
                    paddingLeft: 5,
                    paddingRight: 5
                }}>
                <Stack className={ui.mainStack} spacing={5}>
                    {transactionData.map((transaction) => (
                        <TableContainer key={transaction.id} className={ui.table}>
                            <Table arial-label="simple table">
                                <TableBody>
                                    <TableRow>
                                        <TableCell className={ui.tableTitles} sx={{minWidth: "150px"}}>Periodo de cobro</TableCell>
                                        <TableCell className={ui.periodoDeCobro} align='right' sx={{minWidth: "220px"}}>{epochToPeriod(transaction.created)}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={ui.tableTitles}>Fecha de pago</TableCell>
                                        <TableCell align='right'>{epochToDate(transaction.created)}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={ui.tableTitles}>Monto</TableCell>
                                        <TableCell align='right'>{currencyFormatter.format(transaction.amount / 100)}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={ui.tableTitles}>Estatus</TableCell>
                                        <TableCell align='right'><Typography
                                            className={ui.estatus} sx={{
                                                backgroundColor: getStatusTransaction(transaction.status).toUpperCase() == 'APROBADO' ? "#EDF7ED" : "#FFF4E5",
                                                color: getStatusTransaction(transaction.status).toLocaleUpperCase() == 'APROBADO' ? "#76AB79" : "#F18932",
                                            }}>
                                            {getStatusTransaction(transaction.status).toUpperCase()}</Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    ))}
                </Stack>
            </Box>
        </Stack>
    );
}
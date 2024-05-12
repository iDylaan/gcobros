import React, { useState, useEffect } from "react";
import {
    Box,
    Stack,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    CircularProgress
} from "@mui/material";
import Palette from "../../constants/palette.js";
import Navbar from "../../components/navbar/navbar.js";
import getCustomers from "../api/customers/getCustomers.js";

export default function adminDashboard() {

    // Variables
    const [customers, setCustomers] = useState([]);
    const [tableLoading, setTableLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Funciones reservadas
    useEffect(() => {
        async function getEffectCustomers() {
            try {
                setTableLoading(true);
                const customersData = await getCustomers();
                console.log(customersData);
                if (customersData) {
                    setCustomers(customersData);
                } else {
                    setCustomers([]);
                }
                console.log(customersData);
            } catch (error) {
                setCustomers([]);
                console.error(error);
            } finally {
                setTableLoading(false);
            }
        }

        getEffectCustomers();
    }, []);

    // Funciones
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const paginatedCustomers = customers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <Stack>
            <Navbar />
            <Box bgcolor={Palette.primary} height="70px">
                <Typography variant="h4" color="white" p={2}>
                    Clientes
                </Typography>
            </Box>
            <Box bgcolor={Palette.boneWhite} p={2}>
                {tableLoading && customers.length === 0 ? (
                    <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Dominio</TableCell>
                                    <TableCell>Organización</TableCell>
                                    <TableCell>Fecha de próximo pago</TableCell>
                                    <TableCell>Estatus</TableCell>
                                </TableRow>
                            </TableHead>
                        </Table>
                        <Box sx={{ display: 'flex', justifyContent: "center", margin: '20px' }}>
                            <CircularProgress />
                        </Box>
                    </TableContainer>
                ) : (
                    <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Dominio</TableCell>
                                    <TableCell>Organización</TableCell>
                                    <TableCell>Contacto</TableCell>
                                    <TableCell>País</TableCell>
                                    <TableCell>Fecha de próximo pago</TableCell>
                                    <TableCell>Estatus</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {paginatedCustomers.map((customer) => (
                                    <TableRow key={customer.customerId}>
                                        <TableCell>{customer.customerId}</TableCell>
                                        <TableCell>{customer.customerDomain}</TableCell>
                                        <TableCell>{customer.organizationName}</TableCell>
                                        <TableCell>{customer.customerName}</TableCell>
                                        <TableCell>{customer.countryCode}</TableCell>
                                        {/* <TableCell>{customer.nextPaymentDate}</TableCell> */}
                                        <TableCell>
                                            <Box
                                                component="span"
                                                sx={{
                                                    bgcolor: customer.status === "ACTIVO" ? "green" : "red",
                                                    color: "white",
                                                    p: 0.5,
                                                    borderRadius: 1
                                                }}
                                            >
                                                {customer.status}
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 20]}
                            component="div"
                            count={customers.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            labelRowsPerPage="Filas por página"
                            labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
                        />
                    </TableContainer>
                )}

            </Box>
        </Stack >
    );
}
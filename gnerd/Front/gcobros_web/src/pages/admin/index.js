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
    CircularProgress,
    Link,
    Button
} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import LoadingPage from "../../components/loading";
import Palette from "../../constants/palette.js";
import Navbar from "../../components/navbar/navbar.js";
import getCustomers from "../api/customers/getCustomers.js";
import moment from 'moment';

export default function AdminDashboard() {

    // Variables
    const router = useRouter();
    const { data, status } = useSession();
    const [customers, setCustomers] = useState([]);
    const [tableLoading, setTableLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);


    // Funciones reservadas
    useEffect(() => {
        if (status === "authenticated") {
            if (data.user.isAdmin) {
                async function getEffectCustomers() {
                    try {
                        setTableLoading(true);
                        const customersData = await getCustomers();
                        if (customersData) {
                            setCustomers(customersData);
                        } else {
                            setCustomers([]);
                        }
                    } catch (error) {
                        setCustomers([]);
                        console.error(error);
                    } finally {
                        setTableLoading(false);
                    }
                }

                getEffectCustomers();
            } else {
                router.push("/dashboard");
            }
        } else {
            router.push("/");
        }
    }, [status, data]);

    if (status === "loading") {
        return <LoadingPage />;
    }

    // Funciones
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const formatDate = (date) => {
        return moment(date).format('DD/MM/YYYY');
    };

    const paginatedCustomers = customers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <Stack>
            <Navbar />
            <Box bgcolor={Palette.primary} height="70px" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h4" color="white" p={2}>
                    Clientes
                </Typography>

                <Link underline="none" sx={{ marginRight: '18px' }} onClick={() => {
                    router.push("/admin-accounts-manager");
                }}>
                    <Button variant="outlined" size="large" sx={{ color: 'white', border: '1px solid white' }}>Administradores</Button>
                </Link>
            </Box>
            <Box bgcolor={Palette.boneWhite} p={2}>
                {tableLoading && customers.length === 0 ? (
                    <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Nombre</TableCell>
                                    <TableCell>Dominio</TableCell>
                                    <TableCell>Contacto</TableCell>
                                    <TableCell>País</TableCell>
                                    <TableCell>Fecha límite de pago</TableCell>
                                    <TableCell>Importe</TableCell>
                                    <TableCell>Estatus de pago</TableCell>
                                    <TableCell></TableCell>
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
                                    <TableCell>Nombre</TableCell>
                                    <TableCell>Dominio</TableCell>
                                    <TableCell>Contacto</TableCell>
                                    <TableCell>País</TableCell>
                                    <TableCell>Fecha límite de pago</TableCell>
                                    <TableCell>Importe</TableCell>
                                    <TableCell>Estatus de pago</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {paginatedCustomers.map((customer) => (
                                    <TableRow key={customer.customerId}>
                                        <TableCell>{customer.customerId}</TableCell>
                                        <TableCell>{customer.organizationName}</TableCell>
                                        <TableCell>{customer.customerDomain}</TableCell>
                                        <TableCell>{customer.customerName}</TableCell>
                                        <TableCell>
                                            <Typography variant="body1">
                                                <span className={`fi fi-${customer.countryCode.toLowerCase()}`} style={{ marginRight: 8 }}></span>
                                                {customer.countryCode}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            {customer.delayed_transaction !== null
                                                ? formatDate(customer.delayed_transaction.payment_limit_day)
                                                : customer.transaction !== null
                                                    ? formatDate(customer.transaction.payment_limit_day) : ''}
                                        </TableCell>
                                        <TableCell>
                                            {customer.delayed_transaction !== null
                                                ? '$' + customer.delayed_transaction.amount + ' mxn'
                                                : customer.transaction !== null
                                                    ? '$' + customer.transaction.amount + ' mxn' : ''}
                                        </TableCell>
                                        <TableCell>
                                            <Box
                                                component="span"
                                                sx={{
                                                    bgcolor: customer.transaction_status === "PAGADO"
                                                        ? "green"
                                                        : customer.transaction_status === "PENDIENTE"
                                                            ? "#4285f4"
                                                            : customer.transaction_status === "RETRASADO"
                                                            ? "red" 
                                                            : customer.transaction_status === "FALTA IMPORTE"
                                                            ? '#FCB200' : 'grey',
                                                    color: "white",
                                                    p: customer.transaction_status === "" ? 0 : 0.5,
                                                    borderRadius: 1
                                                }}
                                            >
                                                {customer.transaction_status}
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Link underline="none" sx={{ marginRight: '18px' }} onClick={() => {
                                                router.push("/customer-details?id=" + customer.customerId);
                                            }}>
                                                <Button variant="outlined" size="small" startIcon={<VisibilityIcon />}>
                                                    Detalles
                                                </Button>
                                            </Link>
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
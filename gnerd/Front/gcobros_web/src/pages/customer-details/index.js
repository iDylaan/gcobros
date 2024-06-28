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
    Grid,
    TablePagination,
    CircularProgress,
    Link,
    Button,
    useMediaQuery
} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useRouter } from "next/router";
import Palette from "../../constants/palette.js";
import Navbar from "../../components/navbar/navbar.js";
import LoadingPage from "../../components/loading";
import { useSession } from "next-auth/react";
import { getCustomer } from "../api/customers/getCustomers.js";
import moment from 'moment';

export default function CustomerDetails() {

    // Variables
    const router = useRouter();
    const { data, status } = useSession();
    const isMobileScreen = useMediaQuery("(max-width: 1000px)");
    const { id } = router.query;
    const [customer, setCustomer] = useState(null);
    const [loading, setLoading] = useState(true);

    // Funciones reservadas
    useEffect(() => {
        if (status === "authenticated") {
            if (data.user.isAdmin) {
                if (id) {
                    async function fetchCustomerDetails() {
                        try {
                            setLoading(true);
                            const customerData = await getCustomer(id);
                            console.log(customerData);
                            if (customerData) {
                                setCustomer(customerData);
                            } else {
                                setCustomer({});
                            }
                        } catch (error) {
                            setCustomer({});
                            console.error(error);
                        } finally {
                            setLoading(false);
                        }
                    }

                    fetchCustomerDetails();
                }
            } else {
                router.push("/dashboard");
            }
        } else {
            router.push("/");
        }
    }, [id, status, data]);

    if (status === "loading") {
        return <LoadingPage />;
    }

    // Funciones
    return (
        <Stack>
            <Navbar />
            <Box bgcolor={Palette.primary} height="70px" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link underline="none" sx={{ marginRight: '18px' }} onClick={() => {
                    router.push("/admin");
                }}>
                    <IconButton aria-label="ArrowBackIosNew" sx={{ marginLeft: '20px', color: 'white' }}>
                        <ArrowBackIosNewIcon />
                    </IconButton>
                </Link>

                {!isMobileScreen ? (
                    <Typography variant="h4" color="white" p={2}>
                        {loading || !customer ? 'Cliente' : customer.organizationName + ' - ' + customer.customerDomain}
                    </Typography>
                ) : ''}
            </Box>
            <Box bgcolor={Palette.boneWhite} p={2} sx={{ minHeight: 'calc(100dvh - 180px)' }}>
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: "center", margin: '20px', height: '150px', alignContent: 'baseline' }}>
                        <CircularProgress />
                    </Box>
                ) : customer ? (
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h5" gutterBottom>Información General del Cliente</Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="body1"><strong>Dominio del Cliente:</strong> {customer.customerDomain}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="body1"><strong>ID del Cliente:</strong> {customer.customerId}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="body1"><strong>Nombre de la Organización:</strong> {customer.organizationName}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="body1"><strong>Activo:</strong> {customer.active ? 'Sí' : 'No'}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="body1"><strong>País:</strong> {customer.countryCode}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="body1"><strong>Fecha de Creación:</strong> {customer.createdAt}</Typography>
                            </Grid>
                        </Grid>

                        {customer.transaction && (
                            <Box mt={4}>
                                <Typography variant="h5" gutterBottom>Detalles de la Transacción</Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="body1"><strong>Monto:</strong> ${customer.transaction.amount} mxn</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="body1"><strong>Descripción:</strong> {customer.transaction.description}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="body1"><strong>Fecha de Pago:</strong> {customer.transaction.createdAt}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="body1"><strong>ID de la Transacción:</strong> {customer.transaction.id}</Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                        )}
                    </Paper>
                ) : (
                    <Typography variant="h6">Cliente no encontrado</Typography>
                )}

            </Box>
        </Stack >
    );
}
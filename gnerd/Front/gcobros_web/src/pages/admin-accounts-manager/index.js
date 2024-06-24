
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
    Button,
    Modal,
    TextField,
    LinearProgress
} from "@mui/material";
import { useRouter } from "next/router";
import Palette from "../../constants/palette.js";
import Navbar from "../../components/navbar/navbar.js";
import { getAdmins } from "../api/admin/getAdmins.js";
import createAdmin from "../api/admin/createAdmin.js";
import { useSession } from "next-auth/react";
import { activateAdmin, desactivateAdmin } from "../api/admin/handleAdmin.js";

export default function AdminAccountsDashboard() {

    // Variables
    const { data, data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            router.push("/");
        }
    });
    const router = useRouter();
    const [openModal, setOpenModal] = useState(false);
    const [fetchModalLoading, setFetchModalLoading] = useState(false);
    const [tableFetching, setTableFetching] = useState(false);
    const [admins, setAdmins] = useState([]);
    const [tableLoading, setTableLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    // Funciones reservadas
    useEffect(() => {
        async function getEffectAdmins() {
            try {
                setTableLoading(true);
                const adminsData = await getAdmins();
                if (adminsData) {
                    setAdmins(adminsData);
                } else {
                    setAdmins([]);
                }
            } catch (error) {
                setAdmins([]);
                console.error(error);
            } finally {
                setTableLoading(false);
            }
        }

        getEffectAdmins();
    }, []);

    // Funciones
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleActivateAdmin = async (userId) => {
        try {
            setTableFetching(true);
            const result = await activateAdmin(userId);
            setAdmins([]);
            if (result) {
                setAdmins(adminsData);
            } else {
                setAdmins([]);
            }
        } catch (error) {
            console.log(error.message);
        } finally {
            setTableFetching(false);
        }
    }
    const handleDropAdmin = async (userId) => {
        try {
            setTableFetching(true);
            const result = await desactivateAdmin(userId);
            setAdmins([]);
            if (result) {
                setAdmins(adminsData);
            } else {
                setAdmins([]);
            }
        } catch (error) {
            console.log(error.message);
        } finally {
            setTableFetching(false);
        }
    }

    const handleModalSubmit = async (e) => {
        e.preventDefault();
        const validationError = validateEmail(email);
        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            setFetchModalLoading(true);
            const created = await createAdmin(email);
            if (!created) {
                throw new Error("No se pudo crear el administrador");
            }

            handleCloseModal();

            try {
                setTableLoading(true);
                const adminsData = await getAdmins();
                setAdmins([]);
                if (adminsData) {
                    setAdmins(adminsData);
                } else {
                    setAdmins([]);
                }
            } catch (error) {
                setAdmins([]);
                console.error(error);
            } finally {
                setTableLoading(false);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setFetchModalLoading(false);
        }
    };


    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setError("");
    };

    const validateEmail = (email) => {
        if (!email) {
            return "El correo electrónico no puede estar vacío";
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return "El correo electrónico no es válido";
        }
        if (!email.endsWith("@gnerd.mx")) {
            return "El correo electrónico debe pertenecer al dominio @gnerd.mx";
        }
        return "";
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const paginatedAdmins = admins.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <Stack>
            <Navbar />
            <Box bgcolor={Palette.primary} height="70px" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h4" color="white" p={2}>
                    Administradores
                </Typography>

                <Link underline="none" sx={{ marginRight: '18px' }} onClick={() => {
                    router.push("/admin");
                }}>
                    <Button variant="outlined" size="large" sx={{ color: 'white', border: '1px solid white' }}>Clientes</Button>
                </Link>
            </Box>
            <Button onClick={handleOpenModal}>Nuevo Administrador</Button>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
            >
                <Box component="form" noValidate
                    autoComplete="off" onSubmit={handleModalSubmit}
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 600,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    {fetchModalLoading ? (
                        <LinearProgress sx={{ marginTop: "-32px", marginBottom: "30px", width: 600, marginLeft: "-32px" }} />
                    ) : ""}
                    <Typography variant="h5" paddingBottom={3}>
                        Nuevo Administrador
                    </Typography>
                    <TextField
                        id="outlined-textarea"
                        label="Email"
                        placeholder="Escribe el email registrado en G Nerd"
                        value={email}
                        onChange={handleEmailChange}
                        error={Boolean(error)}
                        helperText={error}
                        sx={{
                            width: '100%',
                            mb: 2,
                        }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        color="primary"
                        sx={{ width: '100%', margin: "0.4rem 0" }}
                    >
                        Registrar
                    </Button>
                </Box>
            </Modal >
            <Box bgcolor={Palette.boneWhite} p={2}>
                {tableLoading && admins.length === 0 ? (
                    <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nombre</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Suspendida</TableCell>
                                    <TableCell>Estatus</TableCell>
                                    <TableCell>Opciones</TableCell>
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
                                    <TableCell>Nombre</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Suspendida</TableCell>
                                    <TableCell>Estatus</TableCell>
                                    <TableCell>Opciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {paginatedAdmins.map((customer) => (
                                    <TableRow key={customer.id}>
                                        <TableCell>{customer.adminName}</TableCell>
                                        <TableCell>{customer.primaryEmail}</TableCell>
                                        <TableCell>{customer.suspended ? "SI" : "NO"}</TableCell>
                                        <TableCell>{customer.status ? "Activa" : "Baja"}</TableCell>
                                        <TableCell>
                                            {customer.suspended ? (
                                                <Button onClick={() => handleActivateAdmin(customer.id)} variant="outlined" size="small" color="success" disabled={data.user.email == customer.primaryEmail || tableFetching}>
                                                    Activar
                                                </Button>
                                            ) : (
                                                <Button onClick={() => handleDropAdmin(customer.id)} variant="outlined" size="small" color="error" disabled={data.user.email == customer.primaryEmail || tableFetching}>
                                                    Baja
                                                </Button>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 20]}
                            component="div"
                            count={admins.length}
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
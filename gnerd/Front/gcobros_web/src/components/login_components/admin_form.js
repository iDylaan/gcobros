// Importaciones
import ui from "./index.module.css";
import {
    Container,
    TextField,
    Button,
    CircularProgress,
    Alert
} from "@mui/material";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { adminSignIn } from "../../pages/api/admin/getAdmins";

function AdminLoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showError, setShowError] = useState(false);
    const [errors, setErrors] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const validatePassword = (password) => {
        if (password.length < 8) {
            return false;
        }
        if (!/[A-Z]/.test(password)) {
            return false;
        }
        if (!/\d/.test(password)) {
            return false;
        }
        if (!/[!@#$%^&*()_,.?":{}|<>]/.test(password)) {
            return false;
        }
        return true;
    };

    const handleEmailChange = (event) => {
        const newEmail = event.target.value;
        setEmail(newEmail);
        if (!validateEmail(newEmail)) {
            setErrors(prevErrors => ({ ...prevErrors, email: 'Ingrese un correo electrónico válido.' }));
        } else {
            setErrors(prevErrors => ({ ...prevErrors, email: '' }));
        }
    };

    const handlePasswordChange = (event) => {
        const newPassword = event.target.value;
        setPassword(newPassword);
        if (!validatePassword(newPassword)) {
            setErrors(prevErrors => ({ ...prevErrors, password: 'La contraseña no es válida.' }));
        } else {
            setErrors(prevErrors => ({ ...prevErrors, password: '' }));
        }
    };

    const handleSignin = async (event) => {
        event.preventDefault();
        if (loading) { return }
        if (!validateEmail(email)) {
            setErrors(prevErrors => ({ ...prevErrors, email: 'Ingrese un correo electrónico válido.' }));
            return;
        }
        if (!validatePassword(password)) {
            setErrors(prevErrors => ({ ...prevErrors, password: 'La contraseña no es válida.' }));
            return;
        }

        setShowError(false);
        setLoading(true);


        try {
            await adminSignIn(email, password);
            router.push('/admin');
        } catch (error) {
            setError(error.message);
            setShowError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className={ui.formContainer}>
            {showError && <Alert severity="error" style={{ marginBottom: '20px' }}>{error}</Alert>}

            <TextField
                id="email"
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                type="email"
                value={email}
                onChange={handleEmailChange}
                error={!!errors.email}
                helperText={errors.email}
            />
            <TextField
                id="password"
                label="Contraseña"
                variant="outlined"
                fullWidth
                margin="normal"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                error={!!errors.password}
                helperText={errors.password}
            />

            <Button
                variant="contained"
                size="large"
                fullWidth
                sx={{ marginTop: "20px" }}
                onClick={handleSignin}
            >{loading ? <CircularProgress size={24} style={{ color: 'white' }} /> : 'Ingresar'}</Button>
        </Container>
    );
}



export default AdminLoginForm;
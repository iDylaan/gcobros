// Importaciones
import ui from "./index.module.css";
import {
    Container,
    TextField,
    Button
} from "@mui/material";
import React, { useState } from 'react';

export default function AdminLoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ email: '', password: '' });

    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const handleEmailChange = (event) => {
        const newEmail = event.target.value;
        setEmail(newEmail);
        // En caso de que la contraseña no cumpla el tamaño mínimo
        if (password.length < 8) {
            setErrors(prevErrors => ({ ...prevErrors, email: 'Ingrese un correo electrónico válido.' }));
        } else {
            setErrors(prevErrors => ({ ...prevErrors, email: '' }));
        }
    };

    const handlePasswordChange = (event) => {
        const newPassword = event.target.value;
        setPassword(newPassword);
        if (!validatePassword(newPassword)) {
            setErrors(prevErrors => ({ ...prevErrors, password: 'La contraseña debe tener al menos 8 caracteres.' }));
        } else {
            setErrors(prevErrors => ({ ...prevErrors, password: '' }));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validateEmail(email)) {
            setErrors(prevErrors => ({ ...prevErrors, email: 'Ingrese un correo electrónico válido.' }));
            return;
        }
        if (!validatePassword(password)) {
            setErrors(prevErrors => ({ ...prevErrors, password: 'La contraseña debe tener al menos 8 caracteres.' }));
            return;
        }

        // TODO: realizar envio a la API de autentificacion en el sistema
    };

    return (
        <Container className={ui.formContainer}>
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
                onClick={handleSubmit}
            >Ingresar</Button>
        </Container>
    );
}
import { Button, Typography, Stack, Box, Link, Container } from "@mui/material";
import Image from "next/image";
import React from "react";
import Palette from "../../constants/palette.js"
import AdminLoginForm from "./admin_form.js";
import ui from "./index.module.css"

export default function MobileAdminLoginPage() {

    return (
        <Box className={ui.mainBox}>
            <Container sx={{ marginTop: "15%" }}>
                <Image
                    src={{
                        src: "/images/gnerd_logo.png",
                        width: "280",
                        height: "115",
                    }}
                    alt="gnerd_logo.png"
                />
                <Typography
                    fontSize="clamp(1.3em, 1.3em, 1.3em)"
                    color="#4285F4"
                    marginTop='-40px'
                    marginLeft='180px'
                    fontWeight='bold'
                >Admin
                </Typography>
            </Container>

            <Typography fontSize="24px" marginTop="15%">
                Bienvenido de nuevo
            </Typography>
            <Typography
                fontSize="15px"
                color={Palette.darkGrey}
                marginTop="10px"
            >
                Ingresa tus credenciales
            </Typography>
            <AdminLoginForm />
        </Box>
    );
}

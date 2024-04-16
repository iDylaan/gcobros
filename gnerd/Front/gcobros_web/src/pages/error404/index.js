import { Box, Link, Stack, Typography } from "@mui/material";
import Navbar from "../../components/navbar/navbar_acces_denied/navbar";
import ui from "./index.module.css";

function login() {
    router.push('/')
}

export default function Error404() {
    return (
        <>
            <Navbar />
            <Stack className={ui.mainStack} direction="row">
                <Box className={ui.mainBox}>
                    <Stack spacing={2}>
                        <Typography className={ui.title}>404</Typography>
                        <Typography className={ui.description}>Lo sentimos, no encontramos la página a la que desea acceder</Typography>
                        <Link className={ui.link} underline="none" onClick={login}><Typography className={ui.linkText}>VOLVER AL INICIO</Typography></Link>
                    </Stack>
                </Box>
            </Stack>
        </>
    )
}
import { useRouter } from "next/router";
import { Box, Link, Stack, Typography, Button } from "@mui/material";
import Navbar from "../../../components/navbar/navbar_acces_denied/navbar";
import ui from "./index.module.css";

export default function ErrorPage() {
  const router = useRouter();
  return (
    <>
      <Navbar />
      <Stack className={ui.mainStack} direction="row">
        <Box className={ui.mainBox} sx={{ marginLeft: 2, marginRight: 2 }}>
          <Stack spacing={2}>
            <Typography className={ui.title}>Acceso denegado</Typography>
            <Typography className={ui.description}>
              Lo sentimos, no encontramos una cuenta registrada con G Nerd
            </Typography>
            <Link className={ui.link} underline="none" onClick={() => {
              router.push("/");
            }}>
              <Button variant="text" className={ui.linkText}>VOLVER AL INICIO</Button>
            </Link>
          </Stack>
        </Box>
      </Stack>
    </>
  )
}
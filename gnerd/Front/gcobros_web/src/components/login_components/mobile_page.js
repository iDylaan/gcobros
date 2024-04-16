import { Button, Typography, Stack, Box, Link } from "@mui/material";
import Image from "next/image";
import React from "react";
import Palette from "../../constants/palette.js"
import GoogleSingInButton from "../google_sign_in.js/google_sign_in.js";
import ui from "./index.module.css"

export default function MobileLoginPage() {

  return (
    <Box className={ui.mainBox}>
        <Image
          src={{
            src: "/images/gnerd_logo.png",
            width: "250",
            height: "105",
          }}
          alt="gnerd_logo.png"
        />

        <Typography fontSize="24px" marginTop="15%">
          Bienvenido de nuevo
        </Typography>
        <Typography
          fontSize="15px"
          color={Palette.darkGrey}
          marginTop="10px"
        >
          Conéctate con tu cuenta de Google para ingresar.
        </Typography>
        <GoogleSingInButton />
        <Typography
          variant="subtitle2"
          color={Palette.darkGrey}
          paddingTop="130px"
          maxWidth="450px"
        >
          Sé más eficiente con herramientas de productividad empresarial y
          colaboración.
        </Typography>
        <Link href="https://www.gnerd.mx/" fontWeight="bold" marginTop="35px">
          Conocenos y aumenta tu rendimiento.
        </Link>
    </Box>
  );
}

import React from "react";
import Palette from "../../constants/palette";
import { Box, Button, SvgIcon, Typography, useMediaQuery } from "@mui/material";
import { useSession, signIn, signOut } from "next-auth/react";
import ui from "./index.module.css";
import Image from "next/image";

export default function GoogleSingInButton() {
  const screenSize = useMediaQuery("(max-width:300px)")
  return (
    <Box className={ui.mainBox}>
      <Button
        type="button"
        variant="text"
        className={ui.buttonStyle}
        onClick={() => signIn("google", {
          redirect: false,
        })}
      >
          <Image
            className={ui.googleLogo}
            src="https://authjs.dev/img/providers/google.svg"
            alt="google_logo"
            width="28"
            height="28"
          />
          {screenSize ? null : <Typography className={ui.textButton} >
            Conectarse con Google
          </Typography>}
      </Button>
    </Box>
  );
}

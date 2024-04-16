import React, { useEffect } from "react";
import {
  Box,
  Avatar,
  Container,
  Typography,
  useMediaQuery,
} from "@mui/material";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import ui from "./index.module.css";

import MobileNavbar_Acces_Denied from "../navbar_acces_denied/mobile/mobile_navbar";


export default function Navbar_Acces_Denied() {
  const isMobileScreen = useMediaQuery("(max-width: 1000px)");
  const router = useRouter();


  return isMobileScreen ? (
    <MobileNavbar_Acces_Denied />
  ) : (
    <Box className={ui.mainBox}>
      <Box marginLeft="50px">
        <Image
          alt="gnerd_logo"
          src="/images/gnerd_logo.png"
          width="149"
          height="62"
          sx={{ cursor: "pointer" }}
          className={ui.logo}
        />
      </Box>
    </Box>
  );
}

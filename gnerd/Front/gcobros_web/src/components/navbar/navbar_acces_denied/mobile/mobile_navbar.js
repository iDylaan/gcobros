import { useEffect, useState } from "react";
import {
  Box,
} from "@mui/material";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
import ui from "./index.module.css";
import { MenuRounded } from "@mui/icons-material";

export default function MobileNavbar_Acces_Denied(userInfo) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const router = useRouter();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function dashboard() {
    router.push("/dashboard");
  }

  return (
    <Box className={ui.mainBox}>
      <Image
        alt="gnerd_logo"
        src="/images/gnerd_logo.png"
        width="149"
        height="62"
        onClick={dashboard}
        className={ui.logo}
      />
    </Box>
  );
}

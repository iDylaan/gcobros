import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
import ui from "./index.module.css";
import { MenuRounded } from "@mui/icons-material";

export default function MobileNavbar(userInfo) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const { data } = useSession();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function dashboard() {
    router.push(data.user.isAdmin ? "/admin" : "/dashboard");
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
      <IconButton
        className={ui.containerIcon}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MenuRounded className={ui.menuIcon} />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            signOut("google");
          }}
        >
          <Typography fontSize="1rem">Cerrar sesión</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}
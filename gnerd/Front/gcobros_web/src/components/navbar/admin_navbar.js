import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    useMediaQuery,
    Button
} from "@mui/material";
import Palette from "../../constants/palette.js";
import Image from "next/image";
import { useRouter } from "next/router";
import ui from "./index.module.css";
import MobileNavbar from "./mobile/mobile_navbar.js";
import { getAdminData, jwtLogout } from "../../helper/jwt.js";

export default function AdminNavbar() {
    const isMobileScreen = useMediaQuery("(max-width: 1000px)");
    const router = useRouter();
    const [user, setUser] = useState(null);


    useEffect(() => {
        const userData = getAdminData();
        if (!userData) { adminSignIn() }
        else { setUser(userData) }
    }, []);

    function adminSignIn() {
        router.push("/admin_signin");
    }
    function admin() {
        router.push("/admin");
    }
    function logout() {
        jwtLogout();
        router.push("/admin_signin");
    }

    return isMobileScreen ? (
        <MobileNavbar />
    ) : (
        <Box className={ui.mainBox}>
            <Box marginLeft="50px">
                <Image
                    alt="gnerd_logo"
                    src="/images/gnerd_logo.png"
                    width="149"
                    height="62"
                    onClick={admin}
                    className={ui.logo}
                />
            </Box>
            <Box className={ui.profileBox}>
                <Box marginRight="60px">
                    <Typography fontSize="18px">{user?.name}</Typography>
                    <Typography fontSize="15px" color={Palette.grey}>
                        {user?.email}
                    </Typography>
                    <Button
                        size="small"
                        sx={{ width: 1, marginTop: '5px' }}
                        variant="outlined"
                        onClick={logout}
                    >
                        Cerrar Sesión
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

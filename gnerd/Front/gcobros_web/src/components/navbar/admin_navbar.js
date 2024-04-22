import React, { useEffect } from "react";
import {
    Box,
    Typography,
    useMediaQuery,
} from "@mui/material";
import Palette from "../../constants/palette.js";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import ui from "./index.module.css";
import ProfileAvatar from "../avatar/avatar.js";
import MobileNavbar from "./mobile/mobile_navbar.js";

export default function AdminNavbar() {
    const isMobileScreen = useMediaQuery("(max-width: 1000px)");
    const router = useRouter();
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            router.push("/admin_signin");
        }
    });

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);

    if (status === "loading") {
        return <div>Cargando...</div>;
    }

    function admin() {
        router.push("/admin");
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
                {/* <ProfileAvatar userInfo={session}/> */}
                <Box marginRight="60px">
                    <Typography fontSize="18px">{session?.user?.name}</Typography>
                    <Typography fontSize="15px" color={Palette.grey}>
                        {session?.user?.email}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}

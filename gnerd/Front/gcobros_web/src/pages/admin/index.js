import React, { useState } from "react";

import { Box, Stack, Typography } from "@mui/material";
import Palette from "../../constants/palette.js";
import AdminNavbar from "../../components/navbar/admin_navbar.js";
import LoadingPage from "../../components/loading/index.js";
import BalanceCard from "../../components/balance_card/balance_card.js";
import { useEffect } from "react";
import { useRouter } from "next/router";


export default function adminDashboard() {

    return (
        <Stack>
            <AdminNavbar />
            <Box bgcolor={Palette.primary} height="180px">
                
            </Box>
            <Box bgcolor={Palette.boneWhite}></Box>
        </Stack>
    );
}
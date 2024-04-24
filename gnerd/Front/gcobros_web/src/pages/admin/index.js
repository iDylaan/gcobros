import React, { useState } from "react";

import { Box, Stack, Typography } from "@mui/material";
import Palette from "../../constants/palette.js";
import AdminNavbar from "../../components/navbar/admin_navbar.js";

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
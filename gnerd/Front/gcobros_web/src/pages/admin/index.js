import React, { useState, useEffect } from "react";

import { Box, Stack, Typography } from "@mui/material";
import Palette from "../../constants/palette.js";
import Navbar from "../../components/navbar/navbar.js";
import getCustomers from "../api/customers/getCustomers.js";

export default function adminDashboard() {

    const [customers, setCustomers] = useState(null);
    useEffect(() => {
        async function getEffectCustomers() {
            try {
                const customersData = await getCustomers();
                if (customersData) {
                    setCustomers(customersData);
                } else {
                    setCustomers([]);
                }
                console.log(customersData);
            } catch (error) {
                setCustomers([]);
                console.error(error);       
            }
        }

        getEffectCustomers();
    }, []);
    return (
        <Stack>
            <Navbar />
            <Box bgcolor={Palette.primary} height="180px">
                <Typography>
                </Typography>
            </Box>
            <Box bgcolor={Palette.boneWhite}></Box>
        </Stack>
    );
}
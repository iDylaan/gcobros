import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack"
//ICONS
import ErrorIcon from '@mui/icons-material/Error';

//Others
import Navbar from "../../components/navbar/navbar";
import ui from "./index.module.css";
import {useState, useEffect} from "react";
import { useRouter } from "next/router";

export default function PaymentPage() {
    const [message, setMessage] = useState(0);
    const router = useRouter();
    
  return (
    <Stack className={ui.mainBox}>
      <Navbar />
      <Box className={ui.mainCardSectionBox}>
        <Box className={ui.cardBox}>
          <Box className={ui.headerCardBox}>
            <Box className={ui.iconBox}>
              <ErrorIcon className={ui.doneIcon}/>
            </Box>
          </Box>
          <Stack className={ui.mainContentCardBox}>
            <Typography className={ui.successPaymentText}>Error al realizar el pago</Typography>
            <Typography className={ui.paymentProcessText}>Lo sentimos, ha ocurrido un error al procesar el pago.<br /> Favor, inténtalo más tarde.</Typography>
            <Button variant="contained" className={ui.buttonStyle} onClick={() => {router.replace("./dashboard")}}>
              <Typography textTransform="none" fontSize="16px" letterSpacing="0.10rem">Volver al inicio</Typography>
            </Button>
          </Stack>
        </Box>
      </Box>
    </Stack>
  );
}

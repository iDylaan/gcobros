import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack"
//ICONS
import DoneRounded from "@mui/icons-material/DoneRounded";

//Others
import Palette from "../../constants/palette"
import Navbar from "../../components/navbar/navbar";
import ui from "./index.module.css";
import {useState, useEffect} from "react";
import { useRouter } from "next/router";

import { readTransactionById } from "../api/transactions/transactionApi";

//* Currency formatter
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function PaymentPage() {
  const router = useRouter();
  const [amount, setAmount] = useState(0.0);

  useEffect(() => {

    if (!router.isReady) {
      return;
    }

    readTransactionById(router?.query?.id).then((result) => {
      if (result === null) {
        return router.replace('./dashboard');
      }
      setAmount(result.amount);
    })

  }, [router])

  const goToDashboard = () => {
    router.replace('./dashboard');
  }

  return (
    <Stack className={ui.mainBox}>
      <Navbar />
      <Box className={ui.mainCardSectionBox}>
        <Box className={ui.cardBox}>
          <Box className={ui.headerCardBox}>
            <Box className={ui.iconBox}>
              <DoneRounded className={ui.doneIcon}/>
            </Box>
          </Box>
          <Stack className={ui.mainContentCardBox}>
            <Typography className={ui.successPaymentText}>Pago exitoso</Typography>
            <Typography className={ui.paymentProcessText}>El pago a sido procesado correctamente</Typography>
            <Typography className={ui.paymentAmountDescriptionText}>Monto de pago</Typography>
            <Typography className={ui.paymentAmount}>{formatter.format(amount / 100)}</Typography>
            <Button variant="contained" className={ui.buttonStyle} onClick={goToDashboard}>
              <Typography textTransform="none" fontSize="16px" letterSpacing="0.10rem">Volver al inicio</Typography>
            </Button>
          </Stack>
        </Box>
      </Box>
    </Stack>
  );
}

import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Palette from "../../../constants/palette";
import ui from "./index.module.css";
import MobileTransactionCard from "../../transaction_card/mobile/transaction_card_mobile";
import { useRouter } from "next/router.js";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function MobileBalanceCard({ toPay, lastPaymentText, customerId, domain }) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const { data, status } = useSession();

  function payment() {
    router.push("/payment_details");
  }

  return (
    <Stack className={ui.mainBox}>
      <Box className={ui.balanceCardBox}>
        <Stack className={ui.infoBox} spacing={2}>
          <Typography fontSize="20px" fontWeight="700">
            Su saldo
          </Typography>
          <Typography fontSize="30px" fontWeight="700">
            {toPay}
          </Typography>
          <Box className={ui.buttonBox}>
            <Button
              className={ui.buttonStyle}
              variant="contained"
              onClick={payment}
            >
              <Typography className={ui.textButton}>Pagar ahora</Typography>
            </Button>
          </Box>
          <Box className={ui.lastPaymentBox}>
            <Typography fontSize="15px" color={Palette.grey} width="95%">
            {lastPaymentText} MXN {toPay}
            </Typography>
          </Box>
        </Stack>
      </Box>
      <MobileTransactionCard customerId={customerId} domain={domain}/>
    </Stack>
  );
}

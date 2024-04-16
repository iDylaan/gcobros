import React from "react";
import {
  Box,
  Typography,
  Stack,
  Container,
  Button,
  useMediaQuery,
} from "@mui/material";
import Palette from "../../constants/palette";
import { CalendarMonth } from "@mui/icons-material";
import TransactionCard from "../transaction_card/transaction_card";
import ui from "./index.module.css";
import MobileBalanceCard from "./mobile/balance_card_mobile";
import { useRouter } from "next/router.js";
import { useSession } from "next-auth/react";

import { getTestApi, getDSData } from "../../pages/api/testing/testApi";

import { useState, useEffect } from "react";
import { epochToDate } from "../../helper/dateFormatter";
import { readLastPaymentTransaction } from "../../pages/api/transactions/transactionApi";

export default function BalanceCard({
  toPay,
  subscription,
  customerId,
  domain,
}) {
  const router = useRouter();
  const isMobileScreen = useMediaQuery("(max-width: 1000px)");
  const [lastPaymentText, setLastPaymentText] = useState(null);
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const goToDetailsPage = () => {
    router.push({
      pathname: `/payment_details`,
    });
  };

  useEffect(() => {
    
    if (!domain) {
      return;
    }

    readLastPaymentTransaction(domain).then((result) => {
      if (result === null) {
        return setLastPaymentText(null);
      }

      const date = epochToDate(result.created);
      setLastPaymentText(`Su último pago se realizó el ${date}, por un importe de`);
    })
  }, [domain]);

  return isMobileScreen ? (
    //MOBILE VERSION
    <MobileBalanceCard
      customerId={customerId}
      toPay={formatter.format(toPay)}
      domain={domain}
      lastPaymentText={lastPaymentText}
    />
  ) : (
    //DESKTOP VERSION
    <Box className={ui.mainBox}>
      <Box className={ui.balanceCardBox}>
        <Box className={ui.yourBalanceSection}>
          <Typography fontSize="25px" fontWeight="700">
            Su saldo
          </Typography>
          <Typography fontSize="35px" fontWeight="700">
            {`MXN ${formatter.format(toPay)}`}
          </Typography>
        </Box>
        <Box className={ui.showDetailsSection}>
          <Box display="flex">
            <CalendarMonth sx={{ color: Palette.grey }} />
            <Typography className={ui.lastPayment}>
              {lastPaymentText === null
                ? "Todavía no se tiene un último pago registrado"
                : `${lastPaymentText} MXN ${formatter.format(toPay)}`}
            </Typography>
          </Box>
          <Button
            className={ui.showDetailsButton}
            variant="contained"
            onClick={goToDetailsPage}
          >
            <Typography fontSize="15px" fontWeight="700">
              Ver detalle
            </Typography>
          </Button>
        </Box>
      </Box>
      <TransactionCard domain={domain} />
    </Box>
  );
}

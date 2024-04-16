import {
  Stack,
  Typography,
  Box,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import ui from "./index.module.css";
import GooglePayButton from "@google-pay/button-react";
import MobileNavbar from "../navbar/mobile/mobile_navbar";
import { getPaymentData } from "../../pages/api/testing/testApi";
import { useState, useEffect } from "react";
import Palette from "../../constants/palette";
import { epochToDate, epochToPeriod } from "../../helper/dateFormatter";
import { currencyFormatter } from "../../helper/currencyFormatter"
import { useRouter } from "next/router";
import { createPaymentInStripe } from "../../pages/api/stripe/stripeApi";
import { paymentStatus } from "../../constants/constants.js";

const tokenizationSpecification = {
  type: "PAYMENT_GATEWAY",
  parameters: {
    gateway: "stripe",
    "stripe:version": "2018-10-31",
    "stripe:publishableKey": `${process?.env?.STRIPE_PK}`,
  },
};

export default function Payment_Details_Mobile({
  totalPrice,
  subscriptionsRow,
  email,
  today,
}) {
  //* Next Router
  const router = useRouter();

  // on load paymenth data from google pay button response
  const onLoadPaymentData = (paymentRequest) => {
    if (!paymentRequest?.paymentMethodData?.tokenizationData?.token) {
      return;
    }

    createPaymentInStripe({ customerEmail: email, paymentRequest }).then(
      (result) => {
        if (result.status !== paymentStatus.failed) {
          return router.replace({
            pathname: "./payment_success",
            query: { id: result.id },
          });
        }
      }
    );
  };

  // On error google pay
  const onError = (paymentError) => {
    //* When error ocurred
    console.log("Payment error data: ", paymentError);
    return router.replace("./payment_error");
  };

  // on canceled google payment
  const onCancel = (paymentCanceled) => {
    //* When user close the Google Pay Dialog
  };

  return (
    <Stack spacing={5} className={ui.mainContainer}>
      <MobileNavbar />
      <Typography variant="h6" paddingLeft="20px" align="center">
        Detalle de pago
        <span style={{ color: Palette.primary }}>{` "${email?.split("@").pop()}"`}</span>
      </Typography>
      <Box className={ui.subscriptionsTable}>
        <TableContainer className={ui.tableRadius}>
          <Table aria-label="customized table">
            <TableBody>
              <TableRow className={ui.colorCellBlue} >
                <TableCell className={ui.cellBlueText} colSpan={2}>
                  {epochToPeriod(today)}
                </TableCell>
              </TableRow>
              <TableRow className={ui.colorCellF9}>
                <TableCell align="center">Detalle</TableCell>
                <TableCell align="center">Importe {}</TableCell>
              </TableRow>
              {subscriptionsRow.map((sub) => {
                return (
                  <TableRow key={sub.id} className={ui.colorCellF6}>
                    <TableCell sx={{ color: "#6F6F6F" }} align="center">
                      {`${sub.productName}: Uso de ${sub.lisencesNumber} usuarios`}
                    </TableCell>
                    <TableCell align="center">{`MXN ${currencyFormatter.format(
                      sub.totalToPay
                    )}`}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Typography variant="h6" paddingLeft="20px" align="center">
        Total a pagar
      </Typography>
      <Box className={ui.totalTable}>
        <TableContainer className={ui.tableRadius}>
          <Table aria-label="customized table">
            <TableBody>
              <TableRow className={ui.colorCellF6}>
                <TableCell align="center">Sub Total</TableCell>
                <TableCell align="center">{currencyFormatter.format(totalPrice)}</TableCell>
              </TableRow>
              <TableRow className={ui.colorCellF1}>
                <TableCell align="center">IVA</TableCell>
                <TableCell align="center">{currencyFormatter.format(totalPrice * .16)}</TableCell>
              </TableRow>
              <TableRow className={ui.colorCellF6}>
                <TableCell align="center">Total</TableCell>
                <TableCell align="center">{currencyFormatter.format(totalPrice * 1.16)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <GooglePayButton
                  className={ui.googleButtonStyle}
                  buttonSizeMode="fill"
                  environment="TEST"
                  paymentRequest={{
                    apiVersion: 2,
                    apiVersionMinor: 0,
                    allowedPaymentMethods: [
                      {
                        type: "CARD",
                        parameters: {
                          allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                          allowedCardNetworks: ["MASTERCARD", "VISA"],
                          billingAddressRequired: true,
                          billingAddressParameters: {
                            phoneNumberRequired: true,
                          }
                        },
                        tokenizationSpecification,
                      },
                    ],
                    merchantInfo: {
                      merchantId: "12345678901234567890",
                      merchantName: "G Nerd",
                    },
                    transactionInfo: {
                      totalPriceStatus: "FINAL",
                      totalPriceLabel: "Total",
                      totalPrice: `${totalPrice}`,
                      currencyCode: "MXN",
                      countryCode: "MX",
                    },
                    emailRequired: true,
                    shippingAddressRequired: true,
                    shippingAddressParameters: {
                      phoneNumberRequired: true,
                    }
                  }}
                  onLoadPaymentData={(paymentRequest) => onLoadPaymentData(paymentRequest)}
                  onError={(paymentError) => onError(paymentError)}
                  onCancel={(paymentCanceled) => onCancel(paymentCanceled)}
                />
    </Stack>
  );
}

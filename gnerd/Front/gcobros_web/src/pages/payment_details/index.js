//Mui material
import {
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Stack,
  Typography,
  Box,
  TableCell,
  Grid,
  useMediaQuery,
  Divider,
} from "@mui/material";
//Components
import Navbar from "../../components/navbar/navbar.js";
import Payment_Details_Mobile from "../../components/payment_details_mobile/payment_details_mobile.js";
//CSS
import ui from "./index.module.css";

//SPECIAL
import GooglePayButton from "@google-pay/button-react";

import { useState, useEffect } from "react";
import { useRouter } from "next/router.js";
import { useSession } from "next-auth/react";
import { readAllSubscriptionsByCustomerDomain } from "../api/subscriptions/subscription_api.js";
import Palette from "../../constants/palette.js";
import { readProductBySkuId } from "../api/products/product_api.js";
import { createPaymentInStripe } from "../api/stripe/stripeApi.js";
import { paymentStatus } from "../../constants/constants.js";
import { epochToPeriod } from "../../helper/dateFormatter.js";

const tokenizationSpecification = {
  type: "PAYMENT_GATEWAY",
  parameters: {
    gateway: "stripe",
    "stripe:version": "2018-10-31",
    "stripe:publishableKey": `${process?.env?.STRIPE_PK}`,
  },
};

export default function Payment_Details() {
  //* Next Router
  const router = useRouter();

  //? Page parameters
  const [domain, setDomain] = useState("");
  const [subscriptionsRow, setSubscriptionsRow] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0.0);
  const [transactionId, setTransactionId] = useState("");
  const today = new Date().getTime() / 1000;

  //* ScreenSize
  const isMobileScreen = useMediaQuery("(max-width: 1016px)");

  //* Currency formatter
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  //* Nexu Auth => Google Session
  const { data, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  });

  //* Stripe config

  useEffect(() => {
    if (status !== "authenticated") {
      return;
    }

    // Setting domain customer, example "iconos.mx"
    setDomain(data?.user?.email?.split("@").pop());

    if (domain.length < 1) {
      return
    }

    // Reading all customer subscriptions
    readAllSubscriptionsByCustomerDomain(domain).then(
      (customerSubscriptions) => {
        let totalAllSubscriptions = 0.0;

        // Waiting all responses to sum the values
        Promise.all(
          customerSubscriptions.map(async (subscription) => {
            const product = await readProductBySkuId(subscription.skuId);

            totalAllSubscriptions += subscription.totalToPay;

            return {
              id: subscription.id,
              productName: product.productName,
              lisencesNumber: subscription.seats_licensedNumberOfSeats,
              totalToPay: subscription.totalToPay,
            };
          })
        ).then((data) => {
          setSubscriptionsRow(data);
          setTotalPrice(totalAllSubscriptions);
        });
      }
    );
  }, [status, domain, data]);

  // on load paymenth data from google pay button response
const onLoadPaymentData = (paymentRequest) => {
  if (!paymentRequest?.paymentMethodData?.tokenizationData?.token) {
    return;
  }

  console.log(paymentRequest);

  createPaymentInStripe({ customerEmail: data?.user?.email, paymentRequest }).then((result) => {
    if (result.status !== paymentStatus.failed) {
      return router.replace({pathname: './payment_success', query: {id: result.id}});
    }
  });
};

// On error payment
const onError = (paymentError) => {
  //! When error ocurred
  console.log("Payment error data: ", paymentError);
  return router.replace('./payment_error')
}

// on canceled payment
const onCancel = (paymentCanceled) => {
  //* When user close the Google Pay Dialog
}

  return (
    <>
      {isMobileScreen ? (
        <Payment_Details_Mobile totalPrice={totalPrice} subscriptionsRow={subscriptionsRow} email={data?.user?.email} today={today}/>
      ) : (
        <Stack>
          <Navbar></Navbar>
          <Grid container spacing={4}>
            <Grid item xs={8}>
              <Box sx={{ paddingTop: 5, paddingLeft: 5 }}>
                <Typography className={ui.titlePadding} variant="h5">
                  Detalle de pago
                  <span
                    style={{ color: Palette.primary }}
                  >{` "${domain}"`}</span>
                </Typography>
                <TableContainer className={ui.tableRadius}>
                  <Table sx={{}} aria-label="customized table">
                    <TableBody>
                      <TableRow className={ui.colorCellBlue}>
                        <TableCell colSpan={2}>
                          <Typography
                            fontSize="20px"
                            color={Palette.white}
                            marginY=".3rem"
                          >
                            {epochToPeriod(today)}
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow className={ui.colorCellF9}>
                        <TableCell align="center">Detalle</TableCell>
                        <TableCell align="center">Importe</TableCell>
                      </TableRow>
                      {subscriptionsRow.map((data) => {
                        return (
                          <TableRow key={data.id} className={ui.colorCellF6}>
                            <TableCell
                              width="50%"
                              align="center"
                            >{`${data.productName}: Uso de ${data.lisencesNumber} usuarios`}</TableCell>
                            <TableCell
                              width="50%"
                              align="center"
                            >{`MXN ${formatter.format(
                              data.totalToPay
                            )}`}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ paddingRight: 5, paddingTop: 11 }}>
                <Typography className={ui.titlePadding} variant="h5">
                  Total a pagar
                </Typography>
                <TableContainer className={ui.tableRadius}>
                  <Table sx={{}} aria-label="customized table">
                    <TableBody>
                      <TableRow className={ui.colorCellF6}>
                        <TableCell align="center">Sub Total</TableCell>
                        <TableCell align="center">
                          {formatter.format(totalPrice)}
                        </TableCell>
                      </TableRow>
                      <TableRow className={ui.colorCellF1}>
                        <TableCell align="center">IVA</TableCell>
                        <TableCell align="center">
                          {formatter.format(totalPrice * 0.16)}
                        </TableCell>
                      </TableRow>
                      <TableRow className={ui.colorCellF6}>
                        <TableCell align="center">Total</TableCell>
                        <TableCell align="center">
                          {formatter.format(totalPrice * 1.16)}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                <Divider sx={{ paddingTop: "20px" }} />
                <GooglePayButton
                  className={ui.googleButtonStyle}
                  buttonSizeMode="fill"
                  environment="TEST"
                  buttonLocale="es"
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
              </Box>
            </Grid>
          </Grid>
        </Stack>
      )}
    </>
  );
}

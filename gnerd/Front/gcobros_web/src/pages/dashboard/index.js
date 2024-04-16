import React, { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import Palette from "../../constants/palette.js";
import Navbar from "../../components/navbar/navbar.js";
import BalanceCard from "../../components/balance_card/balance_card.js";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import LoadingPage from "../../components/loading/index.js";
import { readAllSubscriptionsByCustomerDomain } from "../api/subscriptions/subscription_api.js";

export default function DashboardClient() {
  const router = useRouter();
  const [domainSubscriptions, setDomainSubscriptions] = useState([]);
  const [toPay, setToPay] = useState(0);
  const [customerId, setCustomerId] = useState("");

  const [userDomain, setUserDomain] = useState("");
  const { data, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  });

  useEffect(() => {
    if (status !== "authenticated") {
      return;
    }

    setUserDomain(data?.user?.email?.split("@").pop());

    if (userDomain.length < 1 ) {
      return;
    }

    readAllSubscriptionsByCustomerDomain(userDomain).then((subscriptions) => {
      if (subscriptions === null) {
        return;
      }

      // Saving all subscriptions for logged domain
      setDomainSubscriptions(subscriptions);

      let totalPorPagar = 0;
      for (const customerSub of subscriptions) {
        totalPorPagar += customerSub?.totalToPay;
      }

      setToPay(totalPorPagar);
      setCustomerId(subscriptions[0].customerId);
    });
  }, [data, status, userDomain]);

  if (status === "loading") {
    return <LoadingPage />;
  }

  return (
    <Stack>
      <Navbar />
      <Box bgcolor={Palette.primary} height="180px">
        <BalanceCard
          domain={userDomain}
          subscriptions={domainSubscriptions}
          toPay={toPay}
          customerId={customerId}
        />
      </Box>
      <Box bgcolor={Palette.boneWhite}></Box>
    </Stack>
  );
}

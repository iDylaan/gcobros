import { SessionProvider } from "next-auth/react";
import "../../index.css";
import LoadingPage from "../components/loading";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(`${process.env.STRIPE_API_KEY}`);

function Auth({ children }) {
  const { status } = useSession({ required: true })

  if (status === "loading") {
    return <LoadingPage />
  }

  return children
}

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider>
        {Component.auth ? (
          <Auth>
            <Elements stripe={stripePromise}>
              <Component {...pageProps} />
            </Elements>
          </Auth>
        ) : (
          <Elements stripe={stripePromise}>
            <Component {...pageProps} />
          </Elements>
        )}
    </SessionProvider>
  );
}

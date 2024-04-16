import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { getAllDomains } from "../subscriptions/subscription_api";

export const authOptions = {
  site: process.env.NEXTAUTH_URL,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "online",
          response_type: "code",
          redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URIS
        },
      },
    }),
  ],
  pages: {
    error: "/auth/error",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    signIn: async ({ account, profile }) => {
      if (account.provider !== "google") {
        return false;
      }
      try {
        const allAllowedDomains = await getAllDomains();
        return allAllowedDomains.some(domain => profile.email.endsWith(domain.customerDomain));
      } catch (error) {
        console.error("Error fetching allowed domains:", error);
        return false;
      }
    },
    jwt: async ({ token, account }) => {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.accessToken = token.accessToken;
      return session;
    },
  },
  debug: process.env.NODE_ENV === 'development',
};

export default NextAuth(authOptions);

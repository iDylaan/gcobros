import NextAuth from "next-auth/next";
import Google from "next-auth/providers/google";
import { getAllDomains } from "../subscriptions/subscription_api";

export const authOptions = {
  debug: process.env.NODE_ENV === 'development',
  site: process.env.NEXTAUTH_URL,
  providers: [
    Google({
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
    signIn: "/",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    signIn: async ({ account, profile }) => {
      if (account.provider !== "google") {
        return false;
      }
      try {
        return true;
        const allAllowedDomains = await getAllDomains();
        return allAllowedDomains.some(domain => profile.email.endsWith(domain.customerDomain));
      } catch (error) {
        console.error("Error fetching allowed domains:", error);
        return false;
      }
    },
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token
        token.id = profile.id
      }
      return token
    },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken
      session.user.id = token.id
      return session
    }
  },
};

export default NextAuth(authOptions);

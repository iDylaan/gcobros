import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { getAllDomains } from "../subscriptions/subscription_api";

export const authOptions = {
  //Configure one or more authentication providers
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
          redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URIS || 'https://gcobros-web.wn.r.appspot.com/api/auth/callback/google',
        },
      },
    }),
    //... add more providers here
  ],
  pages: {
    error: "/auth/error/error",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    signIn: async (user) => {
      try {
        const allAllowedDomains = await getAllDomains();
        if (user.account.provider === "google") {
          for (const domain of allAllowedDomains) {
            if (user.profile.email.endsWith(domain.customerDomain)) {
              return Promise.resolve(true);
            }
          }
        } else {
          return Promise.resolve(false);
        }
        return Promise.resolve(false);
      } catch (error) {
        return Promise.resolve(false);
      }
    },
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      return session;
    },
  },
};

export default NextAuth(authOptions);

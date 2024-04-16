/** @type {import('next').NextConfig} */

const env = {};

function setDataEnv() {
  // ! DEVELOPMENT ENVIRONMENT
  if (process.env.NEXT_ENV == "development") {
    env.GOOGLE_CLIENT_ID =
      "143517617629-f6ta1djt0fo06k6pc0a6f996isbleokr.apps.googleusercontent.com";
    env.GOOGLE_CLIENT_SECRET = "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";
    env.NEXTAUTH_SECRET = "ULTRA-SECRET-WORD";
    env.NEXT_PUBLIC_HOST = "http://localhost:3001";
    env.NEXT_PUBLIC_GOOGLE_REDIRECT_URIS = "http://localhost:3000/api/auth/callback/google";
    env.STRIPE_PK = "pk_test_51N1jpfHkwX01JOjZiMHM6eUWy82wNZjCTR1UxgMIZ9zPcZiWBHDIe2xU2pydYoUuzoebP01l5vzZRo09Tzr9um73005jSKzaoO",
    env.STRIPE_SK = "sk_test_51N1jpfHkwX01JOjZV2mjMA29IAkCUvISbmMmWj8Pu7dUA8chjoAmKTOPplP8DYE8yyWZ2EzFqwArx31pKnWnpdVM00m8CxLGGO"
  }

  // ! PRODUCTION ENVIRONMENT
  if (process.env.NEXT_ENV == "production") {
    env.GOOGLE_CLIENT_ID =
      "143517617629-f6ta1djt0fo06k6pc0a6f996isbleokr.apps.googleusercontent.com";
    env.GOOGLE_CLIENT_SECRET = "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";
    env.NEXTAUTH_SECRET = "ULTRA-SECRET-WORD";
    env.NEXT_PUBLIC_HOST = "https://server-dot-gcobros-web.wn.r.appspot.com";
    env.NEXT_PUBLIC_GOOGLE_REDIRECT_URIS = "https://clientes.gnerd.mx/api/auth/callback/google";
    env.STRIPE_PK = "pk_test_51N1jpfHkwX01JOjZiMHM6eUWy82wNZjCTR1UxgMIZ9zPcZiWBHDIe2xU2pydYoUuzoebP01l5vzZRo09Tzr9um73005jSKzaoO",
    env.STRIPE_SK = "sk_test_51N1jpfHkwX01JOjZV2mjMA29IAkCUvISbmMmWj8Pu7dUA8chjoAmKTOPplP8DYE8yyWZ2EzFqwArx31pKnWnpdVM00m8CxLGGO"
  }

  // ! CUSTOMER ENVIRONMENT
  if (process.env.NEXT_ENV == "custom") {
    env.GOOGLE_CLIENT_ID = process.env.G_CLIENT_ID;
    env.GOOGLE_CLIENT_SECRET = process.env.G_CLIENT_SECRET;
    env.NEXTAUTH_SECRET = process.env.NA_SECRET;
    env.NEXT_PUBLIC_HOST = process.env.N_PUBLIC_HOST;
    env.NEXT_PUBLIC_GOOGLE_REDIRECT_URIS = process.env.G_REDIRECT_URIS;
    env.STRIPE_PK = process.env.CUSTOM_STRIPE_PK,
    env.STRIPE_SK = process.env.CUSTOM_STRIPE_SK    
  }
}

setDataEnv();

const nextConfig = {
  staticPageGenerationTimeout: 1000,
  reactStrictMode: true,
  env,
};

module.exports = nextConfig;

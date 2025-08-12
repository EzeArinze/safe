import { db } from "@/db/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as schema from "@/db/schema";
import { nextCookies } from "better-auth/next-js";
import { magicLink } from "better-auth/plugins";
import { resend } from "./resend";
import { env } from "@/types/env/server";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema,
  }),
  socialProviders: {
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SCERET,
    },
  },
  rateLimit: {
    max: 10,
    window: 2 * 60,
  },
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, url }) => {
        await resend.emails.send({
          from: "onboarding@resend.dev",
          to: email,
          subject: `Hello ${email}`,
          html: `<p>Welcome to safe click the link to verify your acount and login <strong>${url}</strong>!</p>`,
        });
      },
    }),
    nextCookies(),
  ],
});

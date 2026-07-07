import { prisma } from "@/lib/prisma";
import { ac, superadmin, user } from "@/lib/permissions";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  plugins: [
    admin({
      ac,
      roles: {
        superadmin,
        user,
      },
      adminRoles: ["superadmin"],
      defaultRole: "user",
    }),
    nextCookies(),
  ],
});

import { ac, superadmin, user } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { admin, emailOTP } from "better-auth/plugins";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      age: {
        type: "string",
        required: false,
      }
    }
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp, type }, ctx) {
        await resend.emails.send({
          from: "CaptionAI <onboarding@resend.dev>",
          to: email,
          subject: "Kode Verifikasi CaptionAI",
          html: `
            <p>Kode verifikasi Anda adalah ${otp}</p>
            <p>Jangan berikan kode ini kepada siapapun.</p>
            <p>Jika Anda tidak meminta kode ini, silakan abaikan email ini.</p>
            <p>Terima kasih.</p>
            <p>CaptionAI</p>
          `,
        })
      }
    }),
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

import { ac, superadmin, user } from "@/lib/permissions";
import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  plugins: [
    adminClient({
      ac,
      roles: {
        superadmin,
        user,
      },
    }),
  ],
});

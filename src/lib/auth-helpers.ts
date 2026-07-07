import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function getSession() {
  return auth.api.getSession({
    headers: await headers(),
  });
}

export function isSuperadmin(role: string | null | undefined) {
  return role === "superadmin";
}

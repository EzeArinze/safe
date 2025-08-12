import "server-only";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function getServerSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const isAuthenticated = !!session?.user;

  return { session, isAuthenticated };
}

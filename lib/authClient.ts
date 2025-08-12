import { env } from "@/types/env/server";
import { createAuthClient } from "better-auth/react";
import { magicLinkClient } from "better-auth/client/plugins";
import { toast } from "sonner";

export const authClient = createAuthClient({
  baseURL: env.BETTER_AUTH_URL,
  plugins: [magicLinkClient()],
  fetchOptions: {
    onError: async (context) => {
      const { response } = context;
      if (response.status === 429) {
        const retryAfter = response.headers.get("X-Retry-After");
        toast.error(`Rate limit exceeded. Retry after ${retryAfter} seconds`);
      }
    },
  },
});

export const { signIn, signUp, useSession, signOut } = authClient;

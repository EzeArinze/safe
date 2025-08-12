// import { z } from "zod";

// export const signInSchema = z.object({
//   email: z.string().min(3, { error: "Email is required" }).trim(),
// });

import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { error: "Email is required" })
    .email({ error: "Invalid email address" }),
});

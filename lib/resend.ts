import { env } from "@/types/env/server";
import { Resend } from "resend";

export const resend = new Resend(env.RESEND_KEY);

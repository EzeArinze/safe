import { LoginForm } from "@/app/auth/_components/login-form";
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="relative bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="absolute top-6 left-8">
        <Link
          href={"/"}
          className={buttonVariants({
            className: "text-3xl font-semibold py-2",
            variant: "outline",
          })}
        >
          <ArrowLeft className="size-4" />
          Back
        </Link>
      </div>

      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}

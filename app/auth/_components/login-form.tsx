"use client";

import { GalleryVerticalEnd, Github, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { signIn } from "@/lib/authClient";
import { toast } from "sonner";
import { useState } from "react";
import { ZodError } from "zod";
import { signInSchema } from "@/helpers/zodSchema/schema";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [signInLoading, setSignInLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    try {
      const resolvedEmail = signInSchema.parse({ email });
      await signIn.magicLink(
        {
          email: resolvedEmail.email,
        },
        {
          onRequest: () => {
            setSignInLoading(true);
          },
          onResponse: () => {
            setSignInLoading(false);
            toast.success("Check your email for the magic link!", {
              description: `We have sent a magic link to your email.`,
            });
          },
          onError: (error) => {
            setSignInLoading(false);
            toast.error("Error signing in:", {
              description: error.error.message,
            });
          },
        }
      );
    } catch (err) {
      if (err instanceof ZodError) {
        setError(err.issues[0].message || "Invalid email address");
      }
    }
  };

  const handleSignInWithProvider = async (provider: AuthProvider) => {
    await signIn.social(
      {
        provider: provider,
        callbackURL: "/",
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onResponse: () => {
          setLoading(false);
        },
        onError: (error) => {
          setLoading(false);
          toast.error("Error signing in:", {
            description: error.error.message,
          });
        },
      }
    );
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-8 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-6" />
              </div>
              <span className="sr-only">Safe.</span>
            </a>
            <h1 className="text-xl font-bold">Welcome to Safe.</h1>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={signInLoading}
              />
            </div>
            {error && <p className="text-red-300 text-xs m-1">{error}</p>}
            <Button
              disabled={loading || signInLoading}
              className="gap-2"
              onClick={handleSignIn}
            >
              {signInLoading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                " Sign-in with Email"
              )}
            </Button>
          </div>
          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-background text-muted-foreground relative z-10 px-2">
              Or
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Button
              variant="outline"
              type="button"
              className="w-full"
              onClick={() => handleSignInWithProvider("github")}
              disabled={loading || signInLoading}
            >
              {loading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <>
                  <Github className="size-16" />
                  Continue with GitHub
                </>
              )}
            </Button>

            <Button
              variant="outline"
              className={cn("w-full gap-2")}
              disabled={loading || signInLoading}
              onClick={() => handleSignInWithProvider("google")}
            >
              {loading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                    fill="currentColor"
                  />
                </svg>
              )}
              Sign in with Google
            </Button>
          </div>
        </div>
      </form>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <Link href="#">Privacy Policy</Link>.
      </div>
    </div>
  );
}

import { ModeToggle } from "@/components/themeToggle";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-20 flex items-center justify-between border-t border-b border-neutral-200 bg-white px-4 py-4 dark:border-neutral-800 dark:bg-black rounded-lg mt-1">
      <div className="flex items-center gap-2">
        <div className="size-7 rounded-full bg-gradient-to-br from-violet-500 to-pink-500" />
        <h1 className="text-base font-bold md:text-2xl">Safe</h1>
      </div>
      <div className="flex items-center justify-between gap-1">
        <ModeToggle />
        <Link
          href={"/auth/login"}
          className={buttonVariants({
            variant: "link",
            className:
              " transform rounded-lg font-medium transition-all duration-300 hover:-translate-y-0.5 ",
          })}
        >
          Login
        </Link>
      </div>
    </nav>
  );
};

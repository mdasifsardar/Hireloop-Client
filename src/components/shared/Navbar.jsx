"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, LogOut } from "lucide-react";
import { cn } from "cn";

import logo from "@/app/images/logo.png";
import { buttonVariants } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { authClient } from "@/lib/auth-client";

const navLinks = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/companies" },
  { label: "Pricing", href: "/pricing" },
];

const signInClasses = cn(
  buttonVariants({
    variant: "ghost",
    className:
      "h-[58px] rounded-[12px] px-6 text-[18px] font-semibold text-[#5c53fe] shadow-[inset_0_3px_10px_rgba(255,255,255,0.2)] hover:bg-white/5 hover:text-[#5c53fe]",
  }),
);

const signOutClasses = cn(
  buttonVariants({
    variant: "ghost",
    className:
      "h-[52px] cursor-pointer rounded-[12px] px-5 text-[16px] font-semibold text-white/80 shadow-[inset_0_3px_10px_rgba(255,255,255,0.08)] ring-1 ring-white/10 hover:bg-white/5 hover:text-white disabled:opacity-60",
  }),
);

const getStartedClasses = cn(
  buttonVariants({
    className:
      "h-[52px] rounded-[12px] px-6 text-[18px] font-medium shadow-[inset_0_3px_10px_rgba(255,255,255,0.2)] ring-1 ring-black/10 hover:bg-primary/90",
  }),
);

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const { data: session } = authClient.useSession();
  const user = session?.user;

  if (pathname?.startsWith("/dashboard")) {
    return null;
  }

  const handleSignOut = async () => {
    setSigningOut(true);

    await authClient.signOut();
    setSigningOut(false);
    router.refresh();
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-center">
      <div className="mx-auto flex w-full max-w-[1368px] items-center justify-between px-4 mt-4 sm:px-6 sm:mt-5 bg-[#222222] rounded-2xl backdrop-blur-2xl">
        <Link href="/" aria-label="HireLoop home" className="shrink-0 xl:pl-6">
          <Image
            src={logo}
            alt="HireLoop"
            priority
            className="h-9 w-auto sm:h-11"
          />
        </Link>

        {/* Desktop navigation */}
        <NavigationMenu
          aria-label="Main navigation"
          className="hidden h-[74px] max-w-none flex-none items-center gap-6 rounded-[16px] bg-[#222222] py-2 pr-2 pl-8 text-white lg:flex"
        >
          <NavigationMenuList className="gap-10">
            {navLinks.map((link) => (
              <NavigationMenuItem key={link.href}>
                <NavigationMenuLink
                  render={<Link href={link.href} />}
                  className="p-0 text-base font-normal tracking-[-0.2px] text-white transition-colors hover:bg-transparent hover:text-white/70 focus:bg-transparent focus-visible:ring-0"
                >
                  {link.label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>

          <span aria-hidden="true" className="h-6 w-px shrink-0 bg-white/40" />

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <p className="max-w-[220px] truncate text-base text-white">
                  <span className="text-white/50">Welcome </span>
                  {user?.name}
                </p>
                <button
                  type="button"
                  onClick={handleSignOut}
                  disabled={signingOut}
                  aria-label="Sign out"
                  className={signOutClasses}
                >
                  <LogOut aria-hidden="true" className="size-5" />
                  {signingOut ? "Signing out…" : "Sign Out"}
                </button>
              </>
            ) : (
              <>
                <Link href="/sign-in" className={signInClasses}>
                  Sign In
                </Link>
                <Link href="/sign-up" className={getStartedClasses}>
                  Get Started
                </Link>
              </>
            )}
          </div>
        </NavigationMenu>

        {/* Mobile navigation */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            aria-label="Open navigation menu"
            className="inline-flex size-11 items-center justify-center rounded-[12px] bg-[#222222] text-white ring-1 ring-white/10 transition-colors hover:bg-[#2c2c2c] lg:hidden"
          >
            <Menu className="size-5" />
          </SheetTrigger>

          <SheetContent
            side="right"
            style={{ width: "min(360px, 100vw)" }}
            className="border-l border-white/10 bg-[#0b0a12] p-0 text-white"
          >
            <SheetHeader className="border-b border-white/10 p-6">
              <SheetTitle className="sr-only">Navigation menu</SheetTitle>
              <Link
                href="/"
                aria-label="HireLoop home"
                onClick={() => setOpen(false)}
              >
                <Image src={logo} alt="HireLoop" className="h-9 w-auto" />
              </Link>
            </SheetHeader>

            <nav
              aria-label="Mobile navigation"
              className="flex flex-col gap-1 px-3 py-4"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-base font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <SheetFooter className="mt-auto gap-3 border-t border-white/10 p-6">
              {user ? (
                ""
              ) : (
                <>
                  <Link
                    href="/sign-in"
                    onClick={() => setOpen(false)}
                    className={cn(
                      buttonVariants({
                        variant: "outline",
                        size: "lg",
                        className:
                          "h-12 w-full rounded-[12px] border-white/15 bg-transparent text-base text-white hover:bg-white/10 hover:text-white dark:bg-transparent dark:hover:bg-white/10",
                      }),
                    )}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/sign-up"
                    onClick={() => setOpen(false)}
                    className={cn(
                      buttonVariants({
                        className: "h-12 w-full rounded-[12px] text-base",
                      }),
                    )}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

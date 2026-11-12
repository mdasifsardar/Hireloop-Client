"use client";

import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

const SignInForm = ({ inputClasses, labelClasses, errorClasses }) => {
  //              All state management

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData.entries());
    console.log("Form Data =>", user);

    try {
      const { data, error } = await authClient.signIn.email({
        ...user,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error?.message || "Login Failed!");
        return;
      }

      toast.success(data?.message || "Login successfully!");
      setLoading(false);
    } catch (err) {
      toast.error(err?.message || "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="flex flex-col items-center">
        <h1 className="mt-6 text-center text-2xl font-bold tracking-tight">
          Welcome back
        </h1>
        <p className="mt-2 text-center text-[13px] text-white/60">
          Sign in to continue browsing curated opportunities
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-8 rounded-[20px] border border-white/10 bg-white/5 p-6 shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-sm"
      >
        <div className="space-y-4">
          {/* Email */}
          <div>
            <label htmlFor="email" className={labelClasses}>
              Email
            </label>
            <div className="relative">
              <Mail
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-white/50"
              />
              <input
                required
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                defaultValue=""
                placeholder="you@example.com"
                className={inputClasses}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className={labelClasses}>
              Password
            </label>
            <div className="relative">
              <Lock
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-white/50"
              />
              <input
                required
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                defaultValue=""
                placeholder="Your Password"
                className={inputClasses}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="size-5" aria-hidden="true" />
                ) : (
                  <Eye className="size-5" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Forgot password */}
        <div className="mt-3 text-right">
          <Link
            href="/forgot-password"
            className="text-[12px] font-medium text-[#a89aff] hover:text-white"
          >
            Forgot password?
          </Link>
        </div>

        {/* Primary CTA */}
        <button
          type="submit"
          disabled={loading}
          className="mt-6 inline-flex h-[52px] w-full items-center justify-center rounded-[12px] bg-[#5c53fe] text-[15px] font-medium text-white transition-all hover:bg-[#6e66ff] disabled:opacity-60 cursor-pointer"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>

        {/* Divider */}
        <div className="my-5 flex items-center gap-3 text-[13px] text-white/50">
          <span className="h-px flex-1 bg-white/10" />
          or
          <span className="h-px flex-1 bg-white/10" />
        </div>

        {/* Secondary: Google sign-in (placeholder action) */}
        <button
          type="button"
          className="inline-flex h-[48px] w-full items-center justify-center gap-2 rounded-[12px] border border-white/15 bg-white/5 text-[14px] font-medium text-white transition-colors hover:bg-white/10"
        >
          <svg
            aria-hidden="true"
            className="size-5"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M21.35 11.1h-9.17v2.73h5.52c-.23 1.46-1.55 4.27-5.52 4.27a5.99 5.99 0 0 1-5.99-5.99A5.99 5.99 0 0 1 12.7 6.1c2.06 0 3.33 1.02 4.03 1.9l2.37-2.28C17.55 4.16 15.9 3 12.7 3 7.83 3 4 6.83 4 11.7s3.83 8.7 8.7 8.7c6.02 0 10.03-4.18 10.03-10.05 0-.57-.06-.9-.13-1.25z" />
          </svg>
          Continue with Google
        </button>

        {/* Footer link */}
        <p className="mt-5 text-center text-[13px] text-white/60">
          Don’t have an account?{" "}
          <Link
            href="/sign-up"
            className="font-medium text-[#a89aff] hover:text-white"
          >
            Get started
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignInForm;

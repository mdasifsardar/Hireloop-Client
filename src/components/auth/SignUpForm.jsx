"use client";

import { useState } from "react";
import Link from "next/link";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Search,
  Briefcase,
  ShieldCheck,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

const ROLE_OPTIONS = [
  {
    value: "seeker",
    label: "Job Seeker",
    description: "Find and apply to jobs",
    icon: Search,
  },
  {
    value: "recruiter",
    label: "Recruiter",
    description: "Post jobs and hire talent",
    icon: Briefcase,
  },
  {
    value: "admin",
    label: "Admin",
    description: "Manage the platform",
    icon: ShieldCheck,
  },
];

const SignUpForm = ({ inputClasses, labelClasses, errorClasses }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "seeker",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function validate() {
    const next = {};
    if (!form.name.trim()) next.name = "Name is required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Enter a valid email";
    }
    if (!form.password) next.password = "Password is required";
    else if (form.password.length < 6) next.password = "At least 6 characters";

    return next;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await authClient.signUp.email({
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
        callbackURL: "/",
      });

      if (error) {
        setFormError(
          error.message || "Could not create your account. Please try again.",
        );
        return;
      }

      console.log("After sign up =>", data);
    } catch (err) {
      setFormError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="flex flex-col items-center">
        <h1 className="mt-6 text-center text-2xl font-bold tracking-tight">
          Create your account
        </h1>
        <p className="mt-2 text-center text-[13px] text-white/60">
          Join HireLoop and find your next role today
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-8 rounded-[20px] border border-white/10 bg-white/5 p-6 shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-sm"
        noValidate
      >
        <div className="space-y-4">
          {/* Role */}
          <fieldset>
            <legend className={labelClasses}>I am a…</legend>
            <div className="grid grid-cols-3 gap-2">
              {ROLE_OPTIONS.map((option) => {
                const Icon = option.icon;
                const selected = form.role === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() =>
                      setForm((prev) => ({ ...prev, role: option.value }))
                    }
                    className={`flex cursor-pointer flex-col items-center gap-1.5 rounded-[12px] border px-2 py-3 text-center transition-all outline-none focus:ring-2 focus:ring-[#5c53fe]/30 ${
                      selected
                        ? "border-[#5c53fe] bg-[#5c53fe]/15 text-white"
                        : "border-white/10 bg-white/5 text-white/60 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    <Icon
                      aria-hidden="true"
                      className={`size-5 ${selected ? "text-[#a89aff]" : "text-white/50"}`}
                    />
                    <span className="text-[12px] font-medium leading-tight">
                      {option.label}
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="mt-1.5 text-[11px] text-white/40">
              {ROLE_OPTIONS.find((o) => o.value === form.role)?.description}
            </p>
          </fieldset>

          {/* Name */}
          <div>
            <label htmlFor="name" className={labelClasses}>
              Full name
            </label>
            <div className="relative">
              <User
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-white/50"
              />
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                className={inputClasses}
                aria-invalid={Boolean(errors.name)}
              />
            </div>
            {errors.name && <p className={errorClasses}>{errors.name}</p>}
          </div>

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
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={inputClasses}
                aria-invalid={Boolean(errors.email)}
              />
            </div>
            {errors.email && <p className={errorClasses}>{errors.email}</p>}
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
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                value={form.password}
                onChange={handleChange}
                placeholder="Your Password"
                className={inputClasses}
                aria-invalid={Boolean(errors.password)}
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
            {errors.password && (
              <p className={errorClasses}>{errors.password}</p>
            )}
          </div>
        </div>

        {formError && (
          <p className="mt-4 rounded-[12px] border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-[13px] text-red-400">
            {formError}
          </p>
        )}

        {/* Primary CTA */}
        <button
          type="submit"
          disabled={loading}
          className="mt-6 inline-flex h-[52px] w-full items-center justify-center rounded-[12px] bg-[#5c53fe] text-[15px] font-medium text-white transition-all hover:bg-[#6e66ff] disabled:opacity-60 cursor-pointer"
        >
          {loading ? "Creating account…" : "Create account"}
        </button>

        {/* Divider */}
        <div className="my-5 flex items-center gap-3 text-[13px] text-white/50">
          <span className="h-px flex-1 bg-white/10" />
          or
          <span className="h-px flex-1 bg-white/10" />
        </div>

        {/* Secondary: Google sign-up (placeholder action) */}
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
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="font-medium text-[#a89aff] hover:text-white"
          >
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpForm;

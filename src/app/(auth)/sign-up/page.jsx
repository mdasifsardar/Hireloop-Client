import SignUpForm from "@/components/auth/SignUpForm";

export const metadata = {
  title: "HireLoop — Sign Up",
};

const inputClasses =
  "w-full rounded-[12px] border border-white/10 bg-white/5 px-10 py-3 text-[15px] text-white placeholder:text-white/50 outline-none transition-all focus:border-[#5c53fe] focus:bg-white/5 focus:ring-2 focus:ring-[#5c53fe]/30";

const labelClasses =
  "mb-2 block font-[family-name:var(--font-manrope)] text-[13px] font-medium text-white/80";

const errorClasses = "mt-1 text-[12px] text-red-400";

export default function SignUpPage() {
  return (
    <div
      className="flex min-h-screen w-full flex-col items-center justify-center bg-[#010103] px-4 mt-10 text-white sm:px-6 lg:px-8"
      style={{ fontFamily: "var(--font-manrope)" }}
    >
      <SignUpForm
        labelClasses={labelClasses}
        inputClasses={inputClasses}
        errorClasses={errorClasses}
      />
    </div>
  );
}

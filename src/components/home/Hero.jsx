"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MapPin, Search } from "lucide-react";

import globe from "@/app/images/globe.png";

const trending = ["Product Designer", "AI Engineering", "Dev-ops Engineer"];

export default function Hero() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const jobInputRef = useRef(null);

  function handleSubmit(event) {
    event.preventDefault();
    if (!query.trim()) {
      jobInputRef.current?.focus();
      return;
    }
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (location.trim()) params.set("location", location.trim());
    router.push(`/jobs?${params.toString()}`);
  }

  return (
    <section className="relative isolate flex flex-col items-center overflow-hidden bg-[#010103] min-h-svh px-4 sm:px-6 lg:min-h-[130.7vw] xl:min-h-[1882px] md:min-h-[960px]">
      {/* Globe visual - matches the Fig hero artwork (Figma frame 12022:10424) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 mx-auto w-full max-w-full"
      >
        <Image
          src={globe}
          alt=""
          fill
          priority
          sizes="(max-width: 100vw) 100vw, 100%"
          className="object-cover object-bottom lg:object-top md:object-top"
        />
      </div>

      <div className="relative z-10 flex w-full max-w-[784px] flex-col items-center pt-[140px] pb-24 sm:pt-[170px] md:pt-[180px] lg:pt-[274px]">
        {/* Badge: "50,000+ new jobs this month" */}
        <div className="flex items-center gap-4">
          <span
            aria-hidden="true"
            className="hidden h-px w-16 bg-gradient-to-r from-[#01012399] to-[#a8a8a8b3] sm:block"
          />
          <span className="inline-flex h-12 items-center gap-4 rounded-full bg-gradient-to-b from-[#474747] to-[#010102] px-6 py-3 font-[family-name:var(--font-space-mono)] text-[15px] text-white shadow-[inset_0_0_6px_6px_rgba(0,0,0,0.1)] sm:text-[20px]">
            <span
              aria-hidden="true"
              className="text-[18px] leading-none sm:text-[24px]"
            >
              💼
            </span>
            50,000+ new jobs this month
          </span>
          <span
            aria-hidden="true"
            className="hidden h-px w-16 bg-gradient-to-r from-[#a8a8a8b3] to-[#01012399] sm:block"
          />
        </div>

        {/* Headline + subcopy */}
        <h1 className="mt-8 max-w-[784px] text-center font-[family-name:var(--font-manrope)] text-[40px] font-bold leading-[1.15] tracking-[-0.02em] text-white sm:text-[48px] md:text-[52px] lg:mt-8 lg:text-[56px]">
          Find Your Dream Job Today
        </h1>
        <p className="mt-4 max-w-[784px] text-center font-[family-name:var(--font-manrope)] text-[17px] leading-[1.6] text-white/70 sm:text-[20px] md:text-[19px]">
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role — faster.
        </p>

        {/* Search bar */}
        <form
          onSubmit={handleSubmit}
          className="mt-12 flex h-16 w-full items-center gap-4 rounded-[16px] border border-white/20 bg-[#101010] py-2 pr-2 pl-6 shadow-[0_1px_2px_rgba(0,0,0,0.05)] md:flex"
          role="search"
        >
          <div className="flex min-w-0 grow items-center gap-2">
            <Search className="size-6 shrink-0 text-white" aria-hidden="true" />
            <input
              ref={jobInputRef}
              name="query"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              type="text"
              autoComplete="off"
              aria-label="Search jobs"
              placeholder="Job title, skill or company"
              className="w-full min-w-0 border-0 bg-transparent font-sans text-[16px] text-white outline-none placeholder:text-white/80"
            />
          </div>

          <span
            aria-hidden="true"
            className="hidden h-6 w-px shrink-0 bg-white/20 sm:block"
          />

          <div className="min-w-0 grow items-center gap-2 sm:flex md:flex">
            <MapPin
              className="size-6 shrink-0 text-white/80"
              aria-hidden="true"
            />
            <input
              name="location"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              type="text"
              autoComplete="off"
              aria-label="Location"
              placeholder="Location or Remote"
              className="w-full min-w-0 border-0 bg-transparent font-sans text-[16px] text-white outline-none placeholder:text-white/80"
            />
          </div>

          <button
            type="submit"
            aria-label="Search"
            className="flex size-12 shrink-0 items-center justify-center rounded-[12px] bg-[#5c53fe] text-white transition-colors hover:bg-[#6e66ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <Search className="size-6" aria-hidden="true" />
          </button>
        </form>

        {/* Trending tags */}
        <div className="mt-6 md:flex flex-wrap items-center justify-center gap-4">
          <span className="font-[family-name:var(--font-manrope)] text-[16px] text-white/70">
            Trending Position
          </span>
          <div className="flex md:flex flex-wrap items-center justify-center gap-2">
            {trending.map((role) => (
              <Link
                key={role}
                href={`/jobs?q=${encodeURIComponent(role)}`}
                className="inline-flex md:inline-flex h-[33px] items-center rounded-full border border-white/10 bg-[#1a1a1b] px-3 font-[family-name:var(--font-manrope)] text-[14px] text-white transition-colors hover:border-white/25 hover:bg-[#242426]"
              >
                {role}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

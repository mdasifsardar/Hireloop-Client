"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

export function JobSearch() {
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    console.log("After submit form data =>", data);

    const search = data.searchField;
    const params = new URLSearchParams();
    params.set("search", search);

    router.push(`/browse-jobs?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex flex-col gap-2 rounded-2xl border border-[#232327] bg-[#131314] p-2 sm:flex-row sm:items-center"
    >
      <div className="flex min-w-0 flex-1 items-center gap-3 px-3">
        <Search className="size-5 shrink-0 text-[#a0a0ab]" aria-hidden="true" />
        <input
          type="text"
          name="searchField"
          placeholder="Search by job title, keywords..."
          aria-label="Search jobs"
          autoComplete="off"
          className="h-12 w-full min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-[#5a5a60]"
        />
      </div>

      <button
        type="submit"
        className="h-12 shrink-0 rounded-xl bg-white px-6 text-sm font-semibold text-[#0b0b0c] transition-colors hover:bg-[#e4e4e7] cursor-pointer"
      >
        Search Jobs
      </button>
    </form>
  );
}

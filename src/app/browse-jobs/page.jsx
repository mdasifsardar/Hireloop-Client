import { getJobs } from "@/lib/api/jobs";
import {
  BadgeCheck,
  Banknote,
  Bookmark,
  Building2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Flame,
  Globe2,
  Search,
  Star,
} from "lucide-react";

const jobTypes = [
  { label: "Full-time", count: "1.2k", checked: true },
  { label: "Contract", count: "432" },
  { label: "Freelance", count: "156" },
];

const typeIcons = {
  Hybrid: Globe2,
  Senior: Star,
};

const pages = [1, 2, 3, "…", 42];

const BrowseJobsPage = async ({ searchParams }) => {
  //
  const search = await searchParams;
  const urlSearch = new URLSearchParams(search);
  const query = urlSearch.toString();

  const jobs = await getJobs(query);

  console.log(jobs);

  return (
    <main className="min-h-screen bg-[#0b0b0c] px-4 pt-28 pb-16 text-white sm:px-6">
      <div className="mx-auto w-full max-w-[1368px]">
        <div className="flex flex-col gap-2 rounded-2xl border border-[#232327] bg-[#131314] p-2 sm:flex-row sm:items-center">
          <div className="flex min-w-0 flex-1 items-center gap-3 px-3">
            <Search
              className="size-5 shrink-0 text-[#a0a0ab]"
              aria-hidden="true"
            />
            <input
              type="text"
              placeholder="Search by job title, keywords..."
              aria-label="Search jobs"
              className="h-12 w-full min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-[#5a5a60]"
            />
          </div>
          <button
            type="button"
            className="h-12 shrink-0 rounded-xl bg-white px-6 text-sm font-semibold text-[#0b0b0c] transition-colors hover:bg-[#e4e4e7]"
          >
            Search Jobs
          </button>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="h-fit rounded-2xl border border-[#232327] bg-[#131314] p-5">
            <h2 className="text-lg font-semibold text-white">Filters</h2>

            <div className="mt-6">
              <h3 className="text-[13px] font-medium text-[#a0a0ab]">
                Job Type
              </h3>

              <div className="mt-3 space-y-3">
                {jobTypes.map((type) => (
                  <label
                    key={type.label}
                    className="flex cursor-pointer items-center justify-between gap-3"
                  >
                    <span className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        defaultChecked={type.checked}
                        className="size-4 cursor-pointer accent-white"
                      />
                      <span className="text-[13px] text-[#d4d4d8]">
                        {type.label}
                      </span>
                    </span>
                    <span className="text-[11px] text-[#5a5a60]">
                      {type.count}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          <section>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-[18px] font-semibold text-white">
                Found 1,248 Professional Jobs
              </h2>

              <div className="flex items-center gap-2">
                <span className="text-[11px] text-[#5a5a60]">Sort by:</span>
                <button
                  type="button"
                  className="inline-flex h-8 items-center gap-2 rounded-lg border border-[#232327] bg-[#131314] px-3 text-[11px] text-white transition-colors hover:bg-[#1f1f1f]"
                >
                  Most Recent
                  <ChevronDown className="size-3.5 text-[#a0a0ab]" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {jobs.map((job) => {
                const TypeIcon = typeIcons[job.jobType] || Clock;

                const locationMentionsRemote = job.location
                  ?.toLowerCase()
                  .includes("remote");

                const location = job.isRemote
                  ? job.location
                    ? locationMentionsRemote
                      ? job.location
                      : `${job.location} (Remote)`
                    : "Remote"
                  : job.location;

                const salaryFrequency =
                  {
                    "per hour": "hr",
                    "per month": "mo",
                    "per year": "yr",
                  }[job.frequency] || job.frequency;

                const salary = `$${Number(job.minSalary).toLocaleString("en-US")} – $${Number(job.maxSalary).toLocaleString("en-US")} / ${salaryFrequency}`;

                const category = job.category
                  ? job.category.charAt(0).toUpperCase() + job.category.slice(1)
                  : null;

                return (
                  <article
                    key={job._id || job.title}
                    className="rounded-2xl border border-[#232327] bg-[#131314] p-4"
                  >
                    <div className="flex gap-4">
                      <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-[#60a5fa]">
                        <Building2 className="size-5" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-base leading-5 font-semibold text-white">
                              {job.title}
                            </h3>
                            <p className="mt-0.5 text-[12px] leading-5 text-[#a0a0ab]">
                              {job.companyName}
                              {location && (
                                <>
                                  <span className="mx-1 text-[#5a5a60]">•</span>
                                  {location}
                                </>
                              )}
                            </p>
                          </div>

                          <button
                            type="button"
                            aria-label={`Save ${job.title}`}
                            className="shrink-0 text-[#a0a0ab] transition-colors hover:text-white"
                          >
                            <Bookmark className="size-4" />
                          </button>
                        </div>

                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          <span className="inline-flex h-7 items-center gap-1.5 rounded-lg border border-[#232327] bg-[#1f1f1f] px-2.5 text-[11px] text-[#d4d4d8]">
                            <Banknote className="size-3.5" />
                            {salary}
                          </span>

                          <span className="inline-flex h-7 items-center gap-1.5 rounded-lg border border-[#232327] bg-[#1f1f1f] px-2.5 text-[11px] text-[#d4d4d8]">
                            <TypeIcon className="size-3.5" />
                            {job.jobType}
                          </span>

                          {category && (
                            <span className="inline-flex h-7 items-center gap-1.5 rounded-lg border border-[#232327] bg-[#1f1f1f] px-2.5 text-[11px] text-[#d4d4d8]">
                              <Building2 className="size-3.5" />
                              {category}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <nav
              aria-label="Job pagination"
              className="mt-6 flex items-center justify-center gap-2"
            >
              <button
                type="button"
                aria-label="Previous page"
                className="flex size-8 items-center justify-center rounded-lg border border-[#232327] bg-[#131314] text-[#a0a0ab] transition-colors hover:text-white"
              >
                <ChevronLeft className="size-4" />
              </button>

              {pages.map((page) =>
                typeof page === "number" ? (
                  <button
                    key={page}
                    type="button"
                    aria-current={page === 1 ? "page" : undefined}
                    className={
                      page === 1
                        ? "flex size-8 items-center justify-center rounded-lg bg-white text-xs font-semibold text-[#0b0b0c]"
                        : "flex size-8 items-center justify-center rounded-lg border border-[#232327] bg-[#131314] text-xs text-[#a0a0ab] transition-colors hover:text-white"
                    }
                  >
                    {page}
                  </button>
                ) : (
                  <span key={page} className="px-1 text-xs text-[#5a5a60]">
                    {page}
                  </span>
                ),
              )}

              <button
                type="button"
                aria-label="Next page"
                className="flex size-8 items-center justify-center rounded-lg border border-[#232327] bg-[#131314] text-[#a0a0ab] transition-colors hover:text-white"
              >
                <ChevronRight className="size-4" />
              </button>
            </nav>
          </section>
        </div>
      </div>
    </main>
  );
};

export default BrowseJobsPage;

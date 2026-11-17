import { Banknote, Bookmark, Building2, Clock } from "lucide-react";
import {
  formatJobCategory,
  formatJobLocation,
  formatJobSalary,
} from "@/lib/format-jobs";
import Link from "next/link";

function JobTag({ icon: Icon, children }) {
  return (
    <span className="inline-flex h-7 items-center gap-1.5 rounded-lg border border-[#232327] bg-[#1f1f1f] px-2.5 text-[11px] text-[#d4d4d8]">
      <Icon className="size-3.5" />
      {children}
    </span>
  );
}

export function JobCard({ job }) {
  const category = formatJobCategory(job.category);
  const location = formatJobLocation(job);

  return (
    <Link href={`/browse-jobs/${job._id}`}>
      <article className="rounded-2xl border border-[#232327] bg-[#131314] p-4">
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
              <JobTag icon={Banknote}>{formatJobSalary(job)}</JobTag>
              <JobTag icon={Clock}>{job.jobType}</JobTag>
              {category && <JobTag icon={Building2}>{category}</JobTag>}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

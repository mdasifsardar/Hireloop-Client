import {
  BadgeCheck,
  Banknote,
  Bookmark,
  Building2,
  CalendarDays,
  Clock,
  MapPin,
} from "lucide-react";
import {
  formatJobCategory,
  formatJobDeadline,
  formatJobLocation,
  formatJobSalary,
} from "@/lib/format-jobs";

const cardClassName = "rounded-2xl border border-[#232327] bg-[#131314]";

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className={`${cardClassName} flex items-center gap-2.5 p-3`}>
      <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-[#1f1f1f] text-[#c3c0ff]">
        <Icon className="size-3.5" />
      </span>
      <div className="min-w-0">
        <p className="text-[9px] font-medium tracking-[0.14em] text-[#5a5a60] uppercase">
          {label}
        </p>
        <p className="mt-0.5 truncate text-[12px] font-medium text-white">
          {value}
        </p>
      </div>
    </div>
  );
}

export function JobDetailsHeader({ job }) {
  const category = formatJobCategory(job.category);
  const salary =
    job.minSalary && job.maxSalary ? formatJobSalary(job) : "Not specified";
  const deadline = formatJobDeadline(job.deadline);

  const stats = [
    { label: "Salary Range", value: salary, icon: Banknote },
    {
      label: "Location",
      value: formatJobLocation(job) || "Not specified",
      icon: MapPin,
    },
    { label: "Job Type", value: job.jobType || "Not specified", icon: Clock },
    {
      label: "Deadline",
      value: deadline || "Not specified",
      icon: CalendarDays,
    },
  ];

  return (
    <>
      <section className={`${cardClassName} p-5`}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-[#60a5fa]">
              <Building2 className="size-5" />
            </div>

            <div>
              <h1 className="text-2xl leading-8 font-semibold text-white">
                {job.title}
              </h1>
              <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px]">
                <span className="text-[#a0a0ab]">{job.companyName}</span>
                {category && (
                  <>
                    <span className="text-[#5a5a60]">•</span>
                    <span className="text-[#a0a0ab]">{category}</span>
                  </>
                )}
                <span className="inline-flex items-center gap-1.5 text-[#4ade80]">
                  <BadgeCheck className="size-3.5" />
                  Verified Employer
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:shrink-0">
            <button
              type="button"
              aria-label="Save job"
              className="flex size-9 items-center justify-center rounded-lg border border-[#232327] bg-[#1f1f1f] text-[#a0a0ab] transition-colors hover:text-white"
            >
              <Bookmark className="size-4" />
            </button>
            <button
              type="button"
              className="h-9 rounded-lg bg-white px-5 text-[13px] font-semibold text-[#0b0b0c] transition-colors hover:bg-[#e4e4e7]"
            >
              Apply Now
            </button>
          </div>
        </div>
      </section>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.label}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
          />
        ))}
      </div>
    </>
  );
}

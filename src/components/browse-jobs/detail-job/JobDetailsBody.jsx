import { ArrowRight, Building2 } from "lucide-react";
import { formatJobCategory } from "@/lib/format-jobs";

const cardClassName = "rounded-2xl border border-[#232327] bg-[#131314]";

const splitLines = (value) =>
  (value ?? "")
    .split(/\r?\n+/)
    .map((line) => line.trim())
    .filter(Boolean);

function SectionTitle({ children }) {
  return <h2 className="text-lg font-semibold text-white">{children}</h2>;
}

function BulletList({ items }) {
  if (items.length === 0) {
    return (
      <p className="mt-3 text-[12px] text-[#5a5a60]">No details provided.</p>
    );
  }

  return (
    <ul className="mt-3 space-y-2.5 pl-4 text-[12px] leading-5 text-[#a0a0ab]">
      {items.map((item) => (
        <li key={item} className="list-disc marker:text-[#5a5a60]">
          {item}
        </li>
      ))}
    </ul>
  );
}

function CompanyOverview({ job }) {
  const category = formatJobCategory(job.category);
  const workMode = job.isRemote ? "Remote" : "On-site";

  return (
    <aside className={`${cardClassName} h-fit p-5`}>
      <SectionTitle>Company Overview</SectionTitle>

      <div className="relative mt-4 aspect-[16/10] overflow-hidden rounded-lg border border-[#232327] bg-gradient-to-br from-[#17153a] via-[#0f172a] to-[#0b0b0c]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(195,192,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(195,192,255,0.07)_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex size-14 items-center justify-center rounded-2xl border border-[#c3c0ff]/20 bg-[#c3c0ff]/5">
            <Building2 className="size-6 text-[#c3c0ff]" />
          </div>
        </div>
      </div>

      <h3 className="mt-4 truncate text-sm font-semibold text-white">
        {job.companyName}
      </h3>
      <p className="mt-0.5 text-[11px] text-[#5a5a60]">
        {[category, workMode].filter(Boolean).join(" · ")}
      </p>

      <button
        type="button"
        className="mt-5 flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-[#ffffff1a] bg-[#1f1f1f]/60 text-[12px] font-medium text-white transition-colors hover:bg-[#1f1f1f]"
      >
        Apply for this Job
        <ArrowRight className="size-3.5" />
      </button>
    </aside>
  );
}

export function JobDetailsBody({ job, benefits }) {
  return (
    <div className="mt-4 grid items-start gap-4 lg:grid-cols-[2fr_1fr]">
      <section className={`${cardClassName} p-5`}>
        <SectionTitle>Responsibilities</SectionTitle>
        <BulletList items={splitLines(job.responsibilities)} />

        <div className="mt-6 border-t border-[#232327] pt-5">
          <SectionTitle>Requirements</SectionTitle>
          <BulletList items={splitLines(job.requirements)} />
        </div>

        <div className="mt-6 border-t border-[#232327] pt-5">
          <SectionTitle>Benefits</SectionTitle>

          <div className="mt-4 grid gap-x-6 gap-y-4 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <div key={benefit.label} className="flex items-center gap-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#1f1f1f] text-[#e4e4e7]">
                  <benefit.icon className="size-4" />
                </span>
                <span className="text-[12px] font-medium text-white">
                  {benefit.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CompanyOverview job={job} />
    </div>
  );
}

import { ChevronDown } from "lucide-react";
import { JobCard } from "@/components/browse-jobs/JobCard";
import { JobFilters } from "@/components/browse-jobs/JobFilters";
import { JobSearch } from "@/components/browse-jobs/JobSearch";
import { JobsPagination } from "@/components/browse-jobs/JobsPagination";
import { getJobs } from "@/lib/api/jobs";

const jobTypeOptions = ["Full-time", "Part-time", "Contract", "Freelance"];
const categoryOptions = ["Engineering", "Design", "Marketing"];

const countJobs = (jobs, predicate) => jobs.filter(predicate).length;

const BrowseJobsPage = async ({ searchParams }) => {
  const search = await searchParams;
  const urlSearch = new URLSearchParams(search);
  const query = urlSearch.toString();

  const jobs = await getJobs(query);

  const filterGroups = [
    {
      id: "jobType",
      title: "Job Type",
      options: jobTypeOptions.map((label, index) => ({
        label,
        count: countJobs(jobs, (job) => job.jobType === label),
        defaultChecked: index === 0,
      })),
    },
    {
      id: "category",
      title: "Category",
      options: categoryOptions.map((label) => ({
        label,
        count: countJobs(
          jobs,
          (job) => job.category?.toLowerCase() === label.toLowerCase(),
        ),
      })),
    },
  ];

  return (
    <main className="min-h-screen bg-[#0b0b0c] px-4 pt-28 pb-16 text-white sm:px-6">
      <div className="mx-auto w-full max-w-[1368px]">
        <JobSearch />

        <div className="mt-6 grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
          <JobFilters groups={filterGroups} />

          <section>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-[18px] font-semibold text-white">
                Found {jobs.length.toLocaleString("en-US")} Professional Jobs
              </h2>

              <label className="flex items-center gap-2 text-[11px] text-[#5a5a60]">
                Sort by:
                <span className="relative">
                  <select
                    name="sort"
                    defaultValue="recent"
                    aria-label="Sort jobs"
                    className="h-8 appearance-none rounded-lg border border-[#232327] bg-[#131314] pr-8 pl-3 text-[11px] text-white outline-none transition-colors hover:bg-[#1f1f1f]"
                  >
                    <option value="recent">Most Recent</option>
                    <option value="oldest">Oldest</option>
                    <option value="salary">Salary</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute top-1/2 right-2.5 size-3.5 -translate-y-1/2 text-[#a0a0ab]" />
                </span>
              </label>
            </div>

            {jobs.length > 0 ? (
              <div className="space-y-3">
                {jobs.map((job) => (
                  <JobCard key={job._id} job={job} />
                ))}
              </div>
            ) : (
              <p className="rounded-2xl border border-[#232327] bg-[#131314] p-6 text-sm text-[#a0a0ab]">
                No jobs found.
              </p>
            )}

            {jobs.length > 0 && <JobsPagination />}
          </section>
        </div>
      </div>
    </main>
  );
};

export default BrowseJobsPage;

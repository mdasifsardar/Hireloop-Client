import Link from "next/link";
import { ChevronRight, Eye, MapPin, Pencil, Plus, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DeleteJobDialog } from "@/components/dashboard/jobs/DeleteJobDialog";
import { getJobs } from "@/lib/api/jobs";

export const metadata = {
  title: "HireLoop — Manage Jobs",
};

const frequencyLabels = {
  "per hour": "hr",
  "per month": "mo",
  "per year": "yr",
};

const formatSalary = (job) => {
  const frequency = frequencyLabels[job.frequency] || job.frequency;
  return `$${job.minSalary} – $${job.maxSalary} / ${frequency}`;
};

const formatDate = (date) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));

const isJobActive = (deadline) =>
  new Date(`${deadline}T23:59:59Z`).getTime() >= Date.now();

const ManageJobsPage = async () => {
  const jobs = await getJobs();

  return (
    <div className="mx-auto w-full max-w-[1443px] px-6 pt-16 pb-10 text-white">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-[13px] leading-5 text-[#a0a0ab]">
          <span>Manage Jobs</span>
          <ChevronRight className="size-3 text-[#5a5a60]" aria-hidden="true" />
          <span className="font-medium text-[#c3c0ff]">
            Job Listings &amp; Postings
          </span>
        </div>

        <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-[32px] font-medium leading-[42px] tracking-[-0.8px] text-white">
              Manage Job Posts
            </h1>
            <p className="mt-0.5 text-sm leading-[22px] text-[#a0a0ab]">
              Review live listings, monitor applicants, and update job details
              across your organization.
            </p>
          </div>

          <Button
            nativeButton={false}
            render={<Link href="/dashboard/recruiter/jobs/new" />}
            className="h-10 shrink-0 gap-2 rounded-xl bg-[#5c53fe] px-5 text-sm font-medium text-white shadow-[0_2px_4px_-2px_rgba(0,0,0,0.1),0_4px_6px_-1px_rgba(0,0,0,0.1)] hover:bg-[#6e66ff]"
          >
            <Plus className="size-3.5" />
            New Job Post
          </Button>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#232327] bg-[#151516] shadow-[0_8px_10px_-6px_rgba(0,0,0,0.1),0_20px_25px_-5px_rgba(0,0,0,0.1)]">
        <Table className="min-w-[1100px] table-fixed">
          <TableHeader className="bg-[#0b0b0c]">
            <TableRow className="border-[#232327] hover:bg-transparent">
              <TableHead className="h-[50px] w-[21.5%] px-3 text-xs font-semibold tracking-[0.6px] text-[#a0a0ab] uppercase">
                Job Title &amp; Dept
              </TableHead>
              <TableHead className="h-[50px] w-[17.5%] px-3 text-xs font-semibold tracking-[0.6px] text-[#a0a0ab] uppercase">
                Company &amp; Location
              </TableHead>
              <TableHead className="h-[50px] w-[7.5%] px-3 text-xs font-semibold tracking-[0.6px] text-[#a0a0ab] uppercase">
                Type
              </TableHead>
              <TableHead className="h-[50px] w-[11%] px-3 text-xs font-semibold tracking-[0.6px] text-[#a0a0ab] uppercase">
                Compensation
              </TableHead>
              <TableHead className="h-[50px] w-[11%] px-3 text-xs font-semibold tracking-[0.6px] text-[#a0a0ab] uppercase">
                Applicants
              </TableHead>
              <TableHead className="h-[50px] w-[7.5%] px-3 text-xs font-semibold tracking-[0.6px] text-[#a0a0ab] uppercase">
                Status
              </TableHead>
              <TableHead className="h-[50px] w-[9%] px-3 text-xs font-semibold tracking-[0.6px] text-[#a0a0ab] uppercase">
                Deadline
              </TableHead>
              <TableHead className="h-[50px] w-[15%] px-3 text-right text-xs font-semibold tracking-[0.6px] text-[#a0a0ab] uppercase">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {jobs.map((job) => {
              const active = isJobActive(job.deadline);
              const category =
                job.category.charAt(0).toUpperCase() + job.category.slice(1);

              const image = job.title.charAt(0).toUpperCase();

              return (
                <TableRow
                  key={job.title}
                  className="border-[#232327] hover:bg-transparent"
                >
                  <TableCell className="h-[77px] px-3 py-4">
                    <div className="flex items-center gap-3">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#232327]">
                        {image}
                      </span>
                      <div>
                        <p className="text-sm font-semibold leading-5 text-white">
                          {job.title}
                        </p>
                        <p className="text-[11px] font-medium leading-5 text-[#38bdf8]">
                          {category}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="h-[77px] px-3 py-4">
                    <p className="text-[13px] font-medium leading-5 text-white">
                      {job.companyName}
                    </p>
                    <p className="flex items-center gap-1 text-[11px] leading-5 text-[#a0a0ab]">
                      <MapPin className="size-3.5 shrink-0" />
                      {job.location}
                    </p>
                  </TableCell>

                  <TableCell className="h-[77px] px-3 py-4">
                    <span className="inline-flex h-[30px] items-center rounded-full border border-[#232327] bg-[#1f1f1f] px-2 text-[11px] font-medium leading-5 whitespace-nowrap text-[#d4d4d8]">
                      {job.jobType}
                    </span>
                  </TableCell>

                  <TableCell className="h-[77px] px-3 py-4 text-[13px] font-medium whitespace-nowrap text-white">
                    {formatSalary(job)}
                  </TableCell>

                  <TableCell className="h-[77px] px-3 py-4">
                    <span className="flex items-center gap-1 text-[13px] font-semibold text-[#c3c0ff]">
                      <Users className="size-3.5 shrink-0" />0 Candidates
                    </span>
                  </TableCell>

                  <TableCell className="h-[77px] px-3 py-4">
                    <span
                      className={
                        active
                          ? "inline-flex h-7 items-center gap-1 rounded-full bg-[#14532d]/40 px-2 text-[11px] font-medium text-[#4ade80]"
                          : "inline-flex h-7 items-center gap-1 rounded-full bg-[#1f1f1f] px-2 text-[11px] font-medium text-[#a0a0ab]"
                      }
                    >
                      <span
                        className={
                          active
                            ? "size-1.5 rounded-full bg-[#4ade80]"
                            : "size-1.5 rounded-full bg-[#5a5a60]"
                        }
                      />
                      {active ? "Active" : "Expired"}
                    </span>
                  </TableCell>

                  <TableCell className="h-[77px] px-3 py-4 text-[13px] font-medium whitespace-nowrap text-white">
                    {formatDate(job.deadline)}
                  </TableCell>

                  <TableCell className="h-[77px] px-3 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        type="button"
                        variant="ghost"
                        className="h-8 gap-1 rounded-lg bg-[#5c53fe]/20 px-2 text-xs font-normal text-[#c3c0ff] hover:bg-[#5c53fe]/30 hover:text-[#c3c0ff]"
                      >
                        <Pencil className="size-4" />
                        Update
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label="View job"
                        className="size-7 rounded-lg bg-[#1f1f1f] text-[#a0a0ab] hover:bg-[#232327] hover:text-white"
                      >
                        <Eye className="size-4" />
                      </Button>
                      {/* <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label="More options"
                        className="size-7 rounded-lg text-[#a1a4aa] hover:bg-[#1f1f1f] hover:text-white"
                      >
                        <EllipsisVertical className="size-4" />
                      </Button> */}
                      <DeleteJobDialog job={job} />
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ManageJobsPage;

"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Building2,
  Calendar,
  ChevronRight,
  DollarSign,
  MapPin,
  Globe,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import createJob from "@/lib/actions/jobs";
import { toast } from "sonner";

const emptyForm = {
  isRemote: false,
  jobType: "Full-time",
};

export default function PostNewJobPage() {
  const [loading, setLoading] = useState(false);
  const [jobType, setJobType] = useState("Full-time");
  const [isRemote, setIsRemote] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const jobData = {
      ...Object.fromEntries(formData.entries()),
      isRemote,
      jobType,
    };

    console.log("Published Job Data =>", jobData);

    try {
      const response = await createJob(jobData);

      if (!response.success) {
        toast.error(response?.message || "Failed to add job!");
        setLoading(false);
        return;
      }

      toast.success("Job added successfully!");

      // Form reset
      e.target.reset();
      setJobType(emptyForm.jobType);
      setIsRemote(emptyForm.isRemote);
    } catch (err) {
      toast.error(err?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const labelClass =
    "mb-1 flex items-center text-sm font-medium leading-[18px] text-[#f4f4f5]";
  const inputClass =
    "h-11 rounded-xl border-0 bg-[#1e1e21] px-4 text-sm text-white placeholder:text-[#5a5a60] focus-visible:ring-2 focus-visible:ring-[#5c53fe]/50";
  const selectClass =
    "h-11 w-full appearance-none rounded-xl border-0 bg-[#1e1e21] px-4 text-sm text-white placeholder:text-[#5a5a60] focus:outline-none focus:ring-2 focus:ring-[#5c53fe]/50";

  return (
    <div className="min-h-screen bg-[#131314] text-white">
      <form
        onSubmit={handleSubmit}
        className="mx-auto w-full max-w-[1032px] space-y-6 px-6 pt-16 pb-8"
      >
        {/* Top Header & Publish Button */}
        <div className="flex flex-col gap-4 border-b border-[#2a2a2b]/40 pt-6 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-[476px]">
            <p className="mb-1 flex items-center gap-1 text-xs font-medium leading-4 text-[#a0a0ab]">
              <Link
                href="/dashboard/recruiter/jobs"
                className="transition-colors hover:text-white"
              >
                Manage Jobs
              </Link>
              <ChevronRight
                className="size-3 shrink-0 text-[#5a5a60]"
                aria-hidden="true"
              />
              <span className="text-[#c3c0ff]">Create New Listing</span>
            </p>
            <h1 className="text-[32px] font-medium leading-[42px] tracking-[-0.8px] text-white">
              Post a New Job
            </h1>
            <p className="mt-1 text-[13px] leading-5 text-[#a0a0ab]">
              Fill in the position specifications to attract qualified talent
              across our network.
            </p>
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="flex h-11 shrink-0 cursor-pointer items-center gap-1 rounded-xl bg-[#5c53fe] px-6 text-sm font-medium text-white shadow-[0_4px_6px_-4px_rgba(92,83,254,0.25),0_10px_15px_-3px_rgba(92,83,254,0.25)] transition-all hover:bg-[#6e66ff]"
          >
            {loading ? "Publishing..." : "Publish Job"}
            <ArrowRight className="size-4" />
          </Button>
        </div>

        {/* SECTION 1: Basic Information */}
        <div className="space-y-5 rounded-2xl bg-[#151516] p-6">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-[#5c53fe]" />
            <h2 className="text-base font-medium leading-6 text-white">
              1. Basic Information
            </h2>
          </div>

          <div className="space-y-4">
            {/* Job Title */}
            <div>
              <Label htmlFor="title" className={labelClass}>
                Job Title <span className="font-normal text-[#5c53fe]">*</span>
              </Label>
              <Input
                id="title"
                name="title"
                required
                placeholder="e.g. Frontend Developer"
                className={inputClass}
              />
            </div>

            {/* Company Name & Job Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="companyName" className={labelClass}>
                  Company Name
                  <span className="font-normal text-[#5c53fe]">*</span>
                </Label>
                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 size-[18px] text-[#a0a0ab]" />
                  <Input
                    id="companyName"
                    name="companyName"
                    required
                    placeholder="e.g. HirePulse Network"
                    className={cn(inputClass, "pl-10")}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="category" className={labelClass}>
                  Job Category{" "}
                  <span className="font-normal text-[#5c53fe]">*</span>
                </Label>
                <div className="relative">
                  <select
                    id="category"
                    name="category"
                    required
                    className={selectClass}
                    defaultValue=""
                  >
                    <option
                      value=""
                      disabled
                      className="bg-[#1e1e21] text-white/50"
                    >
                      Select Category
                    </option>
                    <option
                      value="engineering"
                      className="bg-[#1e1e21] text-white"
                    >
                      Engineering & Tech
                    </option>
                    <option value="design" className="bg-[#1e1e21] text-white">
                      UI/UX Design
                    </option>
                    <option
                      value="marketing"
                      className="bg-[#1e1e21] text-white"
                    >
                      Digital Marketing
                    </option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-3 -translate-y-1/2 text-[#a0a0ab]" />
                </div>
              </div>
            </div>

            {/* Job Type Selector Tabs */}
            <div>
              <Label className={labelClass}>
                Job Type <span className="font-normal text-[#5c53fe]">*</span>
              </Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1">
                {["Full-time", "Part-time", "Contract", "Internship"].map(
                  (type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setJobType(type)}
                      className={cn(
                        "h-11 cursor-pointer rounded-xl border text-sm font-medium transition-all",
                        jobType === type
                          ? "border-[#5c53fe]/50 bg-[#232327] text-white"
                          : "border-transparent bg-[#1e1e21] text-[#a0a0ab] hover:bg-[#232327] hover:text-white",
                      )}
                    >
                      {type}
                    </button>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: Location, Compensation & Timeline */}
        <div className="space-y-5 rounded-2xl bg-[#151516] p-6">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-[#5c53fe]" />
            <h2 className="text-base font-medium leading-6 text-white">
              2. Location, Compensation & Timeline
            </h2>
          </div>

          <div className="space-y-4">
            {/* Remote Work Switcher Box */}
            <div className="flex h-16 items-center justify-between rounded-xl border border-[#232327] bg-[#1e1e21] p-3">
              <div className="flex items-center gap-2">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#232327]">
                  <Globe className="size-5 text-[#c3c0ff]" />
                </span>
                <div>
                  <p className="text-sm font-medium leading-[18px] text-white">
                    Remote Work Allowed (isRemote)
                  </p>
                  <p className="text-[13px] leading-5 text-[#a0a0ab]">
                    Enable worldwide or distributed candidate applications
                  </p>
                </div>
              </div>
              <Switch
                checked={isRemote}
                onCheckedChange={setIsRemote}
                className="data-[size=default]:h-6 data-[size=default]:w-11 data-checked:bg-[#5c53fe] data-unchecked:bg-[#1f1f1f] [&_[data-slot=switch-thumb]]:size-5! [&_[data-slot=switch-thumb]]:ml-0.5 [&_[data-slot=switch-thumb]]:data-checked:translate-x-[20px]!"
              />
            </div>

            {/* Location & Deadline */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label
                  htmlFor="location"
                  className={cn(labelClass, "justify-between")}
                >
                  Job Location{" "}
                  <span className="text-xs font-medium leading-4 text-[#5a5a60]">
                    (Required)
                  </span>
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 size-[18px] text-[#a0a0ab]" />
                  <Input
                    id="location"
                    name="location"
                    placeholder="e.g. New York, USA"
                    className={cn(inputClass, "pl-10")}
                  />
                </div>
              </div>

              <div>
                <Label
                  htmlFor="deadline"
                  className={cn(labelClass, "justify-between")}
                >
                  Application Deadline{" "}
                  <span className="text-xs font-medium leading-4 text-[#5a5a60]">
                    (deadline)
                  </span>
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 size-[18px] text-[#a0a0ab]" />
                  <Input
                    id="deadline"
                    name="deadline"
                    type="date"
                    className={cn(inputClass, "pl-10")}
                  />
                </div>
              </div>
            </div>

            {/* Salary & Frequency */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="minSalary" className={labelClass}>
                  Min Salary / Rate
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 size-[18px] text-[#a0a0ab]" />
                  <Input
                    id="minSalary"
                    name="minSalary"
                    type="number"
                    placeholder="25"
                    className={cn(inputClass, "pl-9")}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="maxSalary" className={labelClass}>
                  Max Salary / Rate
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 size-[18px] text-[#a0a0ab]" />
                  <Input
                    id="maxSalary"
                    name="maxSalary"
                    type="number"
                    placeholder="40"
                    className={cn(inputClass, "pl-9")}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="frequency" className={labelClass}>
                  Frequency
                </Label>
                <div className="relative">
                  <select
                    id="frequency"
                    name="frequency"
                    className={selectClass}
                    defaultValue="per hour"
                  >
                    <option
                      value="per hour"
                      className="bg-[#1e1e21] text-white"
                    >
                      per hour
                    </option>
                    <option
                      value="per month"
                      className="bg-[#1e1e21] text-white"
                    >
                      per month
                    </option>
                    <option
                      value="per year"
                      className="bg-[#1e1e21] text-white"
                    >
                      per year
                    </option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-3 -translate-y-1/2 text-[#a0a0ab]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: Responsibilities & Requirements */}
        <div className="space-y-5 rounded-2xl bg-[#151516] p-6 pb-10">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-[#5c53fe]" />
            <h2 className="text-base font-medium leading-6 text-white">
              3. Responsibilities & Requirements
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="responsibilities" className={labelClass}>
                Key Responsibilities{" "}
                <span className="font-normal text-[#5c53fe]">*</span>
              </Label>
              <Textarea
                id="responsibilities"
                name="responsibilities"
                rows={4}
                required
                placeholder="Showcase your commitment to delivering exceptional user interfaces and digital experiences..."
                className="h-[98px] rounded-xl border-0 bg-[#1e1e21] p-4 text-sm leading-[22px] text-white placeholder:text-[#5a5a60] focus-visible:ring-2 focus-visible:ring-[#5c53fe]/50 resize-none"
              />
            </div>

            <div>
              <Label htmlFor="requirements" className={labelClass}>
                Qualifications & Requirements{" "}
                <span className="font-normal text-[#5c53fe]">*</span>
              </Label>
              <Textarea
                id="requirements"
                name="requirements"
                rows={4}
                required
                placeholder="• 3+ years of experience with React, TypeScript...&#10;• Solid understanding of DOM performance..."
                className="h-[98px] rounded-xl border-0 bg-[#1e1e21] p-4 text-sm leading-[22px] text-white placeholder:text-[#5a5a60] focus-visible:ring-2 focus-visible:ring-[#5c53fe]/50 resize-none"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

import {
  CircleDollarSign,
  Infinity as InfinityIcon,
  Laptop,
  ShieldCheck,
} from "lucide-react";
import { JobDetailsBody } from "@/components/browse-jobs/detail-job/JobDetailsBody";
import { JobDetailsHeader } from "@/components/browse-jobs/detail-job/JobDetailsHeader";

// Static placeholder using the same shape as the jobs API response.
const job = {
  title: "Full Stack Developer (MERN)",
  companyName: "TechNova Solutions",
  category: "engineering",
  location: "",
  deadline: "2027-01-15",
  minSalary: "5000",
  maxSalary: "8000",
  frequency: "per month",
  responsibilities:
    "Design and implement scalable RESTful APIs using Express.js and MongoDB.\n\nIntegrate backend services with Next.js frontends, ensuring seamless user experiences and robust authentication flows.",
  requirements:
    "4+ years of hands-on MERN stack experience.\n\nDeep understanding of Next.js, Node.js, and MongoDB aggregation pipelines.\n\nExperience with OAuth, Better Auth, and secure JWT-based authentication.",
  isRemote: true,
  jobType: "Contract",
};

// Static UI content — the jobs API shape has no benefits field.
const benefits = [
  { label: "Full Health & Dental", icon: ShieldCheck },
  { label: "Competitive 401k", icon: CircleDollarSign },
  { label: "Latest Hardware Stipend", icon: Laptop },
  { label: "Unlimited PTO", icon: InfinityIcon },
];

const JobDetailsPage = () => {
  return (
    <main className="min-h-screen bg-[#0b0b0c] px-4 pt-28 pb-16 text-white sm:px-6">
      <div className="mx-auto w-full max-w-[1200px]">
        <JobDetailsHeader job={job} />
        <JobDetailsBody job={job} benefits={benefits} />
      </div>
    </main>
  );
};

export default JobDetailsPage;

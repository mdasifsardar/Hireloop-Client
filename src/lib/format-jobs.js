const frequencyLabels = {
  "per hour": "hr",
  "per month": "mo",
  "per year": "yr",
};

export const formatJobSalary = (job) => {
  const frequency = frequencyLabels[job.frequency] || job.frequency;
  const min = Number(job.minSalary).toLocaleString("en-US");
  const max = Number(job.maxSalary).toLocaleString("en-US");

  return `$${min} – $${max} / ${frequency}`;
};

export const formatJobLocation = (job) => {
  if (!job.location) {
    return job.isRemote ? "Remote" : "";
  }

  if (!job.isRemote) {
    return job.location;
  }

  return job.location.toLowerCase().includes("remote")
    ? job.location
    : `${job.location} (Remote)`;
};

export const formatJobCategory = (category) =>
  category ? category.charAt(0).toUpperCase() + category.slice(1) : "";

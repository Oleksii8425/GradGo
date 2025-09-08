import type { Job } from "~/types";

interface JobDetailsProps {
  job: Job;
};

function JobDetails({ job }: JobDetailsProps) {
  return (
    <div className="flex-2 max-h-full flex flex-col items-start overflow-scroll rounded-lg p-4 border border-slate-500">
      <p className="text-xs">{job.emplyerName}</p>
      <h1 className="text-2xl font-bold">{job.title}</h1>
      <p className="text-xs mb-2">
        {job.city}, {job.countryName}
        {" · "}
        {job.applicantsNo} applicants
      </p>
      <div className="flex gap-2 mt-1 *:cursor-default">
        <p className="p-2 rounded-full border">
          {job.salary}{job.currencySymbol}
        </p>
        <p className="p-2 rounded-full border">
          {job.type}
        </p>
      </div>
      <button className="rounded-full p-2 mt-2 bg-slate-700 hover:bg-slate-800">
        Apply
      </button>
      <h1 className="mt-4 mb-2 text-2xl font-bold">About the job</h1>
      {/*<div className="flex gap-2 mb-4">
        {
          job.skills.map((skill) =>
            <p className="p-2 rounded-full bg-slate-700">
              {skill.title}
            </p>
          )
        }
      </div>*/}
      <div className="flex flex-col overflow-scroll">
        <p className="text-justify pr-2">{job.description}</p>
      </div>
    </div>
  );
}

export default JobDetails;

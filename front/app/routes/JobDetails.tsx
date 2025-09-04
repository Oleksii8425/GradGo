import type { Job } from "~/Types";

interface JobDetailsProps {
  job: Job;
};

function JobDetails({ job }: JobDetailsProps) {
  return (
    <div className="flex-3 max-h-full flex flex-col overflow-scroll rounded-lg p-4 border border-slate-500">
      <h1 className="text-2xl font-bold">{job.title}
        <a href="">
          - {job.emplyerName}
        </a>
      </h1>
      <p>{job.city}, {job.countryName}</p>
      <p>{job.salary}{job.currencySymbol}</p>
      <hr className="mt-2 mb-4" />
      <div className="flex gap-4 mb-4">
        {
          job.skills.map((skill) =>
            <p className="p-3 rounded-full bg-slate-700 hover:bg-slate-800">
              {skill.title}
            </p>
          )
        }
      </div>
      <div className="flex flex-col overflow-scroll">
        <p className="text-justify">{job.description}</p>
      </div>
    </div>
  );
}

export default JobDetails;

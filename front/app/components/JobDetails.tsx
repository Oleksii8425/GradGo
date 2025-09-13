import type { Job } from "~/types";
import { useAuth } from "./auth/AuthContext";
import { useEffect, useState } from "react";

interface JobDetailsProps {
  job: Job;
};

function JobDetails({ job }: JobDetailsProps) {
  const { user } = useAuth();
  const [applied, setApplied] = useState<boolean>(false);

  useEffect(() => {
    if (!user) return;

    const checkApplied = async () => {
      try {
        const res = await fetch(
          `http://localhost:5272/jobs/${job.id}/applied/${user.id}`
        );

        if (!res.ok) throw new Error("Failed to check application status");

        const applied = await res.json();
        setApplied(applied);
      } catch (err) {
        console.error(err);
      }
    };

    checkApplied();
  }, [job, user]);

  const onApply = async () => {
    const body = {
      jobseekerId: user?.id,
      jobId: job.id
    };

    const res = await fetch(
      "http://localhost:5272/applications",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      }
    );

    if (!res.ok) {
      const error = await res.json().catch(() => null);
      alert(error?.message ?? "Something went wrong");
      return;
    }
  };

  return (
    <div className="flex-2 max-h-full flex flex-col items-start overflow-scroll rounded-lg p-4 border border-slate-500">
      <div className="w-full flex justify-between">
        <div>
          <p className="text-xs">{job.employerName}</p>
          <h1 className="text-2xl font-bold">{job.title}</h1>
          <p className="text-xs mb-2">
            {job.city}, {job.countryName}
            {" · "}
            {job.applicantsNo} applicants
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <button
            className="rounded-full p-2 mt-2 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-700 disabled:text-gray-400"
            onClick={() => onApply()}
            disabled={applied}
          >
            {applied ? "Applied" : "Apply"}
          </button>
          <button className="rounded-full p-2 mt-2 border border-slate-500 hover:border-slate-400 hover:bg-slate-800">
            Save
          </button>
        </div>
      </div>
      <div className="flex gap-2 mt-1 *:cursor-default">
        <p className="p-2 rounded-full border">
          {job.salary}{job.currencySymbol}
        </p>
        <p className="p-2 rounded-full border">
          {job.type}
        </p>
      </div>
      <h1 className="mt-4 mb-2 text-2xl font-bold">About the job</h1>
      <div className="w-full flex flex-col overflow-y-scroll">
        <p className="text-justify pr-2 wrap-break-word">
          {job.description}
        </p>
      </div>
      <div className="flex w-full gap-2 mt-2">
        {
          job.skills.map((skill) =>
            <p className="p-2 rounded-full bg-slate-700">
              {skill.title}
            </p>
          )
        }
      </div>
    </div>
  );
}

export default JobDetails;

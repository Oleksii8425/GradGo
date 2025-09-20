import type { Job } from "~/types";
import { useAuth } from "./auth/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

interface JobDetailsProps {
  job: Job;
};

function JobDetails({ job }: JobDetailsProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
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

  return (
    <div className="flex-2 flex flex-col items-start overflow-scroll rounded-lg p-4 border">
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
          {/*Apply button*/}
          <button
            className="rounded-full p-2 mt-2 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-700 disabled:text-gray-400"
            onClick={() => navigate(`/apply/${job.id}`)}
            disabled={applied}
          >
            {applied ? "Applied" : "Apply"}
          </button>

          {/*Save button*/}
          <button
            className="rounded-full p-2 mt-2 border hover:border-slate-400 hover:bg-slate-800">
            Save
          </button>
        </div>
      </div>
      <div className="flex gap-2 mt-1 *:cursor-default">
        {/*Salary*/}
        <p className="p-2 rounded-full border">
          {job.salary}{job.currencySymbol}
        </p>

        {/*Type*/}
        <p className="p-2 rounded-full border">
          {job.type}
        </p>
      </div>

      {/*Skills*/}
      <div className="flex w-full gap-2 mt-2">
        {job.skills.map(s => s.title).join(", ")}
      </div>

      <h1 className="mt-4 mb-2 text-2xl font-bold">About the job</h1>
      <div className="w-full flex flex-col">
        {/*Description*/}
        <p className="text-justify pr-2 wrap-break-word">
          {job.description}
        </p>
      </div>
    </div>
  );
}

export default JobDetails;

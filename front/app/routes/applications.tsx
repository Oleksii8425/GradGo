import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { Application } from "~/types";

interface ApplicationProps {
  application: Application;
}

function Application({ application }: ApplicationProps) {
  return (
    <div className="flex flex-col gap-1 p-4 rounded-lg bg-slate-800">
      <span>{application.appliedOn.substring(0, 10)}</span>
      <span>{application.jobTitle} - {application.employerName} ({application.status})</span>
    </div>
  );
}

function Applications() {
  const { jobseekerId } = useParams<{ jobseekerId: string }>();
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    const fetchApplications = async () => {
      const params = new URLSearchParams();
      if (jobseekerId) params.set("jobseekerId", jobseekerId);

      try {
        const res = await fetch(`http://localhost:5272/applications?${params}`);

        if (!res.ok)
          throw new Error("Failed to fetch applications");

        const data = await res.json();
        setApplications(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchApplications();
  }, [jobseekerId]);

  return (
    <ul className="w-full min-w-[100px] max-w-5xl">
      {
        applications.map(a => (
          <li key={a.id}>
            <Application application={a} />
          </li>
        ))
      }
    </ul>
  );
}

export default Applications;

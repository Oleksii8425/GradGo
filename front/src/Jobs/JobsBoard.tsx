import { useEffect, useState } from "react";
import Job from "./Job";
import JobDetails from "./JobDetails";

interface Job {
  id: string,
  title: string,
  description: string,
  type: string,
  employerName: string,
  salary: number,
  city: string,
  country: Country,
  requiredDegree: string,
  applicantsNo: number,
  skills: Skill[]
}

interface Country {
  id: number,
  countryCode: string,
  name: string,
  phoneCode: string,
  currencyCode: string,
  currencySymbol: string
}

interface Skill {
  id: number,
  title: string
}

function JobsBoard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelecetedJob] = useState<Job | null>(null);

  useEffect(() => {
    const url = "https://localhost:7086/jobs";

    fetch(url)
      .then(res => {
        if (!res.ok) console.error("Error occurred");
        return res.json();
      })
      .then((data: Job[]) => {
        setJobs(data);
      })
      .catch((e: Error) => {
        console.error(e.message)
      });
  }, []);

  return (
    <div className="jobs-board">
      <div className="card-container">
        {jobs.map(j => (
          <Job
            key={j.id}
            title={j.title}
            employer={j.employerName}
            type={j.type}
            city={j.city}
            country={j.country}
            onClick={() => setSelecetedJob(j)}
          />
        ))}
      </div>
      {selectedJob &&
        <JobDetails {...selectedJob} />
      }
    </div>
  );
}

export default JobsBoard;

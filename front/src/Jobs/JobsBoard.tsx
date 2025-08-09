import { useEffect, useState } from "react";
import Job from "./Job";
import JobDetails from "./JobDetails";
import './JobsBoard.css';

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

const baseUrl = 'https://localhost:7086/jobs';

function JobsBoard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelecetedJob] = useState<Job | null>(null);
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  useEffect(() => {
    fetch(baseUrl)
      .then(res => {
        if (!res.ok) console.error("Error occurred");
        return res.json();
      })
      .then((data: Job[]) => {
        setSelecetedJob(data[0]);
        setJobs(data);
      })
      .catch((e: Error) => {
        alert(e.message)
      });
  }, []);

  const onSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    const q = searchKeyword.trim();
    const url = q ? `${baseUrl}?keyword=${encodeURIComponent(q)}` : baseUrl;
    const res = await fetch(url);

    if (!res.ok) {
      alert("Failed to fetch jobs using filter=\"" + searchKeyword + "\"");
      return;
    }

    setJobs(await res.json());
    setSelecetedJob(jobs.length > 0 ? jobs[0] : null);
  };

  return (
    <div className="main-container">
      <form className="search-bar" onSubmit={onSearch}>
        <input
          type="text"
          placeholder="Search..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
      <div className="job-container">
        <div className="job-list">
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
        {
          selectedJob &&
          <JobDetails {...selectedJob} />
        }
      </div>
    </div>
  );
}

export default JobsBoard;

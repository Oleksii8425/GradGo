import { useState, useEffect } from "react";
import { useAuth } from "~/Components/Auth/AuthContext";
import CountrySelector from "~/Components/JobCreate/CountrySelector";
import DegreeSelector from "~/Components/JobCreate/DegreeSelector";
import SalaryInput from "~/Components/JobCreate/SalaryInput";
import SkillSelector from "~/Components/JobCreate/SkillSelector";
import TypeSelector from "~/Components/JobCreate/TypeSelector";
import { Degree, JobType, type Country, type Job } from "~/Types";
import JobDetails from "./JobDetails";

export default function JobsPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showAddJobForm, setShowAddJobForm] = useState<boolean>(false);
  const [title, setTitle] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [skills, setSkills] = useState<number[]>([]);
  const [country, setCountry] = useState<Country | null>(null);
  const [type, setType] = useState<JobType | null>(null);
  const [salary, setSalary] = useState<string>("");
  const [city, setCity] = useState<string | null>(null);
  const [degree, setDegree] = useState<Degree | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { user, loading } = useAuth();
  const [jobsLoading, setJobsLoading] = useState(true);

  useEffect(() => {
    if (loading) return;

    async function fetchJobs() {
      try {
        const res = await fetch(
          user?.role === "Employer"
            ? `http://localhost:5272/jobs?employerId=${user.id}`
            : "http://localhost:5272/jobs"
        );

        if (!res.ok) throw new Error("Failed to fetch jobs");

        const data = await res.json();
        setJobs(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setJobsLoading(false);
      }
    }

    async function fetchCountries() {
      try {
        const res = await fetch("http://localhost:5272/countries");

        if (!res.ok) throw new Error("Failed to fetch countries");

        const data = await res.json();
        setCountry(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setJobsLoading(false);
      }
    }

    fetchJobs();
    fetchCountries();
  }, [user, loading]);

  const createJob = async (e: React.FormEvent) => {
    e.preventDefault();

    const body = {
      employerId: user?.id,
      countryId: country?.id,
      title,
      description,
      type,
      salary,
      city,
      requiredDegree: degree,
      skills,
      applications: []
    };

    console.log(body);

    const res = await fetch(
      "http://localhost:5272/jobs",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      }
    );

    if (!res.ok)
      setError("Failed to create a job");

    alert('Job created successfully');
  }

  if (loading || jobsLoading) {
    return <div className="p-6">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="w-4/6 min-w-[100px] max-w-3xl h-full flex flex-col rounded-lg p-4 bg-slate-900">
      {/*Employer controls*/}
      {user?.role === "Employer" && (
        <div className="w-full flex flex-col overflow-scroll gap-4">
          <div className="flex justify-items-start gap-1">
            <button
              onClick={() => setShowAddJobForm(!showAddJobForm)}
              className="bg-slate-700 hover:bg-slate-800 rounded-lg px-4 py-2 cursor-pointer"
            >
              Add Job
            </button>
          </div>
          {showAddJobForm && (
            <form
              className="flex flex-col gap-4 flex-1 min-h-0 overflow-y-auto"
              onSubmit={createJob}
            >
              <input
                type="text"
                name="title"
                id="title"
                placeholder="Title"
                required
                value={title ?? ""}
                onChange={(e) => setTitle(e.target.value)}
                className="border rounded-lg p-2"
              />
              <textarea
                minLength={100}
                placeholder="Description"
                required
                value={description ?? ""}
                onChange={(e) => setDescription(e.target.value)}
                className="border rounded-lg p-2 min-h-11 max-h-76"
              />
              <CountrySelector onChange={setCountry} />
              <input
                type="text"
                name="city"
                id="city"
                placeholder="City"
                required
                value={city ?? ""}
                onChange={(e) => setCity(e.target.value)}
                className="border rounded-lg p-2"
              />
              <TypeSelector onChange={setType} />
              <SalaryInput
                currencySymbol={country?.currencySymbol ?? ""}
                onChange={setSalary}
              />
              <DegreeSelector onChange={setDegree} />
              <SkillSelector onChange={setSkills} />
              <div className="flex justify-end">
                <input
                  type="submit"
                  value="Add"
                  className="bg-slate-700 hover:bg-slate-800 rounded-lg px-4 py-2 cursor-pointer"
                />
              </div>
            </form>
          )}
        </div>
      )}

      {jobs.length > 0 && (
        <div className="flex gap-4 w-full flex-1 pt-4 overflow-hidden">
          <ul className="flex-1 overflow-y-auto">
            {jobs.map((job) => (
              <li
                key={job.id}
                onClick={() => setSelectedJob(job)}
                className={`mb-2 p-2 rounded-lg hover:bg-slate-800 ${selectedJob?.id === job.id ? "bg-slate-800" : ""}`}
              >
                {job.title}
              </li>
            ))}
          </ul>
          {selectedJob &&
            <JobDetails
              job={selectedJob}
            />
          }
        </div>
      )
      }
    </div>
  );
}

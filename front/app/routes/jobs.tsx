import { useState, useEffect } from "react";
import { useAuth } from "~/components/Auth/AuthContext";
import CountrySelector from "~/components/JobCreate/CountrySelector";
import DegreeSelector from "~/components/JobCreate/DegreeSelector";
import SalaryInput from "~/components/JobCreate/SalaryInput";
import SkillSelector from "~/components/JobCreate/SkillSelector";
import TypeSelector from "~/components/JobCreate/TypeSelector";
import { Degree, JobType, type Country } from "~/types";

export default function JobsPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [showAddJobForm, setShowAddJobForm] = useState<boolean>(false);
  const [title, setTitle] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [skills, setSkills] = useState<number[]>([]);
  const [country, setCountry] = useState<Country | null>(null);
  const [type, setType] = useState<JobType | null>(null);
  const [salary, setSalary] = useState<string>("");
  const [city, setCity] = useState<string | null>(null);
  const [degree, setDegree] = useState<Degree | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
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
        setLoading(false);
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
        setLoading(false);
      }
    }

    fetchJobs();
    fetchCountries();
  }, []);

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

  if (loading) {
    return <div className="p-6">Loading jobs...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="min-w-[600px] max-w-3xl w-full flex flex-col rounded-xl p-4 bg-slate-900">
      <h1 className="text-xl font-bold mb-4 border-b">Jobs</h1>

      {/*Employer controls*/}
      {user?.role === "Employer" && (
        <div className="w-full flex flex-col gap-4">
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
              className="flex flex-col gap-4"
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
                className="border rounded-lg p-2 min-h-11"
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

      <ul className="list-disc p-4">
        {jobs.map((job) => (
          <li key={job.id}>{job.title}</li>
        ))}
      </ul>
    </div>
  );
}

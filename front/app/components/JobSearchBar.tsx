import { useState } from "react";
import CountrySelector from "./CountrySelector";
import { Degree, JobType, type Country, type Job } from "~/types";
import TypeSelector from "./TypeSelector";
import DegreeSelector from "./DegreeSelector";
import { Tooltip } from "@material-tailwind/react";

interface JobSearchBarProps {
  onSearch: (res: Job[]) => void;
};

function JobSearchBar({ onSearch }: JobSearchBarProps) {
  const [keywords, setKeywords] = useState<string>("");
  const [requiredDegree, setRequiredDegree] = useState<Degree | null>(null);
  const [city, setCity] = useState<string>("");
  const [country, setCountry] = useState<Country | null>(null);
  const [type, setType] = useState<JobType | null>(null);

  const [advancedSearch, setAdvancedSearch] = useState<boolean>(false);

  const filterJobs = async () => {
    const params = new URLSearchParams();

    if (keywords) keywords.split(",").forEach(k => params.append("keywords", k.trim()));
    if (requiredDegree !== undefined && requiredDegree !== null) params.set("requiredDegree", requiredDegree.toString());
    if (city) params.set("city", city);
    if (country) params.set("countryId", country.id.toString());
    if (type !== undefined && type !== null) params.set("type", type.toString());

    const url = `http://localhost:5272/jobs?${params.toString()}`;
    console.log(url);

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to filter jobs");

      const jobs = await res.json();
      onSearch(jobs);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mb-2">
      <div className="w-full flex items-center flex-wrap gap-1 mb-2">
        <div className="w-full flex-1 flex gap-2 flex-wrap">
          <Tooltip
            placement="bottom-start"
            content={
              <div className="bg-slate-600 p-2 rounded-lg">
                Keywords, Employers or Skills separated by comma
              </div>
            }
          >
            <input
              id="keywords"
              name="keywords"
              type="text"
              placeholder="Keywords, Employers or Skills"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              className="flex-1 min-w-1/4 rounded-lg border p-1 hover:border-white"
            />
          </Tooltip>

          <input
            id="city"
            name="city"
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-1 min-w-1/4 w-full rounded-lg border p-1 hover:border-white"
          />

          <CountrySelector
            onChange={setCountry}
            className="flex-1 min-w-1/4 w-full"
            placeholder="Country"
          />
        </div>

        <button
          className="rounded-full w-9 h-9 ml-2 hover:cursor-pointer group"
          onClick={() => filterJobs()}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 stroke-gray-300 group-hover:stroke-white">
            <path
              d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <button
        onClick={() => setAdvancedSearch(!advancedSearch)}
        className="p-2"
      >
        Advanced Search
      </button>

      {advancedSearch && (
        <div className="flex w-1/2 gap-2">
          <DegreeSelector
            onChange={setRequiredDegree}
            className="flex-1 min-w-1/4 w-full"
            placeholder="Degree"
          />

          <TypeSelector
            onChange={setType}
            className="flex-1 min-w-1/4 w-full"
            placeholder="Type"
          />
        </div>
      )}
    </div>
  );
}

export default JobSearchBar;
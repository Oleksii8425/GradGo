import './Job.css';

import type { Country } from "./../types";

interface JobProps {
  title: string;
  employer: string;
  type: string;
  city: string;
  country: Country;
  onClick?: () => void;
}

function Job({
  title,
  employer,
  type,
  city,
  country,
  onClick
}: JobProps) {
  return (
    <div className="job" onClick={onClick}>
      <h1 className="job-title">{title}</h1>
      <p>{employer}</p>
      <p>{type} - {city}, {country.name}</p>
    </div>
  );
}

export default Job;
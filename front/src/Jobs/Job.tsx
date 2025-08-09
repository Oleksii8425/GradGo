import './Job.css';

interface JobProps {
  title: string;
  employer: string;
  type: string;
  city: string;
  country: Country;
  onClick?: () => void;
}

interface Country {
  id: number,
  countryCode: string,
  name: string,
  phoneCode: string,
  currencyCode: string,
  currencySymbol: string
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
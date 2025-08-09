import './JobDetails.css';

interface JobDetailsProps {
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

function JobDetails({
  id,
  title,
  description,
  type,
  employerName,
  salary,
  city,
  country,
  requiredDegree,
  applicantsNo,
  skills
}: JobDetailsProps) {
  return (
    <div key={id} className="job-details">
      <h1 className="job-details__title">{title}</h1>
      <p>{employerName}</p>
      <p>{type} - {city}, {country.name}</p>
      <p>{country.currencySymbol}{salary}</p>
      <p>{applicantsNo} applied</p>
      <div className="toolbar">
        <button className="toolbar__button">Apply</button>
        <button className="toolbar__button">Save</button>
      </div>
      <hr className="job-details__spacer" />
      <p className="job-details__content">{description}</p>
      <h1 className="job-details__category-title">Skills</h1>
      <div className="job-details__skills-container">
        {skills.map(s => (
          <p key={s.id} className="job-details__skill">{s.title}</p>
        ))}
      </div>
      <div>
        <h1 className="job-details__category-title">Degree</h1>
        <p>{requiredDegree}</p>
      </div>
    </div>
  );
}

export default JobDetails;
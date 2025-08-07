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
    <div key={id} className="card-details">
      <h1 className="card-details__title">{title}</h1>
      <p>{employerName}</p>
      <p>{type} - {city}, {country.name}</p>
      <p>{country.currencySymbol}{salary}</p>
      <p>{applicantsNo} applied</p>
      <button>Apply</button>
      <button>Save</button>
      <hr className="card-details__spacer" />
      <p className="card-details__content">{description}</p>
      <h1 className="card-details__category-title">Skills</h1>
      <div className="card-details__skills-container">
        {skills.map(s => (
          <p key={s.id} className="card-details__skill">{s.title} • </p>
        ))}
      </div>
      <div>
        <h1 className="card-details__category-title">Degree</h1>
        <p>{requiredDegree}</p>
      </div>
    </div>
  );
}

export default JobDetails;
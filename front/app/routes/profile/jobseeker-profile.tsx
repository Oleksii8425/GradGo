import type { Jobseeker } from "~/types";
import ProfileHeader from "./profile-header";
import ProfileCard from "./profile-card";
import { useNavigate } from "react-router";

interface JobseekerProfileProps {
  jobseeker: Jobseeker;
}

function JobseekerProfile({ jobseeker }: JobseekerProfileProps) {
  const navigate = useNavigate();

  const APPLICATIONS_SHOWN_NO = 3;

  return (
    <div className="max-w-4xl flex-1 rounded-lg flex flex-col gap-4 items-center">
      <div className="w-full rounded-lg p-4 flex flex-col gap-2 items-center bg-slate-900">
        {/* Header */}
        <ProfileHeader
          name={`${jobseeker.firstName} ${jobseeker.lastName}`}
          role="Jobseeker"
        />

        {/* Location */}
        <p className="text-gray-400 text-sm italic">
          {jobseeker.city && jobseeker.country?.name
            ? `${jobseeker.city}, ${jobseeker.country.name}`
            : "🌍 Location not set"}
        </p>

        {/* Info rows */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ProfileCard label="📱 Phone" value={jobseeker.phoneNumber || "N/A"} />
          <ProfileCard label="🎂 Age" value={jobseeker.age?.toString() || "N/A"} />
          <ProfileCard label="👤 Email" value={jobseeker.userName} />
        </div>

        {/* Bio */}
        <div className="w-full">
          {jobseeker.bio || (
            <span className="text-gray-500 italic">
              No bio provided yet...
            </span>
          )}
        </div>
      </div>

      <div
        onClick={() => navigate(`/applications/${jobseeker.id}`)}
        className="w-full rounded-lg p-4 flex flex-col gap-2 bg-slate-900 hover:cursor-pointer"
      >
        <p className="text-lg font-semibold">Applications</p>
        {jobseeker.applications.length > 0 && (
          <>
            <ul className="self-start w-full">
              {jobseeker.applications.slice(0, APPLICATIONS_SHOWN_NO).map(a => {
                return (
                  <li
                    key={a.id}>
                    <div className="flex flex-col gap-1 p-4 rounded-lg bg-slate-800">
                      <span>{a.appliedOn.substring(0, 10)}</span>
                      <span>{a.jobTitle} - {a.employerName} ({a.status})</span>
                    </div>
                  </li>
                );
              })}
            </ul>
            <span className="pl-4 text-lg font-bold">. . .</span></>
        )}
      </div>


      <div className="w-full rounded-lg p-4 bg-slate-900">
        {/* Skills */}
        {jobseeker.skills && jobseeker.skills.length > 0 && (
          <div className="w-full">
            <h2 className="text-lg font-semibold mb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {jobseeker.skills.map((skill) => (
                <span
                  key={skill.id}
                  className="px-4 py-1 rounded-full bg-emerald-700 hover:bg-emerald-600 transition text-sm font-medium select-none"
                >
                  {skill.title}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default JobseekerProfile;

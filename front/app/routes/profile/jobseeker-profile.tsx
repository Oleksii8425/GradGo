import type { Jobseeker } from "~/types";
import ProfileHeader from "./profile-header";
import ProfileCard from "./profile-card";

interface JobseekerProfileProps {
  jobseeker: Jobseeker;
}

function JobseekerProfile({ jobseeker }: JobseekerProfileProps) {
  return (
    <div className="max-w-4xl flex-1 bg-slate-900 rounded-2xl shadow-lg p-8 flex flex-col gap-4 items-center text-white">
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
        <ProfileCard label="👤 Username" value={jobseeker.userName} />
      </div>

      {/* Bio */}

      {jobseeker.bio || (
        <span className="text-gray-500 italic">
          No bio provided yet...
        </span>
      )}

      {jobseeker.applications.length > 0 || <ul>
        {jobseeker.applications.map(a => {
          return (
            <li key={a.id}>
              {a.}
            </li>
          );
        })}
      </ul>}

      {/* Buttons */}
      <div className="w-full flex justify-start gap-4">
        <button className="bg-slate-700 hover:bg-slate-600 rounded-lg px-4 py-2 font-medium transition">
          View Applications
        </button>
      </div>


      {/* Skills */}
      {jobseeker.skills && jobseeker.skills.length > 0 && (
        <div className="w-full">
          <h2 className="text-lg font-semibold mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {jobseeker.skills.map((skill) => (
              <span
                key={skill.id}
                className="px-4 py-1 rounded-full bg-emerald-700 hover:bg-emerald-600 transition text-sm font-medium shadow"
              >
                {skill.title}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default JobseekerProfile;

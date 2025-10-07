import type { Employer } from "~/types";
import ProfileRow from "./profile-row";
import ProfileHeader from "./profile-header";
import ProfileCard from "./profile-card";

interface EmployerProfileProps {
  employer: Employer;
}

function EmployerProfile({ employer }: EmployerProfileProps) {
  return (
    <div className="max-w-3xl min-h-0 flex-1 bg-slate-900 rounded-lg p-6 flex flex-col items-center">
      <ProfileHeader name={employer.name} role={"Employer"} />

      {/* Location */}
      <p className="text-gray-400">
        {employer.city && employer.country?.name
          ? `${employer.city}, ${employer.country.name}`
          : "Location not set"}
      </p>

      {/* Info rows */}
      <div className="mt-6 w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ProfileCard label="Staff Count" value={employer.staffCount} />
        <ProfileCard label="Email" value={employer.email} />
        <ProfileCard label="Phone" value={employer.phoneNumber} />
      </div>

      {/* Bio */}
      <div className="flex-1 w-full max-h-50 mt-6 p-2 rounded-lg border overflow-scroll">
        {employer.bio}
      </div>
    </div>
  );
}

export default EmployerProfile;

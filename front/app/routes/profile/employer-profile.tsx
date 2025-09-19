import type { Employer } from "~/types";
import ProfileRow from "./profile-row";
import ProfileHeader from "./profile-header";

interface EmployerProfileProps {
  employer: Employer;
}

function EmployerProfile({ employer }: EmployerProfileProps) {
  return (
    <div className="self-center max-w-xl flex-1 bg-slate-900 rounded-2xl p-8 flex flex-col items-center">
      <ProfileHeader userName={employer.userName} role={"Employer"} />

      <div className="mt-6 space-y-3 w-full">
        <ProfileRow label="Company Name" value={employer.name} />
        <ProfileRow label="Staff Count" value={employer.staffCount} />
        <ProfileRow label="Phone" value={employer.phoneNumber} />
        <ProfileRow
          label="Location"
          value={employer.city && employer.country?.name ? `${employer.city}, ${employer.country.name}` : null}
        />
      </div>
    </div>
  );
}

export default EmployerProfile;

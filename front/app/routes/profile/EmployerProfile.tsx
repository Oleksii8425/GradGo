import ProfileRow from "./ProfileRow";
import type { Employer } from "~/types";
import ProfileHeader from "./ProfileHeader";

interface EmployerProfileProps {
  employer: Employer;
}

function EmployerProfile({ employer }: EmployerProfileProps) {
  return (
    <div className="self-center max-w-xl flex-1 bg-slate-900 rounded-2xl p-8 flex flex-col items-center">
      <ProfileHeader userName={employer.userName} />

      <div className="mt-6 space-y-3 w-full">
        <ProfileRow label="Company Name" value={employer.name} />
        <ProfileRow label="Staff Count" value={employer.staffCount} />
        <ProfileRow label="Email" value={employer.email} />
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

import type { Jobseeker } from "~/types";
import ProfileRow from "./profile-row";
import ProfileHeader from "./profile-header";

interface JobseekerProfileProps {
  jobseeker: Jobseeker;
}

function JobseekerProfile({ jobseeker }: JobseekerProfileProps) {
  return (
    <div className="self-center max-w-xl flex-1 bg-slate-900 rounded-2xl p-8 flex flex-col items-center">
      <ProfileHeader userName={jobseeker.userName} role={"Jobseeker"} />

      <div className="mt-6 space-y-3 w-full">
        <ProfileRow label="First Name" value={jobseeker.firstName} />
        <ProfileRow label="Last Name" value={jobseeker.lastName} />
        <ProfileRow label="Age" value={jobseeker.age} />
        <ProfileRow label="Phone" value={jobseeker.phoneNumber} />
        <ProfileRow
          label="Location"
          value={jobseeker.city && jobseeker.country?.name ? `${jobseeker.city}, ${jobseeker.country.name}` : null}
        />
      </div>
    </div>
  );
}

export default JobseekerProfile;

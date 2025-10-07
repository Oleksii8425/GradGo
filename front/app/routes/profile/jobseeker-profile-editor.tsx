import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "~/components/auth/AuthContext";
import type { Country, Jobseeker } from "~/types";
import CountrySelector from "~/components/CountrySelector";
import SkillSelector from "~/components/SkillSelector";
import sendRequestAsync from "~/components/sendRequest";

function JobseekerProfileEditor() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState<string>((user as Jobseeker)?.firstName ?? "");
  const [lastName, setLastName] = useState<string>((user as Jobseeker)?.lastName ?? "");
  const [age, setAge] = useState<number>((user as Jobseeker)?.age);
  const [phoneNumber, setPhoneNumber] = useState<string>(user?.phoneNumber ?? "");
  const [city, setCity] = useState<string>(user?.city ?? "");
  const [country, setCountry] = useState<Country | null>(null);
  const [bio, setBio] = useState<string>(user?.bio ?? "");
  const [skills, setSkills] = useState<number[]>([]);

  const onSave = async () => {
    const jobseeker = user as Jobseeker;

    const body = {
      ...(firstName !== jobseeker.firstName && { firstName }),
      ...(lastName !== jobseeker.lastName && { lastName }),
      ...(age !== jobseeker.age && { age }),
      ...(phoneNumber !== jobseeker.phoneNumber && { phoneNumber }),
      ...(city !== jobseeker.city && { city }),
      ...(country && country?.id !== jobseeker.country.id && { countryId: country.id }),
      ...(bio !== jobseeker.bio && { bio }),
      ...(JSON.stringify(skills) !== JSON.stringify(jobseeker.skills.map(s => s.id)) && { skills })
    };

    const updated = await sendRequestAsync(
      `http://localhost:5272/jobseekers/${user?.id}`,
      "PUT",
      body
    );

    updateUser(updated);

    navigate("/profile");
  };

  return (
    <div className="w-full max-w-3xl bg-slate-900 p-4 rounded-lg flex flex-col overflow-scroll">
      <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
      <form
        className="w-full flex flex-col gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          onSave();
        }}
      >
        <table className="border-separate border-spacing-y-2">
          <tbody>
            <tr>
              <td>First Name</td>
              <td>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full rounded-lg p-2 border"
                />
              </td>
            </tr>
            <tr>
              <td>Last Name</td>
              <td>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full rounded-lg p-2 border"
                />
              </td>
            </tr>
            <tr>
              <td>Age</td>
              <td>
                <input
                  type="number"
                  min={16}
                  max={100}
                  id="age"
                  name="age"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full rounded-lg p-2 border"
                />
              </td>
            </tr>
            <tr>
              <td>Phone Number</td>
              <td>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full rounded-lg p-2 border"
                />
              </td>
            </tr>
            <tr>
              <td>City</td>
              <td>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full rounded-lg p-2 border"
                />
              </td>
            </tr>
            <tr>
              <td>Country</td>
              <td>
                <CountrySelector
                  value={user?.country.id}
                  onChange={setCountry}
                  className="w-full"
                />
              </td>
            </tr>
            <tr>
              <td className="align-top">Bio</td>
              <td>
                <textarea
                  name="bio"
                  id="bio"
                  rows={10}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full p-2 rounded-lg border"
                >
                  {user?.bio}
                </textarea>
              </td>
            </tr>
            <tr>
              <td className="align-top">Skills</td>
              <td>
                <SkillSelector
                  onChange={setSkills}
                  selected={(user as Jobseeker)?.skills.map(s => s.id)}
                  className="w-full"
                />
              </td>
            </tr>
          </tbody>
        </table>

        <div className="flex gap-2 justify-end">
          <button
            type="button"
            className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-500"
            onClick={() => navigate("/profile")}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default JobseekerProfileEditor;

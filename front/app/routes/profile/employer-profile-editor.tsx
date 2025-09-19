import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "~/components/auth/AuthContext";
import CountrySelector from "~/components/CountrySelector";
import sendRequestAsync from "~/components/sendRequest";
import StaffCountSelector from "~/components/StaffCountSelector";
import type { StaffCount, Country, Employer } from "~/types";

function EmployerProfileEditor() {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState<string>((user as Employer)?.name);
  const [phoneNumber, setPhoneNumber] = useState<string>((user as Employer)?.phoneNumber);
  const [city, setCity] = useState<string>((user as Employer)?.city);
  const [country, setCountry] = useState<Country | null>((user as Employer)?.country);
  const [staffCount, setStaffCount] = useState<StaffCount | null>((user as Employer)?.staffCount);
  const navigate = useNavigate();

  const onSave = async () => {
    const employer = user as Employer;

    const body = {
      ...(name !== employer.name && { name }),
      ...(phoneNumber !== employer.phoneNumber && { phoneNumber }),
      ...(city !== employer.city && { city }),
      ...(country && country?.id !== employer.country.id && { countryId: country.id }),
      ...(staffCount !== employer.staffCount && { staffCount })
    };

    const updated = await sendRequestAsync(
      `http://localhost:5272/employers/${user?.id}`,
      "PUT",
      body
    );

    updateUser(updated);

    navigate("/profile");
  };

  return (
    <div className="self-center w-full max-w-xl bg-slate-900 p-4 rounded-lg">
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
              <td>Name</td>
              <td>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
              <td>Staff Count</td>
              <td>
                <StaffCountSelector
                  onChange={setStaffCount}
                  selected={(user as Employer).staffCount} />
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

export default EmployerProfileEditor;

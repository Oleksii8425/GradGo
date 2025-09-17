import { useState } from "react";
import { StaffCount, type Country } from "~/types";
import { useNavigate } from "react-router";
import submitForm from "../submitForm";
import CountrySelector from "../job-form/CountrySelector";

interface EmployerRegisterFormProps {
  countries: Country[]
}

function EmployerRegisterForm({ countries }: EmployerRegisterFormProps) {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [staffCount, setStaffCount] = useState<StaffCount | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrors(["Passwords do not match"]);
      return;
    }

    const url = "http://localhost:5272/users/register/employer";

    const body = {
      role: "Employer",
      name,
      phoneNumber,
      email,
      password,
      confirmPassword,
      countryId: selectedCountry,
      city,
      bio,
      staffCount
    };

    submitForm(
      url,
      body,
      setErrors,
      navigate,
      "/confirm-email"
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 w-full max-w-xl bg-slate-900 rounded-lg"
    >
      <input
        type="text"
        name="name"
        id="name"
        placeholder="Company Name"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border rounded-lg p-2"
      />

      <input
        type="text"
        name="city"
        id="city"
        placeholder="City"
        required
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="border rounded-lg p-2"
      />

      <CountrySelector onChange={setSelectedCountry} placeholder="Country" />

      <input
        type="text"
        name="bio"
        id="bio"
        placeholder="Bio"
        required
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        className="border rounded-lg p-2"
      />

      <select
        name="staffCount"
        id="staffCount"
        className={`border rounded-lg p-2 bg-slate-900 text-gray-300 ${!staffCount && "text-gray-500"}`}
        required
        value={staffCount ?? ""}
        onChange={(e) => setStaffCount(Number(e.target.value) as StaffCount)}
      >
        <option value="" disabled hidden>
          Number of staff
        </option>
        <option key={StaffCount.LessThan50} value={StaffCount.LessThan50}>Less than 50</option>
        <option key={StaffCount.Between50And100} value={StaffCount.Between50And100}>Between 50 and 100</option>
        <option key={StaffCount.Between100And500} value={StaffCount.Between100And500}>Between 100 and 500</option>
        <option key={StaffCount.MoreThan500} value={StaffCount.MoreThan500}>More than 500</option>
      </select>

      <input
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        pattern="^[A-Za-z0-9._+\-']+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border rounded-lg p-2"
      />

      <input
        type="text"
        name="phoneNumber"
        id="phoneNumber"
        placeholder="Phone Number"
        required
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        className="border rounded-lg p-2 text-gray-300"
      />

      <input
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        minLength={8}
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border rounded-lg p-2"
      />

      <input
        type="password"
        name="confirmPassword"
        id="confirmPassword"
        placeholder="Confirm Password"
        required
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="border rounded-lg p-2"
      />

      {
        errors.length > 0 && (
          <ul className="text-red-500 list-none text-sm">
            {errors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        )
      }

      < button
        type="submit"
        className="bg-emerald-700 text-white rounded-lg py-2 hover:bg-emerald-600"
      >
        Register
      </button>
    </form>
  );
}

export default EmployerRegisterForm;

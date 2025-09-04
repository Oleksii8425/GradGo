import { useState } from "react";
import { StaffCount, type Country } from "~/Types";
import { useNavigate } from "react-router";
import submitForm from "../submitForm";

interface EmployerRegisterFormProps {
  countries: Country[]
}

function EmployerRegisterForm({ countries }: EmployerRegisterFormProps) {
  const [selectedCountry, setSelectedCountry] = useState<number | "">("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [staffCount, setStaffCount] = useState<StaffCount | "">("");
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
      className="flex flex-col gap-4 w-full max-w-xl bg-slate-900 p-6 rounded-b-xl"
    >
      <input
        type="text"
        name="name"
        id="name"
        placeholder="Company Name"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border rounded px-3 py-2"
      />

      <select
        name="countries"
        id="countries"
        className="border rounded px-3 py-2 bg-slate-900 text-gray-300"
        required
        value={selectedCountry}
        onChange={(e) => setSelectedCountry(Number(e.target.value))}
      >
        <option value="" disabled hidden>
          Country
        </option>
        {countries.map((country: Country) => (
          <option key={country.id} value={country.id}>
            {country.name}
          </option>
        ))}
      </select>

      <input
        type="text"
        name="city"
        id="city"
        placeholder="City"
        required
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="border rounded px-3 py-2"
      />

      <input
        type="text"
        name="bio"
        id="bio"
        placeholder="Bio"
        required
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        className="border rounded px-3 py-2"
      />

      <select
        name="staffCount"
        id="staffCount"
        className="border rounded px-3 py-2 bg-slate-900 text-gray-300"
        required
        value={staffCount}
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
        className="border rounded px-3 py-2"
      />

      <input
        type="text"
        name="phoneNumber"
        id="phoneNumber"
        placeholder="Phone Number"
        required
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        className="border rounded px-3 py-2 text-gray-300"
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
        className="border rounded px-3 py-2"
      />

      <input
        type="password"
        name="confirmPassword"
        id="confirmPassword"
        placeholder="Confirm Password"
        required
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="border rounded px-3 py-2"
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
        className="bg-green-700 text-white rounded py-2 hover:bg-green-900"
      >
        Register
      </button>
    </form>
  );
}

export default EmployerRegisterForm;

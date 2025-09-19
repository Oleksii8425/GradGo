import { useState } from "react";
import type { StaffCount, Country } from "~/types";
import sendRequestAsync from "../sendRequest";
import CountrySelector from "../CountrySelector";
import StaffCountSelector from "../StaffCountSelector";

function EmployerRegisterForm() {
  const [country, setCountry] = useState<Country | null>(null);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [staffCount, setStaffCount] = useState<StaffCount | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

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
      countryId: country?.id,
      city,
      bio,
      staffCount
    };

    sendRequestAsync(
      url,
      "POST",
      body,
      setErrors
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 w-full max-w-xl bg-slate-900 p-6 rounded-lg"
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

      <CountrySelector onChange={setCountry} placeholder="Country" />

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

      <StaffCountSelector onChange={setStaffCount} placeholder="" />

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

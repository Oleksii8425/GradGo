import { useState } from "react";
import type { Country, Course, Skill } from "~/types";
import SkillSelector from "../job-form/SkillSelector";
import submitForm from "../submitForm";
import { useNavigate } from "react-router";

interface JobseekerRegisterFormProps {
  countries: Country[],
  courses: Course[]
}

function JobseekerRegisterForm({ countries, courses }: JobseekerRegisterFormProps) {
  const [selectedCountry, setSelectedCountry] = useState<number | "">("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [age, setAge] = useState<number | null>(null);
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [selectedCourses, setSelectedCourses] = useState<number[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<number[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrors(["Passwords do not match"]);
      return;
    }

    const url = "http://localhost:5272/users/register/jobseeker";

    const body = {
      role: "Jobseeker",
      firstName,
      lastName,
      age,
      phoneNumber,
      email,
      password,
      confirmPassword,
      city,
      countryId: selectedCountry,
      bio,
      skills: selectedSkills
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
        name="firstName"
        id="firstName"
        placeholder="First Name"
        required
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        className="border rounded px-3 py-2 text-gray-300"
      />

      <input
        type="text"
        name="lastName"
        id="lastName"
        placeholder="Last Name"
        required
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        className="border rounded px-3 py-2 text-gray-300"
      />

      <input
        type="number"
        name="age"
        id="age"
        placeholder="Age"
        required
        value={age ?? ""}
        onChange={(e) => setAge(Number(e.target.value))}
        className="border rounded px-3 py-2 text-gray-300"
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
        className="border rounded px-3 py-2 text-gray-300"
      />

      <textarea
        name="bio"
        id="bio"
        placeholder="Bio"
        required
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        className="border rounded px-3 py-2 min-h-[40px] text-gray-300"
      />

      <select
        name="courses"
        id="courses"
        className="border rounded px-3 py-2 bg-slate-900 text-gray-300"
        onChange={(e) => setSelectedCourses([...selectedCourses, Number(e.target.value)])}
      >
        {courses.map((course: Course) => (
          <option key={course.id} value={course.id}>
            {course.name}
          </option>
        ))}
      </select>

      <SkillSelector onChange={setSelectedSkills} />

      <input
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        pattern="^[A-Za-z0-9._+\-']+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border rounded px-3 py-2 text-gray-300"
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
        className="border rounded px-3 py-2 text-gray-300"
      />

      <input
        type="password"
        name="confirmPassword"
        id="confirmPassword"
        placeholder="Confirm Password"
        required
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="border rounded px-3 py-2 text-gray-300"
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
        className="bg-green-700 rounded py-2 hover:bg-green-900 text-gray-300"
      >
        Register
      </button>
    </form>
  );
}

export default JobseekerRegisterForm;

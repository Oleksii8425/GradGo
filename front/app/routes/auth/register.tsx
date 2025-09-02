import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import EmployerRegisterForm from "~/components/Auth/EmployerRegisterForm";
import JobseekerRegisterForm from "~/components/Auth/JobseekerRegisterForm";
import type { Country, Course } from "~/types";

function Register() {
  const [role, setRole] = useState<"jobseeker" | "employer">("employer");
  const [countries, setCountries] = useState<Country[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch("http://localhost:5272/countries");

        if (!res.ok) throw new Error("Failed to fetch countries");

        const data = await res.json();
        setCountries(data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchCourses = async () => {
      try {
        const res = await fetch("http://localhost:5272/courses");

        if (!res.ok) throw new Error("Failed to fetch courses");

        const data = await res.json();
        setCourses(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCountries();
    //fetchCourses();
  }, []);

  return (
    <div className="flex flex-col min-h-screen py-2 items-center justify-center overflow-scroll">
      <motion.div
        layout
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="flex flex-col overflow-hidden w-full max-w-xl rounded-xl items-center bg-slate-900"
      >
        <div className="flex w-full max-w-xl rounded-t-xl justify-center">
          <button
            onClick={() => setRole("jobseeker")}
            className={`min-h-full w-full p-4 rounded-tl-xl text-gray-300 border-b-2
              ${role === "jobseeker"
                ? "bg-slate-900 border-green-700"
                : "bg-slate-900 border-slate-900"}
              `}
          >
            Jobseeker
          </button>
          <button
            onClick={() => setRole("employer")}
            className={`min-h-full w-full p-4 rounded-tr-xl text-gray-300 border-b-2
              ${role === "employer"
                ? "bg-slate-900 border-b-2 border-green-700"
                : "bg-slate-900 border-slate-900"}
              `}
          >
            Employer
          </button>
        </div>

        <motion.div
          layout
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="w-full"
        >
          <div className={role === "jobseeker" ? "block" : "hidden"}>
            <JobseekerRegisterForm countries={countries} courses={courses} />
          </div>
          <div className={role === "employer" ? "block" : "hidden"}>
            <EmployerRegisterForm countries={countries} />
          </div>
        </motion.div>

        <p className="text-gray-300 mb-6">
          Already registered?{" "}
          <a href="/login" className="hover:text-green-700">
            Login.
          </a>
        </p>
      </motion.div>
    </div>
  );
}

export default Register;

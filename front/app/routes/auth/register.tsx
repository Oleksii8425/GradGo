import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import EmployerRegisterForm from "~/components/auth/EmployerRegisterForm";
import JobseekerRegisterForm from "~/components/auth/JobseekerRegisterForm";
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
    <motion.div
      layout
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="flex flex-col gap-4 px-4 overflow-hidden w-full max-w-xl rounded-lg items-center bg-slate-900"
    >
      <div className="flex w-full max-w-xl rounded-t-lg justify-center">
        <button
          onClick={() => setRole("jobseeker")}
          className={`min-h-full w-full p-4 rounded-tl-lg text-gray-300 border-b-2
              ${role === "jobseeker"
              ? "bg-slate-900 border-emerald-700"
              : "bg-slate-900 border-slate-900"}
              `}
        >
          Jobseeker
        </button>
        <button
          onClick={() => setRole("employer")}
          className={`min-h-full w-full p-4 rounded-tr-lg text-gray-300 border-b-2
              ${role === "employer"
              ? "bg-slate-900 border-emerald-700"
              : "bg-slate-900 border-slate-900"}
              `}
        >
          Employer
        </button>
      </div>

      <motion.div
        layout
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="w-full overflow-scroll"
      >
        <div className={role === "jobseeker" ? "block" : "hidden"}>
          <JobseekerRegisterForm courses={courses} />
        </div>
        <div className={role === "employer" ? "block" : "hidden"}>
          <EmployerRegisterForm />
        </div>
      </motion.div>

      <p className="text-gray-300 mb-4">
        Already registered?{" "}
        <a href="/login" className="hover:text-emerald-600">
          Login.
        </a>
      </p>
    </motion.div>
  );
}

export default Register;

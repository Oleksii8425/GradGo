import { useEffect, useState } from "react";
import type { Employer } from "~/types";

interface EmployerSelectorProps {
  onChange: (type: string[]) => void;
  className?: string;
  placeholder?: string;
};

function EmployerSelector({ onChange, className, placeholder }: EmployerSelectorProps) {
  const [employers, setEmployers] = useState<Employer[]>([]);
  const [selectedEmployers, setSelectedEmployers] = useState<string[]>([]);

  useEffect(() => {
    const fetchEmployers = async () => {
      try {
        const res = await fetch("http://localhost:5272/employers");
        if (!res.ok) throw new Error("Failed to fetch employers");

        const data = await res.json();
        setEmployers(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEmployers();
  }, []);

  useEffect(() => {
    onChange(selectedEmployers);
  }, [selectedEmployers, onChange]);

  return (
    <div className={`${className ?? ""}`}>
      <select
        name="employers"
        id="employers"
        className="w-full border rounded-lg p-2 bg-slate-900 text-gray-300"
        value=""
        onChange={(e) => {
          const value = e.target.value;
          if (!value) return;
          if (!selectedEmployers.includes(value)) {
            setSelectedEmployers([...selectedEmployers, value]);
          }
        }}
      >
        <option value="" disabled>
          {placeholder ?? ""}
        </option>
        {employers.map((employer: Employer) => (
          <option key={employer.id} value={employer.id}>
            {employer.name}
          </option>
        ))}
      </select>

      {selectedEmployers.length > 0 && (
        <div className="flex flex-wrap w-full gap-2 mt-2">
          {employers
            .filter((employer) => selectedEmployers.includes(employer.id))
            .map((employer) => (
              <div
                key={employer.id}
                className="flex items-center space-x-2 px-2 py-1 w-max rounded-full bg-slate-700 text-green-600"
              >
                <span className="select-none cursor-default text-gray-300">
                  {employer.name}
                </span>
                <svg
                  focusable="false"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  onClick={() =>
                    setSelectedEmployers(selectedEmployers.filter((e) => e !== employer.id))
                  }
                  className="w-5 h-5 rounded-full hover:fill-gray-300 cursor-pointer"
                >
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default EmployerSelector;

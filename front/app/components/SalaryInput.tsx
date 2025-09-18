import React, { useEffect, useState } from "react";

interface SalaryInputProps {
  currencySymbol: string;
  onChange: (salary: string) => void;
}

function SalaryInput({ currencySymbol, onChange }: SalaryInputProps) {
  const [salary, setSalary] = useState<string>("-1");

  useEffect(() => {
    onChange(salary);
  }, [salary, onChange]);

  const handleSalaryChange = (value: string) => {
    value = value.replace(/^0+/, '');

    if (value === "")
      setSalary("0");
    else
      setSalary(value);

    onChange(salary);
  };

  return (
    <div className="flex gap-4">
      <div className="relative flex-1">
        <input
          type="text"
          name="salary"
          id="salary"
          placeholder="Salary"
          value={salary === "0" || salary === "-1" ? "" : salary}
          onChange={(e) => handleSalaryChange(e.target.value)}
          onKeyDown={(event) => {
            if (!/[0-9]/.test(event.key) && event.key !== "Backspace" && event.key !== "Tab") {
              event.preventDefault();
            }
          }}
          className="border rounded-lg p-2 w-full pr-6"
        />
        {salary && (
          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-300">
            {currencySymbol}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <input
          type="radio"
          id="negotiableSalary"
          name="salaryOption"
          checked={salary === "-1"}
          onChange={() => handleSalaryChange("-1")}
        />
        <label htmlFor="negotiableSalary" className="text-gray-300">
          Negotiable
        </label>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="radio"
          id="noSalary"
          name="salaryOption"
          checked={salary === "0"}
          onChange={() => handleSalaryChange("0")}
        />
        <label htmlFor="noSalary" className="text-gray-300">
          No Salary
        </label>
      </div>
    </div>
  );
}

export default SalaryInput;

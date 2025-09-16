import { useEffect, useState } from "react";
import { JobType } from "~/types";

interface TypeSelectorProps {
  onChange: (type: JobType | null) => void;
  className?: string;
  placeholder?: string;
};

function TypeSelector({ onChange, className, placeholder }: TypeSelectorProps) {
  const [type, setType] = useState<JobType | null>(null);

  useEffect(() => {
    onChange(type);
  }, [type, onChange]);

  return (
    <select
      name="jobTypes"
      id="jobTypes"
      className={`border border-slate-500 rounded-lg px-2 py-2 bg-slate-900 text-gray-300 ${className ?? ""}`}
      value={type ?? ""}
      required
      onChange={(e) => {
        const value = Number(e.target.value);
        setType(isNaN(value) ? null : (value as JobType));
      }}
    >
      <option value="" disabled>
        {placeholder ?? ""}
      </option>
      <option value={Number(JobType.OnSite)}>On Site</option>
      <option value={Number(JobType.Remote)}>Remote</option>
      <option value={Number(JobType.Hybrid)}>Hybrid</option>
    </select>
  );
}

export default TypeSelector;

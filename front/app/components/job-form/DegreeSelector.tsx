import { useEffect, useState } from "react";
import { Degree } from "~/types";

interface DegreeSelectorProps {
  onChange: (degree: Degree | null) => void;
};

function DegreeSelector({ onChange }: DegreeSelectorProps) {
  const [degree, setDegree] = useState<Degree | null>(null);

  useEffect(() => {
    onChange(degree);
  }, [degree, onChange]);

  return (
    <select
      name="degree"
      id="degree"
      className="border border-slate-500 rounded px-2 py-2 bg-slate-900 text-gray-300"
      value={degree ?? ""}
      required
      onChange={(e) => {
        const value = Number(e.target.value);
        setDegree(isNaN(value) ? null : (value as Degree));
      }}
    >
      <option value="" disabled>
        -- Select a required degree --
      </option>
      <option value={Number(Degree.Bachelors)}>Bachelors</option>
      <option value={Number(Degree.Masters)}>Masters</option>
      <option value={Number(Degree.Doctors)}>Doctors</option>
    </select>
  );
}

export default DegreeSelector;

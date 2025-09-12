import { useEffect, useState } from "react";
import { Degree } from "~/types";

interface DegreeSelectorProps {
  onChange: (type: Degree | null) => void;
  className?: string;
  placeholder?: string;
};

function DegreeSelector({ onChange, className, placeholder }: DegreeSelectorProps) {
  const [selectedDegree, setSelectedDegree] = useState<Degree | null>(null);

  useEffect(() => {
    onChange(selectedDegree);
  }, [selectedDegree, onChange]);

  return (
    <div className={`${className ?? ""}`}>
      <select
        name="degrees"
        id="degrees"
        className="w-full border rounded-lg p-2 bg-slate-900 text-gray-300"
        value={selectedDegree ?? ""}
        onChange={(e) => {
          setSelectedDegree(Number(e.target.value));
        }}
      >
        <option value="" disabled>
          {placeholder ?? ""}
        </option>
        <option key={Degree.Bachelors} value={Degree.Bachelors}>
          Bachelors
        </option>
        <option key={Degree.Doctors} value={Degree.Doctors}>
          Doctors
        </option>
        <option key={Degree.Masters} value={Degree.Masters}>
          Masters
        </option>
      </select>
    </div>
  );
}

export default DegreeSelector;

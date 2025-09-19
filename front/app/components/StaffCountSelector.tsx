import { useEffect, useState } from "react";
import { StaffCount } from "~/types";

interface StaffCountSelectorProps {
  onChange: (staffCount: StaffCount | null) => void;
  className?: string;
  placeholder?: string;
  selected?: StaffCount;
}

function StaffCountSelector({ onChange, className, placeholder, selected }: StaffCountSelectorProps) {
  const [staffCount, setStaffCount] = useState<StaffCount | null>(selected ?? null);

  useEffect(() => {
    onChange(staffCount);
  }, [staffCount, onChange]);

  return (
    <div className={`${className ?? ""}`}>
      <select
        name="staffCount"
        id="staffCount"
        className={`w-full border rounded-lg p-2 bg-slate-900 text-gray-300 ${staffCount === null && "text-gray-500"}`}
        required
        value={staffCount ?? ""}
        onChange={(e) => setStaffCount(e.target.value as StaffCount)}
      >
        <option value="" disabled hidden>
          {placeholder ?? ""}
        </option>
        <option
          key={StaffCount.LessThan50}
          value={StaffCount.LessThan50}
        >
          Less than 50
        </option>
        <option
          key={StaffCount.Between50And100}
          value={StaffCount.Between50And100}
        >
          50 to 100
        </option>
        <option
          key={StaffCount.Between100And500}
          value={StaffCount.Between100And500}
        >
          100 to 500
        </option>
        <option
          key={StaffCount.MoreThan500}
          value={StaffCount.MoreThan500}
        >
          More than 500
        </option>
      </select>
    </div >
  );
}

export default StaffCountSelector;

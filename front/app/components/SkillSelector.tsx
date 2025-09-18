import { useEffect, useState } from "react";
import type { Skill } from "~/types";

interface SkillSelectorProps {
  onChange: (selected: number[]) => void;
  className?: string;
  placeholder?: string;
  selected?: number[];
}

function SkillSelector({ onChange, className, placeholder, selected }: SkillSelectorProps) {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<number[]>(selected ?? []);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await fetch("http://localhost:5272/skills");
        if (!res.ok) throw new Error("Failed to fetch skills");

        const data = await res.json();
        setSkills(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSkills();
  }, []);

  useEffect(() => {
    onChange(selectedSkills);
  }, [selectedSkills, onChange]);

  return (
    <div className={`${className ?? ""}`}>
      <select
        name="skills"
        id="skills"
        className="w-full border rounded-lg p-2 bg-slate-900 text-gray-500"
        value=""
        onChange={(e) => {
          const value = Number(e.target.value);
          if (!value) return;
          if (!selectedSkills.includes(value)) {
            setSelectedSkills([...selectedSkills, value]);
          }
        }}
      >
        <option value="" disabled>
          {placeholder ?? ""}
        </option>
        {skills.map((skill: Skill) => (
          <option key={skill.id} value={skill.id}>
            {skill.title}
          </option>
        ))}
      </select>

      {selectedSkills.length > 0 && (
        <div className="flex flex-wrap w-full gap-2 mt-2">
          {skills
            .filter((skill) => selectedSkills.includes(skill.id))
            .map((skill) => (
              <div
                key={skill.id}
                className="flex items-center space-x-2 px-2 py-1 w-max rounded-full bg-slate-700 text-green-600"
              >
                <span className="select-none cursor-default text-gray-300">
                  {skill.title}
                </span>
                <svg
                  focusable="false"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  onClick={() =>
                    setSelectedSkills(selectedSkills.filter((s) => s !== skill.id))
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

export default SkillSelector;

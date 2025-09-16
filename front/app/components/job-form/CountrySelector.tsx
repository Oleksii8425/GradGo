import { useEffect, useState } from "react";
import type { Country } from "~/types";

interface CountrySelectorProps {
  onChange: (selected: Country | null) => void;
  className?: string;
  placeholder?: string;
  value?: number;
}

function CountrySelector({ onChange, className, placeholder, value }: CountrySelectorProps) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<number | null>(value ?? null);

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

    fetchCountries();
  }, []);

  useEffect(() => {
    const country = selectedCountry
      ? countries.find(c => c.id === selectedCountry) || null
      : null;

    onChange(country);
  }, [selectedCountry, countries, onChange]);

  return (
    <select
      name="countries"
      id="countries"
      className={`border rounded-lg px-2 py-2 bg-slate-900 text-gray-300 ${className ?? ""}`}
      value={selectedCountry || ""}
      required
      onChange={(e) => {
        const value = Number(e.target.value);

        if (selectedCountry != value) {
          setSelectedCountry(value);
        }
      }}
    >
      <option value="" disabled>
        {placeholder ?? ""}
      </option>
      {countries.map((country: Country) => (
        <option key={country.id} value={country.id}>
          {country.name}
        </option>
      ))}
    </select>
  );
}

export default CountrySelector;

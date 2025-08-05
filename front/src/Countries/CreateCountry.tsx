import { useState } from "react";

interface CreateCountryProps {
  onCreate: (country: Country) => void;
  onCancel: () => void;
  onError: (error: string) => void;
}

interface Country {
  id: number;
  phoneCode: string;
  name: string;
}

const baseUrl: string = "https://localhost:7086/countries/";

function CreateCountry({ onCreate, onCancel, onError }: CreateCountryProps) {
  const [name, setName] = useState<string>("");
  const [phoneCode, setPhoneCode] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const countryData = {
      phoneCode,
      name
    };

    try {
      const res = await fetch(baseUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(countryData)
      });

      if (!res.ok) throw new Error("Failed to create country");

      const newCountry = await res.json();
      onCreate(newCountry);
    } catch (err) {
      if (err instanceof Error) {
        onError(err.message);
      } else {
        onError("An unknown error occurred");
      }
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="phoneCode">Country Phone Code</label>
        <input
          type="text"
          name="phoneCode"
          id="phoneCode"
          value={phoneCode}
          onChange={(e) => setPhoneCode(e.target.value)}
        />
        <label htmlFor="name">Country Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div>
          <input className="control" type="submit" value="Create" />
          <button className="control" type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </>
  );
}

export default CreateCountry;
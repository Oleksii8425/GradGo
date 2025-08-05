import React, { useEffect, useState } from "react";

interface EditCountryProps {
  country: Country;
  onEdit: (country: Country) => void;
  onCancel: () => void;
  onError: (error: string) => void;
}

interface Country {
  id: number;
  phoneCode: string;
  name: string;
}

const baseUrl: string = "https://localhost:7086/countries/";

function EditCountry({ country, onEdit, onCancel, onError }: EditCountryProps) {
  const [id, setId] = useState<number>(-1);
  const [name, setName] = useState<string>("");
  const [phoneCode, setPhoneCode] = useState<string>("");

  useEffect(() => {
    setId(country.id);
    setPhoneCode(country.phoneCode);
    setName(country.name);
  }, [country]);

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();

    const countryData = {
      phoneCode,
      name
    };

    try {
      const res = await fetch(baseUrl + country.id,
        {
          headers: {"Content-Type": "application/json"},
          method: "PUT",
          body: JSON.stringify(countryData)
        }
      );

      if (!res.ok) throw new Error("Failed to update the country!");

      onEdit({id, phoneCode, name});
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
      <form onSubmit={handleEdit}>
        <label htmlFor="phoneCode">Country Phone Code</label>
        <input
          type="text"
          name="phoneCode"
          id="phoneCode"
          onChange={(e) => setPhoneCode(e.target.value)}
          value={phoneCode}
        />
        <label htmlFor="name">Country Name</label>
        <input
          type="text"
          name="name"
          id="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <div>
          <input className="control" type="submit" value="Update" />
          <button className="control" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </>
  );
}

export default EditCountry;
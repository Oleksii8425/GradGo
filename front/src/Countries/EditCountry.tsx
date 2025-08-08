import React, { useEffect, useState } from "react";

interface EditCountryProps {
  country: Country;
  onEdit: (country: Country) => void;
  onCancel: () => void;
  onError: (error: string) => void;
}

interface Country {
  id: number;
  countryCode: string;
  name: string;
  phoneCode: string;
  currencyCode: string;
  currencySymbol: string;
}

const baseUrl: string = "https://localhost:7086/countries/";

function EditCountry({ country, onEdit, onCancel, onError }: EditCountryProps) {
  const [id, setId] = useState<number>(-1);
  const [countryCode, setCountryCode] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phoneCode, setPhoneCode] = useState<string>("");
  const [currencyCode, setCurrencyCode] = useState<string>("");
  const [currencySymbol, setCurrencySymbol] = useState<string>("");

  useEffect(() => {
    setId(country.id);
    setCountryCode(country.countryCode);
    setName(country.name);
    setPhoneCode(country.phoneCode);
    setCurrencyCode(country.currencyCode);
    setCurrencySymbol(country.currencySymbol);
  }, [country]);

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();

    const countryData = {
      countryCode,
      phoneCode,
      name,
      currencyCode,
      currencySymbol
    };

    try {
      const res = await fetch(baseUrl + country.id,
        {
          headers: { "Content-Type": "application/json" },
          method: "PUT",
          body: JSON.stringify(countryData)
        }
      );

      if (!res.ok) throw new Error("Failed to update the country!");

      onEdit({ id, countryCode, name, phoneCode, currencyCode, currencySymbol });
    } catch (err) {
      if (err instanceof Error) {
        onError(err.message);
      } else {
        onError("An unknown error occurred");
      }
    }
  }

  return (
    <form style={{ flex: "1 1 1" }} onSubmit={handleEdit}>
      <label htmlFor="countryCode">Country Code</label>
      <input
        type="text"
        name="countryCode"
        id="countryCode"
        value={countryCode}
        onChange={(e) => setCountryCode(e.target.value)}
      />
      <label htmlFor="name">Country Name</label>
      <input
        type="text"
        name="name"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="phoneCode">Country Phone Code</label>
      <input
        type="text"
        name="phoneCode"
        id="phoneCode"
        value={phoneCode}
        onChange={(e) => setPhoneCode(e.target.value)}
      />
      <label htmlFor="currencyCode">Currency Code</label>
      <input
        type="text"
        name="currencyCode"
        id="currencyCode"
        value={currencyCode}
        onChange={(e) => setCurrencyCode(e.target.value)}
      />
      <label htmlFor="currencySymbol">Currency Symbol</label>
      <input
        type="text"
        name="currencySymbol"
        id="currencySymbol"
        value={currencySymbol}
        onChange={(e) => setCurrencySymbol(e.target.value)}
      />
      <div className="toolbar">
        <input className="toolbar__button" type="submit" value="Update" />
        <button className="toolbar__button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}

export default EditCountry;
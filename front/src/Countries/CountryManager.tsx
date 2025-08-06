import React, { useEffect, useState } from "react";
import CreateCountry from "./CreateCountry";
import EditCountry from "./EditCountry";

interface Country {
  id: number;
  countryCode: string;
  name: string;
  phoneCode: string;
  currencyCode: string;
  currencySymbol: string;
}

const baseUrl: string = "https://localhost:7086/countries/";

function CountryManager() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountryId, setSelectedCountryId] = useState<number | null>(null);
  const [creatingCountry, setCreatingCountry] = useState<boolean>(false);
  const [editingCountry, setEditingCountry] = useState<boolean>(false);

  useEffect(() => {
    fetch(baseUrl)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch countries!");
        return res.json();
      })
      .then((countries: Country[]) => {
        setCountries(countries);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError("Error: " + err.message);
      });
  }, []);

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(baseUrl + selectedCountryId, {
        method: "DELETE"
      });

      if (!response.ok) {
        throw new Error(`Failed to delete: ${response.status}`);
      }

      setCountries(countries.filter(c => c.id !== selectedCountryId));
      console.log("Delete successful");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  }

  const selectedCountry = countries.find(c => c.id === selectedCountryId);

  return (
    <>
      <header>
        <h1>Countries</h1>
        <div className="toolbar">
          <button
            className="toolbar__button toolbar__button--add"
            onClick={() => {
              setCreatingCountry(!creatingCountry);
              setEditingCountry(false);
            }}>
            Add
          </button>
          <button
            className="toolbar__button toolbar__button--edit"
            onClick={() => {
              setEditingCountry(!editingCountry);
              setCreatingCountry(false);
            }}>
            Edit
          </button>
          <button
            className="toolbar__button toolbar__button--delete"
            onClick={handleDelete}>
            Delete
          </button>
        </div>
      </header>
      {loading && <p>Loading...</p>}
      {error && <div className="error__container">
        <p className="error__message">Error: {error}</p>
        <button className="error__close" onClick={() => setError("")}>X</button>
      </div>}

      {
        creatingCountry &&
        (
          <CreateCountry
            onCreate={(newCountry) => {
              setCountries([...countries, newCountry]);
              setCreatingCountry(false);
            }}
            onCancel={() => setCreatingCountry(false)}
            onError={(error) => setError(error)}
          />
        )
      }

      {
        editingCountry && selectedCountry &&
        (
          <EditCountry
            country={selectedCountry}
            onEdit={(country) => {
              setCountries(countries.map((c) => {
                if (c.id === selectedCountryId) {
                  return {
                    ...c,
                    phoneCode: country.phoneCode,
                    name: country.name
                  };
                } else {
                  return c;
                }
              }));
              setEditingCountry(false);
            }}
            onCancel={() => setEditingCountry(false)}
            onError={(error) => setError(error)}
          />
        )
      }
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>ISO-2</th>
              <th>Name</th>
              <th>Phone Code</th>
              <th>Currency</th>
              <th>Currency Symbol</th>
            </tr>
          </thead>
          <tbody>
            {countries.map(c => (
              <tr
                key={c.id}
                onClick={() =>
                  setSelectedCountryId(prev => prev === c.id ? null : c.id)
                }
                className={selectedCountryId === c.id ? "table__row--selected" : ""}
              >
                <td>{c.id}</td>
                <td>{c.countryCode}</td>
                <td>{c.name}</td>
                <td>{c.phoneCode}</td>
                <td>{c.currencyCode}</td>
                <td>{c.currencySymbol}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default CountryManager;

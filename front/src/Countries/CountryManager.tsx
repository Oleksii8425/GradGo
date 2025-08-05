import React, { useEffect, useState } from "react";
import CreateCountry from "./CreateCountry";
import EditCountry from "./EditCountry";

interface Country {
  id: number,
  phoneCode: string,
  name: string
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
        <button
          className="toolbar__button toolbar__button--add"
          onClick={() => {
            setCreatingCountry(!creatingCountry);
            setEditingCountry(false);
          }}
        >Add Country</button>
        <button
          className="toolbar__button toolbar__button--edit"
          onClick={() => {
            setEditingCountry(!editingCountry);
            setCreatingCountry(false);
          }}
        >Edit Country</button>
        <button
          className="toolbar__button toolbar__button--delete"
          onClick={handleDelete}
        >Delete Country</button>
      </header>

      {loading && <p>Loading...</p>}
      {error && <p className="error">Error: {error}</p>}

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

      <table>
        <tr>
          <th style={{ width: "10%" }}>Id</th>
          <th style={{ width: "30%" }}>Phone Code</th>
          <th style={{ width: "50%" }}>Name</th>
        </tr>
        {countries.map(c => (
          <tr
            key={c.id}
            onClick={() =>
              setSelectedCountryId(prev => prev === c.id ? null : c.id)
            }
            className={selectedCountryId === c.id ? "table__row--selected" : ""}
          >
            <td>{c.id}</td>
            <td>{c.phoneCode}</td>
            <td>{c.name}</td>
          </tr>
        ))}
      </table>
    </>
  );
}

export default CountryManager;

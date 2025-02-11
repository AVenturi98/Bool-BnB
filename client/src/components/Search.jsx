import axios from "axios";
import { useState } from "react";

export default function Search() {
  const [city, setCity] = useState("");
  const [beds, setBeds] = useState("");
  const [rooms, setRooms] = useState("");
  const [building_type, setBuildingType] = useState("");
  const [data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Creazione dei parametri di query solo con valori validi
    const queryParams = new URLSearchParams();
    if (city) queryParams.append("city", city);
    if (beds) queryParams.append("beds", beds);
    if (rooms) queryParams.append("rooms", rooms);
    if (building_type) queryParams.append("building_type", building_type);

    axios
      .get(`http://localhost:3000/api/properties/ricerca?${queryParams}`)
      .then((response) => {
        setData(response.data);
        setErrorMessage(""); // Reset error message on successful fetch
      })
      .catch((error) => {
        console.error("Errore nella richiesta API:", error);
        setData([]);
        setErrorMessage("Nessuna proprietà trovata");
      });
  };

  return (
    <div className="md:max-w-md mx-auto p-4 border rounded-lg shadow-md bg-green-100">
      <h1 className="text-2xl font-bold mb-4">Ricerca Proprietà</h1>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          Città:
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full p-2 border border-green-300 rounded"
          />
        </label>
        <label className="block mb-2">
          Numero minimo di posti letto:
          <input
            type="number"
            value={beds}
            onChange={(e) => setBeds(e.target.value)}
            className="w-full p-2 border border-green-300 rounded"
          />
        </label>
        <label className="block mb-2">
          Numero minimo di stanze:
          <input
            type="number"
            value={rooms}
            onChange={(e) => setRooms(e.target.value)}
            className="w-full p-2 border border-green-300 rounded"
          />
        </label>
        <label className="block mb-2">
          Tipo di edificio:
          <input
            type="text"
            value={building_type}
            onChange={(e) => setBuildingType(e.target.value)}
            className="w-full p-2 border border-green-300 rounded"
          />
        </label>
        <button type="submit" className="mt-4 p-2 bg-green-500 text-white rounded hover:bg-green-600">
          Cerca
        </button>
      </form>
    </div>
  );
}

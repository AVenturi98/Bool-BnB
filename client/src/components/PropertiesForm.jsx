import { useState } from "react";
import axios from "axios";

const initialFormData = {
  title: "",
  rooms: "",
  beds: "",
  bathrooms: "",
  m2: "",
  address: "",
  city: "",
  building_type: "",
  email: "",
  img: "",
};

export default function PropertiesForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { value, name } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const token = localStorage.getItem("token");

    // Validazione dei numeri
    if (
      isNaN(formData.beds) ||
      isNaN(formData.rooms) ||
      isNaN(formData.bathrooms) ||
      isNaN(formData.m2)
    ) {
      alert("I letti, stanze, bagni o i m2 devono essere numeri");
      return;
    }

    // Invia i dati
    axios.post("http://localhost:3000/api/properties/", {...formData, token})
      .then(response => {
        console.log("Dati inviati correttamente:", response.data);
        alert("Dati inviati correttamente!");
        setFormData(initialFormData); // Resetta il modulo dopo l'invio
      })
      .catch(error => {
        console.error("Errore durante l'invio dei dati:", error);
        if (error.response) {
          // Mostra il messaggio di errore del server
          alert(`Errore: ${error.response.data.message}`);
        } else {
          alert("Si è verificato un errore. Riprova più tardi.");
        }
      });
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        className="w-full max-w-4xl bg-white p-8 shadow-md rounded-lg grid grid-cols-1 md:grid-cols-2 gap-6"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center col-span-2">
          Aggiungi un appartamento
        </h1>

        {/* Colonna 1 */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Nome dell'appartamento*
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="rooms" className="block text-sm font-medium text-gray-700">
            Numero di stanze*
          </label>
          <input
            id="rooms"
            name="rooms"
            value={formData.rooms}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="beds" className="block text-sm font-medium text-gray-700">
            Numero di letti*
          </label>
          <input
            id="beds"
            name="beds"
            value={formData.beds}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700">
            Numero di bagni*
          </label>
          <input
            id="bathrooms"
            name="bathrooms"
            value={formData.bathrooms}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="m2" className="block text-sm font-medium text-gray-700">
            Grandezza (m²)*
          </label>
          <input
            id="m2"
            name="m2"
            value={formData.m2}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        {/* Colonna 2 */}
        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Indirizzo*
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
            Città*
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="building_type" className="block text-sm font-medium text-gray-700">
            Tipo di costruzione
          </label>
          <input
            type="text"
            id="building_type"
            name="building_type"
            value={formData.building_type}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email*
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="img" className="block text-sm font-medium text-gray-700">
            URL immagine
          </label>
          <input
            type="text"
            id="img"
            name="img"
            value={formData.img}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <p className="text-sm text-red-500 col-span-2">{error}</p>
        <p className="text-sm col-span-2">* I campi devono essere obbligatori</p>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 col-span-2"
        >
          Invia
        </button>
      </form>
    </div>
  );
}

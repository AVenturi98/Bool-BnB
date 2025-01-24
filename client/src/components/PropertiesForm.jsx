import { useState } from "react";

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

export default function MailForm() {
  const [formData, setFormData] = useState(initialFormData);

  function handleChange(e) {
    const { value, name } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Dati inviati", formData);

    if (isNaN(formData.beds) || isNaN(formData.rooms) || isNaN(formData.bathrooms) || isNaN(formData.m2)) {
      alert("I letti, stanze, bagni o i m2 devono essere numeri")
      return
    }


    alert("Dati inviati correttamente!");
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        className="w-full max-w-lg bg-white p-8 shadow-md rounded-lg"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Aggiungi un appartamento
        </h1>

        {/* title */}
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
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

        {/* rooms */}
        <div className="mb-4">
          <label
            htmlFor="rooms"
            className="block text-sm font-medium text-gray-700"
          >
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

        {/* beds */}
        <div className="mb-4">
          <label
            htmlFor="beds"
            className="block text-sm font-medium text-gray-700"
          >
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

        {/* bathrooms */}
        <div className="mb-4">
          <label
            htmlFor="bathrooms"
            className="block text-sm font-medium text-gray-700"
          >
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

        {/* m2 */}
        <div className="mb-4">
          <label
            htmlFor="m2"
            className="block text-sm font-medium text-gray-700"
          >
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

        {/* address */}
        <div className="mb-4">
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700"
          >
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

        {/* city */}
        <div className="mb-4">
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700"
          >
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


        {/* building_type */}
        <div className="mb-4">
          <label
            htmlFor="building_type"
            className="block text-sm font-medium text-gray-700"
          >
            Tipo di costruzione
          </label>
          <input
            type="text"
            id="building_type"
            name="building_type"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        {/* email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
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

        {/* img */}
        <div className="mb-4">
          <label
            htmlFor="img"
            className="block text-sm font-medium text-gray-700"
          >
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
        <p className="text-sm">* I campi devono essere obbligatori</p>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Invia
        </button>
      </form>
    </div>
  );
}

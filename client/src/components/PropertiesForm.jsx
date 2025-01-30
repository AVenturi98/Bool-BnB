import { useState, useContext } from "react";
import axios from "axios";
import GoBackBtn from "./GoBackBtn";
import GlobalContext from "@/contexts/GlobalContext";
import {useAuth} from "@/contexts/AuthContext";

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
  description: "",
};

export default function PropertiesForm() {

  useAuth()  // Utilizza il context per controllare se l'utente è autenticato
  const setAuthenticated = () => {
    if (localStorage.getItem("token") !== null) {
      return true;
    } else {
      return false;
    }
  }
  const authenticated = setAuthenticated();
  if (authenticated === false) {
    return (
      <div className="container mx-auto p-4 mb-96 mt-32">
        <p className="text-red-600 text-3xl text-center">Devi effettuare il login per accedere a questa pagina.</p>
      </div>
    );
  }
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState("");

  const { setIsLoading } = useContext(GlobalContext)

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

    // Validazione
    if (
      isNaN(formData.beds) ||
      isNaN(formData.rooms) ||
      isNaN(formData.bathrooms) ||
      isNaN(formData.m2)
    ) {
      setError("I letti, stanze, bagni o i m2 devono essere numeri");
      return;
    }

    if (!formData.title || !formData.rooms || !formData.beds || !formData.bathrooms || !formData.m2 || !formData.address || !formData.city || !formData.email) {
      setError("Tutti i campi obbligatori devono essere compilati");
      return;
    }

    if (formData.title.length > 100) {
      setError("Il nome dell'appartamento non può superare i 100 caratteri");
      return;
    }

    if (formData.address.length > 60 || formData.city.length > 60) {
      setError("L'indirizzo e la città non possono superare i 60 caratteri");
      return;
    }

    if (formData.building_type.length > 50) {
      setError("Il tipo di costruzione non può superare i 50 caratteri");
      return;
    }

    if (formData.email.length > 100) {
      setError("L'indirizzo email non è valido");
      return;
    }

    if (formData.img.length > 255) {
      setError("L'url dell'immagine non può superare i 255 caratteri");
      return;
    }

    if (formData.rooms < 1 || formData.beds < 1 || formData.bathrooms < 1 || formData.m2 < 1) {
      setError("I letti, stanze, bagni e m2 devono essere maggiori di 0");
      return;
    }

    if (formData.title.trim() === "" || formData.address.trim() === "" || formData.city.trim() === "" || formData.email.trim() === "" || formData.description.trim() === "") {
      setError("I campi non possono essere vuoti");
      return;
    }

    setIsLoading(true)

    // Invia i dati
    axios.post("http://localhost:3000/api/properties/", { ...formData, token })
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
      })
      .finally(() => {
        setIsLoading(false)
        window.location.href = '/my-properties';
      })
  }

  return (
    <div className="bg-gray-100 py-5 pt-[105px]">
      <div className="container mt-5">
        <GoBackBtn />
      </div>
      <div className="flex justify-center items-center min-h-screen bg-gray-100 py-6 my-6">
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
              maxLength={255}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="rooms" className="block text-sm font-medium text-gray-700">
              Numero di stanze*
            </label>
            <input
              type="number"
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
              type="number"
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
              type="number"
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
              type="number"
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
              maxLength={60}
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
              maxLength={60}
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
              maxLength={50}
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
              maxLength={255}
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
              maxLength={255}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4 col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Descrizione*
            </label>
            <textarea
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              name="description"
              rows={4}
              id="description"
              value={formData.description}
              onChange={handleChange}
              maxLength={600}
            >
            </textarea>
          </div>
          <p className="text-sm text-red-600 col-span-2">{error}</p>
          <p className="text-sm col-span-2">* I campi devono essere obbligatori</p>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-cyan-600 transition hover:-translate-y-1 hover:scale-101 delay-100
 col-span-2"
          >
            Invia
          </button>
        </form>
      </div>
    </div>
  );
}

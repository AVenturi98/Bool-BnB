import { useState, useEffect } from "react";
import axios from "axios";

function CounterButton({ property }) {
  const [counter, setCounter] = useState(property.hearts);
  const propertyId = property.id;

  useEffect(() => {
    const fetchInitialCount = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/properties/${propertyId}/hearts`
        );
        setCounter(response.data.hearts);
      } catch (err) {
        console.error("Errore durante il recupero del contatore:", err);
      }
    };

    fetchInitialCount();
  }, [propertyId]);

  async function handleCounter() {
    const newCounter = counter + 1;
    setCounter(newCounter);

    try {
      await axios.post(
        `http://localhost:3000/api/properties/${propertyId}/hearts`,
        {
          hearts: newCounter,
        }
      );
      console.log(`Cuori: ${newCounter} e id: ${propertyId}`);
    } catch (err) {
      console.error("Errore durante l'aggiornamento dei cuori:", err);

      setCounter(counter);
    }
  }

  return (
    <button onClick={handleCounter}>
      <div className="relative inline-block hover:bg-slate-200 rounded-full p-1 mt-4">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-9 h-9 text-red-500 hover:text-red-700"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
        <span className="absolute -top-2 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-red-500 border-white rounded-full">
          {counter || 0}
        </span>
      </div>
    </button>
  );
}

export default CounterButton;

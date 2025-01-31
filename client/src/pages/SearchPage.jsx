import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../components/Card';
<<<<<<< HEAD
import { useNavigate, useSearchParams } from "react-router-dom";
=======
import { useEffect } from 'react';
import { useWindowWidth } from '@/contexts/WindowContext';
>>>>>>> b4f496b41c6993a95fdee5bdeadedc91be555ba9

export default function SearchPage() {
    const [data, setData] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    // Funzione per costruire la query URL e aggiornare lo stato della navigazione
    function urlQuery(city, beds, rooms, building_type) {
        const queryParams = new URLSearchParams();
        if (city) queryParams.set("city", city);
        if (beds) queryParams.set("beds", beds);
        if (rooms) queryParams.set("rooms", rooms);
        if (building_type) queryParams.set("building_type", building_type);

        navigate(`/ricerca?${queryParams.toString()}`);
    }

    // Funzione per recuperare i dati
    function fetchProperties(queryString) {
        axios.get(`http://localhost:3000/api/properties/ricerca?${queryString}`)
            .then((response) => {
                setData(response.data);
                setErrorMessage("");
            })
            .catch((error) => {
                console.error("Errore nella richiesta API:", error);
                setData([]);
                setErrorMessage("Nessuna proprietà trovata");
            });
    }

    useEffect(() => {
        fetchProperties()
    }, [])

<<<<<<< HEAD
    // Effettua la ricerca quando l'URL cambia
    useEffect(() => {
        const queryString = searchParams.toString();
        if (queryString) {
            fetchProperties(queryString);
        }
    }, [searchParams]);

    // Gestione della ricerca tramite form
    const handleSubmit = (e) => {
        e.preventDefault();
        const city = searchParams.get("city");
        const beds = searchParams.get("beds");
        const rooms = searchParams.get("rooms");
        const building_type = searchParams.get("building_type");
        urlQuery(city, beds, rooms, building_type);
    };
=======
    
     // Response Mobile Width
      const { windowWidth } = useWindowWidth();
      const mobileWidth = windowWidth >= 640
>>>>>>> b4f496b41c6993a95fdee5bdeadedc91be555ba9

    return (
        <div className='container mx-auto'>
<<<<<<< HEAD
            <div className="grid grid-cols-3 gap-3 px-6 py-12 lg:px-8 pt-[105px]">
                <div className='mt-9 col-span-1'>
                    <div className="max-w-md mx-auto p-4 border rounded-lg shadow-md bg-green-100">
                        <h1 className="text-2xl font-bold mb-4">Ricerca Proprietà</h1>
                        <form onSubmit={handleSubmit}>
                            <label className="block mb-2">
                                Città:
                                <input
                                    type="text"
                                    defaultValue={searchParams.get("city") || ""}
                                    onChange={(e) => setSearchParams(prev => {
                                        prev.set("city", e.target.value);
                                        return new URLSearchParams(prev);
                                    })}
                                    className="w-full p-2 border border-green-300 rounded"
                                />
                            </label>
                            <label className="block mb-2">
                                Numero minimo di posti letto:
                                <input
                                    type="number"
                                    defaultValue={searchParams.get("beds") || ""}
                                    onChange={(e) => setSearchParams(prev => {
                                        prev.set("beds", e.target.value);
                                        return new URLSearchParams(prev);
                                    })}
                                    className="w-full p-2 border border-green-300 rounded"
                                />
                            </label>
                            <label className="block mb-2">
                                Numero minimo di stanze:
                                <input
                                    type="number"
                                    defaultValue={searchParams.get("rooms") || ""}
                                    onChange={(e) => setSearchParams(prev => {
                                        prev.set("rooms", e.target.value);
                                        return new URLSearchParams(prev);
                                    })}
                                    className="w-full p-2 border border-green-300 rounded"
                                />
                            </label>
                            <label className="block mb-2">
                                Tipo di edificio:
                                <input
                                    type="text"
                                    defaultValue={searchParams.get("building_type") || ""}
                                    onChange={(e) => setSearchParams(prev => {
                                        prev.set("building_type", e.target.value);
                                        return new URLSearchParams(prev);
                                    })}
                                    className="w-full p-2 border border-green-300 rounded"
                                />
                            </label>
                            <button type="submit" className="mt-4 p-2 bg-green-500 text-white rounded hover:bg-green-600">
                                Cerca
                            </button>
                        </form>
=======
            <div className={mobileWidth ? "grid grid-cols-3 gap-3 px-6 py-12 lg:px-8 pt-[105px]" : 'm-1'}>
                <div className='my-9 col-span-1'>
                <div className={mobileWidth ? "sticky top-24" : ''}>
                        <Search />
>>>>>>> b4f496b41c6993a95fdee5bdeadedc91be555ba9
                    </div>
                </div>
                <div className='col-span-2'>
                    <h1 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        Risultati della ricerca
                    </h1>
                    {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {data.map((property) => (
                            <Card key={property.id} property={property} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

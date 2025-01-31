import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import { useNavigate, useSearchParams } from "react-router";
import GlobalContext from '@/contexts/GlobalContext';

export default function SearchPage() {

    const { setIsLoading } = useContext(GlobalContext)

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

        setIsLoading(true)

        axios.get(`http://localhost:3000/api/properties/ricerca?${queryString}`)
            .then((response) => {
                setData(response.data);
                setErrorMessage("");
            })
            .catch((error) => {
                console.error("Errore nella richiesta API:", error);
                setData([]);
                setErrorMessage("Nessuna proprietà trovata");
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    useEffect(() => {
        fetchProperties()
    }, [])

    // Effettua la ricerca quando l'URL cambia
    useEffect(() => {
        const queryString = searchParams.toString();
        if (queryString) {
            const timeout = setTimeout(() => {
                fetchProperties(queryString);
            }, 1000)

            return () => clearTimeout(timeout); // Cancella il timeout e il fetch se `searchParams` cambia
        }
    }, [searchParams])

    // Gestione della ricerca tramite form
    const handleSubmit = (e) => {
        e.preventDefault();
        const city = searchParams.get("city");
        const beds = searchParams.get("beds");
        const rooms = searchParams.get("rooms");
        const building_type = searchParams.get("building_type");
        urlQuery(city, beds, rooms, building_type);
    };

    return (
        <div className='container'>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 px-6 py-12 lg:px-8 sm:pt-[105px]">
                <div className='md:mt-14 col-span-12 md:col-span-1'>
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
                            <button type="submit" className="mt-4 p-2 bg-green-600 text-white rounded-md hover:bg-cyan-600 hover:scale-105 transition-transform ease-in-out duration-100">
                                Cerca
                            </button>
                        </form>
                    </div>
                </div>
                <div className='col-span-12 md:col-span-2'>
                    <h1 className="mb-5 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        Risultati della ricerca
                    </h1>
                    {errorMessage && <p className="text-red-500 text-xl text-center">{errorMessage}</p>}
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

import React from 'react';
import Search from '../components/Search';
import axios from 'axios';
import { useState } from 'react';
import Card from '../components/Card';
import { useEffect } from 'react';
import { useWindowWidth } from '@/contexts/WindowContext';

export default function SearchPage() {
    const [data, setData] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    function fetchProperties() {
    const response = axios.get('http://localhost:3000/api/properties/ricerca?${queryParams}')
    .then((response) => {
        setData(response.data);
        setErrorMessage(""); // Reset error message on successful fetch
    })
    .catch((error) => {
        console.error("Errore nella richiesta API:", error);
        setData([]);
        setErrorMessage("Nessuna proprietà trovata");
    });
    }


    useEffect(() => {
        fetchProperties();
    } , []);

    
     // Response Mobile Width
      const { windowWidth } = useWindowWidth();
      const mobileWidth = windowWidth >= 640

    return (
        <>
        <div className='container mx-auto'>
            <div className={mobileWidth ? "grid grid-cols-3 gap-3 px-6 py-12 lg:px-8 pt-[105px]" : 'm-1'}>
                <div className='my-9 col-span-1'>
                <div className={mobileWidth ? "sticky top-24" : ''}>
                        <Search />
                    </div>
                </div>
                <div className='col-span-2'>
                    <h1 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        Risultati della ricerca
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {data.map((property) => (
                            <Card key={property.id} property={property} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
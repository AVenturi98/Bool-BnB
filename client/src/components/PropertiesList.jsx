import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Card from "./Card";
import Hero from "./Hero.jsx";
import GlobalContext from "../contexts/GlobalContext";

import CarouselResponse from './CarouselResponse'

export default function PropertiesList() {
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState(null);
  const { setIsLoading } = useContext(GlobalContext)

  
    function fetchProperties() {
      setIsLoading(true)

      axios
        .get("http://localhost:3000/api/properties/")
        .then((response) => {
          setProperties(response.data);
          console.log(response.data);
        })
        .catch((err) => {
          console.error(err);
          setError("Failed to fetch properties.");
        })
        .finally(() => {
          setIsLoading(false)
        })
      window.scrollTo(0, 0)

    }   
    
  useEffect(() => {
    fetchProperties();
  }, []);

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  return (
    <>
      <div>
        <Hero />
      </div>
      <CarouselResponse />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-green-700 mb-4">Immobili</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {properties.map((property) => (
            <Card key={property.id} property={property} />
          ))}
        </div>
      </div>
    </>
  );
}

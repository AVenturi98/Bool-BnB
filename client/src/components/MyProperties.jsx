import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Card from "./Card";
import { Button } from "./ui/button";
import { Link } from "react-router";
import GlobalContext from "@/contexts/GlobalContext";

export default function MyProperties() {
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState(null);

  const { setIsLoading } = useContext(GlobalContext)

  useEffect(() => {

    setIsLoading(true)

    axios
      .get("http://localhost:3000/api/properties/my-properties", { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
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
      });
    window.scrollTo(0, 0)
  }, []);

  if (error) {
    return (
      <div className="container mx-auto p-4 mb-96 mt-32">
        <p className="text-red-600 text-3xl text-center">Devi effettuare il login per accedere alle tue proprietà.</p>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto p-4 pt-[105px]">
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-2xl font-bold text-green-700 mb-4">Le mie Proprietà</h1>
          <Button asChild className="bg-green-600 text-white font-semibold hover:bg-cyan-600 transition hover:-translate-y-1 hover:scale-101 delay-100
">
            <Link to="/properties">+ Aggiungi Proprietà</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {properties.map((property) => (
            <Card key={property.id} property={property} />
          ))}
        </div>
      </div>
    </>
  );
}
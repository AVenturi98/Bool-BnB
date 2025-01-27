import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";

export default function PropertiesList() {
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/properties/")
      .then((response) => {
        setProperties(response.data);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch properties.");
      });
  }, []);

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-green-700 mb-4">Properties</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {properties.map((property) => (
          <Card key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}

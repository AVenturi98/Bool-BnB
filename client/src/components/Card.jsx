import Hearts from "./Hearts"
import placeholder from "../assets/placeholder.png"
import { Link } from "react-router";

export default function Card({ property }) {
  return (
    <>
      <div className="border rounded-lg p-4 shadow-md bg-white hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out relative">
        <Link to={`/${property.id}`}>
          <img
            src={property.img || placeholder}
            alt={property.title}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <h2 className="text-xl font-bold text-green-600 mb-2">
            {property.title}
          </h2>
          <p className="text-sm text-gray-700">
            {property.address}, {property.city}
          </p>
          <p className="text-sm text-gray-700">Type: {property.building_type}</p>
          <p className="text-sm text-gray-700">Rooms: {property.rooms}</p>
          <p className="text-sm text-gray-700">Beds: {property.beds}</p>
          <p className="text-sm text-gray-700">Bathrooms: {property.bathrooms}</p>
          <p className="text-sm text-gray-700">Size: {property.m2} m²</p>
        </Link>
        <div className="absolute bottom-4 right-4">
          <Hearts property={property} />
        </div>
      </div>

    </>
  );
}

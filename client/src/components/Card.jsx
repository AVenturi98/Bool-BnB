import Hearts from "./Hearts"
import placeholder from "../assets/placeholder.png"
import { Link } from "react-router";
import VoteStar from "./VoteStar";

export default function Card({ property }) {
  return (
    <>
      <div className="border rounded-lg p-4 shadow-md bg-white hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out relative">
        <Link to={`/properties/${property.id}`}>
          <img
            src={property.img || placeholder}
            alt={property.title}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <h2 className="text-xl font-bold text-green-600 mb-2">
            {property.title}
          </h2>
          <p className="text-sm text-gray-700 font-semibold">
            {property.address}, {property.city}
          </p>
          <p className="text-sm text-gray-700 mt-2">
            Tipo: {property.building_type}
          </p>
          <p className="text-sm text-gray-700">Posti letto: {property.beds}</p>
          <div className="flex items-center gap-1 pt-5">
            <VoteStar vote={Math.round(property.avg_vote || 0)} />
          </div>
        </Link>
        <div className="absolute bottom-4 right-4">
          <Hearts property={property} />
        </div>
      </div>
    </>
  );
}

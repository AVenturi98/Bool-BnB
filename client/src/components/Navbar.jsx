import React, { useState } from "react";
import logo from "../assets/logo.svg";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-white text-green-600 container flex justify-between items-center px-5 py-3 border-b border-gray-200 shadow-sm relative">
      <figure>
        <img src={logo} className="w-auto h-20" alt="Logo" />
      </figure>
      <button
        className="flex flex-col gap-1 cursor-pointer md:hidden"
        onClick={toggleMenu}
      >
        <span className="w-6 h-1 bg-green-600 rounded"></span>
        <span className="w-6 h-1 bg-green-600 rounded"></span>
        <span className="w-6 h-1 bg-green-600 rounded"></span>
      </button>
      <ul
        className={`absolute top-16 right-0 bg-white flex flex-col items-start gap-2 px-5 py-3 rounded shadow-lg border border-gray-200 transition-transform transform ${
          menuOpen
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-full opacity-0 pointer-events-none"
        } md:static md:flex md:flex-row md:gap-5 md:transform-none md:opacity-100 md:pointer-events-auto`}
        onClick={() => setMenuOpen(false)}
      >
        <li>
          <a className="hover:text-green-800 transition-colors duration-200">
            Home
          </a>
        </li>
        <li>
          <a className="hover:text-green-800 transition-colors duration-200">
            About
          </a>
        </li>
        <li>
          <a className="hover:text-green-800 transition-colors duration-200">
            Services
          </a>
        </li>
        <li>
          <a className="hover:text-green-800 transition-colors duration-200">
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
}

//LETSGOSKI

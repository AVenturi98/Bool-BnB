import React, { useEffect, useState } from "react";
import logo from "../assets/logo.svg";
import { Link } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { useAuth } from "@/contexts/AuthContext";



export default function Navbar({ authenticated, setAuthenticated }) {
  useAuth(); // Utilizza il contesto dell'autenticazione
  const [menuOpen, setMenuOpen] = useState(false);
  const ownerName = localStorage.getItem("ownerName");



  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Rimuove il token
    console.log(localStorage.getItem("token"));

    setAuthenticated(() => {
      if (localStorage.getItem("token") === null) {
        return false;
      } else {
        return true;
      }
    });
    authenticated = setAuthenticated();
    console.log(authenticated);

    window.location.href = "/";
    // Aggiorna lo stato
  };


  return (
    <nav className="bg-white text-green-600 flex justify-between items-center px-8 border-b border-gray-200 shadow-sm relative z-10 w-full">
      <Link to='/' className="hover:scale-110 transition-transform duration-300 ease-in-out">
        <figure>
          <img src={logo} className="w-auto h-20" alt="Logo" />
        </figure>
      </Link>
      <h1 className="text-cyan-600 font-extrabold text-4xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">Bool B&B</h1>
      <button
        className="flex flex-col gap-1 cursor-pointer md:hidden group transition hover:-translate-y-1 hover:scale-105 delay-50"
        onClick={toggleMenu}
      >
        <span className="w-6 h-1 bg-green-600 rounded group-hover:bg-cyan-600"></span>
        <span className="w-6 h-1 bg-green-600 rounded group-hover:bg-cyan-600"></span>
        <span className="w-6 h-1 bg-green-600 rounded group-hover:bg-cyan-600"></span>
      </button>
      <ul
        className={`absolute top-16 right-0 bg-white flex  flex-col items-center gap-2 px-5 py-3 rounded shadow-lg border border-gray-200 transition-transform transform ${menuOpen
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "-translate-y-full opacity-0 pointer-events-none"
          } md:static md:flex md:flex-row md:gap-5 md:transform-none md:opacity-100 md:pointer-events-auto`}
        onClick={() => setMenuOpen(false)}
      >
        <Link to="/">
          <li className="hover:text-cyan-600 transition-colors duration-200">
            Home <FontAwesomeIcon icon={faHouse} />
          </li>
        </Link>
        <li>
          <a className="hover:text-cyan-600 transition-colors duration-200">
            About
          </a>
        </li>
        {authenticated ? (
          <>
            <li>
              <Link to="/my-properties" className="hover:text-cyan-600 transition-colors duration-200">
                Le mie proprietà
              </Link>
            </li>
            <li className="relative">
              <Accordion type="single" collapsible className="hover:text-cyan-600">
                <AccordionItem value="account">
                  <AccordionTrigger >
                    {ownerName} <FontAwesomeIcon icon={faUser} />
                  </AccordionTrigger>
                  <AccordionContent>
                    <button
                      onClick={handleLogout}
                      className="text-red-600 hover:text-red-800 transition-colors duration-200"
                    >
                      Logout
                    </button>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </li>
          </>
        ) : (
          <Link to="/Login">
            <li className="hover:text-cyan-600">
              Login <FontAwesomeIcon icon={faUser} />
            </li>
          </Link>
        )}
      </ul>
    </nav>
  );
}

//LETSGOSKI

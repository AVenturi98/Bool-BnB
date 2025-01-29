import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="bg-white text-green-600 p-5 font-sans border-t-2 border-grey-400 mt-8 py-12">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between gap-5">
        {/* Descrizione */}
        <div className="flex-1 min-w-[250px]">
          <h2 className="text-green-800 mb-2 font-bold">Bool BnB</h2>
          <p className="leading-relaxed text-gray-700">
            Bool Bnb: la piattaforma ideale per trovare il soggiorno dei tuoi sogni. Esperienze uniche e comfort garantito, ovunque tu voglia andare.          </p>
        </div>

        {/* Quick Links */}
        <div className="flex-1 min-w-[250px]">
          <h3 className="text-green-800 mb-2 font-bold">Link Utili</h3>
          <ul className="list-none space-y-2">
            <li>
              <a href="#" className="hover:text-cyan-600 transition-colors duration-300">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-cyan-600 transition-colors duration-300">
                About
              </a>
            </li>
            <li>
              <a href="/login" className="hover:text-cyan-600 transition-colors duration-300">
                Login
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="flex-1 min-w-[250px]">
          <h3 className="text-green-800 mb-2 font-bold">Seguici</h3>
          <ul className="list-none space-y-2">
            <li>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-600 transition-colors duration-300 flex items-center"
              >
                <FontAwesomeIcon icon={faFacebook} className="mr-2" /> Facebook
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-600 transition-colors duration-300 flex items-center"
              >
                <FontAwesomeIcon icon={faTwitter} className="mr-2" /> Twitter
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-600 transition-colors duration-300 flex items-center"
              >
                <FontAwesomeIcon icon={faInstagram} className="mr-2 " /> Instagram
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-600 transition-colors duration-300 flex items-center"
              >
                <FontAwesomeIcon icon={faLinkedin} className="mr-2" /> LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-5 border-t border-gray-300 pt-3 text-sm text-gray-600">
        <p>&copy; 2025 BoolBnB. All rights reserved.</p>
      </div>
    </footer>
  );
}

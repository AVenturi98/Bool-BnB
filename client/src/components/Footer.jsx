import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white text-green-600 p-5 font-sans">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between gap-5">
        <div className="flex-1 min-w-[250px]">
          <h2 className="text-green-800 mb-2 font-bold">Bool BnB</h2>
          <p className="leading-relaxed text-gray-700">
            slkzhjdkfbk;sd;bfd k,sjbdf,nsbdf,bsnd,dfbn,mdsfd.
          </p>
        </div>
        <div className="flex-1 min-w-[250px]">
          <h3 className="text-green-800 mb-2 font-bold">Quick Links</h3>
          <ul className="list-none space-y-2">
            <li>
              <a
                href="#"
                className="hover:text-green-500 transition-colors duration-300"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-green-500 transition-colors duration-300"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-green-500 transition-colors duration-300"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="/login"
                className="hover:text-green-500 transition-colors duration-300"
              >
                Login
              </a>
            </li>
          </ul>
        </div>
        <div className="flex-1 min-w-[250px]">
          <h3 className="text-green-800 mb-2 font-bold">Follow Us</h3>
          <ul className="list-none space-y-2">
            <li>
              <a
                href="#"
                className="hover:text-green-500 transition-colors duration-300"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-green-500 transition-colors duration-300"
              >
                Twitter
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-green-500 transition-colors duration-300"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-green-500 transition-colors duration-300"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-5 border-t border-gray-300 pt-3 text-sm text-gray-600">
        <p>&copy; 2025 BoolBnB. All rights reserved.</p>
      </div>
    </footer>
  );
}

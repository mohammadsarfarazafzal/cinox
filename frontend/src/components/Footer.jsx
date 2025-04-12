// src/components/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 text-center">
      © {new Date().getFullYear()} CINOX. All rights reserved.
    </footer>
  );
};

export default Footer;

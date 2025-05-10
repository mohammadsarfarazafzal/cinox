// src/components/Footer.jsx
import React from "react";
import { IconWorldLatitude } from "@tabler/icons-react";


const Footer = () => {
  return (
    <footer className="relative w-full overflow-hidden z-10">
      
      <div className="absolute inset-0 bg-gray-800/95 dark:bg-neutral-900/95 backdrop-blur-md border-t border-white/10 dark:border-white/5"></div>
      
      
      <div className="relative max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand column */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <IconWorldLatitude className="text-white" stroke={2} />
              <span className="text-xl font-bold text-white">CINOX</span>
            </div>
            <p className="text-sm text-gray-300 max-w-xs">
              Discover the ultimate cinema experience with the latest movies, premium seating, and state-of-the-art technology.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} CINOX. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
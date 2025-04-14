// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import { IconWorldLatitude, IconBrandTwitter, IconBrandInstagram, IconBrandFacebook } from "@tabler/icons-react";

const FooterSection = ({ title, children }) => (
  <div className="flex flex-col space-y-3">
    <h3 className="text-lg font-semibold text-white">{title}</h3>
    <div className="flex flex-col space-y-2">{children}</div>
  </div>
);

const FooterLink = ({ href, children }) => (
  <Link 
    to={href} 
    className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
  >
    {children}
  </Link>
);

const SocialIcon = ({ icon: Icon, href }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors duration-200"
  >
    <Icon size={20} className="text-white" />
  </a>
);

const Footer = () => {
  return (
    <footer className="relative w-full overflow-hidden">
      {/* Frosted glass background */}
      <div className="absolute inset-0 bg-gray-800/95 dark:bg-neutral-900/95 backdrop-blur-md border-t border-white/10 dark:border-white/5"></div>
      
      {/* Main footer content */}
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
            <div className="flex space-x-4 mt-4">
              <SocialIcon icon={IconBrandTwitter} href="#" />
              <SocialIcon icon={IconBrandInstagram} href="#" />
              <SocialIcon icon={IconBrandFacebook} href="#" />
            </div>
          </div>

          {/* Quick Links */}
          <FooterSection title="Quick Links">
            <FooterLink href="/movies">All Movies</FooterLink>
            <FooterLink href="/showtimings">Show Timings</FooterLink>
            <FooterLink href="/cinemas">Our Cinemas</FooterLink>
            <FooterLink href="/offers">Special Offers</FooterLink>
          </FooterSection>

          {/* Help & Support */}
          <FooterSection title="Help & Support">
            <FooterLink href="/faq">FAQ</FooterLink>
            <FooterLink href="/terms">Terms of Service</FooterLink>
            <FooterLink href="/privacy">Privacy Policy</FooterLink>
            <FooterLink href="/contact">Contact Us</FooterLink>
          </FooterSection>

          {/* Newsletter */}
          <FooterSection title="Stay Updated">
            <p className="text-sm text-gray-300">Subscribe for exclusive offers and updates</p>
            <div className="mt-2 flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-3 py-2 bg-white/10 border border-white/20 rounded-l-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/30 placeholder-gray-400 w-full"
              />
              <button className="bg-white text-gray-800 px-4 py-2 rounded-r-md font-medium text-sm hover:bg-gray-200 transition-colors duration-200">
                Join
              </button>
            </div>
          </FooterSection>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} CINOX. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <FooterLink href="/terms">Terms</FooterLink>
            <FooterLink href="/privacy">Privacy</FooterLink>
            <FooterLink href="/cookies">Cookies</FooterLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
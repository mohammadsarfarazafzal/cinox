import React, { useState } from "react";
import { LoginModal, RegisterModal } from "../Modals";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "./NavComponents";
import {
  IconHomeFilled,
  IconFreeRights,
  IconMovie,
  IconTicket,
  IconSun,
  IconMoon,
} from "@tabler/icons-react";

const HeaderNavbar = () => {
  const navItems = [
    { name: "Home", link: "home", icon: <IconHomeFilled width={20} height={20} /> },
    { name: "Showtimings", link: "showtimings", icon: <IconTicket width={20} height={20} /> },
    { name: "Cinemas", link: "cinemas", icon: <IconMovie width={20} height={20} /> },
    { name: "Offers", link: "offers", icon: <IconFreeRights width={20} height={20} /> },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Function to toggle dark/light mode (you can also integrate with Context or Tailwind config)
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            {/* Dark mode toggle button */}
            <NavbarButton variant="secondary" onClick={toggleDarkMode}>
              {isDarkMode ? <IconSun width={20} height={20} /> : <IconMoon width={20} height={20} />}
            </NavbarButton>
            <NavbarButton
              variant="primary"
              onClick={() => setShowRegister(true)}
            >
              Register
            </NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>
          <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                onClick={() => {setIsMobileMenuOpen(false); toggleDarkMode();}}
                variant="primary"
                className="w-full"
              >
                {isDarkMode ? "Light Mode" : "Dark Mode"}
              </NavbarButton>
              <NavbarButton
                onClick={() => {setIsMobileMenuOpen(false); setShowRegister(true);}}
                variant="primary"
                className="w-full"
              >
                Register
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onSwitch={() => {
          setShowLogin(false);
          setShowRegister(true);
        }}
      />
      <RegisterModal
        isOpen={showRegister}
        onClose={() => setShowRegister(false)}
        onSwitch={() => {
          setShowRegister(false);
          setShowLogin(true);
        }}
      />
    </div>
  );
};

export default HeaderNavbar;

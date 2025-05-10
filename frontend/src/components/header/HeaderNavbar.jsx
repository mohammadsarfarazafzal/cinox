import React, { useState, useEffect } from "react";
import { LoginModal, RegisterModal, EditProfileModal } from "../Modals";
import { useAuth } from "../../auth/AuthContext";
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
  IconMovie,
  IconTicket,
  IconSun,
  IconMoon,
  IconLogout,
  IconUser,
  IconEdit,
  IconChevronDown,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";

const HeaderNavbar = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();  const navItems = [
    { name: "Home", link: "/", icon: <IconHomeFilled width={20} height={20} /> },
    { name: "Bookings", link: "/bookings", icon: <IconTicket width={20} height={20} /> },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);


  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest('.user-dropdown')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen]);

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
              {isDarkMode ? 
                <IconSun className="text-gray-600 dark:text-neutral-300" width={20} height={20} /> : 
                <IconMoon className="text-gray-600 dark:text-neutral-300" width={20} height={20} />
              }
            </NavbarButton>            
            {isAuthenticated ? (
              <>
                <div className="relative user-dropdown">
                  <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800 cursor-pointer"
                  >
                    <IconUser className="text-gray-600 dark:text-gray-300" />
                    <span className="text-gray-600 dark:text-gray-300">{user.fullName}</span>
                    <IconChevronDown className="text-gray-600 dark:text-gray-300" size={16} />
                  </button> 
                  <div className={`absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-800 rounded-lg shadow-lg py-2 border border-gray-200 dark:border-neutral-700 transform transition-all duration-200 z-50 ${isDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
                    {isAdmin && (
                      <Link 
                        to="/admin" 
                        className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <IconMovie className="inline mr-2 text-gray-600 dark:text-gray-300" size={16} />
                        Admin Panel
                      </Link>
                    )}
                    <Link 
                      to="/bookings" 
                      className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <IconTicket className="inline mr-2 text-gray-600 dark:text-gray-300" size={16} />
                      My Bookings
                    </Link>
                    <button 
                      onClick={() => {
                        setIsDropdownOpen(false);
                        setShowEditProfile(true);
                      }} 
                      className="w-full text-left px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700"
                    >
                      <IconEdit className="inline mr-2 text-gray-600 dark:text-gray-300" size={16} />
                      Edit Profile
                    </button>
                    <button 
                      onClick={() => {
                        setIsDropdownOpen(false);
                        handleLogout();
                      }} 
                      className="w-full text-left px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700"
                    >
                      <IconLogout className="inline mr-2 text-gray-600 dark:text-gray-300" size={16} />
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <NavbarButton
                  variant="secondary"
                  onClick={() => setShowLogin(true)}
                >
                  Login
                </NavbarButton>
                <NavbarButton
                  variant="primary"
                  onClick={() => setShowRegister(true)}
                >
                  Register
                </NavbarButton>
              </>
            )}
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
              <Link
                key={`mobile-link-${idx}`}
                to={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </Link>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                onClick={() => {setIsMobileMenuOpen(false); toggleDarkMode();}}
                variant="primary"
                className="w-full"
              >
                {isDarkMode ? "Light Mode" : "Dark Mode"}
              </NavbarButton>              
              {isAuthenticated ? (
                <div className="flex flex-col w-full gap-2">
                  <div className="px-4 py-2 flex items-center gap-2 border-b border-gray-200 dark:border-gray-700">
                    <IconUser className="text-gray-600 dark:text-gray-300" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">{user.fullName}</span>
                  </div>
                  {isAdmin && (
                    <Link 
                      to="/admin" 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700"
                    >
                      <IconMovie className="inline mr-2 text-gray-600 dark:text-gray-300" size={16} />
                      Admin Panel
                    </Link>
                  )}
                  <Link 
                    to="/bookings" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700"
                  >
                    <IconTicket className="inline mr-2 text-gray-600 dark:text-gray-300" size={16} />
                    My Bookings
                  </Link>
                  <button 
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setShowEditProfile(true);
                    }}
                    className="text-left px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700"
                  >
                    <IconEdit className="inline mr-2 text-gray-600 dark:text-gray-300" size={16} />
                    Edit Profile
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="text-left px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700"
                  >
                    <IconLogout className="inline mr-2 text-gray-600 dark:text-gray-300" size={16} />
                    Logout
                  </button>
                </div>
              ): (
                <>
                  <NavbarButton
                    onClick={() => {setIsMobileMenuOpen(false); setShowLogin(true);}}
                    variant="primary"
                    className="w-full"
                  >
                    Login
                  </NavbarButton>
                  <NavbarButton
                    onClick={() => {setIsMobileMenuOpen(false); setShowRegister(true);}}
                    variant="primary"
                    className="w-full"
                  >
                    Register
                  </NavbarButton>
                </>
              )}
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
      <EditProfileModal
        isOpen={showEditProfile}
        onClose={() => setShowEditProfile(false)}
      />
    </div>
  );
};

export default HeaderNavbar;

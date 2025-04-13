import React from 'react'
import { useState } from "react";
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
import {IconHomeFilled, IconFreeRights, IconMovie, IconTicket} from "@tabler/icons-react"
const HeaderNavbar = () => {
    const navItems = [
        { name: "Home", link: "home", icon: <IconHomeFilled width={20} height={20}/>},
        { name: "Showtimings", link: "showtimings", icon: <IconTicket width={20} height={20}/> },
        { name: "Cinemas", link: "cinemas", icon:  <IconMovie width={20} height={20}/> },
        { name: "Offers", link: "offers", icon: <IconFreeRights width={20} height={20}/> },
      ];
    
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
  return (
    <div className="relative w-full">
          <Navbar>
            {/* Desktop Navigation */}
            <NavBody>
              <NavbarLogo />
              <NavItems items={navItems} />
              <div className="flex items-center gap-4">
                <NavbarButton variant="secondary">Login</NavbarButton>
                <NavbarButton variant="primary">Book a call</NavbarButton>
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
                    onClick={() => setIsMobileMenuOpen(false)}
                    variant="primary"
                    className="w-full"
                  >
                    Login
                  </NavbarButton>
                  <NavbarButton
                    onClick={() => setIsMobileMenuOpen(false)}
                    variant="primary"
                    className="w-full"
                  >
                    Book a call
                  </NavbarButton>
                </div>
              </MobileNavMenu>
            </MobileNav>
          </Navbar>
        </div>
  )
}

export default HeaderNavbar
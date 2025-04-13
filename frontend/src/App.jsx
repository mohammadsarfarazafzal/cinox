import { BrowserRouter as Router } from "react-router-dom";
import { useState } from "react";
import Footer from "./components/Footer"; // Create your own Footer component or a placeholder
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
} from "./components/Header";
import AppRoutes from "./routes/AppRoutes"
import {IconHomeFilled, IconFreeRights, IconMovie, IconTicket} from "@tabler/icons-react"
function App() {
  const navItems = [
    { name: "Home", link: "home", icon: <IconHomeFilled width={20} height={20}/>},
    { name: "Showtimings", link: "showtimings", icon: <IconTicket width={20} height={20}/> },
    { name: "Cinemas", link: "cinemas", icon:  <IconMovie width={20} height={20}/> },
    { name: "Offers", link: "offers", icon: <IconFreeRights width={20} height={20}/> },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-white dark:bg-black text-black">
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

        <main className="flex-grow py-1">
          <AppRoutes />
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;

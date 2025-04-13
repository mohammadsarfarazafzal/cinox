import { BrowserRouter as Router } from "react-router-dom";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes"
import HeaderNavbar from "./components/header/HeaderNavbar";
function App() {
  return (
    <Router>
      <div className="flex -mt-1 flex-col min-h-screen bg-white dark:bg-neutral-900 text-black">
        <HeaderNavbar />
        <main className="flex-grow py-1">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

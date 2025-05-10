import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";
import HeaderNavbar from "./components/header/HeaderNavbar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-neutral-900 text-black">
      <HeaderNavbar />
      <main className="flex-grow px-4 py-20 md:px-6 lg:px-8 relative z-0">
        <AppRoutes />
      </main>
      {!isAdminRoute && <Footer />}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;

import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from "../auth/AuthContext";
import Home from '../pages/Home';
import Booking from '../pages/Booking';
import Dashboard from '../pages/admin/Dashboard';
import MyBookings from '../pages/MyBookings';
 import { toast } from 'react-toastify';

const ProtectedRoute = ({ children, requireAdmin }) => {
  const { user, loading, isAuthenticated } = useAuth();
  const notify = () => toast.error("Login to Continue");

  if (loading) {
    return <div className="flex justify-center items-center h-48">Loading...</div>;
  }

  if (!isAuthenticated) {
    notify();
    return <Navigate to="/" />;
  }

  if (requireAdmin && user?.isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="/booking"
        element={
          <ProtectedRoute>
            <Booking />
          </ProtectedRoute>
        }
      />
      <Route
        path="/booking/:id"
        element={
          <ProtectedRoute>
            <Booking />
          </ProtectedRoute>
        }
      />
      <Route
        path="/bookings"
        element={
          <ProtectedRoute>
            <MyBookings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute requireAdmin={true}>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
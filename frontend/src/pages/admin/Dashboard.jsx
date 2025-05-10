import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  IconMovie,
  IconBuilding,
  IconTicket,
  IconFileInvoice,
  IconUsers,
  IconSettings,
  IconLogout,
  IconCreditCard
} from '@tabler/icons-react';
import { GiModernCity } from "react-icons/gi";
import { TbUserScreen } from "react-icons/tb";
import MovieManagement from './MovieManagement';
import CityManagement from './CityManagement';
import TheaterManagement from './TheaterManagement';
import ScreenManagement from './ScreenManagement';
import ShowManagement from './ShowManagement';
import BookingManagement from './BookingManagement';
import UserManagement from './UserManagement';

const menuItems = [
  { name: 'Movies', icon: <IconMovie />, key: 'movies', component: MovieManagement },
  { name: 'Cities', icon: <GiModernCity />, key: 'cities', component: CityManagement },
  { name: 'Theaters', icon: <IconBuilding />, key: 'theaters', component: TheaterManagement },
  { name: 'Screens', icon: <TbUserScreen />, key: 'screens', component: ScreenManagement },
  { name: 'Shows', icon: <IconTicket />, key: 'shows', component: ShowManagement },
  { name: 'Bookings', icon: <IconFileInvoice />, key: 'bookings', component: BookingManagement },
  { name: 'Users', key: 'users', icon: <IconUsers />, component: UserManagement }
];

const Dashboard = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('movies');

  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      navigate('/');
    }
  }, [isAuthenticated, isAdmin, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const ActiveComponent = menuItems.find(item => item.key === activeTab)?.component || null;

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-neutral-900 flex">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className="w-64 bg-white dark:bg-neutral-800 shadow-md fixed h-screen"
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-200 dark:border-neutral-700">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Cinox Admin</h1>
          </div>
          <nav className="flex-1 overflow-y-auto">
            <ul className="py-4">
              {menuItems.map((item) => (
                <li key={item.key}>
                  <button
                    onClick={() => setActiveTab(item.key)}
                    className={`w-full flex items-center px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors relative ${
                      activeTab === item.key ? 'bg-gray-100 dark:bg-neutral-700 text-blue-600 dark:text-blue-400 font-medium' : ''
                    }`}
                  >
                    {item.icon}
                    <span className="ml-3">{item.name}</span>
                    {activeTab === item.key && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 dark:bg-blue-400"
                      />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <div className="p-4 border-t border-gray-200 dark:border-neutral-700">
            <div className="px-4 py-2 mb-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Logged in as</p>
              <p className="font-medium text-gray-800 dark:text-white">{user?.fullName}</p>
            </div>
            <button 
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded-md transition-colors"
            >
              <IconLogout />
              <span className="ml-3">Logout</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Top Bar */}
        <div className="bg-white dark:bg-neutral-800 shadow-md sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white capitalize">
                {activeTab}
              </h2>
              <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded-full transition-colors">
                  <IconSettings />
                </button>
                <div className="relative">
                  <img
                    className="h-8 w-8 rounded-full"
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.fullName || 'Admin User')}`}
                    alt={user?.fullName || 'Admin User'}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {ActiveComponent ? (
              <ActiveComponent />
            ) : (
              <div className="p-6">
                <div className="text-center text-gray-500 dark:text-gray-400">
                  This section is under development.
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Dashboard;
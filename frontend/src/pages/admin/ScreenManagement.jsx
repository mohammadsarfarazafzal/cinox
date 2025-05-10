import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../auth/AuthContext';
import axios from 'axios';
import {
  IconPlus,
  IconEdit,
  IconTrash,
  IconSearch,
  IconX,
  IconDeviceDesktop
} from '@tabler/icons-react';

const ScreenManagement = () => {
  const { user } = useAuth();
  const [screens, setScreens] = useState([]);
  const [theaters, setTheaters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedScreen, setSelectedScreen] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');


  const [formData, setFormData] = useState({
    screenName: '',
    theater: { id: '' },
    totalSeats: 100,
    goldSeats: 30,
    platinumSeats: 20,
    silverSeats: 50
  });

  useEffect(() => {
    Promise.all([fetchScreens(), fetchTheaters()]);
  }, []);

  const fetchScreens = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/screen/');
      setScreens(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching screens:', error);
      setLoading(false);
    }
  };

  const fetchTheaters = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/theater/');
      setTheaters(response.data);
    } catch (error) {
      console.error('Error fetching theaters:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = selectedScreen ? 'http://localhost:8080/api/screen/edit' : 'http://localhost:8080/api/screen/add';
      
      const payload = {
        ...formData,
        theater: { id: formData.theater.id }
      };

      const response = selectedScreen 
        ? await axios.put(url, payload)
        : await axios.post(url, payload);

      if (!response.data) throw new Error('Failed to save screen');
      
      fetchScreens();
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error('Error saving screen:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this screen?')) return;
    
    try {
      await axios.delete(`http://localhost:8080/api/screen/delete/${id}`);
      fetchScreens();
    } catch (error) {
      console.error('Error deleting screen:', error);
    }
  };

  const editScreen = (screen) => {
    setSelectedScreen(screen);
    setFormData({
      ...screen,
      theater: { id: screen.theater.id }
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setSelectedScreen(null);
    setFormData({
      screenName: '',
      theater: { id: '' },
      totalSeats: 100,
      goldSeats: 30,
      platinumSeats: 20,
      silverSeats: 50
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    resetForm();
  };

  const filteredScreens = screens.filter(screen =>
    screen.screenName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (screen.theater?.name?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Screen Management</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Add, edit, or remove theater screens</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
          <div className="relative flex-grow sm:flex-grow-0">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search screens..."
              className="w-full px-4 py-2 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <IconPlus size={20} className="mr-1" />
            Add Screen
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
            <thead className="bg-gray-50 dark:bg-neutral-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Screen</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Theater</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Total Seats</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Gold</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Platinum</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Silver</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
              {filteredScreens.map((screen) => (
                <motion.tr 
                  key={screen.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{screen.screenName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {screen.theater?.name || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{screen.totalSeats}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{screen.goldSeats}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{screen.platinumSeats}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{screen.silverSeats}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => editScreen(screen)}
                      className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400 mr-4"
                    >
                      <IconEdit size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(screen.id)}
                      className="text-red-600 hover:text-red-900 dark:hover:text-red-400"
                    >
                      <IconTrash size={20} />
                    </button>
                  </td>
                </motion.tr>
              ))}
              {filteredScreens.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                    No screens found. Add a new screen to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowModal(false)}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative bg-white dark:bg-neutral-800 rounded-lg shadow-xl max-w-2xl w-full mx-4 my-8"
              >
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-neutral-700">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {selectedScreen ? 'Edit Screen' : 'Add New Screen'}
                  </h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="p-2 text-gray-400 hover:text-gray-500 rounded-full"
                  >
                    <IconX size={20} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Screen Name
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={50}
                        value={formData.screenName}
                        onChange={(e) => setFormData({ ...formData, screenName: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-900 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Theater
                      </label>
                      <select
                        required
                        value={formData.theater.id}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          theater: { id: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-900 text-gray-900 dark:text-white"
                      >
                        <option value="">Select a theater</option>
                        {theaters.map(theater => (
                          <option key={theater.id} value={theater.id}>{theater.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Total Seats
                      </label>
                      <input
                        type="number"
                        required
                        min="1"
                        value={formData.totalSeats}
                        onChange={(e) => setFormData({ ...formData, totalSeats: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-900 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Gold Seats
                      </label>
                      <input
                        type="number"
                        required
                        min="0"
                        value={formData.goldSeats}
                        onChange={(e) => setFormData({ ...formData, goldSeats: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-900 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Platinum Seats
                      </label>
                      <input
                        type="number"
                        required
                        min="0"
                        value={formData.platinumSeats}
                        onChange={(e) => setFormData({ ...formData, platinumSeats: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-900 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Silver Seats
                      </label>
                      <input
                        type="number"
                        required
                        min="0"
                        value={formData.silverSeats}
                        onChange={(e) => setFormData({ ...formData, silverSeats: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-900 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-neutral-700">
                    <button
                      type="button"
                      onClick={() => handleCloseModal()}
                      className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded-md"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      {selectedScreen ? 'Save Changes' : 'Add Screen'}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ScreenManagement;
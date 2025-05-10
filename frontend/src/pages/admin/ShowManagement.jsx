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
  IconTicket
} from '@tabler/icons-react';

const ShowManagement = () => {
  const { user } = useAuth();
  const [shows, setShows] = useState([]);
  const [movies, setMovies] = useState([]);
  const [screens, setScreens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedShow, setSelectedShow] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');


  const [formData, setFormData] = useState({
    movie: { id: '' },
    screen: { id: '' },
    showTime: '',
    endTime: '',
    goldPrice: '',
    platinumPrice: '',
    silverPrice: '',
    isActive: true
  });

  useEffect(() => {
    Promise.all([fetchShows(), fetchMovies(), fetchScreens()]);
  }, []);

  const fetchShows = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/show/');
      setShows(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching shows:', error);
      setLoading(false);
    }
  };

  const fetchMovies = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/movie/');
      setMovies(response.data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const fetchScreens = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/screen/');
      setScreens(response.data);
    } catch (error) {
      console.error('Error fetching screens:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = selectedShow ? 'http://localhost:8080/api/show/edit' : 'http://localhost:8080/api/show/add';
      
      const payload = {
        ...formData,
        movie: { id: formData.movie.id },
        screen: { id: formData.screen.id }
      };

      const response = selectedShow 
        ? await axios.put(url, payload)
        : await axios.post(url, payload);

      if (!response.data) throw new Error('Failed to save show');
      
      fetchShows();
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error('Error saving show:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this show?')) return;
    
    try {
      await axios.delete(`http://localhost:8080/api/show/delete/${id}`);
      fetchShows();
    } catch (error) {
      console.error('Error deleting show:', error);
    }
  };

  const editShow = (show) => {
    setSelectedShow(show);
    setFormData({
      ...show,
      movie: { id: show.movie.id },
      screen: { id: show.screen.id },
      showTime: show.showTime.slice(0, 16), // Format for datetime-local
      endTime: show.endTime.slice(0, 16)
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setSelectedShow(null);
    setFormData({
      movie: { id: '' },
      screen: { id: '' },
      showTime: '',
      endTime: '',
      goldPrice: '',
      platinumPrice: '',
      silverPrice: '',
      isActive: true
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    resetForm();
  };

  const filteredShows = shows.filter(show =>
    show.movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    show.screen.screenName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Show Management</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Add, edit, or remove show schedules</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
          <div className="relative flex-grow sm:flex-grow-0">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search shows..."
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
            Add Show
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Movie</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Screen</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Show Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">End Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Gold Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
              {filteredShows.map((show) => (
                <motion.tr 
                  key={show.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{show.movie.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{show.screen.screenName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-smSorting error: Cannot read properties of null (reading 'screenName') text-gray-900 dark:text-white">{new Date(show.showTime).toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{new Date(show.endTime).toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">₹{show.goldPrice}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {show.isActive ? 'Active' : 'Inactive'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => editShow(show)}
                      className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400 mr-4"
                    >
                      <IconEdit size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(show.id)}
                      className="text-red-600 hover:text-red-900 dark:hover:text-red-400"
                    >
                      <IconTrash size={20} />
                    </button>
                  </td>
                </motion.tr>
              ))}
              {filteredShows.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                    No shows found. Add a new show to get started.
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
                    {selectedShow ? 'Edit Show' : 'Add New Show'}
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
                        Movie
                      </label>
                      <select
                        required
                        value={formData.movie.id}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          movie: { id: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-900 text-gray-900 dark:text-white"
                      >
                        <option value="">Select a movie</option>
                        {movies.map(movie => (
                          <option key={movie.id} value={movie.id}>{movie.title}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Screen
                      </label>
                      <select
                        required
                        value={formData.screen.id}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          screen: { id: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-900 text-gray-900 dark:text-white"
                      >
                        <option value="">Select a screen</option>
                        {screens.map(screen => (
                          <option key={screen.id} value={screen.id}>{screen.screenName}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Show Time
                      </label>
                      <input
                        type="datetime-local"
                        required
                        value={formData.showTime}
                        onChange={(e) => setFormData({ ...formData, showTime: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-900 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        End Time
                      </label>
                      <input
                        type="datetime-local"
                        required
                        value={formData.endTime}
                        onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-900 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Gold Price
                      </label>
                      <input
                        type="number"
                        required
                        min="0.01"
                        step="0.01"
                        value={formData.goldPrice}
                        onChange={(e) => setFormData({ ...formData, goldPrice: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-900 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Platinum Price
                      </label>
                      <input
                        type="number"
                        required
                        min="0.01"
                        step="0.01"
                        value={formData.platinumPrice}
                        onChange={(e) => setFormData({ ...formData, platinumPrice: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-900 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Silver Price
                      </label>
                      <input
                        type="number"
                        required
                        min="0.01"
                        step="0.01"
                        value={formData.silverPrice}
                        onChange={(e) => setFormData({ ...formData, silverPrice: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-900 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Status
                    </label>
                    <select
                      value={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.value === 'true' })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-900 text-gray-900 dark:text-white"
                    >
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </select>
                  </div>
                  <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-neutral-700">
                    <button
                      type="button"
                      onClick={() => handleCloseModal()}
                      className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded-md transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      {selectedShow ? 'Save Changes' : 'Add Show'}
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

export default ShowManagement;
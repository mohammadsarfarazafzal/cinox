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
  IconBuilding
} from '@tabler/icons-react';

const CityManagement = () => {
  const { user } = useAuth();
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  
  const [formData, setFormData] = useState({
    name: '',
  });

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/city/');
      setCities(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching cities:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = selectedCity ? 'http://localhost:8080/api/city/edit' : 'http://localhost:8080/api/city/add';
      
      const response = selectedCity 
        ? await axios.put(url, formData)
        : await axios.post(url, formData);

      if (!response.data) throw new Error('Failed to save city');
      
      fetchCities();
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error('Error saving city:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this city?')) return;
    
    try {
      await axios.delete(`http://localhost:8080/api/city/delete/${id}`);
      fetchCities();
    } catch (error) {
      console.error('Error deleting city:', error);
    }
  };

  const editCity = (city) => {
    setSelectedCity(city);
    setFormData({
      ...city,
      id: city.id
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setSelectedCity(null);
    setFormData({
      name: "",
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    resetForm();
  };

  const filteredCities = cities.filter(city =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">City Management</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Add, edit, or remove cities</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
          <div className="relative flex-grow sm:flex-grow-0">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search cities..."
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
            Add City
          </button>
        </div>
      </div>

      {/* Cities List */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
            <thead className="bg-gray-50 dark:bg-neutral-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Theaters</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-neutral-800 divide-y divide-gray-200 dark:divide-neutral-700">
              {filteredCities.map((city) => (
                <motion.tr 
                  key={city.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{city.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{city.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {city.theaters ? city.theaters.length : 0}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => editCity(city)}
                      className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400 mr-4"
                    >
                      <IconEdit size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(city.id)}
                      className="text-red-600 hover:text-red-900 dark:hover:text-red-400"
                    >
                      <IconTrash size={20} />
                    </button>
                  </td>
                </motion.tr>
              ))}
              {filteredCities.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                    No cities found. Add a new city to get started.
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
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowModal(false)}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              />

              {/* Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative bg-white dark:bg-neutral-800 rounded-lg shadow-xl max-w-lg w-full mx-4 my-8"
              >
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-neutral-700">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {selectedCity ? 'Edit City' : 'Add New City'}
                  </h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="p-2 text-gray-400 hover:text-gray-500 rounded-full"
                  >
                    <IconX size={20} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      City Name
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={50}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-900 text-gray-900 dark:text-white"
                    />
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
                      {selectedCity ? 'Save Changes' : 'Add City'}
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

export default CityManagement;
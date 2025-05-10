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
  IconBuilding,
  IconPhone
} from '@tabler/icons-react';

const TheaterManagement = () => {
  const { user } = useAuth();
  const [theaters, setTheaters] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedTheater, setSelectedTheater] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');


  const [formData, setFormData] = useState({
    name: '',
    address: '',
    contactNumber: '',
    city: { id: '' },
    totalScreens: 1,
    theaterPhotoUrl: '',
  });

  useEffect(() => {
    Promise.all([fetchTheaters(), fetchCities()]);
  }, []);

  const fetchTheaters = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/theater/');
      setTheaters(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching theaters:', error);
      setLoading(false);
    }
  };

  const fetchCities = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/city/');
      setCities(response.data);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = selectedTheater ? 'http://localhost:8080/api/theater/edit' : 'http://localhost:8080/api/theater/add';
      
      const payload = {
        ...formData,
        city: { id: formData.city.id }
      };

      const response = selectedTheater 
        ? await axios.put(url, payload)
        : await axios.post(url, payload);

      if (!response.data) throw new Error('Failed to save theater');
      
      fetchTheaters();
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error('Error saving theater:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this theater?')) return;
    
    try {
      await axios.delete(`http://localhost:8080/api/theater/delete/${id}`);
      fetchTheaters();
    } catch (error) {
      console.error('Error deleting theater:', error);
    }
  };

  const editTheater = (theater) => {
    setSelectedTheater(theater);
    setFormData({
      ...theater,
      id: theater.id,
      city: { id: theater.city.id }
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setSelectedTheater(null);
    setFormData({
      name: '',
      address: '',
      contactNumber: '',
      city: { id: '' },
      totalScreens: 1,
      theaterPhotoUrl: '',
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    resetForm();
  };

  const filteredTheaters = theaters.filter(theater =>
    theater.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    theater.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    theater.city.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Theater Management</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Add, edit, or remove theaters</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
          <div className="relative flex-grow sm:flex-grow-0">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search theaters..."
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
            Add Theater
          </button>
        </div>
      </div>

      {/* Theaters Cards */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTheaters.map((theater) => (
            <motion.div
              key={theater.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white dark:bg-neutral-800 rounded-lg shadow-md overflow-hidden"
            >
              <div className="relative h-48">
                <img
                  src={theater.theaterPhotoUrl || 'https://via.placeholder.com/400x200?text=Theater+Image'}
                  alt={theater.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-0 p-4 w-full">
                  <h3 className="text-lg font-semibold text-white">{theater.name}</h3>
                  <p className="text-sm text-gray-300">{theater.city.name}</p>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center mb-2">
                  <IconBuilding size={18} className="text-gray-500 dark:text-gray-400 mr-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-300">{theater.address}</p>
                </div>
                <div className="flex items-center mb-2">
                  <IconPhone size={18} className="text-gray-500 dark:text-gray-400 mr-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-300">{theater.contactNumber}</p>
                </div>
                <div className="flex items-center mb-4">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300 mr-2">Screens:</span>
                  <span className="text-sm text-gray-600 dark:text-gray-300">{theater.totalScreens}</span>
                </div>
                <div className="flex space-x-2 justify-end">
                  <button
                    onClick={() => editTheater(theater)}
                    className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-neutral-700 rounded-full transition-colors"
                  >
                    <IconEdit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(theater.id)}
                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-neutral-700 rounded-full transition-colors"
                  >
                    <IconTrash size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
          {filteredTheaters.length === 0 && (
            <div className="col-span-full text-center py-8 text-gray-500 dark:text-gray-400">
              No theaters found. Add a new theater to get started.
            </div>
          )}
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
                className="relative bg-white dark:bg-neutral-800 rounded-lg shadow-xl max-w-2xl w-full mx-4 my-8"
              >
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-neutral-700">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {selectedTheater ? 'Edit Theater' : 'Add New Theater'}
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
                        Theater Name
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={100}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-900 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        City
                      </label>
                      <select
                        required
                        value={formData.city.id}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          city: { 
                            ...formData.city,
                            id: e.target.value 
                          } 
                        })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-900 text-gray-900 dark:text-white"
                      >
                        <option value="">Select a city</option>
                        {cities.map(city => (
                          <option key={city.id} value={city.id}>{city.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Address
                    </label>
                    <textarea
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-900 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Contact Number
                      </label>
                      <input
                        type="tel"
                        required
                        pattern="^\+?[0-9]{10,13}$"
                        value={formData.contactNumber}
                        onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-900 text-gray-900 dark:text-white"
                        placeholder="+91XXXXXXXXXX"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Total Screens
                      </label>
                      <input
                        type="number"
                        required
                        min="1"
                        value={formData.totalScreens}
                        onChange={(e) => setFormData({ ...formData, totalScreens: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-900 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Theater Photo URL
                    </label>
                    <input
                      type="url"
                      value={formData.theaterPhotoUrl}
                      onChange={(e) => setFormData({ ...formData, theaterPhotoUrl: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-900 text-gray-900 dark:text-white"
                      placeholder="https://example.com/image.jpg"
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
                      {selectedTheater ? 'Save Changes' : 'Add Theater'}
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

export default TheaterManagement;
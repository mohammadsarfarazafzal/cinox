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
  IconMovie
} from '@tabler/icons-react';

const MovieManagement = () => {
  const { user } = useAuth();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const openAddModal = () => {
    setSelectedMovie(null);
    resetForm();
    setShowModal(true);
  };

  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    genre: '',
    language: '',
    releaseDate: '',
    durationMins: '',
    director: '',
    cast: '',
    posterUrl: '',
    backdropUrl: '',
    trailerUrl: '',
  });

  useEffect(() => {
    fetchMovies();
  }, []);
  const fetchMovies = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/movie/');
      setMovies(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching movies:', error);
      setLoading(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log(formData);
        
      const url = selectedMovie ?  'http://localhost:8080/api/movie/edit' : 'http://localhost:8080/api/movie/add';
      console.log(url);
      
      const response = selectedMovie 
        ? await axios.put(url, formData)
        : await axios.post(url, formData);

        console.log(response);
        

      if (!response.data) throw new Error('Failed to save movie');
      
      fetchMovies();
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error('Error saving movie:', error);
    }
  };
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this movie?')) return;
    
    try {
      await axios.delete(`http://localhost:8080/api/movie/delete/${id}`);
      fetchMovies();
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  const editMovie = (movie) => {
    setSelectedMovie(movie);
    setFormData({
      ...movie, id:movie.id,
      releaseDate: movie.releaseDate.split('T')[0], // Format date for input
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setSelectedMovie(null);
    setFormData({
      title: "",
      description: "",
      duration: "",
      releaseDate: "",
      poster: "",
      genre: "",
      rating: "",
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    resetForm();
  };

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    movie.director.toLowerCase().includes(searchQuery.toLowerCase()) ||
    movie.genre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Movie Management</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Add, edit, or remove movies from the catalog</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
          <div className="relative flex-grow sm:flex-grow-0">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search movies..."
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
            Add Movie
          </button>
        </div>
      </div>

      {/* Movies Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMovies.map((movie) => (
            <motion.div
              key={movie.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white dark:bg-neutral-800 rounded-lg shadow-md overflow-hidden"
            >
              <div className="relative h-48">
                <img
                  src={movie.posterUrl || 'https://via.placeholder.com/300x450'}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-0 p-4 w-full">
                  <h3 className="text-lg font-semibold text-white">{movie.title}</h3>
                  <p className="text-sm text-gray-300">{movie.director}</p>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{movie.genre}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{movie.durationMins} mins</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => editMovie(movie)}
                      className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-neutral-700 rounded-full transition-colors"
                    >
                      <IconEdit size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(movie.id)}
                      className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-neutral-700 rounded-full transition-colors"
                    >
                      <IconTrash size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto mt-10">
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
                    {selectedMovie ? 'Edit Movie' : 'Add New Movie'}
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
                        Title
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-900 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Genre
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.genre}
                        onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-900 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Description
                    </label>
                    <textarea
                      required
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-900 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Language
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.language}
                        onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-900 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Release Date
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.releaseDate}
                        onChange={(e) => setFormData({ ...formData, releaseDate: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-900 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Duration (minutes)
                      </label>
                      <input
                        type="number"
                        required
                        min="30"
                        value={formData.durationMins}
                        onChange={(e) => setFormData({ ...formData, durationMins: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-900 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Director
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.director}
                        onChange={(e) => setFormData({ ...formData, director: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-900 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Cast
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.cast}
                      onChange={(e) => setFormData({ ...formData, cast: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-900 text-gray-900 dark:text-white"
                      placeholder="Separate actor names with commas"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Poster URL
                      </label>
                      <input
                        type="url"
                        value={formData.posterUrl}
                        onChange={(e) => setFormData({ ...formData, posterUrl: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-900 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Backdrop URL
                      </label>
                      <input
                        type="url"
                        value={formData.backdropUrl}
                        onChange={(e) => setFormData({ ...formData, backdropUrl: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-900 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Trailer URL
                    </label>
                    <input
                      type="url"
                      value={formData.trailerUrl}
                      onChange={(e) => setFormData({ ...formData, trailerUrl: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-900 text-gray-900 dark:text-white"
                      placeholder="YouTube video URL"
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
                      {selectedMovie ? 'Save Changes' : 'Add Movie'}
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

export default MovieManagement;

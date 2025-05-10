import React, { useEffect, useState } from 'react'
import MovieCarousel from '../components/MovieCarousel';
import CinemaTabs from '../components/CinemaTabs';
import axios from 'axios';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);
  const [theaters, setTheaters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await fetchShows();
        await fetchMovies();
        await fetchTheaters();
      } catch (error) {
        console.error("Error fetching data:", error);
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  
  const fetchMovies = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/api/movie/');
      setMovies(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setError('Failed to load movies');
    }
  }

  const fetchShows = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/api/show/');
      setShows(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching shows:", error);
      setError('Failed to load shows');
    }
  }

  const fetchTheaters = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/api/theater/');
      setTheaters(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching theaters:", error);
      setError('Failed to load theater');
    }
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      {loading ? <></> : <>
        <MovieCarousel shows={shows} />
        <CinemaTabs shows={shows} movies={movies} theaters={theaters}/>
      </>}
    </div>
  )
}

export default Home
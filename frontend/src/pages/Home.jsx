import React from 'react'
import MovieCarousel from '../components/MovieCarousel';
import QuickBooking from '../components/QuickBooking';
import CinemaTabs from '../components/CinemaTabs';

const Home = () => {
  return (
    <div>
        <MovieCarousel/>
        <QuickBooking/>
        <CinemaTabs/>
    </div>
  )
}

export default Home
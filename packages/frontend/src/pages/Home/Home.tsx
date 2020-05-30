import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import './Home.css';
// import NavBar from 'components/NavBar';
// import Slideshow from 'components/Slider/Slide';
// import Footer from 'components/Footer';

const Home = () => {
  useEffect(() => {
    document.title = 'Home – Sapori Unici';
  }, []);

  return (
    <div>
      {/* <div className='attach'> */}
        {/* <Slideshow/> */}
      {/* </div> */}
    </div>
  );
}

export default Home;

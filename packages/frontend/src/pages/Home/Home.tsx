import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import './Home.css';
import NavBar from 'components/NavBar';
// import Slideshow from 'components/Slider/Slide';
// import Footer from 'components/Footer';

interface MeData {
  Me: string;
}

const GET_ME = gql`
  query getMe {
    Me
  }
`;

const Home = () => {
  useEffect(() => {
    document.title = 'Home – Sapori Unici';
  }, []);

  const { loading, error, data } = useQuery<any>(GET_ME);

  if (loading) { console.log('Loading user info...'); }
  if (error) { console.log(error.message) }

  if (!data) {
    console.log('NO DATA')
  } else {
    console.log(JSON.stringify(data));
  }

  return (
    <div>
      <NavBar/>
      {/* <div className='attach'> */}
        {/* <Slideshow/> */}
      {/* </div> */}
    </div>
  );
}

export default Home;

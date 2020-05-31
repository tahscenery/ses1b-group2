import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import './Home.css';
import NavBar from 'components/NavBar';
import { loggedin, loggedinVariables } from '../../schemaTypes';
import AuthContext from '../../context/authContext';
import { ContentTextFormat } from 'material-ui/svg-icons';
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

const GET_USER = gql`
  query loggedin( $id: String!) {
    user(id: $id)
    {
      id
      name
      email
      password
    }
  }`;

const context = AuthContext;


function Home () {
  useEffect(() => {
    document.title = 'Home – Sapori Unici';
  }, []);

  const id : string = '5ec0c48abba2e8914e1c35ab';

  const { loading, error, data } = useQuery<loggedin, loggedinVariables>(GET_USER, {
    variables:  {id}  });

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

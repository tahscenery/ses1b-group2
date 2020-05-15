import React, { Component } from 'react';
import { Typography,} from '@material-ui/core';

import './Home.css';
import NavBar from 'components/NavBar';
import Slideshow from 'components/Slider/Slide';
// import Footer from 'components/Footer';

class Home extends Component {
  render() {
    return (
      <div>
        <NavBar/> 
        <Typography variant="h2">Unique is in our name</Typography><div className='attach'>
        
        <Slideshow/>
        </div>
      </div>
    );
  }
}

export default Home;

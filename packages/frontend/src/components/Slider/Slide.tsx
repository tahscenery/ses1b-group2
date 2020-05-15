import React from 'react'
import { Slide } from 'react-slideshow-image'
import img1 from '../../components/background/number1.jpg'
import img2 from '../../components/background/number2.jpg'
import img3 from '../../components/background/number3.jpg'
import './Slide.css'

const proprietes = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: true
}

const Slideshow = () => {
  return (
      <div className="containerSlide">
          <Slide {...proprietes}>
              <div className="each-slide">
                  <div>
                      <img src={img1} alt="img1" />
                  </div>
              </div>
              <div className="each-slide">
                  <div>
                      <img src={img2} alt="img2" />
                  </div>
              </div>
              <div className="each-slide">
                  <div>
                      <img src={img3} alt="img3" />
                  </div>
              </div>
          </Slide>
      </div>
  )
}

export default Slideshow;





  

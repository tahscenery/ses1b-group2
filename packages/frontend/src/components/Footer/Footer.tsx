import React, { Component } from 'react';

import './Footer.css';

class Footer extends Component {
  render() {
    return (
      <div className="footer-container">
        <div className="footer">
          <nav className="footer-nav">
            <ul>
              <li>About Us</li>
              <li>Contact</li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}

export default Footer;

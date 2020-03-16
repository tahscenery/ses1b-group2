import React from 'react';
import logo from 'resources/logo.svg';
import './App.css';

import { sayHello } from '@restaurant-app/backend';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {sayHello}
        </a>
      </header>
    </div>
  );
}

export default App;

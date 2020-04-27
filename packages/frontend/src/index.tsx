import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from 'utils/serviceWorker';

import App from 'components/App';
import Login from 'pages/Login/Login';
import './index.css';

ReactDOM.render(<Login />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

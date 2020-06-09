import React from 'react';
import ReactDOM from 'react-dom';

import ReactGA from 'react-ga';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import './reset.css';
import './index.css';
import './style/_index.css';
import App from './views/App';
import * as serviceWorker from './serviceWorker';

const trackingId = 'UA-164134196-1';
ReactGA.initialize(trackingId);

const history = createBrowserHistory();

history.listen((location) => {
  ReactGA.set({ page: location.pathname }); // Update the user's current page
  ReactGA.pageview(location.pathname); // Record a pageview for the given page
});

ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

import React from 'react';

import './App.css';
import AppRouter from './AppRouter';
import SpotifyCallback from './auth/SpotifyCallback';
import DeezerCallback from './auth/DeezerCallback';
import { Switch, Route, withRouter, BrowserRouter } from 'react-router-dom';
import About from './about/About';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/about" component={About} />
          <Route exact path="/spotifycallback" component={SpotifyCallback} />
          <Route exact path="/deezercallback" component={DeezerCallback} />
          <Route exact path="/applecallback" component={SpotifyCallback} />
          <Route component={AppRouter} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default withRouter(App);

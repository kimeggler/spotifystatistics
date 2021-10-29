import React from 'react';

import './App.css';
import AppRouter from './AppRouter';
import SpotifyCallback from './auth/SpotifyCallback';
import { Switch, Route, withRouter, BrowserRouter } from 'react-router-dom';
import About from './about/About';
import Landingpage from './landingpage/Landingpage';
import { background } from '../assets';
import Roadmap from './roadmap/Roadmap';

const App = () => {
  return (
    <div className="App" style={{ backgroundImage: `url(${background})` }}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Landingpage} />
          <Route exact path="/about" component={About} />
          <Route exact path="/roadmap" component={Roadmap} />
          <Route exact path="/callback" component={SpotifyCallback} />
          <Route component={AppRouter} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default withRouter(App);

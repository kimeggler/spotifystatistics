import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import Overview from './spotify/overview/overview';
import Landingpage from './landingpage/landingpage';
import Tracks from './spotify/tracks/tracks';
import Artists from './spotify/artists/artists';
import Analyze from './spotify/analyze/analyze';
import { Header } from './common';

import './App.css';

import { validateToken } from '../helper/authenticationhelper';

class AppRouter extends Component {
  state = {
    hasError: false,
    isLoggedIn: false
  };

  componentDidCatch(err) {
    this.setState({
      hasError: true
    });
  }

  render = () => {
    const { hasError } = this.state;
    const { isLoading } = this.props;
    if (isLoading) {
      return null;
    }

    if (hasError) {
      return null;
    }

    if (!validateToken()) {
      return <Landingpage />;
    }

    return (
      <div className='router-section' id='router-element'>
        <Header />
        <Switch>
          <Route exact path='/' component={Overview} />
          <Route exact path='/artists' component={Artists} />
          <Route exact path='/tracks' component={Tracks} />
          <Route exact path='/analyze' component={Analyze} />
          <Route component={Overview} />
        </Switch>
      </div>
    );
  };
}

export default withRouter(AppRouter);

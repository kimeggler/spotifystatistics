import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import Overview from './spotify/overview/Overview';
import Landingpage from './landingpage/Landingpage';
import Tracks from './spotify/tracks/Tracks';
import Artists from './spotify/artists/Artists';
import Suggestions from './spotify/suggestions/Suggestions';
import Analyze from './spotify/analyze/Analyze';
import Genres from './spotify/genres/Genres';
import { Header, Footer } from './common';

import './App.css';

import { validateToken } from '../helper/authenticationhelper';
import { getData } from '../services/fetchservice';
import User from './user/User';

export const UserContext = createContext();

const AppRouter = ({ isLoading }) => {
  const [profile, setProfile] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      setProfile(await getData('me'));
    };
    fetchUser();
  }, []);

  if (isLoading || !profile) {
    return null;
  }

  if (!validateToken()) {
    return <Landingpage />;
  }

  return (
    <UserContext.Provider value={{ profile }}>
      <div className="router-section" id="router-element">
        <Header />
        <Route exact path="/user" component={User} />
        <Route exact path="/overview" component={Overview} />
        <Route exact path="/artists" component={Artists} />
        <Route exact path="/tracks" component={Tracks} />
        <Route exact path="/suggestions" component={Suggestions} />
        <Route exact path="/analyze" component={Analyze} />
        <Route exact path="/genres" component={Genres} />
        <Footer />
      </div>
    </UserContext.Provider>
  );
};

AppRouter.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

AppRouter.defaultProps = {
  isLoading: false,
};

export default AppRouter;

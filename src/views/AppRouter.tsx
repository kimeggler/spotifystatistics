import React, { createContext, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { motion } from 'framer-motion';

import { Footer, Header } from './common';
import Landingpage from './landingpage/Landingpage';
import Analyze from './spotify/analyze/Analyze';
import Artists from './spotify/artists/Artists';
import Genres from './spotify/genres/Genres';
import Overview from './spotify/overview/Overview';
import Suggestions from './spotify/suggestions/Suggestions';
import Tracks from './spotify/tracks/Tracks';
import User from './user/User';

import { validateToken } from '../helper/authenticationhelper';
import { getData } from '../services/fetchservice';
import { SpotifyUser } from '../types/spotify';

interface UserContextType {
  profile: SpotifyUser;
}

interface AppRouterProps {
  isLoading?: boolean;
}

export const UserContext = createContext<UserContextType | null>(null);

const AppRouter: React.FC<AppRouterProps> = ({ isLoading = false }) => {
  const [profile, setProfile] = useState<SpotifyUser | null>(null);

  useEffect(() => {
    const fetchUser = async (): Promise<void> => {
      try {
        const userData = await getData('me');
        setProfile(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    
    if (validateToken()) {
      fetchUser();
    }
  }, []);

  if (isLoading || (validateToken() && !profile)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-statfy-dark-950 via-statfy-dark-900 to-statfy-purple-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-statfy-purple-300 to-statfy-purple-500 bg-clip-text text-transparent mb-4">
            STATFY
          </h1>
          <div className="animate-pulse text-white/70">Loading...</div>
        </motion.div>
      </div>
    );
  }

  if (!validateToken()) {
    return <Landingpage />;
  }

  return (
    <UserContext.Provider value={{ profile: profile! }}>
      <div className="relative min-h-screen bg-gradient-to-br from-statfy-dark-950 via-statfy-dark-900 to-statfy-purple-900">
        <Header />
        <main className="relative z-10">
          <Routes>
            <Route path="/user" element={<User />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/artists" element={<Artists />} />
            <Route path="/tracks" element={<Tracks />} />
            <Route path="/suggestions" element={<Suggestions />} />
            <Route path="/analyze" element={<Analyze />} />
            <Route path="/genres" element={<Genres />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </UserContext.Provider>
  );
};

export default AppRouter;
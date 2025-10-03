import { motion } from 'framer-motion';
import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { validateToken } from '../helper/authenticationhelper';
import { getData } from '../services/fetchservice';

// Components
import About from './about/About';
import SpotifyCallback from './auth/SpotifyCallback';
import { Footer, Header } from './common';
import Landingpage from './landingpage/Landingpage';
import Roadmap from './roadmap/Roadmap';
import Analyze from './spotify/analyze/Analyze';
import Artists from './spotify/artists/Artists';
import Genres from './spotify/genres/Genres';
import Overview from './spotify/overview/Overview';
import Suggestions from './spotify/suggestions/Suggestions';
import Tracks from './spotify/tracks/Tracks';
import User from './user/User';

// Types
interface UserProfile {
  id: string;
  display_name: string;
  email: string;
  images: Array<{
    url: string;
    height: number;
    width: number;
  }>;
  followers: {
    total: number;
  };
  country: string;
  product: string;
}

interface UserContextType {
  profile: UserProfile | null;
  setProfile: (profile: UserProfile | null) => void;
}

export const UserContext = createContext<UserContextType>({
  profile: null,
  setProfile: () => {},
});

// Page transition animations
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const pageTransition = {
  type: 'tween' as const,
  ease: 'anticipate' as const,
  duration: 0.5,
};

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (validateToken()) {
        try {
          const userData = await getData('me');
          setProfile(userData);
        } catch (error) {
          console.error('Failed to fetch user data:', error);
        }
      }
      setIsLoading(false);
    };

    fetchUser();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-slate-900 to-purple-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400"></div>
      </div>
    );
  }

  if (!validateToken() || !profile) {
    return <Landingpage />;
  }

  return <UserContext.Provider value={{ profile, setProfile }}>{children}</UserContext.Provider>;
};

interface AnimatedRouteProps {
  children: ReactNode;
}

const AnimatedRoute: React.FC<AnimatedRouteProps> = ({ children }) => (
  <motion.div
    initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}
    transition={pageTransition}
  >
    {children}
  </motion.div>
);

const App: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-slate-900 to-purple-900">
      <UserContext.Provider value={{ profile, setProfile }}>
        <Header />
        <main className="relative">
          <Routes>
            {/* Public routes */}
            <Route
              path="/"
              element={
                <AnimatedRoute>
                  <Landingpage />
                </AnimatedRoute>
              }
            />
            <Route
              path="/callback"
              element={
                <AnimatedRoute>
                  <SpotifyCallback />
                </AnimatedRoute>
              }
            />
            <Route
              path="/about"
              element={
                <AnimatedRoute>
                  <About />
                </AnimatedRoute>
              }
            />
            <Route
              path="/roadmap"
              element={
                <AnimatedRoute>
                  <Roadmap />
                </AnimatedRoute>
              }
            />

            {/* Protected routes */}
            <Route
              path="/user"
              element={
                <ProtectedRoute>
                  <AnimatedRoute>
                    <User />
                  </AnimatedRoute>
                </ProtectedRoute>
              }
            />
            <Route
              path="/overview"
              element={
                <ProtectedRoute>
                  <AnimatedRoute>
                    <Overview />
                  </AnimatedRoute>
                </ProtectedRoute>
              }
            />
            <Route
              path="/artists"
              element={
                <ProtectedRoute>
                  <AnimatedRoute>
                    <Artists />
                  </AnimatedRoute>
                </ProtectedRoute>
              }
            />
            <Route
              path="/tracks"
              element={
                <ProtectedRoute>
                  <AnimatedRoute>
                    <Tracks />
                  </AnimatedRoute>
                </ProtectedRoute>
              }
            />
            <Route
              path="/suggestions"
              element={
                <ProtectedRoute>
                  <AnimatedRoute>
                    <Suggestions />
                  </AnimatedRoute>
                </ProtectedRoute>
              }
            />
            <Route
              path="/analyze"
              element={
                <ProtectedRoute>
                  <AnimatedRoute>
                    <Analyze />
                  </AnimatedRoute>
                </ProtectedRoute>
              }
            />
            <Route
              path="/genres"
              element={
                <ProtectedRoute>
                  <AnimatedRoute>
                    <Genres />
                  </AnimatedRoute>
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </UserContext.Provider>
    </div>
  );
};

export default App;

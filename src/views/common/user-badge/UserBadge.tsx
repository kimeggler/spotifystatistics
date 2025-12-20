import { Button } from '@heroui/react';
import { AnimatePresence, motion } from 'framer-motion';
import React, { Fragment, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShowAt } from '..';
import { close, menu_icon, user_icon } from '../../../assets';
import { useAuth } from '../../../contexts/AuthContext';
import { UserContext } from '../../App';

interface UserBadgeProps {}

const UserBadge: React.FC<UserBadgeProps> = () => {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const { signOut } = useAuth();
  const [menuActive, setMenuActive] = useState<boolean>(false);

  if (!context) {
    return null;
  }

  const { profile } = context;

  const logout = async (): Promise<void> => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
      // Still navigate even if logout fails
      navigate('/');
    }
  };

  const toggleScroll = (): void => {
    if (menuActive) {
      document.body.classList.remove('overflow-hidden');
    } else {
      document.body.classList.add('overflow-hidden');
    }
  };

  const toggleMenu = (): void => {
    toggleScroll();
    setMenuActive(!menuActive);
  };

  const navigationItems = [
    { href: '/overview', label: 'Overview', path: 'overview' },
    { href: '/artists', label: 'Artists', path: 'artists' },
    { href: '/tracks', label: 'Tracks', path: 'tracks' },
    { href: '/analyze', label: 'Playlists', path: 'analyze' },
    { href: '/genres', label: 'Genres', path: 'genres' },
    { href: '/feedback', label: 'Feedback', path: 'feedback' },
  ];

  const currentPath = window.location.pathname.split('/')[1];

  if (!profile) {
    return null;
  }

  return (
    <Fragment>
      <ShowAt breakpoint="1000AndBelow">
        <motion.div className="cursor-pointer" whileTap={{ scale: 0.95 }} onClick={toggleMenu}>
          <img
            alt="menu icon"
            src={!menuActive ? menu_icon : profile.images?.[0]?.url || user_icon}
            className={`w-10 h-10 rounded-full object-cover transition-all duration-300 ${
              menuActive ? 'border-2 border-statfy-purple-400' : ''
            }`}
          />
        </motion.div>

        <AnimatePresence>
          {menuActive && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 bg-gradient-to-br from-statfy-dark-950 via-statfy-dark-900 to-statfy-purple-950 flex flex-col items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="space-y-8"
              >
                {navigationItems.map((item, index) => (
                  <motion.a
                    key={item.path}
                    href={item.href}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
                    className={`block text-2xl font-medium transition-all duration-300 ${
                      currentPath === item.path
                        ? 'text-statfy-purple-300 scale-110'
                        : 'text-white/80 hover:text-statfy-purple-300 hover:scale-105'
                    }`}
                  >
                    {item.label}
                  </motion.a>
                ))}

                <motion.button
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                  onClick={logout}
                  className="block text-2xl font-medium text-red-400 hover:text-red-300 transition-colors duration-300 mt-12"
                >
                  Logout
                </motion.button>
              </motion.div>

              <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                onClick={toggleMenu}
                className="absolute top-8 right-8 p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors duration-300"
              >
                <img src={close} alt="close" className="w-6 h-6" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </ShowAt>

      <ShowAt breakpoint="1000AndAbove">
        <motion.div
          className="flex items-center space-x-3 p-3 rounded-2xl bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-statfy-purple-500/20"
          whileHover={{ scale: 1.05 }}
        >
          <img
            alt={profile.display_name}
            src={profile.images?.[0]?.url || user_icon}
            className="w-12 h-12 rounded-2xl object-cover border-2 border-statfy-purple-400 shadow-lg"
          />
          <div className="hidden lg:block">
            <p className="text-white font-semibold text-sm truncate max-w-32">
              {profile.display_name}
            </p>
            <Button
              size="sm"
              variant="light"
              onClick={logout}
              className="text-xs text-white/60 hover:text-red-400 transition-colors duration-300 p-0 h-auto min-w-0 rounded-xl hover:bg-red-500/10"
            >
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Logout
            </Button>
          </div>
        </motion.div>
      </ShowAt>
    </Fragment>
  );
};

export default UserBadge;

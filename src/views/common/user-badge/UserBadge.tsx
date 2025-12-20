import { AnimatePresence, motion } from 'framer-motion';
import React, { Fragment, useContext, useEffect, useRef, useState } from 'react';
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
  const [showLogout, setShowLogout] = useState<boolean>(false);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (badgeRef.current && !badgeRef.current.contains(event.target as Node)) {
        setShowLogout(false);
      }
    };

    if (showLogout) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showLogout]);

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
  ];

  const currentPath = window.location.pathname.split('/')[1];

  if (!profile) {
    return null;
  }

  return (
    <Fragment>
      <ShowAt breakpoint="1000AndBelow">
        {!menuActive && (
          <motion.div className="cursor-pointer" whileTap={{ scale: 0.95 }} onClick={toggleMenu}>
            <img
              alt="menu icon"
              src={menu_icon}
              className="w-10 h-10 object-cover transition-all duration-300"
            />
          </motion.div>
        )}

        <AnimatePresence>
          {menuActive && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 left-0 right-0 bottom-0 z-50 bg-black/80 backdrop-blur-md flex flex-col items-center justify-start pt-24 min-h-screen w-screen"
              style={{ position: 'fixed' }}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="space-y-8"
              >
                {navigationItems.map((item, index) => (
                  <motion.button
                    key={item.path}
                    onClick={() => {
                      navigate(item.href);
                      toggleMenu();
                    }}
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
                  </motion.button>
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
        <motion.div className="relative" ref={badgeRef}>
          <motion.div
            className="w-12 h-12 rounded-full overflow-hidden border-2 border-statfy-purple-400 shadow-lg cursor-pointer"
            whileHover={{ borderColor: 'rgb(168, 85, 247)' }}
            onClick={() => setShowLogout(!showLogout)}
          >
            <img
              alt={profile.display_name}
              src={profile.images?.[0]?.url || user_icon}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Logout button - shown on click */}
          <AnimatePresence>
            {showLogout && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full right-0 mt-2 z-50 cursor-pointer"
              >
                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-900/95 hover:bg-red-500/20 border border-white/10 hover:border-red-500/50 rounded-lg backdrop-blur-sm text-white/80 hover:text-red-400 transition-all duration-200 text-sm font-medium shadow-xl"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </ShowAt>
    </Fragment>
  );
};

export default UserBadge;

import { motion } from 'framer-motion';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import navigationItems from './navigation-items';

const NavBar: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="flex items-center gap-2">
      {navigationItems.map(item => {
        const isActive = currentPath === item.path;

        return (
          <Link
            key={item.path}
            to={item.path}
            className={`
              relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
              ${
                isActive
                  ? 'text-white bg-white/10'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }
            `}
          >
            {isActive && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-white/10 rounded-lg"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default NavBar;

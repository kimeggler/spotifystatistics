import { motion } from 'framer-motion';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import navigationItems from './navigation-items';

const NavBar: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="flex items-center space-x-1">
      {navigationItems.map(item => {
        const isActive = currentPath === item.path;

        return (
          <motion.div key={item.path} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to={item.path}
              className={`
                relative px-6 py-3 rounded-2xl font-semibold transition-all duration-300
                ${
                  isActive
                    ? 'text-white bg-gradient-to-r from-statfy-purple-500 to-statfy-purple-400 shadow-xl shadow-statfy-purple-500/30 scale-105'
                    : 'text-white/70 hover:text-white hover:bg-white/10 hover:scale-105'
                }
              `}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-statfy-purple-500 to-statfy-purple-400 rounded-2xl"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </Link>
          </motion.div>
        );
      })}
    </nav>
  );
};

export default NavBar;

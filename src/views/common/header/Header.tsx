import { motion } from 'framer-motion';
import React from 'react';
import { Link } from 'react-router-dom';
import { NavBar, UserBadge } from '..';
import { useAuth } from '../../../contexts/AuthContext';

const Header: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50"
    >
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link
            to="/"
            className="text-2xl font-bold text-white tracking-tight hover:text-white/80 transition-colors duration-200"
          >
            STATFY
          </Link>
        </motion.div>

        {isAuthenticated && (
          <div className="flex items-center gap-8">
            <div className="hidden md:block">
              <NavBar />
            </div>

            <UserBadge />
          </div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;

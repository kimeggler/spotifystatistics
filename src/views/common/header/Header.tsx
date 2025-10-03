import { motion } from 'framer-motion';
import React from 'react';
import { Link } from 'react-router-dom';
import { NavBar, UserBadge } from '..';

const Header: React.FC = () => {
  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 bg-statfy-dark-950/90 backdrop-blur-lg border-b border-white/10"
    >
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            to="/"
            className="text-3xl font-bold bg-gradient-to-r from-statfy-purple-300 to-statfy-purple-500 bg-clip-text text-transparent hover:from-statfy-purple-200 hover:to-statfy-purple-400 transition-all duration-300"
          >
            STATFY
          </Link>
        </motion.div>

        <div className="hidden md:block">
          <NavBar />
        </div>

        <UserBadge />
      </div>
    </motion.header>
  );
};

export default Header;

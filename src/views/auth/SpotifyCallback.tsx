import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { handleSignInCallback } from '../../helper/authenticationhelper';

const SpotifyCallback: React.FC = () => {
  const navigate = useNavigate();
  const { checkAuth } = useAuth();

  useEffect(() => {
    const handleCallback = async (): Promise<void> => {
      try {
        await handleSignInCallback();
        // Refresh auth state after successful callback
        await checkAuth();
        navigate('/overview');
      } catch (error) {
        console.error('Error during authentication:', error);
        navigate('/');
      }
    };

    handleCallback();
  }, [navigate, checkAuth]);

  return (
    <div className="bg-paper-bg text-paper-fg font-display min-h-screen flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-md w-full border border-paper-border p-10 text-center"
      >
        <div className="font-serif italic font-normal text-2xl text-paper-accent mb-9">
          statfy
        </div>

        <div
          aria-hidden
          className="w-10 h-10 mx-auto mb-7 rounded-full border-2 border-paper-border border-t-paper-accent animate-spin"
        />

        <h1 className="text-xl font-extrabold tracking-[-0.01em] mb-2">Logging you in…</h1>
        <p className="text-[13px] text-paper-muted">
          Connecting to your Spotify account and preparing your stats.
        </p>
      </motion.div>
    </div>
  );
};

export default SpotifyCallback;

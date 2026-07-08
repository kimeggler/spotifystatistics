import { motion } from 'framer-motion';
import React from 'react';

const DefaultErrorMessage: React.FC = () => {
  const handleRefresh = (): void => {
    window.location.reload();
  };

  return (
    <div className="bg-paper-bg text-paper-fg font-display min-h-screen flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-md w-full border border-paper-border p-10 text-center"
      >
        <div className="flex items-center justify-center gap-[10px] font-mono text-xs tracking-[0.18em] uppercase text-paper-muted mb-6">
          <span className="w-2 h-2 bg-paper-accent inline-block" />
          Error
        </div>
        <h1 className="text-3xl font-extrabold tracking-[-0.02em] mb-4">
          Something went{' '}
          <span className="font-serif italic font-normal text-paper-accent">wrong.</span>
        </h1>
        <p className="text-[15px] leading-[1.6] text-paper-muted mb-9">
          We hit an unexpected error. Try refreshing the page, or head back to where you were.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={handleRefresh}
            className="border border-paper-fg px-[18px] py-[10px] font-mono text-xs tracking-[0.06em] uppercase cursor-pointer"
          >
            Refresh Page
          </button>
          <button
            onClick={() => window.history.back()}
            className="border border-paper-border px-[18px] py-[10px] font-mono text-xs tracking-[0.06em] uppercase text-paper-muted hover:text-paper-fg cursor-pointer"
          >
            Go Back
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default DefaultErrorMessage;

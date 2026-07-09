import React from 'react';

interface PageLoaderProps {
  label?: string;
}

const PageLoader: React.FC<PageLoaderProps> = ({ label = 'Loading…' }) => (
  <div className="min-h-125 flex flex-col items-center justify-center gap-5 px-6">
    <div
      aria-hidden
      className="w-10 h-10 rounded-full border-2 border-paper-border border-t-paper-accent animate-spin"
    />
    <div className="font-mono text-xs tracking-[0.06em] uppercase text-paper-muted">{label}</div>
  </div>
);

export default PageLoader;

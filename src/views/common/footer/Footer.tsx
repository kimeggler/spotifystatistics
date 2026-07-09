import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="flex flex-col sm:flex-row items-center justify-between gap-4 px-10 py-[26px] border-t border-paper-border">
      <div className="font-mono text-[11px] tracking-[0.04em] text-paper-muted">
        © {new Date().getFullYear()} STATFY
      </div>
      <div className="flex items-center gap-6">
        <Link
          to="/about"
          className="font-mono text-[11px] tracking-[0.04em] uppercase text-paper-muted hover:text-paper-fg transition-colors"
        >
          About
        </Link>
        <Link
          to="/roadmap"
          className="font-mono text-[11px] tracking-[0.04em] uppercase text-paper-muted hover:text-paper-fg transition-colors"
        >
          Roadmap
        </Link>
        <a
          href="https://deezer.statfy.xyz"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[11px] tracking-[0.04em] uppercase text-deezer-accent hover:opacity-80 transition-opacity"
        >
          Statfy for Deezer ↗
        </a>
      </div>
      <div className="font-mono text-[11px] tracking-[0.04em] text-paper-muted">
        NOT AFFILIATED WITH SPOTIFY
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="flex items-center justify-between px-10 py-[26px] border-t border-paper-border">
      <div className="font-mono text-[11px] tracking-[0.04em] text-paper-muted">
        © {new Date().getFullYear()} STATFY
      </div>
      <div className="font-mono text-[11px] tracking-[0.04em] text-paper-muted">
        NOT AFFILIATED WITH SPOTIFY
      </div>
    </footer>
  );
};

export default Footer;

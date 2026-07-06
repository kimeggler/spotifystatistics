import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import navigationItems from '../navbar/navigation-items';

const PaperNav: React.FC = () => {
  const { signIn } = useAuth();

  const connect = async (): Promise<void> => {
    try {
      await signIn();
    } catch (error) {
      console.error('Failed to initiate sign in:', error);
    }
  };

  return (
    <div className="flex items-center justify-between px-6 md:px-10 py-[22px] border-b border-paper-border">
      <Link to="/" className="font-mono font-bold text-[22px] tracking-[-0.5px]">
        STAT<span className="font-serif italic font-normal">fy</span>
      </Link>

      <div className="hidden md:flex items-center gap-9">
        {navigationItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className="font-mono text-xs tracking-[0.08em] uppercase text-paper-muted hover:text-paper-fg transition-colors"
          >
            {item.label}
          </Link>
        ))}
        <button
          onClick={connect}
          className="border border-paper-fg px-[18px] py-[9px] font-mono text-xs tracking-[0.06em] uppercase cursor-pointer"
        >
          Log in
        </button>
      </div>
    </div>
  );
};

export default PaperNav;

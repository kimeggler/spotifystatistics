import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { useTheme } from '../../../contexts/ThemeContext';
import { UserContext } from '../../App';
import navigationItems from '../navbar/navigation-items';

const PaperNav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, signIn, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { profile } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const connect = async (): Promise<void> => {
    try {
      await signIn();
    } catch (error) {
      console.error('Failed to initiate sign in:', error);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      setMenuOpen(false);
      setMobileMenuOpen(false);
      navigate('/');
    }
  };

  return (
    <div className="relative border-b border-paper-border">
      <div className="flex items-center justify-between px-6 md:px-10 py-[22px]">
        <Link to="/" className="font-serif italic font-normal text-2xl text-paper-accent">
          statfy
        </Link>

        <div className="hidden md:flex items-center gap-9">
          {isAuthenticated &&
            navigationItems.map(item => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`font-mono text-xs tracking-[0.08em] uppercase pb-1 transition-colors ${
                    isActive
                      ? 'text-paper-fg border-b-2 border-paper-accent'
                      : 'text-paper-muted hover:text-paper-fg'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-[38px] h-[38px] flex items-center justify-center border border-paper-fg font-mono text-[10px] tracking-[0.04em] uppercase cursor-pointer text-paper-fg"
          >
            {theme === 'dark' ? 'Lt' : 'Dk'}
          </button>

          {isAuthenticated ? (
            <div className="relative flex" ref={menuRef}>
              <button
                onClick={() => setMenuOpen(open => !open)}
                aria-label="Account menu"
                className="w-[38px] h-[38px] border border-paper-fg bg-paper-border bg-cover bg-center cursor-pointer"
                style={
                  profile?.images?.[0]?.url
                    ? { backgroundImage: `url(${profile.images[0].url})` }
                    : undefined
                }
              />
              {menuOpen && (
                <div className="absolute top-full right-0 mt-2 min-w-[140px] border border-paper-border bg-paper-bg z-50">
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-3 font-mono text-xs tracking-[0.06em] uppercase text-paper-muted hover:text-paper-fg cursor-pointer"
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={connect}
              className="h-[38px] flex items-center border border-paper-fg px-[18px] font-mono text-xs tracking-[0.06em] uppercase cursor-pointer"
            >
              Log in
            </button>
          )}
        </div>

        <button
          onClick={() => setMobileMenuOpen(open => !open)}
          aria-label="Menu"
          aria-expanded={mobileMenuOpen}
          className="md:hidden border border-paper-fg px-[14px] py-[9px] font-mono text-xs tracking-[0.06em] uppercase cursor-pointer"
        >
          {mobileMenuOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-paper-bg border-t border-paper-border z-50">
          {isAuthenticated &&
            navigationItems.map(item => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-6 py-4 border-b border-paper-border font-mono text-xs tracking-[0.08em] uppercase ${
                    isActive ? 'text-paper-fg' : 'text-paper-muted'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          <div className="px-6 py-5 flex items-center gap-3">
            {isAuthenticated ? (
              <button
                onClick={logout}
                className="flex-1 h-[38px] flex items-center justify-center border border-paper-fg px-[18px] font-mono text-xs tracking-[0.06em] uppercase cursor-pointer"
              >
                Log out
              </button>
            ) : (
              <button
                onClick={connect}
                className="flex-1 h-[38px] flex items-center justify-center border border-paper-fg px-[18px] font-mono text-xs tracking-[0.06em] uppercase cursor-pointer"
              >
                Log in
              </button>
            )}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="w-[38px] h-[38px] shrink-0 flex items-center justify-center border border-paper-fg font-mono text-[10px] tracking-[0.04em] uppercase cursor-pointer text-paper-fg"
            >
              {theme === 'dark' ? 'Lt' : 'Dk'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaperNav;

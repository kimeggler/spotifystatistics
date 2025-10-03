import React, { ReactNode, useEffect, useState } from 'react';
import breakpointsConfig from './breakpointsConfig';

interface HideShowProps {
  hide: boolean;
  breakpoint: string;
  children: ReactNode;
  className?: string;
}

const HideShow: React.FC<HideShowProps> = ({ hide, breakpoint, children, className }) => {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    if (!window.matchMedia) {
      throw new Error(
        'Window.matchMedia is not supported by your Browser. Please update your Browser!',
      );
    }

    // Build media query string
    let mediaQuery = '';
    const breakpointParts = breakpoint.split(' ');

    breakpointParts.forEach((bp, index) => {
      const breakpointConfig = breakpointsConfig.breakpoints.find(b => b.name === bp);
      if (breakpointConfig) {
        if (index === 0) {
          mediaQuery = breakpointConfig.breakpoint;
        } else {
          mediaQuery += ` and ${breakpointConfig.breakpoint}`;
        }
      }
    });

    const mql = window.matchMedia(mediaQuery);

    const updateVisibility = (mql: MediaQueryList) => {
      const breakpointActive = !!mql.matches;
      setVisible(hide ? !breakpointActive : breakpointActive);
    };

    // Set initial visibility
    updateVisibility(mql);

    // Listen for changes
    const handleChange = (e: MediaQueryListEvent) => {
      updateVisibility(e as any);
    };

    mql.addEventListener('change', handleChange);

    return () => {
      mql.removeEventListener('change', handleChange);
    };
  }, [breakpoint, hide]);

  return visible ? <>{children}</> : null;
};

export default HideShow;

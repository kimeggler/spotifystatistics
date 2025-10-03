import React, { ReactNode } from 'react';
import HideShow from './HideShow';

interface ShowAtProps {
  breakpoint: string;
  children: ReactNode;
  className?: string;
}

const ShowAt: React.FC<ShowAtProps> = ({ breakpoint, children, className }) => (
  <HideShow breakpoint={breakpoint} hide={false} className={className}>
    {children}
  </HideShow>
);

export default ShowAt;

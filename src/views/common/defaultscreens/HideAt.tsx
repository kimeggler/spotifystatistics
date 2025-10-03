import React, { ReactNode } from 'react';
import HideShow from './HideShow';

interface HideAtProps {
  breakpoint: string;
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const HideAt: React.FC<HideAtProps> = ({ breakpoint, children, className, style }) => (
  <div style={style}>
    <HideShow breakpoint={breakpoint} className={className} hide>
      {children}
    </HideShow>
  </div>
);

export default HideAt;

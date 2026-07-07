import React, { useEffect, useRef, useState } from 'react';

interface MarqueeTextProps {
  text: string;
  className?: string;
}

/**
 * Single-line text that never grows its container. If the text is wider than
 * the available space it scrolls into view on hover instead of wrapping or
 * pushing sibling grid cells out of alignment.
 */
const MarqueeText: React.FC<MarqueeTextProps> = ({ text, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [overflowPx, setOverflowPx] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (!containerRef.current || !textRef.current) return;
      const diff = textRef.current.scrollWidth - containerRef.current.clientWidth;
      setOverflowPx(diff > 0 ? diff : 0);
    };

    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [text]);

  return (
    <div
      ref={containerRef}
      title={text}
      className={`overflow-hidden whitespace-nowrap ${className}`}
    >
      <span
        ref={textRef}
        className={`inline-block ${
          overflowPx > 0
            ? 'transition-transform duration-[1400ms] ease-in-out group-hover:translate-x-[var(--marquee-distance)]'
            : ''
        }`}
        style={
          overflowPx > 0
            ? ({ '--marquee-distance': `-${overflowPx}px` } as React.CSSProperties)
            : undefined
        }
      >
        {text}
      </span>
    </div>
  );
};

export default MarqueeText;

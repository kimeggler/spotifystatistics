import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Footer from '../common/footer/Footer';
import PaperNav from '../common/papernav/PaperNav';

interface RoadmapItem {
  title: string;
  date: string;
  status: 'completed' | 'active' | 'planned';
  description: string;
}

const roadmapItems: RoadmapItem[] = [
  {
    title: 'Technological Rework',
    date: 'December 2025',
    status: 'completed',
    description:
      'Complete migration from JavaScript to TypeScript with modern build tools (Vite), improved code quality, type safety, and developer experience.',
  },
  {
    title: 'Modern Redesign Complete',
    date: 'January 2025',
    status: 'completed',
    description:
      'Statfy has received a complete modern overhaul with Tailwind CSS, HeroUI components, and smooth animations for a better user experience.',
  },
  {
    title: 'Enhanced Analytics',
    date: 'June 2026',
    status: 'completed',
    description:
      'Advanced listening statistics with beautiful visualizations, genre analysis, and personalized music insights. Results vary depending on what the Spotify API makes available.',
  },
  {
    title: 'Editorial Redesign',
    date: 'July 2026',
    status: 'completed',
    description:
      'A brutalist, editorial-inspired visual overhaul — paper backgrounds, hairline borders, mono/serif typography, and a single deliberate accent color, applied across the entire app.',
  },
  {
    title: 'Further Improvements',
    date: 'Q2 2026',
    status: 'planned',
    description:
      'General improvements and new features to enhance user experience and functionality.',
  },
];

const statusLabels: Record<RoadmapItem['status'], string> = {
  completed: 'Completed',
  active: 'In Progress',
  planned: 'Planned',
};

const Roadmap: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/overview');
    }
  }, [navigate, isAuthenticated]);

  return (
    <div className="bg-paper-bg text-paper-fg font-display min-h-screen">
      <PaperNav />

      {/* HERO */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-[1120px] mx-auto px-6 md:px-10 pt-16 md:pt-24 pb-16 md:pb-[90px] text-center"
      >
        <div className="flex items-center justify-center gap-[10px] font-mono text-xs tracking-[0.18em] uppercase text-paper-muted mb-7">
          <span className="w-2 h-2 bg-paper-accent inline-block" />
          Roadmap
        </div>

        <h1 className="text-4xl md:text-[56px] font-extrabold tracking-[-0.02em] mb-9 max-w-[760px] mx-auto">
          Development{' '}
          <span className="font-serif italic font-normal text-paper-accent">roadmap</span>.
        </h1>

        <p className="text-lg md:text-xl leading-[1.55] max-w-[640px] mx-auto text-paper-muted">
          Discover our plans for the future of Statfy and see how we're continuously improving your
          music analytics experience.
        </p>
      </motion.div>

      {/* ROADMAP ITEMS */}
      <div className="border-t border-paper-border">
        <div className="max-w-[1120px] mx-auto px-6 md:px-10 py-16 md:py-20">
          <div className="border border-paper-border">
            {roadmapItems.map((item, i) => {
              const isActive = item.status === 'active';
              return (
                <div
                  key={item.title}
                  className={`p-7 md:p-9 flex gap-6 border-paper-border ${
                    i !== roadmapItems.length - 1 ? 'border-b' : ''
                  }`}
                >
                  <div
                    className={`w-[34px] h-[34px] flex items-center justify-center font-mono text-[13px] font-bold -rotate-3 shrink-0 ${
                      isActive ? 'bg-paper-accent text-paper-bg' : 'bg-paper-fg text-paper-bg'
                    }`}
                  >
                    0{i + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="text-[22px] font-extrabold tracking-[-0.01em]">
                        {item.title}
                      </h3>
                      <span
                        className={`font-mono text-[10px] tracking-[0.06em] uppercase border px-2 py-[3px] ${
                          isActive
                            ? 'border-paper-accent text-paper-accent'
                            : 'border-paper-border text-paper-muted'
                        }`}
                      >
                        {statusLabels[item.status]}
                      </span>
                    </div>
                    <div className="font-mono text-xs text-paper-muted mb-3">{item.date}</div>
                    <p className="text-sm leading-[1.5] text-paper-muted max-w-[640px]">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* BACK TO HOME */}
      <div className="border-t border-paper-border px-6 md:px-10 py-20 md:py-[110px] text-center">
        <Link
          to="/"
          className="inline-flex items-center gap-3 border border-paper-fg px-9 py-[18px] font-mono font-bold text-[13px] tracking-[0.06em] uppercase"
        >
          ← Back to Home
        </Link>
      </div>

      <Footer />
    </div>
  );
};

export default Roadmap;

import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface RoadmapItem {
  title: string;
  date: string;
  status: 'completed' | 'active' | 'planned';
  description: string;
  icon: string;
}

const Roadmap: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/overview');
    }
  }, [navigate, isAuthenticated]);

  const roadmapItems: RoadmapItem[] = [
    {
      title: 'Technological Rework',
      date: 'November 2025',
      status: 'completed',
      description:
        'Complete migration from JavaScript to TypeScript with modern build tools (Vite), improved code quality, type safety, and developer experience.',
      icon: '⚙️',
    },
    {
      title: 'Modern Redesign Complete',
      date: 'December 2025',
      status: 'completed',
      description:
        'Statfy has received a complete modern overhaul with Tailwind CSS, HeroUI components, and smooth animations for a better user experience.',
      icon: '🎨',
    },
    {
      title: 'Enhanced Analytics',
      date: 'Q4 2025',
      status: 'active',
      description:
        'Advanced listening statistics with beautiful visualizations, genre analysis, and personalized music insights.',
      icon: '📊',
    },
    {
      title: 'Social Features',
      date: 'Q1 2026',
      status: 'planned',
      description:
        'Share your music statistics with friends, compare listening habits, and discover new music through social connections.',
      icon: '👥',
    },
    {
      title: 'Mobile App',
      date: 'Q2 2026',
      status: 'planned',
      description:
        'Native mobile applications for iOS and Android with all the features of the web app and more.',
      icon: '📱',
    },
  ];

  const getStatusLabel = (status: RoadmapItem['status']): string => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'active':
        return 'In Progress';
      case 'planned':
        return 'Planned';
      default:
        return 'Unknown';
    }
  };

  const getStatusColor = (status: RoadmapItem['status']): string => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'active':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'planned':
        return 'bg-white/10 text-white/60 border-white/20';
      default:
        return 'bg-white/10 text-white/60 border-white/20';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 80,
      },
    },
  };

  return (
    <div className="min-h-screen px-4 py-12 md:px-8 lg:px-12">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-8 flex flex-col items-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-6 max-w-4xl">
            Development{' '}
            <span className="text-transparent bg-gradient-to-r from-statfy-purple-300 to-statfy-purple-500 bg-clip-text">
              Roadmap
            </span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Discover our exciting plans for the future of Statfy and see how we&apos;re continuously
            improving your music analytics experience.
          </p>
        </motion.div>

        {/* Roadmap Items */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-400 via-pink-400 to-purple-400 opacity-30 hidden md:block" />

          <div className="space-y-8">
            {roadmapItems.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative flex items-start gap-6"
              >
                {/* Timeline node */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center text-2xl backdrop-blur-sm">
                    {item.icon}
                  </div>
                </div>

                {/* Content card */}
                <div className="flex-1 bg-white/10 border border-white/20 rounded-lg p-6 hover:bg-white/[0.15] transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="text-xl font-bold text-white">{item.title}</h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold border whitespace-nowrap ${getStatusColor(item.status)}`}
                        >
                          {getStatusLabel(item.status)}
                        </span>
                      </div>
                      <p className="text-white/40 text-sm font-medium mb-3">{item.date}</p>
                      <p className="text-white/70 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Back button */}
        <motion.div variants={itemVariants} className="flex justify-center mt-12">
          <button
            onClick={() => navigate('/')}
            className="px-8 py-3 bg-white/10 border border-white/20 text-white rounded-lg font-semibold hover:bg-white/20 transition-all duration-300"
          >
            Back to Home
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Roadmap;

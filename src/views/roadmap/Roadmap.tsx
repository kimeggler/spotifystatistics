import { Button, Card, CardBody, Chip } from '@heroui/react';
import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { stars } from '../../assets';
import { validateToken } from '../../helper/authenticationhelper';

interface RoadmapItem {
  title: string;
  date: string;
  status: 'completed' | 'active' | 'planned';
  description: string;
  icon: string;
}

const Roadmap: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = await validateToken();
      if (isAuthenticated) {
        navigate('/overview');
      }
    };
    checkAuth();
  }, [navigate]);

  const roadmapItems: RoadmapItem[] = [
    {
      title: 'Modern Redesign Complete',
      date: 'OCTOBER 2025',
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

  const getStatusColor = (status: RoadmapItem['status']): 'success' | 'primary' | 'default' => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'active':
        return 'primary';
      case 'planned':
        return 'default';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: RoadmapItem['status']): string => {
    switch (status) {
      case 'completed':
        return '✅';
      case 'active':
        return '🚀';
      case 'planned':
        return '⏳';
      default:
        return '⏳';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
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
        stiffness: 100,
      },
    },
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-statfy-dark-950 via-statfy-dark-900 to-statfy-purple-900">
      {/* Animated Background */}
      <div
        className="absolute inset-0 opacity-20 blur-sm"
        style={{
          backgroundImage: `url(${stars})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-statfy-dark-950/90 via-transparent to-statfy-purple-900/60" />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 px-6 py-12"
      >
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div variants={itemVariants}>
              <Button
                variant="light"
                size="lg"
                className="text-4xl font-bold bg-gradient-to-r from-statfy-purple-300 to-statfy-purple-500 bg-clip-text text-transparent mb-8"
                onClick={() => navigate('/')}
              >
                STATFY
              </Button>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
                <span className="text-white">DEVELOPMENT </span>
                <span className="text-transparent bg-gradient-to-r from-statfy-purple-300 to-statfy-purple-500 bg-clip-text">
                  ROADMAP
                </span>
              </h1>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="bg-white/5 backdrop-blur-md border-white/10 max-w-2xl mx-auto">
                <CardBody className="p-6">
                  <p className="text-white/80 text-lg">
                    Discover our exciting plans for the future of Statfy and see how we&apos;re
                    continuously improving your music analytics experience.
                  </p>
                </CardBody>
              </Card>
            </motion.div>
          </div>

          {/* Roadmap Timeline */}
          <motion.div variants={itemVariants} className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-statfy-purple-500 via-statfy-purple-400 to-statfy-purple-300 transform md:-translate-x-1/2"></div>

            <div className="space-y-12">
              {roadmapItems.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-col md:gap-8`}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-gradient-to-r from-statfy-purple-500 to-statfy-purple-400 rounded-full transform md:-translate-x-1/2 z-10 shadow-lg shadow-statfy-purple-500/50"></div>

                  {/* Content Card */}
                  <div
                    className={`w-full md:w-5/12 ml-12 md:ml-0 ${
                      index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
                    }`}
                  >
                    <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300">
                      <CardBody className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{item.icon}</span>
                            <div>
                              <h3 className="text-xl font-bold text-white">{item.title}</h3>
                              <p className="text-statfy-purple-300 font-semibold text-sm">
                                {item.date}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span>{getStatusIcon(item.status)}</span>
                            <Chip
                              color={getStatusColor(item.status)}
                              size="sm"
                              className="capitalize font-semibold"
                            >
                              {item.status}
                            </Chip>
                          </div>
                        </div>
                        <p className="text-white/70 leading-relaxed">{item.description}</p>
                      </CardBody>
                    </Card>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block w-5/12"></div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-16"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-statfy-purple-500 to-statfy-purple-400 text-white font-bold px-8 py-6"
              onClick={() => navigate('/')}
            >
              Back to Home
            </Button>

            <Button
              variant="bordered"
              size="lg"
              className="border-white/20 text-white/80 hover:bg-white/5 hover:text-white transition-all duration-300"
              as={Link}
              to="/feedback"
            >
              Leave Feedback
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Roadmap;

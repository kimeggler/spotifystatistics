import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardBody } from '@heroui/react';
import { motion } from 'framer-motion';
import { authorizeSpotifyUser } from '../../services/fetchservice';
import { stars } from '../../assets';
import { validateToken } from '../../helper/authenticationhelper';

const Landingpage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (validateToken()) {
      navigate('/overview');
    }
  }, [navigate]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100
      }
    }
  };

  const titleVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 120,
        delay: 0.5
      }
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-statfy-dark-950 via-statfy-dark-900 to-statfy-purple-900">
      {/* Animated Background */}
      <div 
        className="absolute inset-0 opacity-30 blur-sm"
        style={{ 
          backgroundImage: `url(${stars})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-statfy-dark-950/80 via-transparent to-statfy-purple-900/60" />
      
      {/* Floating Orbs */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-64 h-64 bg-statfy-purple-300/20 rounded-full blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-statfy-purple-500/20 rounded-full blur-xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.2, 0.4],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex items-center justify-center min-h-screen px-6"
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo */}
          <motion.div variants={itemVariants} className="mb-8">
            <h3 className="text-6xl font-bold bg-gradient-to-r from-statfy-purple-300 to-statfy-purple-500 bg-clip-text text-transparent">
              STATFY
            </h3>
          </motion.div>

          {/* Tagline */}
          <motion.div variants={itemVariants} className="mb-6">
            <p className="text-statfy-purple-300 text-sm font-semibold tracking-widest uppercase">
              STATISTICS & FACTS
            </p>
          </motion.div>

          {/* Main Title */}
          <motion.div variants={titleVariants} className="mb-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight">
              <span className="text-white">SPOTIFY </span>
              <span className="text-transparent bg-gradient-to-r from-statfy-purple-300 to-statfy-purple-500 bg-clip-text">
                STATISTICS
              </span>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.div variants={itemVariants} className="mb-12">
            <Card className="bg-white/5 backdrop-blur-md border-white/10 max-w-2xl mx-auto">
              <CardBody className="p-8">
                <p className="text-white/80 text-lg leading-relaxed">
                  Discover your musical journey with detailed insights into your most listened 
                  artists and tracks. Create personalized playlists and explore your unique 
                  music taste with beautiful visualizations.
                </p>
              </CardBody>
            </Card>
          </motion.div>

          {/* Action Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button
              size="lg"
              className="bg-gradient-to-r from-statfy-purple-500 to-statfy-purple-400 text-white font-bold text-lg px-10 py-4 rounded-2xl shadow-2xl hover:shadow-statfy-purple-500/50 transition-all duration-300 hover:scale-105 hover:-translate-y-1"
              onClick={() => {
                window.location.href = authorizeSpotifyUser();
              }}
            >
              <span className="flex items-center gap-3">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.062 14.615c-.156.375-.5.625-.906.625-.125 0-.25-.031-.375-.094-1.281-.781-2.906-1.156-4.781-1.156-1.406 0-2.719.25-3.906.75-.469.188-.969-.094-1.156-.563s.094-.969.563-1.156c1.406-.594 2.938-.906 4.5-.906 2.156 0 4.094.469 5.656 1.375.437.25.594.812.406 1.125zm1.281-2.875c-.188.438-.625.719-1.094.719-.156 0-.313-.031-.469-.125-1.531-.906-3.656-1.375-6.281-1.375-1.781 0-3.406.313-4.781.906-.563.25-1.219-.031-1.469-.594s.031-1.219.594-1.469c1.656-.719 3.625-1.094 5.656-1.094 3.031 0 5.5.531 7.313 1.594.531.281.75.969.531 1.438zm1.125-3.125c-.219.531-.75.875-1.313.875-.188 0-.375-.031-.563-.125-1.781-1.063-4.5-1.625-7.781-1.625-2.125 0-4.125.375-5.906 1.094-.688.281-1.469-.031-1.75-.719s.031-1.469.719-1.75c2.063-.844 4.375-1.281 6.938-1.281 3.781 0 7 .656 9.25 1.906.594.313.844 1.063.406 1.625z"/>
                </svg>
                Connect with Spotify
              </span>
            </Button>
            
            <div className="flex gap-3">
              <Button
                variant="bordered"
                size="lg"
                className="border-white/30 text-white/90 hover:bg-white/10 hover:text-white transition-all duration-300 rounded-xl px-6 py-3 hover:scale-105"
                onClick={() => navigate('/roadmap')}
              >
                Development
              </Button>
              
              <Button
                variant="bordered"
                size="lg"
                className="border-white/30 text-white/90 hover:bg-white/10 hover:text-white transition-all duration-300 rounded-xl px-6 py-3 hover:scale-105"
                onClick={() => navigate('/about')}
              >
                Learn more
              </Button>
            </div>
          </motion.div>

          {/* Feature Highlights */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            {[
              { 
                icon: (
                  <svg className="w-8 h-8 text-statfy-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ), 
                title: "Smart Analytics", 
                desc: "Deep insights into your listening patterns and musical preferences" 
              },
              { 
                icon: (
                  <svg className="w-8 h-8 text-statfy-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V1a1 1 0 011-1h2a1 1 0 011 1v22a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1h2z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16M10 11h4m-2 4h2m-6 4h10" />
                  </svg>
                ), 
                title: "Beautiful Visuals", 
                desc: "Stunning charts and graphs that bring your music data to life" 
              },
              { 
                icon: (
                  <svg className="w-8 h-8 text-statfy-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                ), 
                title: "Playlist Magic", 
                desc: "Create and analyze custom playlists based on your unique taste" 
              }
            ].map((feature, index) => (
              <Card key={index} className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300 rounded-2xl hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:shadow-statfy-purple-500/20">
                <CardBody className="text-center p-8">
                  <div className="flex justify-center mb-4 p-3 bg-statfy-purple-500/10 rounded-xl w-fit mx-auto">
                    {feature.icon}
                  </div>
                  <h3 className="text-white font-bold text-xl mb-3">{feature.title}</h3>
                  <p className="text-white/70 text-base leading-relaxed">{feature.desc}</p>
                </CardBody>
              </Card>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Landingpage;
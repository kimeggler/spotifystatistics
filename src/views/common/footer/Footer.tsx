import { motion } from 'framer-motion';
import React from 'react';
import creatorItems, { Creator } from './creator-items';

const Footer: React.FC = () => {
  const mapCreators = (creators: Creator[]) => {
    return creators.map((creator, index) => {
      return (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          viewport={{ once: true }}
          className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
        >
          <div className="flex items-center gap-3">
            <motion.img
              src={creator.image}
              alt={creator.name}
              className="w-12 h-12 rounded-lg object-cover border border-white/20 flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            />
            <p className="text-white/90 font-medium text-sm">{creator.name}</p>
          </div>

          <div className="flex gap-3">
            {creator.links.map((link, i) => (
              <motion.a
                key={`${index}_${i}`}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-2 rounded-lg hover:bg-white/10 transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title={link.name}
              >
                <img
                  src={link.image}
                  alt={link.name}
                  className="w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                />
              </motion.a>
            ))}
          </div>
        </motion.div>
      );
    });
  };

  return (
    <footer className="bg-white/5 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Brand */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center gap-3"
          >
            <h3 className="text-xl font-bold text-white/80">STATFY</h3>
            <span className="text-white/40 text-sm">Personalized Statistics</span>
          </motion.div>

          {/* Right: Contact */}
          <motion.a
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            href="mailto:dev.statify@gmail.com"
            className="text-white/60 hover:text-white text-sm transition-colors duration-200"
          >
            dev.statify@gmail.com
          </motion.a>
        </div>

        <div className="w-full h-px bg-white/10 my-4" />

        {/* Creators - Horizontal Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">{mapCreators(creatorItems)}</div>
      </div>
    </footer>
  );
};

export default Footer;

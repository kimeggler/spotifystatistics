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
          className="flex flex-col items-center space-y-4 p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-statfy-purple-500/20 transition-all duration-300 shadow-lg hover:shadow-statfy-purple-500/10"
        >
          <div className="flex flex-col items-center space-y-3">
            <motion.img
              src={creator.image}
              alt={creator.name}
              className="w-20 h-20 rounded-3xl object-cover border-2 border-statfy-purple-400 shadow-lg"
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            />
            <p className="text-white font-semibold text-sm tracking-wide">{creator.name}</p>
          </div>

          <div className="flex space-x-3">
            {creator.links.map((link, i) => (
              <motion.a
                key={`${index}_${i}`}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex flex-col items-center space-y-1 p-3 rounded-2xl hover:bg-white/10 transition-colors duration-300">
                  <img
                    src={link.image}
                    alt={`${creator.name} ${link.name}`}
                    className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <span className="text-xs text-white/60 group-hover:text-statfy-purple-300 transition-colors duration-300">
                    {link.name}
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      );
    });
  };

  return (
    <footer className="bg-gradient-to-t from-statfy-dark-950 to-statfy-dark-900 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-4xl font-bold bg-gradient-to-r from-statfy-purple-300 to-statfy-purple-500 bg-clip-text text-transparent mb-4">
            STATFY
          </h3>
          <div className="w-24 h-1 bg-gradient-to-r from-statfy-purple-400 to-statfy-purple-600 rounded-full mx-auto mb-4" />
          <p className="text-white/60 text-lg font-medium tracking-widest">
            PERSONALIZED STATISTICS
          </p>
        </motion.div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-12" />

        <div className="grid md:grid-cols-2 gap-8 mb-12">{mapCreators(creatorItems)}</div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-12" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center space-y-6"
        >
          <h4 className="text-white text-xl font-semibold">CONTACT</h4>
          <p className="text-white/70 max-w-2xl mx-auto leading-relaxed">
            If you have questions or suggestions on how we could make our app more user friendly or
            if you want to request a feature, feel free to contact us!
          </p>
          <motion.a
            href="mailto:dev.statify@gmail.com"
            className="inline-block text-statfy-purple-300 hover:text-statfy-purple-200 font-medium transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            dev.statify@gmail.com
          </motion.a>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;

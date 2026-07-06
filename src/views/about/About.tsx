import { motion } from 'framer-motion';
import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../common/footer/Footer';
import PaperNav from '../common/papernav/PaperNav';

interface Feature {
  num: string;
  title: string;
  desc: string;
}

const features: Feature[] = [
  {
    num: '01',
    title: 'Privacy First',
    desc: 'No data from your Spotify profile is stored on our servers. Your privacy is our priority.',
  },
  {
    num: '02',
    title: 'Fast & Modern',
    desc: 'Built with modern React 18, Tailwind CSS, and HeroUI for optimal performance.',
  },
  {
    num: '03',
    title: 'Rich Analytics',
    desc: 'Detailed insights into your listening habits with beautiful visualizations.',
  },
  {
    num: '04',
    title: 'Beautiful Design',
    desc: 'Modern, responsive design with smooth animations and an intuitive user experience.',
  },
];

const technologies = ['React 18', 'TypeScript', 'Tailwind CSS', 'HeroUI', 'Framer Motion', 'Vite'];

const About: React.FC = () => {
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
          About
        </div>

        <h1 className="text-4xl md:text-[56px] font-extrabold tracking-[-0.02em] mb-9 max-w-[760px] mx-auto">
          About <span className="font-serif italic font-normal text-paper-accent">statfy</span>.
        </h1>

        <p className="text-lg md:text-xl leading-[1.55] max-w-[640px] mx-auto text-paper-muted">
          Statfy is a modern web application built with React 18 that provides detailed insights
          into your Spotify listening habits. Originally developed as an educational project, it has
          evolved into a comprehensive music analytics platform.
        </p>
      </motion.div>

      {/* FEATURES */}
      <div className="border-t border-paper-border">
        <div className="max-w-[1120px] mx-auto px-6 md:px-10 pt-16 pb-0">
          <div className="font-mono text-xs tracking-[0.18em] uppercase text-paper-muted mb-[10px]">
            What it's built on
          </div>
          <h2 className="text-3xl md:text-[38px] font-extrabold tracking-[-0.02em] mb-2 max-w-[640px]">
            Four principles behind every screen.
          </h2>
          <p className="font-mono text-xs text-paper-muted mb-2">
            Every screen in Statfy is built around these four ideas.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-paper-border mt-10">
          {features.map((feature, i) => (
            <div
              key={feature.num}
              className={`px-7 py-9 min-h-[230px] flex flex-col justify-between border-paper-border ${
                i !== features.length - 1 ? 'border-r' : ''
              } border-b sm:border-b-0`}
            >
              <div className="w-[34px] h-[34px] bg-paper-accent text-paper-bg flex items-center justify-center font-mono text-[13px] font-bold -rotate-3">
                {feature.num}
              </div>
              <div>
                <div className="text-[22px] font-extrabold tracking-[-0.01em] mb-[10px]">
                  {feature.title}
                </div>
                <div className="text-sm leading-[1.5] text-paper-muted">{feature.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* INDEPENDENT PROJECT NOTICE */}
      <div className="border-t border-paper-border">
        <div className="max-w-[1120px] mx-auto px-6 md:px-10 py-16 md:py-20">
          <div className="border border-paper-accent p-9">
            <div className="font-mono text-xs tracking-[0.18em] uppercase text-paper-accent mb-3">
              Independent project
            </div>
            <p className="text-[15px] leading-[1.6] text-paper-muted max-w-[560px]">
              This application is not affiliated with or endorsed by Spotify AB.
            </p>
          </div>
        </div>
      </div>

      {/* TECHNOLOGIES */}
      <div className="border-t border-paper-border">
        <div className="max-w-[1120px] mx-auto px-6 md:px-10 py-16 md:py-20 text-center">
          <div className="font-mono text-xs tracking-[0.18em] uppercase text-paper-muted mb-7">
            Built with
          </div>
          <div className="flex flex-wrap justify-center gap-[10px]">
            {technologies.map(tech => (
              <span
                key={tech}
                className="font-mono text-xs tracking-[0.03em] uppercase border border-paper-border px-4 py-[10px] text-paper-muted"
              >
                {tech}
              </span>
            ))}
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

export default About;

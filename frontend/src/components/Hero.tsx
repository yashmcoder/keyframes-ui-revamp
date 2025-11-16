import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundColor: 'var(--bg-primary)',
        backgroundImage:
          'radial-gradient(circle at 18% 8%, rgba(232,60,145,0.08), transparent 45%), radial-gradient(circle at top, rgba(255,255,255,0.65), transparent 60%), radial-gradient(circle at 80% 0%, rgba(112,74,184,0.08), transparent 50%)',
      }}
    >
      <div className="relative z-10">
        <div className="min-h-[calc(100vh-80px)] text-center flex flex-col items-center justify-center py-12 md:py-20 px-4 md:px-6 pt-16 md:pt-24">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold leading-tight max-w-4xl"
            style={{ color: '#1F1B24' }}
          >
            Luxury Visuals <br /> Timeless Impact
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 md:mt-6 text-base md:text-lg lg:text-xl max-w-2xl px-4 text-[#5C4D61]"
          >
            We transform raw footage into compelling visual narratives that captivate and engage your audience.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-6 md:mt-10 flex flex-col sm:flex-row items-center gap-3 md:gap-4 w-full sm:w-auto px-4"
          >
            <Link to="/booking" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#1F1B24] via-[#2E2234] to-[#4C2A44] text-white font-semibold tracking-wide px-8 md:px-10 py-3.5 shadow-[0_25px_50px_rgba(31,27,36,0.25)] text-sm md:text-base transition-transform"
              >
                BOOK A SESSION
              </motion.button>
            </Link>
            <motion.button
              onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-full px-8 md:px-10 py-3.5 text-sm md:text-base font-semibold text-[#1F1B24] bg-white/70 shadow-[0_20px_45px_rgba(67,51,76,0.12)] hover:bg-white"
            >
              VIEW OUR WORK
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

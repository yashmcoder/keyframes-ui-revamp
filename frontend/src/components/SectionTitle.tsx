import React from 'react';
import { motion } from 'framer-motion';

interface SectionTitleProps {
  title: string;
  subtitle: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#1F1B24]">{title}</h2>
        {subtitle && (
          <p className="mt-3 md:mt-4 text-base md:text-lg text-[#5C4D61]">{subtitle}</p>
        )}
        <div className="flex justify-center mt-3 md:mt-4">
          <div className="h-1 w-24 mt-3 md:mt-4 rounded-full" style={{ background: 'linear-gradient(90deg, #1F1B24, #4C2A44)' }}></div>
        </div>
      </div>
    </motion.div>
  );
};

export default SectionTitle;

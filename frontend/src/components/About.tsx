import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from './SectionTitle';

const About: React.FC = () => {
  return (
    <section id="about" className="w-full px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="absolute inset-0 opacity-70" style={{ background: 'radial-gradient(circle at 15% 40%, rgba(232,60,145,0.08), transparent 45%), radial-gradient(circle at 85% 20%, rgba(76,42,104,0.08), transparent 50%)' }}></div>

      <div className="px-4 md:px-6 lg:px-8 py-12 md:py-20 relative z-10 space-y-10">
        <SectionTitle
          title="Why choose us?"
          subtitle="A complete visual ecosystem: shoots, edits, and smooth content operations under one roof."
        />

        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 xl:gap-16 items-center">
          <motion.div
            className="bg-white/85 backdrop-blur-2xl rounded-[32px] p-6 md:p-10 shadow-[0_45px_120px_rgba(15,23,42,0.12)]"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-[#5C4D61]">
              <span className="h-1 w-8 rounded-full bg-[#1F1B24]"></span>
              About us
            </div>
            <p className="mt-5 text-lg md:text-xl text-[#1F1B24] leading-relaxed">
              We craft cinematic visuals and seamless content systems that keep your brand looking refined, consistent, and unmistakably premium across every platform.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 mt-8">
              {[{ label: 'Avg watch-time lift', value: '+42%' }, { label: 'Projects shipped', value: '680+' }, { label: 'Client retention', value: '93%' }].map((metric) => (
                <div key={metric.label} className="rounded-2xl border border-white/0 bg-white/70 p-4 text-center shadow-[0_25px_60px_rgba(67,51,76,0.12)]">
                  <p className="text-sm uppercase tracking-[0.3em] text-[#5C4D61]/70">{metric.label}</p>
                  <p className="mt-3 text-2xl font-semibold text-[#1F1B24]">{metric.value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="rounded-[28px] bg-white/75 backdrop-blur-2xl p-6 shadow-[0_35px_100px_rgba(15,23,42,0.15)]">
              <p className="text-sm uppercase tracking-[0.4em] text-[#5C4D61]/70">How We Work</p>
              <ul className="mt-5 space-y-4 text-[#1F1B24]">
                {[
                  'Strategize & Plan — Understand your brand, style, goals, and build a clear content roadmap.',
                  'Create & Capture — Shoot premium footage and transform raw content into high-performance visuals.',
                  'Deliver & Optimize — Maintain a smooth pipeline with fast delivery, revisions, and continuous improvements.'
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-base">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#1F1B24]"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { title: 'Creator-first processes', description: 'Fast, direct communication with daily previews and instant feedback loops.' },
                { title: 'Strategy in every cut', description: 'Strategists set the direction. Editors bring it to life. Every video stays aligned with your message and CTA.' }
              ].map((card) => (
                <div key={card.title} className="rounded-3xl border border-white/0 bg-white/70 backdrop-blur-xl p-5 shadow-[0_25px_70px_rgba(67,51,76,0.12)]">
                  <h4 className="text-base font-semibold text-[#1F1B24]">{card.title}</h4>
                  <p className="mt-2 text-sm text-[#5C4D61]">{card.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;

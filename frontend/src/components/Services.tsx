import React from 'react';
import { Youtube, Instagram, PartyPopper, Clapperboard } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionTitle from './SectionTitle';

const services = [
  {
    icon: Youtube,
    title: 'Editorial Suites',
    description: 'Long-form YouTube and documentary edits crafted with story-first pacing, tonal polish, and platform-ready exports.',
    features: ['Narrative structure + scripting assist', 'Custom motion passes & title kits', 'Full sound + color finishing'],
    badge: '72h avg turnaround'
  },
  {
    icon: Instagram,
    title: 'Social Systems',
    description: 'Always-on short-form pipelines for Reels, Shorts, and TikTok with adaptive crops and hook-heavy edits.',
    features: ['Batch delivery & versioning', 'Platform-specific hooks + CTAs', 'Auto-captioning + meme inserts'],
    badge: 'Weekly drops'
  },
  {
    icon: PartyPopper,
    title: 'Event Films',
    description: 'High-energy highlight films that bottle the atmosphere of launches, retreats, and creator meetups.',
    features: ['Hybrid multi-cam stitching', 'Music licensing + beat syncing', 'Hero cuts + teaser loops'],
    badge: 'Live support'
  },
  {
    icon: Clapperboard,
    title: 'Brand Spots',
    description: 'Premium commercial edits with cinematic pacing, product hero moments, and on-brand motion graphics.',
    features: ['Concept-to-cut collaboration', 'Look-dev + LUT creation', 'Multi-language deliverables'],
    badge: 'Full-service'
  }
];

const Services: React.FC = () => {
  return (
    <section id="services" className="w-full px-4 sm:px-6 lg:px-8 relative overflow-hidden -mt-16" style={{ backgroundColor: '#F6F2EB' }}>
      <div className="px-4 md:px-6 lg:px-8 py-12 md:py-16">
        <SectionTitle
          title="Our Services"
          subtitle="Four modular edit rooms you can plug into instantly."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="rounded-3xl bg-white/85 backdrop-blur-xl p-6 md:p-7 shadow-[0_35px_90px_rgba(15,23,42,0.12)] border border-white/0 flex flex-col gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-[#1F1B24] text-white shadow-lg">
                  <service.icon className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#1F1B24]">{service.title}</h3>
                  <p className="text-xs uppercase tracking-[0.35em] text-[#5C4D61]/70">{service.badge}</p>
                </div>
              </div>

              <p className="text-sm text-[#5C4D61] leading-relaxed">{service.description}</p>

              <ul className="space-y-2 text-sm text-[#1F1B24]">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span className="mt-1 h-1 w-3 rounded-full bg-[#1F1B24]"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

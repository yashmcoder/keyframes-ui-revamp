import React from 'react';
import { Youtube, Instagram, PartyPopper, Clapperboard } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionTitle from './SectionTitle';

const services = [
  {
    icon: Instagram,
    title: 'High-Performance Reel Editing',
    description: 'We create premium short-form content designed to stop scrolling, boost retention, and elevate your brand image. Every reel is crafted with luxury-grade aesthetics and performance psychology.',
    features: ['Trend-aligned hooks & storytelling', 'Clean caption styles + motion graphics', 'Fast delivery & feedback cycles', 'Brand-consistent edits for long-term growth'],
    badge: 'Premium Reels'
  },
  {
    icon: Youtube,
    title: 'Cinematic Long-Form Production',
    description: 'Long-form videos that feel cinematic, structured, and authoritative. Ideal for YouTube, podcasts, courses, or brand films where quality directly impacts perception.',
    features: ['Strong narrative structure & pacing', 'Color grading, sound cleanup, polish', 'Thumbnail & title direction', 'Full packaging for YouTube or courses'],
    badge: 'Cinematic Quality'
  },
  {
    icon: Clapperboard,
    title: 'Professional On-Ground Shoots',
    description: 'A dedicated production crew capturing crisp, cinematic footage tailored to your brand. Perfect for founders, influencers, and businesses who want premium visuals.',
    features: ['Multi-angle shoot setups', 'Scripted + natural shots', 'Lighting & direction handled end-to-end', 'Complete extraction: multiple reels + long-form from one shoot'],
    badge: 'Full Production'
  },
  {
    icon: PartyPopper,
    title: 'Content Systems & Management',
    description: 'A streamlined backend system ensuring your content runs consistently, efficiently, and without stress. We handle planning, organizing, and publishing — you stay in flow.',
    features: ['Weekly content planning & strategy', 'Scheduling & posting', 'Visual Systems, Titles, thumbnails', 'Asset management and workflow systems'],
    badge: 'Complete System'
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

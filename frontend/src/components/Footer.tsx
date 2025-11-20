import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="rounded-[28px] bg-white px-6 py-8 md:p-10 shadow-[0_25px_70px_rgba(15,23,42,0.08)] flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-10">
            <div className="flex-1">
              <p className="text-xs uppercase tracking-[0.4em] text-[#5C4D61]/70">Let’s collaborate</p>
              <h3 className="mt-3 text-2xl md:text-3xl font-semibold text-[#1F1B24]">Need an edit room that feels like an in-house team?</h3>
              <p className="mt-3 text-sm md:text-base text-[#5C4D61]">Book a 30-minute chemistry call and we’ll map workflows, budgets, and deliverables together.</p>
            </div>
            <Link
              to="/booking"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#1F1B24] text-white px-6 py-3 text-sm font-semibold tracking-wide shadow-[0_18px_45px_rgba(31,27,36,0.25)] hover:-translate-y-0.5 transition-transform"
            >
              Book a session
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.45em] text-[#5C4D61]/70">Connect</p>
            <a
              href="mailto:buisness@keyframestudios.in"
              className="mt-3 inline-block text-base font-medium text-[#1F1B24] hover:underline"
            >
              buisness@keyframestudios.in
            </a>
            <div className="mt-4 flex items-center justify-center gap-3">
              <a
                href="https://www.linkedin.com/company/keyframestudiosin"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#1F1B24] text-white hover:bg-[#2E2234] transition-colors shadow-[0_10px_30px_rgba(31,27,36,0.2)]"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="text-center text-sm text-[#5C4D61]">
            © {currentYear} Keyframe Studios. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

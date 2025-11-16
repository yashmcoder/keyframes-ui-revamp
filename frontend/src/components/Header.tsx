import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const navItems = ['SERVICES', 'PORTFOLIO', 'ABOUT'];

const Header: React.FC = () => {
  const [activeItem, setActiveItem] = useState('HOME');
  const [isNavScrolling, setIsNavScrolling] = useState(false);
  const scrollTimeoutRef = useRef<number | null>(null);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    event.preventDefault();
    const target = document.getElementById(sectionId);
    if (target) {
      const headerOffset = 110;
      const elementPosition = target.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({ top: Math.max(offsetPosition, 0), behavior: 'smooth' });
      setActiveItem(sectionId.toUpperCase());
      setIsNavScrolling(true);
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = window.setTimeout(() => {
        setIsNavScrolling(false);
      }, 900);
      window.history.replaceState(null, '', `/#${sectionId}`);
    }
  };

  useEffect(() => {
    if (!isHomePage) {
      setActiveItem('');
      return;
    }

    const sections = navItems.map(item => document.getElementById(item.toLowerCase()));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !isNavScrolling) {
            setActiveItem(entry.target.id.toUpperCase());
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px' } // Trigger when section is in the middle of the viewport
    );

    sections.forEach(section => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach(section => {
        if (section) observer.unobserve(section);
      });
    };
  }, [isHomePage, isNavScrolling]);

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 border border-white/0 bg-white/80 backdrop-blur-2xl rounded-2xl mt-3 shadow-[0_15px_40px_rgba(15,23,42,0.08)] px-4 sm:px-6">
          <Link to="/" className="flex items-center" onClick={() => setActiveItem('HOME')}>
            <span className="font-semibold text-lg tracking-wide text-[#1F1B24]">KEYFRAME STUDIOS</span>
          </Link>

          <nav className="hidden md:flex items-center gap-2">
            {isHomePage && navItems.map((item) => (
              <Link
                key={item}
                to={`/#${item.toLowerCase()}`}
                onClick={(event) => handleNavClick(event, item.toLowerCase())}
                className="relative text-sm font-medium tracking-wide px-4 py-2 rounded-full text-[#5C4D61] transition-colors"
              >
                {activeItem === item && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-full bg-[#1F1B24]"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    style={{ boxShadow: '0 10px 30px rgba(18, 18, 18, 0.18)' }}
                  />
                )}
                <span className="relative z-10" style={{ color: activeItem === item ? '#ffffff' : undefined }}>
                  {item}
                </span>
              </Link>
            ))}

            {!isHomePage && (
              <Link 
                to="/" 
                className="inline-flex items-center gap-2 text-sm font-medium tracking-wide px-4 py-2 rounded-full text-[#1F1B24] bg-white/70 hover:bg-white shadow-[0_10px_30px_rgba(15,23,42,0.08)] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>BACK TO HOME</span>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

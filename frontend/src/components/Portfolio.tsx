import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionTitle from './SectionTitle';

const portfolioItems = [
  { 
    id: 1, 
    title: 'Interstellar', 
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=2070&auto=format&fit=crop', 
    videoUrl: 'https://ik.imagekit.io/hwyp9efug/Explanantory%20Reel%20-%20S10.mp4?updatedAt=1763198944803'
  },
  { 
    id: 2, 
    title: 'Dune Part Two', 
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop', 
    videoUrl: 'https://ik.imagekit.io/yashm/KFS%20Portfolio/REEL%20%20(1).mp4?updatedAt=1763203363841'
  },
  { 
    id: 3, 
    title: 'Squid Games', 
    image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&',  
    videoUrl: 'https://res.cloudinary.com/dgsvh4ozj/video/upload/c_limit,h_800,w_1300/v1763490121/AMV_nhzbmy.jpg'
  },
  { 
    id: 4, 
    title: 'Starboy', 
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1964&auto=format&fit=crop', 
    videoUrl: 'https://ik.imagekit.io/your-imagekit-id/sample-video-4.mp4'
  },
  { 
    id: 5, 
    title: 'The Honored One', 
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop', 
    videoUrl: 'https://ik.imagekit.io/your-imagekit-id/sample-video-5.mp4'
  },
  { 
    id: 6, 
    title: 'Challenger', 
    image: 'https://images.unsplash.com/photo-1579566346927-c68383817a25?q=80&w=2070&auto=format&fit=crop', 
    videoUrl: 'https://ik.imagekit.io/your-imagekit-id/sample-video-6.mp4'
  },
  { 
    id: 7, 
    title: "I Can't Lose", 
    image: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=2056&auto=format&fit=crop', 
    videoUrl: 'https://ik.imagekit.io/your-imagekit-id/sample-video-7.mp4'
  },
  { 
    id: 8, 
    title: 'Attack On Titan', 
    image: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=1974&auto=format&fit=crop', 
    videoUrl: 'https://ik.imagekit.io/your-imagekit-id/sample-video-8.mp4'
  },
  { 
    id: 9, 
    title: 'Jujutsu Kaisen', 
    image: 'https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?q=80&w=1972&auto=format&fit=crop', 
    videoUrl: 'https://ik.imagekit.io/your-imagekit-id/sample-video-9.mp4'
  },
];

const Portfolio: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const goToRelativeIndex = (offset: number) => {
    setCurrentIndex((prevIndex) => (prevIndex + offset + portfolioItems.length) % portfolioItems.length);
    setIsPlaying(false);
  };

  const nextSlide = () => goToRelativeIndex(1);
  const prevSlide = () => goToRelativeIndex(-1);

  const getItemAtOffset = (offset: number) => {
    const index = (currentIndex + offset + portfolioItems.length) % portfolioItems.length;
    return { item: portfolioItems[index], index };
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
        setHasEnded(false);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleReplay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setHasEnded(false);
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setHasEnded(false);
    setIsPlaying(false);
  }, [currentIndex]);
  
  const visibleOffsets = [-1, 0, 1];

  return (
    <>
      <section id="portfolio" className="w-full px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ backgroundColor: '#F6F2EB' }}>
        
        <div className="px-4 md:px-6 lg:px-8 py-12 md:py-16 relative z-10">
          <SectionTitle 
            title="Our Work"
            subtitle="A showcase of our finest video editing projects."
          />
          
          {/* Deck-style Carousel */}
          <div className="relative max-w-6xl mx-auto mt-8 md:mt-12">
            <div className="relative h-[65vh] flex items-center justify-center overflow-visible">
              {visibleOffsets.map((offset) => {
                const { item } = getItemAtOffset(offset);
                const isActive = offset === 0;

                return (
                  <motion.div
                    key={`${item.id}-${offset}-${currentIndex}`}
                    className="absolute w-full max-w-3xl"
                    animate={{
                      x: offset * 220,
                      scale: isActive ? 1 : 0.92,
                      opacity: isActive ? 1 : 0.55,
                      rotate: offset * 2,
                    }}
                    transition={{ type: 'spring', stiffness: 260, damping: 30 }}
                    style={{ zIndex: isActive ? 30 : 20 - Math.abs(offset) }}
                  >
                    {isActive ? (
                      <div className="bg-white/85 backdrop-blur-2xl rounded-3xl shadow-[0_45px_110px_rgba(15,23,42,0.2)] overflow-hidden h-[65vh]" key={item.id}>
                        <div className="relative w-full h-full">
                          <video
                            ref={videoRef}
                            className="w-full h-full object-contain bg-black"
                            src={item.videoUrl}
                            poster={item.image}
                            onClick={togglePlay}
                            onEnded={() => {
                              setIsPlaying(false);
                              setHasEnded(true);
                            }}
                          />

                          {!isPlaying && !hasEnded && (
                            <button
                              type="button"
                              className="absolute inset-0 flex items-center justify-center bg-black/35 cursor-pointer"
                              onClick={togglePlay}
                            >
                              <span className="bg-white/90 backdrop-blur-lg rounded-full p-6 shadow-[0_25px_55px_rgba(15,23,42,0.25)]">
                                <Play className="w-12 h-12 text-[#1F1B24]" fill="currentColor" />
                              </span>
                            </button>
                          )}

                          {hasEnded && (
                            <button
                              type="button"
                              className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/55 text-white"
                              onClick={handleReplay}
                            >
                              <span className="bg-white/90 text-[#1F1B24] backdrop-blur rounded-full p-4 shadow-[0_25px_55px_rgba(15,23,42,0.25)]">
                                <RotateCcw className="w-8 h-8" />
                              </span>
                              <span className="text-sm font-semibold tracking-[0.3em] uppercase">Replay</span>
                            </button>
                          )}

                          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                            <h3 className="text-white text-2xl md:text-3xl font-semibold drop-shadow-lg">{item.title}</h3>
                            <div className="flex items-center gap-4 mt-2">
                              <span className="text-white text-sm drop-shadow-lg">{currentIndex + 1} / {portfolioItems.length}</span>
                            </div>
                          </div>

                          {isPlaying && (
                            <button
                              type="button"
                              onClick={togglePlay}
                              className="absolute top-6 right-6 p-3 bg-white/90 backdrop-blur-md rounded-full hover:bg-white transition-all z-10 shadow-[0_20px_45px_rgba(15,23,42,0.15)]"
                            >
                              <Pause className="w-5 h-5 text-[#1F1B24]" />
                            </button>
                          )}
                        </div>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => goToRelativeIndex(offset)}
                        className="w-full h-[55vh] rounded-3xl overflow-hidden bg-white/70 backdrop-blur shadow-[0_35px_90px_rgba(15,23,42,0.18)] relative group"
                      >
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80"></div>
                        <div className="absolute bottom-6 left-6 text-left">
                          <p className="text-white font-semibold text-lg">{item.title}</p>
                          <div className="mt-3 inline-flex items-center gap-2 text-white/80 text-xs uppercase tracking-[0.2em]">
                            <Play className="w-4 h-4" /> Queue
                          </div>
                        </div>
                      </button>
                    )}
                  </motion.div>
                );
              })}
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mt-12">
              <div className="flex gap-3">
                <button
                  onClick={prevSlide}
                  className="p-3 rounded-full bg-white/80 backdrop-blur shadow-[0_25px_60px_rgba(15,23,42,0.15)] hover:-translate-y-0.5 transition-transform"
                  aria-label="Previous video"
                >
                  <ChevronLeft className="w-5 h-5 text-[#1F1B24]" />
                </button>
                <button
                  onClick={nextSlide}
                  className="p-3 rounded-full bg-white/80 backdrop-blur shadow-[0_25px_60px_rgba(15,23,42,0.15)] hover:-translate-y-0.5 transition-transform"
                  aria-label="Next video"
                >
                  <ChevronRight className="w-5 h-5 text-[#1F1B24]" />
                </button>
              </div>

              <div className="flex gap-2">
                {portfolioItems.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      const offset = (index - currentIndex + portfolioItems.length) % portfolioItems.length;
                      const shortestOffset = offset > portfolioItems.length / 2 ? offset - portfolioItems.length : offset;
                      goToRelativeIndex(shortestOffset);
                    }}
                    className="h-2 rounded-full transition-all"
                    style={{
                      width: index === currentIndex ? '38px' : '10px',
                      backgroundColor: index === currentIndex ? '#1F1B24' : 'rgba(92,77,97,0.35)',
                    }}
                    aria-label={`Go to video ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Portfolio;

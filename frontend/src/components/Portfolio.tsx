import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionTitle from './SectionTitle';

const portfolioItems = [
  { 
    id: 1, 
    title: '', 
    image: 'https://keyframe-studios.s3.us-east-1.amazonaws.com/Kfs_thumbnails/3D+Motion+Graphics.jpg', 
    videoUrl: 'https://keyframe-studios.s3.us-east-1.amazonaws.com/KFS+Portfolio/3D+Motion+Graphics+2.mp4'
  },
  { 
    id: 2, 
    title: '', 
    image: 'https://keyframe-studios.s3.us-east-1.amazonaws.com/Kfs_thumbnails/3D+Motion+Graphics+2.jpg', 
    videoUrl: 'https://keyframe-studios.s3.us-east-1.amazonaws.com/KFS+Portfolio/3D+Motion+Graphics.mp4'
  },
  { 
    id: 3, 
    title: '', 
    image: 'https://keyframe-studios.s3.us-east-1.amazonaws.com/Kfs_thumbnails/Fast+Paced+Motion+Edit.jpg',  
    videoUrl: 'https://res.cloudinary.com/dgsvh4ozj/video/upload/br_800kk,vc_h265/v1763490121/AMV_nhzbmy.mp4'
  },
  { 
    id: 4, 
    title: '', 
    image: 'https://keyframe-studios.s3.us-east-1.amazonaws.com/Kfs_thumbnails/Conference+Shoot.jpg', 
    videoUrl: 'https://keyframe-studios.s3.us-east-1.amazonaws.com/KFS+Portfolio/eventshoot.mp4'
  },
  { 
    id: 5, 
    title: '', 
    image: 'https://keyframe-studios.s3.us-east-1.amazonaws.com/Kfs_thumbnails/Explainer+Reel.jpg',
    videoUrl: 'https://keyframe-studios.s3.us-east-1.amazonaws.com/KFS+Portfolio/explanatory4.mp4'
  },
  { 
    id: 6, 
    title: '', 
    image: 'https://keyframe-studios.s3.us-east-1.amazonaws.com/Kfs_thumbnails/Digital+Product+Showcase.jpg', 
    videoUrl: 'https://keyframe-studios.s3.us-east-1.amazonaws.com/KFS+Portfolio/App+Promo.mp4'
  },
  { 
    id: 7, 
    title: '', 
    image: 'https://keyframe-studios.s3.us-east-1.amazonaws.com/Kfs_thumbnails/Product+Spotlight.jpg', 
    videoUrl: 'https://keyframe-studios.s3.us-east-1.amazonaws.com/KFS+Portfolio/Product+Ad+2.mp4'
  },
  { 
    id: 8, 
    title: '', 
    image: 'https://keyframe-studios.s3.us-east-1.amazonaws.com/Kfs_thumbnails/Product+Spotlight+2.jpg', 
    videoUrl: 'https://keyframe-studios.s3.us-east-1.amazonaws.com/KFS+Portfolio/Product+Ad.mp4'
  },
  { 
    id: 9, 
    title: '', 
    image: 'https://keyframe-studios.s3.us-east-1.amazonaws.com/Kfs_thumbnails/Clinic+Shoot.jpg', 
    videoUrl: 'https://keyframe-studios.s3.us-east-1.amazonaws.com/KFS+Portfolio/Shoot.MOV'
  },
  {
    id: 10,
    title: '',
    image: 'https://keyframe-studios.s3.us-east-1.amazonaws.com/Kfs_thumbnails/Creator+Video.jpg',
    videoUrl: 'https://keyframe-studios.s3.us-east-1.amazonaws.com/KFS+Portfolio/Talking+Head.mp4'
  },
  {
    id: 11,
    title: '',
    image: 'https://keyframe-studios.s3.us-east-1.amazonaws.com/Kfs_thumbnails/Typography+Visual.jpg',
    videoUrl: 'https://keyframe-studios.s3.us-east-1.amazonaws.com/KFS+Portfolio/Text+Animation.mp4'
  },
  {
    id: 12,
    title: '',
    image: 'https://keyframe-studios.s3.us-east-1.amazonaws.com/Kfs_thumbnails/Explainer+Reel+4.jpg',
    videoUrl: 'https://keyframe-studios.s3.us-east-1.amazonaws.com/KFS+Portfolio/Explanatory+reel.mp4'
  },
  {
    id: 13,
    title: '',
    image: 'https://keyframe-studios.s3.us-east-1.amazonaws.com/Kfs_thumbnails/Explainer+Reel+2.jpg',
    videoUrl: 'https://keyframe-studios.s3.us-east-1.amazonaws.com/KFS+Portfolio/Explanatory+reel+2.mp4'
  },
  {
    id: 14,
    title: '',
    image: 'https://keyframe-studios.s3.us-east-1.amazonaws.com/Kfs_thumbnails/Explainer+Reel+3.jpg',
    videoUrl: 'https://keyframe-studios.s3.us-east-1.amazonaws.com/KFS+Portfolio/explanatory3.mp4'
  }
];

const Portfolio: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
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

  const toggleMute = () => {
    if (videoRef.current) {
      const nextMuted = !isMuted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
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
            subtitle="A preview of the content we create for brands and creators."
          />
          
          {/* Deck-style Carousel */}
          <div className="relative max-w-6xl mx-auto mt-8 md:mt-12">
            <div className="relative h-[55vh] sm:h-[60vh] lg:h-[65vh] flex items-center justify-center overflow-visible">
              {visibleOffsets.map((offset) => {
                const { item } = getItemAtOffset(offset);
                const isActive = offset === 0;

                return (
                  <motion.div
                    key={`${item.id}-${offset}-${currentIndex}`}
                    className="absolute w-full max-w-[90vw] sm:max-w-2xl lg:max-w-3xl"
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
                      <motion.div
                        className="bg-white/85 backdrop-blur-2xl rounded-3xl shadow-[0_45px_110px_rgba(15,23,42,0.2)] overflow-hidden h-[50vh] sm:h-[60vh] lg:h-[65vh] group border border-[#d5c5b2]/70"
                        key={item.id}
                        animate={{ scale: isPlaying ? 1.2 : 1 }}
                        transition={{ type: 'spring', stiffness: 215, damping: 20, mass: 0.9 }}
                      >
                        <div className="relative w-full h-full">
                          <video
                            ref={videoRef}
                            className="w-full h-full object-contain bg-black"
                            src={item.videoUrl}
                            poster={item.image}
                            muted={isMuted}
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

                          <motion.div
                            className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent"
                            animate={{ opacity: isPlaying ? 0 : 1, y: isPlaying ? 15 : 0 }}
                            transition={{ duration: 0.35, ease: 'easeInOut' }}
                          >
                            <h3 className="text-white text-2xl md:text-3xl font-semibold drop-shadow-lg">{item.title}</h3>
                            <div className="flex items-center justify-end gap-4 mt-2">
                              <span className="text-white text-sm drop-shadow-lg">{currentIndex + 1} / {portfolioItems.length}</span>
                            </div>
                          </motion.div>

                          {isPlaying && (
                            <div className="absolute top-6 right-6 flex items-center gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                              <button
                                type="button"
                                onClick={togglePlay}
                                className="p-2.5 bg-white/90 backdrop-blur-md rounded-full hover:bg-white transition-all shadow-[0_20px_45px_rgba(15,23,42,0.15)] pointer-events-auto"
                                aria-label="Pause video"
                              >
                                <Pause className="w-4 h-4 text-[#1F1B24]" />
                              </button>
                              <button
                                type="button"
                                onClick={toggleMute}
                                className="p-2.5 bg-white/90 backdrop-blur-md rounded-full hover:bg-white transition-all shadow-[0_20px_45px_rgba(15,23,42,0.15)] pointer-events-auto"
                                aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                              >
                                {isMuted ? (
                                  <VolumeX className="w-4 h-4 text-[#1F1B24]" />
                                ) : (
                                  <Volume2 className="w-4 h-4 text-[#1F1B24]" />
                                )}
                              </button>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => goToRelativeIndex(offset)}
                        className="w-full h-[40vh] sm:h-[45vh] lg:h-[55vh] rounded-3xl overflow-hidden bg-white/70 backdrop-blur shadow-[0_35px_90px_rgba(15,23,42,0.18)] relative group border border-[#d5c5b2]/60"
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

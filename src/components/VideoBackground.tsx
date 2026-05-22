import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface VideoBackgroundProps {
  src: string;
  isHome?: boolean;
}

export function VideoBackground({ src, isHome = false }: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [canPlay, setCanPlay] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setCanPlay(true);
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('canplaythrough', handleCanPlay);

    const startY = isHome ? -10 : 0;
    const endY = isHome ? 2 : -8;

    // Smooth scroll parallax translation
    const anim = gsap.fromTo(wrapperRef.current,
      { yPercent: startY },
      {
        yPercent: endY,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5, // smooth scrubbing for parallax
        }
      }
    );

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('canplaythrough', handleCanPlay);
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, [isHome]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!wrapperRef.current) return;
      const moveX = (e.clientX / window.innerWidth) * 2 - 1;
      const moveY = (e.clientY / window.innerHeight) * 2 - 1;
      
      gsap.to(wrapperRef.current, {
        x: moveX * -20,
        y: moveY * -20,
        duration: 1.5,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {!canPlay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-500">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin" />
            <p className="text-white/60 text-xs font-semibold tracking-widest uppercase">
              Loading Background
            </p>
          </div>
        </div>
      )}
      <div
        ref={wrapperRef}
        className="fixed left-0 w-full h-[115vh] z-0 scale-[1.05] origin-center pointer-events-none"
        style={{ top: '0px' }}
      >
        <video
          ref={videoRef}
          src={src}
          className="w-full h-full object-cover scale-[1.1]"
          muted
          playsInline
          autoPlay
          loop
          crossOrigin="anonymous"
          preload="auto"
        />
      </div>
    </>
  );
}

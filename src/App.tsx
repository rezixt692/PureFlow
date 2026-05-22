import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { VideoBackground } from './components/VideoBackground';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import DeviceCustomizer from './pages/DeviceCustomizer';
import Science from './pages/Science';
import Plans from './pages/Plans';
import ReachUs from './pages/ReachUs';
import RealStories from './pages/RealStories';

function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

function DynamicBackground() {
  const { pathname } = useLocation();
  const isAltBg = pathname === '/about' || pathname === '/stories' || pathname === '/contact';
  const src = isAltBg 
    ? "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260513_190723_430b22c8-9de4-4592-bb43-efff30d35d76.mp4"
    : "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_091828_e240eb17-6edc-4129-ad9d-98678e3fd238.mp4";

  return <VideoBackground key={src} src={src} isHome={pathname === '/'} />;
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<PageTransition><Home /></PageTransition>} />
      <Route path="/about" element={<PageTransition><AboutUs /></PageTransition>} />
      <Route path="/device" element={<PageTransition><DeviceCustomizer /></PageTransition>} />
      <Route path="/science" element={<PageTransition><Science /></PageTransition>} />
      <Route path="/plans" element={<PageTransition><Plans /></PageTransition>} />
      <Route path="/contact" element={<PageTransition><ReachUs /></PageTransition>} />
      <Route path="/stories" element={<PageTransition><RealStories /></PageTransition>} />
    </Routes>
  );
}

function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="relative min-h-screen text-gray-900 font-sans overflow-x-hidden">
        <DynamicBackground />
        
        <div className="relative z-50 pointer-events-none">
          <Navbar />
        </div>

        <MaskedContent>
          <AnimatedRoutes />
          
          <Footer />
        </MaskedContent>
      </div>
    </BrowserRouter>
  );
}

function MaskedContent({ children }: { children: React.ReactNode }) {
  const maskRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const isUnmasked = pathname !== '/';

  useEffect(() => {
    let ticking = false;
    const updateMask = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (maskRef.current && !isUnmasked) {
            const y = window.scrollY;
            maskRef.current.style.webkitMaskPosition = `0px ${y}px`;
            maskRef.current.style.maskPosition = `0px ${y}px`;
          }
        });
        ticking = true;
      }
      requestAnimationFrame(() => { ticking = false; });
    };
    
    window.addEventListener('scroll', updateMask, { passive: true });
    window.addEventListener('resize', updateMask, { passive: true });
    updateMask();
    
    return () => {
      window.removeEventListener('scroll', updateMask);
      window.removeEventListener('resize', updateMask);
    };
  }, [isUnmasked]);

  return (
    <div 
      ref={maskRef}
      className={`relative z-10 ${isUnmasked ? '' : 'pointer-events-none'}`}
      style={isUnmasked ? {} : {
        WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 50%, transparent 90%, transparent 100%)',
        WebkitMaskSize: '100% 100vh',
        WebkitMaskRepeat: 'no-repeat',
        maskImage: 'linear-gradient(to bottom, black 0%, black 50%, transparent 90%, transparent 100%)',
        maskSize: '100% 100vh',
        maskRepeat: 'no-repeat',
      }}
    >
      <div className="pointer-events-auto">
        {children}
      </div>
    </div>
  );
}

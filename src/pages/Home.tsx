import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Play, 
  Wind, 
  Shield, 
  Zap, 
  Moon, 
  Compass, 
  Sparkles, 
  ArrowRight, 
  Mail, 
  CheckCircle2, 
  Activity, 
  Volume2, 
  ArrowDown 
} from 'lucide-react';
import { usePageTitle } from '../utils/seo';

interface ModeConfig {
  name: string;
  label: string;
  pm25: number;
  noise: number;
  status: string;
  efficiency: number;
  fanSpeedPct: number;
  color: string;
}

export default function Home() {
  usePageTitle(
    "PureFlow | Clean Air. Clear Mind. Anywhere.",
    "Breathe pristine, medical-grade HEPA filtered air anywhere with the ultra-quiet, portable PureFlow One air purifier."
  );

  const navigate = useNavigate();

  // 1. Air Shield Dashboard State
  const [activeMode, setActiveMode] = useState<'auto' | 'boost' | 'eco' | 'sleep'>('auto');
  const [simulatedAqi, setSimulatedAqi] = useState(4);
  const [isCleaning, setIsCleaning] = useState(false);

  // 2. Filtration Technology Tabs State
  const [activeTab, setActiveTab] = useState<'pre' | 'hepa' | 'carbon'>('hepa');

  // 3. Newsletter Email Form State
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [emailError, setEmailError] = useState('');

  const modes: Record<'auto' | 'boost' | 'eco' | 'sleep', ModeConfig> = {
    auto: {
      name: 'auto',
      label: 'Auto Shield',
      pm25: 4,
      noise: 25,
      status: 'Optimal Clean',
      efficiency: 99.97,
      fanSpeedPct: 45,
      color: 'from-blue-400 to-indigo-500'
    },
    boost: {
      name: 'boost',
      label: 'Turbo Clean',
      pm25: 2,
      noise: 48,
      status: 'Maximum Clean',
      efficiency: 99.99,
      fanSpeedPct: 100,
      color: 'from-red-400 to-orange-500'
    },
    eco: {
      name: 'eco',
      label: 'Eco Saver',
      pm25: 12,
      noise: 28,
      status: 'Efficient Guard',
      efficiency: 99.91,
      fanSpeedPct: 30,
      color: 'from-emerald-400 to-teal-500'
    },
    sleep: {
      name: 'sleep',
      label: 'Whisper Sleep',
      pm25: 6,
      noise: 22,
      status: 'Ultra-Quiet Clean',
      efficiency: 99.95,
      fanSpeedPct: 15,
      color: 'from-indigo-400 to-purple-500'
    }
  };

  const selectedMode = modes[activeMode];

  // Simulating small fluctuations in AQI sensor readout
  useEffect(() => {
    const interval = setInterval(() => {
      setSimulatedAqi((prev) => {
        const target = selectedMode.pm25;
        const diff = target - prev;
        if (Math.abs(diff) <= 1) {
          // Add micro fluctuation
          return target + (Math.random() > 0.5 ? 1 : -1);
        }
        return prev + (diff > 0 ? 1 : -1);
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [activeMode, selectedMode.pm25]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    setEmailError('');
    setSubscribed(true);
    setEmail('');
  };

  const scrollDown = () => {
    const nextSection = document.getElementById('mission-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Hero section */}
      <section className="relative w-full h-screen flex flex-col pl-0 pr-0 items-center justify-between pt-32 sm:pt-40 md:pt-44 text-center overflow-hidden pointer-events-auto pb-12">
        <div className="px-5 z-10 flex flex-col items-center max-w-4xl mx-auto">
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-gray-800 text-xs font-bold mb-6 hover:scale-105 transition-transform duration-300">
            <Sparkles size={12} className="text-amber-500" />
            <span>Redefining Air Quality Engineering</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-gray-900 leading-[1.08] mb-6 tracking-tight">
            Clean Air, Clear Mind.<br className="hidden sm:block" /> Breathe Pristine.
          </h1>
          
          <p className="text-base sm:text-xl text-gray-700 max-w-2xl leading-relaxed mb-8">
            Experience the world's most elegant portable HEPA air shield. High-capacity performance engineered into a silent, furniture-grade design.
          </p>

          <div className="flex items-center gap-4 sm:gap-6 justify-center">
            <button 
              onClick={() => navigate('/device')}
              className="bg-gray-900 text-white text-sm sm:text-base font-semibold px-8 py-3.5 rounded-2xl hover:bg-gray-800 transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer"
            >
              Explore Device Customizer
            </button>
            <button 
              onClick={() => navigate('/science')}
              className="flex items-center gap-2 text-gray-800 text-sm sm:text-base font-semibold hover:text-gray-950 transition-colors group cursor-pointer"
            >
              <Play size={16} className="fill-gray-800 group-hover:fill-gray-950 transition-colors" /> View Science Specs
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <button 
          onClick={scrollDown}
          className="z-10 flex flex-col items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors cursor-pointer animate-bounce mb-4"
          aria-label="Scroll to next section"
        >
          <span className="text-[10px] font-bold tracking-[0.25em] uppercase">Scroll to discover</span>
          <ArrowDown size={18} />
        </button>
      </section>

      {/* About Us & Air Shield Interactive Dashboard Section */}
      <section 
        id="mission-section"
        className="min-h-screen py-24 sm:py-32 px-5 sm:px-8 max-w-7xl mx-auto flex flex-col justify-center w-full pointer-events-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left Column: Mission Description */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <span className="text-xs font-semibold tracking-[0.2em] text-gray-500 uppercase mb-3 block">PureFlow Ecosystem</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 tracking-tight leading-tight">
              An active shield protecting your breathing zone.
            </h2>
            <p className="text-base sm:text-lg text-gray-700 mb-6 leading-relaxed">
              We believe clean air shouldn't require noisy appliances or static placements. PureFlow One dynamically adapts to the spaces you move through, neutralizing allergens and VOCs in real-time.
            </p>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-8">
              Toggle the mode buttons on the right to interact with our **Air Shield Simulator**. Watch the air purification core spin and check simulated PM2.5 metrics react instantly.
            </p>
            <div>
              <button 
                onClick={() => navigate('/about')}
                className="inline-flex items-center gap-1.5 font-bold text-sm uppercase text-gray-900 tracking-wider hover:translate-x-1.5 transition-transform"
              >
                Our Journey & Legacy <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Right Column: Air Shield Interactive Dashboard Widget */}
          <div className="lg:col-span-7 flex justify-center w-full">
            <div className="bg-white/20 backdrop-blur-xl rounded-[40px] border border-white/40 p-6 sm:p-8 w-full max-w-xl shadow-2xl relative overflow-hidden">
              
              {/* Dynamic Accent Lighting */}
              <div className={`absolute top-0 right-0 w-32 h-32 rounded-full filter blur-[50px] opacity-20 transition-all duration-1000 bg-gradient-to-br ${selectedMode.color}`} />

              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2.5">
                  <Activity size={18} className="text-gray-900" />
                  <span className="font-bold text-xs uppercase tracking-wider text-gray-800">Air Shield Terminal</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/40 border border-white/40">
                  <span className={`w-2 h-2 rounded-full bg-emerald-500 animate-ping`} />
                  <span className="text-[10px] font-bold text-gray-700 uppercase tracking-widest">Active Sensor</span>
                </div>
              </div>

              {/* Visualization Zone */}
              <div className="relative aspect-[16/9] w-full bg-neutral-900/10 rounded-[28px] border border-black/5 flex items-center justify-center overflow-hidden mb-6">
                
                {/* Simulated Air Shield Pulsing Rings */}
                <div 
                  className={`absolute rounded-full border border-gray-900/10 dark:border-white/10 transition-all duration-700 ease-out`}
                  style={{
                    width: `${selectedMode.fanSpeedPct * 2.8 + 80}px`,
                    height: `${selectedMode.fanSpeedPct * 2.8 + 80}px`,
                    animation: `ping ${3000 / (selectedMode.fanSpeedPct / 20 + 0.5)}ms cubic-bezier(0, 0, 0.2, 1) infinite`,
                    opacity: 0.15
                  }}
                />
                
                <div 
                  className={`absolute rounded-full border border-gray-900/15 dark:border-white/15 transition-all duration-700 ease-out`}
                  style={{
                    width: `${selectedMode.fanSpeedPct * 1.5 + 40}px`,
                    height: `${selectedMode.fanSpeedPct * 1.5 + 40}px`,
                    animation: `ping ${1500 / (selectedMode.fanSpeedPct / 20 + 0.5)}ms cubic-bezier(0, 0, 0.2, 1) infinite`,
                    opacity: 0.2
                  }}
                />

                {/* Core Device Representation */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-16 h-20 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-2xl flex flex-col justify-between p-2">
                    <div className="w-full h-1 bg-emerald-500/80 rounded-full animate-pulse" />
                    
                    {/* Spinning Indicator */}
                    <div className="flex justify-center py-2">
                      <Wind 
                        size={24} 
                        className={`text-white transition-all`}
                        style={{
                          animation: `spin ${2000 / (selectedMode.fanSpeedPct / 20 + 0.1)}ms linear infinite`
                        }}
                      />
                    </div>

                    <span className="text-[6px] tracking-widest text-center text-white/50">PURE</span>
                  </div>
                </div>
              </div>

              {/* Controls Menu */}
              <div className="grid grid-cols-4 gap-2 mb-6">
                {[
                  { key: 'auto', label: 'Auto', icon: Compass },
                  { key: 'boost', label: 'Turbo', icon: Zap },
                  { key: 'eco', label: 'Eco', icon: Shield },
                  { key: 'sleep', label: 'Sleep', icon: Moon }
                ].map((btn) => {
                  const isSelected = activeMode === btn.key;
                  const Icon = btn.icon;
                  return (
                    <button
                      key={btn.key}
                      onClick={() => setActiveMode(btn.key as any)}
                      className={`py-3.5 px-2 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-all border ${
                        isSelected 
                          ? 'bg-gray-900 border-gray-900 text-white shadow-md scale-[1.03]' 
                          : 'bg-white/40 border-white/50 text-gray-700 hover:bg-white/80 hover:border-gray-300'
                      }`}
                    >
                      <Icon size={16} />
                      <span className="text-[10px] font-bold tracking-wider uppercase">{btn.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Spec Readout Board */}
              <div className="bg-gray-950/5 dark:bg-white/5 rounded-3xl p-4.5 border border-black/5 grid grid-cols-3 gap-4">
                <div className="flex flex-col text-center sm:text-left">
                  <span className="text-[9px] font-bold tracking-wider text-gray-500 uppercase">Air Output PM2.5</span>
                  <span className="text-2xl font-extrabold text-gray-900 mt-1">{simulatedAqi} µg/m³</span>
                  <span className="text-[9px] text-gray-500 font-semibold uppercase tracking-widest mt-0.5">{selectedMode.status}</span>
                </div>
                
                <div className="flex flex-col text-center sm:text-left border-l border-r border-black/10 px-4">
                  <span className="text-[9px] font-bold tracking-wider text-gray-500 uppercase">Noise Level</span>
                  <span className="text-2xl font-extrabold text-gray-900 mt-1 flex items-center gap-1 justify-center sm:justify-start">
                    <Volume2 size={16} className="text-gray-500" />
                    {selectedMode.noise} dB
                  </span>
                  <span className="text-[9px] text-gray-500 font-semibold uppercase tracking-widest mt-0.5">Whisper Quiet</span>
                </div>
                
                <div className="flex flex-col text-center sm:text-left">
                  <span className="text-[9px] font-bold tracking-wider text-gray-500 uppercase">Efficiency Rate</span>
                  <span className="text-2xl font-extrabold text-gray-900 mt-1">{selectedMode.efficiency}%</span>
                  <span className="text-[9px] text-gray-500 font-semibold uppercase tracking-widest mt-0.5">Particle Capture</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Product Colorway Showcase Grid */}
      <section className="py-24 sm:py-32 px-5 sm:px-8 max-w-7xl mx-auto w-full pointer-events-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold tracking-[0.2em] text-gray-500 uppercase mb-3 block">Colorways & Finishes</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">PureFlow Colorways.</h2>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mt-4">
              Carefully curated finishes and high-grade materials designed to integrate beautifully with modern living room layouts, workspaces, and nightstands.
            </p>
          </div>
          <button 
            onClick={() => navigate('/device')}
            className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-bold text-xs uppercase tracking-wider px-6 py-4.5 rounded-2xl hover:scale-105 transition-all shadow-md shrink-0 cursor-pointer"
          >
            Design Your Device
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { name: "Obsidian Black", colorParam: "obsidian", hex: "#1a1a1c", bgHex: "#1c1c1e", desc: "A sleek, fingerprint-resistant space-grade matte black finish.", badge: "Bestseller" },
            { name: "Alpine White", colorParam: "alpine", hex: "#eaeaea", bgHex: "#f5f5f7", desc: "An ultra-clean, satin mineral white that blends into any modern room.", badge: "Minimalist" },
            { name: "Sage Green", colorParam: "sage", hex: "#839281", bgHex: "#8f9c8b", desc: "A soft, natural slate-green that reflects peaceful organic design.", badge: "Limited Edition" },
            { name: "Sunset Gold", colorParam: "sunset", hex: "#decbb7", bgHex: "#e3d1be", desc: "A premium champagne gold with a delicate brushed metallic texture.", badge: "Lux Signature" }
          ].map((colorway) => (
            <div 
              key={colorway.name}
              className="bg-white/20 backdrop-blur-md rounded-[32px] border border-gray-200 p-6 flex flex-col justify-between hover:border-gray-300 transition-all hover:scale-[1.02] shadow-sm group relative overflow-hidden"
            >
              {/* Colored ambient orb on hover */}
              <div 
                className="absolute -top-12 -right-12 w-28 h-28 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500 filter blur-xl"
                style={{ backgroundColor: colorway.hex }}
              />

              <div>
                <div className="flex justify-between items-start mb-6">
                  <div 
                    className="w-10 h-10 rounded-full border border-black/10 shadow-inner"
                    style={{ backgroundColor: colorway.hex }}
                  />
                  <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest bg-gray-900/5 px-2.5 py-1 rounded-full">
                    {colorway.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">{colorway.name}</h3>
                <p className="text-xs text-gray-600 leading-relaxed mb-6">
                  {colorway.desc}
                </p>
              </div>

              <button 
                onClick={() => navigate(`/device?color=${colorway.colorParam}`)}
                className="w-full py-3.5 bg-gray-900/5 hover:bg-gray-900 text-gray-900 hover:text-white font-bold text-xs uppercase tracking-wider rounded-2xl flex items-center justify-center gap-1.5 transition-all cursor-pointer group-hover:shadow-sm"
              >
                Configure Finish <ArrowRight size={12} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Multi-Stage Filtration Tech Breakdown */}
      <section className="py-24 sm:py-32 px-5 sm:px-8 max-w-7xl mx-auto w-full pointer-events-auto border-t border-gray-200">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="text-xs font-semibold tracking-widest text-gray-500 uppercase mb-3 block">High-Efficiency Core</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">Triple-shield filtration.</h2>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mt-4">
            A medical-grade modular system optimized for rapid air delivery. Explore each layer to understand how PureFlow captures particles down to the cellular level.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Tab Selectors */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {[
              { id: 'pre', name: 'Stage 1: Pre-Filter Mesh', desc: 'Snares hair, pollen clumps, and micro-dust.' },
              { id: 'hepa', name: 'Stage 2: Medical H13 HEPA', desc: 'Captures 99.97% of fine allergens & PM2.5.' },
              { id: 'carbon', name: 'Stage 3: Active Charcoal', desc: 'Adsorbs VOCs, chemical fumes, and cooking odors.' }
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`p-6 rounded-3xl border text-left cursor-pointer transition-all ${
                    isActive 
                      ? 'bg-white border-gray-900 shadow-md ring-1 ring-gray-900' 
                      : 'bg-white/40 border-gray-200 hover:bg-white/80 hover:border-gray-300'
                  }`}
                >
                  <h4 className="font-bold text-gray-900 text-base mb-1">{tab.name}</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">{tab.desc}</p>
                </button>
              );
            })}
          </div>

          {/* Right Column: Dynamic Deep Dive Card */}
          <div className="lg:col-span-7">
            <div className="bg-white/20 backdrop-blur-md rounded-[40px] border border-gray-200 p-8 sm:p-10 shadow-lg min-h-[380px] flex flex-col justify-between">
              
              <div>
                <div className="flex justify-between items-center mb-8">
                  <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1.5 rounded-full border border-indigo-100">
                    {activeTab === 'pre' ? 'Macro Defense' : activeTab === 'hepa' ? 'Micro Capture' : 'Gas & Odor Guard'}
                  </span>
                  <span className="text-xs text-gray-500 font-semibold">Tuned for Airflow Efficiency</span>
                </div>

                {activeTab === 'pre' && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Coarse Pre-Filter Defense</h3>
                    <p className="text-gray-700 leading-relaxed text-sm mb-6">
                      An ultra-fine composite mesh designed to act as the first line of defense. By catching large particulate matter, it prevents the internal premium HEPA core from clogging prematurely.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-2xl bg-white/40 border border-black/5">
                        <span className="text-xs text-gray-500 uppercase font-semibold">Targets</span>
                        <div className="text-base font-bold text-gray-900 mt-1">Pet Hair, Lint, Large Dust</div>
                      </div>
                      <div className="p-4 rounded-2xl bg-white/40 border border-black/5">
                        <span className="text-xs text-gray-500 uppercase font-semibold">Material</span>
                        <div className="text-base font-bold text-gray-900 mt-1">Micron Nylon Mesh</div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'hepa' && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Medical H13 True HEPA Core</h3>
                    <p className="text-gray-700 leading-relaxed text-sm mb-6">
                      Our signature glass-fiber matrix is tightly pleated to slow and intercept particulate matter. Captures microscopic particles as small as 0.1 microns, including airborne spores and fine dander.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-2xl bg-white/40 border border-black/5">
                        <span className="text-xs text-gray-500 uppercase font-semibold">Filtration Rate</span>
                        <div className="text-base font-bold text-gray-900 mt-1">99.97% Efficiency</div>
                      </div>
                      <div className="p-4 rounded-2xl bg-white/40 border border-black/5">
                        <span className="text-xs text-gray-500 uppercase font-semibold">Targets</span>
                        <div className="text-base font-bold text-gray-900 mt-1">Pollen, PM2.5, Bacteria</div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'carbon' && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Cellular Activated Carbon Bed</h3>
                    <p className="text-gray-700 leading-relaxed text-sm mb-6">
                      A high-porosity carbon layer containing millions of microscopic pores. It chemically adsorbs gaseous toxins, cooking smoke, formaldehyde, and pet scents that HEPA filters cannot trap.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-2xl bg-white/40 border border-black/5">
                        <span className="text-xs text-gray-500 uppercase font-semibold">Surface Area</span>
                        <div className="text-base font-bold text-gray-900 mt-1">450,000 m² equivalent</div>
                      </div>
                      <div className="p-4 rounded-2xl bg-white/40 border border-black/5">
                        <span className="text-xs text-gray-500 uppercase font-semibold">Targets</span>
                        <div className="text-base font-bold text-gray-900 mt-1">VOCs, Smoke, Pet Odors</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-8">
                <button 
                  onClick={() => navigate('/science')}
                  className="bg-gray-900 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-2xl hover:bg-gray-800 transition-all cursor-pointer inline-flex items-center gap-1.5"
                >
                  Explore Clean Science <ArrowRight size={12} />
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 sm:py-32 px-5 sm:px-8 max-w-7xl mx-auto w-full pointer-events-auto border-t border-gray-200">
        <div className="w-full">
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
            <span className="text-xs font-semibold tracking-widest text-gray-500 uppercase mb-3 block">Certified Benchmarks</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 tracking-tight">The numbers speak for themselves.</h2>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              Independently verified and lab-tested to deliver results you can measure and feel.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-12">
            <div className="flex flex-col items-center text-center">
              <span className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-2">99.9%</span>
              <span className="text-xs font-semibold text-gray-600 uppercase tracking-widest">Particles Caught</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <span className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-2">22dB</span>
              <span className="text-xs font-semibold text-gray-600 uppercase tracking-widest">Noise Level</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <span className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-2">45m²</span>
              <span className="text-xs font-semibold text-gray-600 uppercase tracking-widest">Area Coverage</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <span className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-2">10h</span>
              <span className="text-xs font-semibold text-gray-600 uppercase tracking-widest">Battery Life</span>
            </div>
            <div className="flex flex-col items-center text-center col-span-2 lg:col-span-1">
              <span className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-2">4hrs</span>
              <span className="text-xs font-semibold text-gray-600 uppercase tracking-widest">Full Charge</span>
            </div>
          </div>
        </div>
      </section>

      {/* Press Quotes & Authority Section */}
      <section className="py-20 px-5 sm:px-8 max-w-7xl mx-auto w-full pointer-events-auto border-t border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { quote: "A masterpiece of air quality engineering and aesthetic layout.", publisher: "Wired" },
            { quote: "Practically silent. Seamlessly blends into modern workspaces.", publisher: "TechCrunch" },
            { quote: "PureFlow transforms a clinical medical device into premium home art.", publisher: "Design Milk" },
            { quote: "A reliable guardian for urban dwellers battling highway smog.", publisher: "Architectural Digest" }
          ].map((press) => (
            <div key={press.publisher} className="flex flex-col justify-between p-6 bg-white/10 backdrop-blur-sm rounded-3xl border border-black/5 hover:border-black/10 hover:bg-white/20 transition-all">
              <p className="text-sm font-medium text-gray-700 italic leading-relaxed mb-4">
                "{press.quote}"
              </p>
              <span className="text-[10px] font-bold text-gray-900 uppercase tracking-[0.2em]">
                — {press.publisher}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Premium Glassmorphic Newsletter CTA */}
      <section className="py-24 sm:py-32 px-5 sm:px-8 max-w-5xl mx-auto w-full pointer-events-auto">
        <div className="bg-gradient-to-br from-gray-900 to-neutral-950 text-white rounded-[40px] p-8 sm:p-14 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10">
          
          {/* Background Ambient Glows */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-500 rounded-full filter blur-[120px] opacity-15" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-500 rounded-full filter blur-[120px] opacity-15" />

          <div className="max-w-md z-10">
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-[0.25em] mb-3 block">Stay Informed</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">Breathe update alerts.</h2>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              Join the PureFlow Clean Air Newsletter. Get engineering deep dives, air filters restocking notices, and early access to upcoming devices.
            </p>
          </div>

          <div className="w-full max-w-sm z-10">
            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <label htmlFor="cta-email" className="sr-only">Email Address</label>
                  <div className="relative">
                    <input 
                      id="cta-email"
                      type="email" 
                      placeholder="Enter your email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white/10 backdrop-blur-md text-white placeholder-gray-400 border border-white/20 px-5 py-4 rounded-2xl text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-white focus:border-white transition-all pr-12"
                    />
                    <Mail size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>

                {emailError && <p className="text-red-400 text-xs font-semibold pl-1">{emailError}</p>}

                <button 
                  type="submit"
                  className="bg-white hover:bg-gray-100 text-gray-900 font-extrabold text-xs uppercase tracking-wider py-4.5 rounded-2xl transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                >
                  Join Clean Air Revolution
                </button>
              </form>
            ) : (
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/15 flex flex-col items-center text-center animate-fade-in">
                <CheckCircle2 size={40} className="text-emerald-400 mb-3" />
                <h4 className="font-bold text-white text-lg mb-1">Welcome Aboard!</h4>
                <p className="text-xs text-gray-300 leading-relaxed">
                  You have successfully subscribed. Expect updates regarding clean air innovation shortly.
                </p>
              </div>
            )}
          </div>

        </div>
      </section>
    </>
  );
}

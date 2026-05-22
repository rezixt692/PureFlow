import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { usePageTitle } from '../utils/seo';
import { Check, ShieldCheck, Sparkles, Zap, Award } from 'lucide-react';

interface ColorOption {
  name: string;
  hex: string;
  className: string;
  bgHex: string;
  accent: string;
  desc: string;
}

interface FilterOption {
  name: string;
  desc: string;
  price: number;
  cadr: number;
  area: number;
  efficiency: string;
}

interface StrapOption {
  name: string;
  color: string;
  hex: string;
  price: number;
}

export default function DeviceCustomizer() {
  usePageTitle(
    "Customize PureFlow One | Portable HEPA Air Purifier",
    "Design and configure your PureFlow One. Customize case finishes, strap attachments, and specialty filter modules to match your space."
  );

  const colors: ColorOption[] = [
    { name: "Obsidian Black", hex: "#1a1a1c", className: "bg-neutral-900", bgHex: "#1c1c1e", accent: "#3a3a3c", desc: "A sleek, fingerprint-resistant space-grade matte black finish." },
    { name: "Alpine White", hex: "#eaeaea", className: "bg-neutral-100", bgHex: "#f5f5f7", accent: "#d2d2d7", desc: "An ultra-clean, satin mineral white that blends into any modern room." },
    { name: "Sage Green", hex: "#839281", className: "bg-emerald-800/60", bgHex: "#8f9c8b", accent: "#b0bcae", desc: "A soft, natural slate-green that reflects peaceful organic design." },
    { name: "Sunset Gold", hex: "#decbb7", className: "bg-amber-100/80", bgHex: "#e3d1be", accent: "#f4ede4", desc: "A premium champagne gold with a delicate brushed metallic texture." }
  ];

  const filters: FilterOption[] = [
    { name: "HEPA Standard", desc: "Medical-grade H13 HEPA. Captures 99.97% of dust, dander, and mold spores.", price: 0, cadr: 240, area: 45, efficiency: "99.97%" },
    { name: "Allergy Plus", desc: "Infused with specialized pollen-blocking weave and allergen binders.", price: 49, cadr: 260, area: 50, efficiency: "99.99%" },
    { name: "Carbon Odor Guard", desc: "Thick cellular active carbon bed for cooking smoke, pet odors, and VOCs.", price: 79, cadr: 220, area: 40, efficiency: "99.95% + VOCs" }
  ];

  const straps: StrapOption[] = [
    { name: "Tan Leather", color: "Camel", hex: "#c68b59", price: 0 },
    { name: "Technical Orange", color: "Flame", hex: "#ff5a36", price: 15 },
    { name: "Midnight Navy", color: "Indigo", hex: "#2f3e4f", price: 15 }
  ];

  const [searchParams] = useSearchParams();
  const colorQuery = searchParams.get('color') || '';
  const matchedColor = colors.find(c => c.name.toLowerCase().includes(colorQuery.toLowerCase())) || colors[0];

  const [selectedColor, setSelectedColor] = useState<ColorOption>(matchedColor);
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>(filters[0]);
  const [selectedStrap, setSelectedStrap] = useState<StrapOption>(straps[0]);
  const [powerOn, setPowerOn] = useState(true);

  const basePrice = 299;
  const totalPrice = basePrice + selectedFilter.price + selectedStrap.price;

  return (
    <div className="min-h-screen py-28 sm:py-36 px-5 sm:px-8 max-w-7xl mx-auto w-full pointer-events-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left column: Visualizer */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center lg:sticky lg:top-28">
          <div className="relative w-full max-w-[420px] aspect-[4/5] bg-white/20 dark:bg-white/5 backdrop-blur-xl rounded-[40px] border border-white/30 flex items-center justify-center p-8 sm:p-12 shadow-2xl transition-all duration-700">
            
            {/* Ambient Backglow */}
            <div 
              className="absolute w-[80%] h-[80%] rounded-full opacity-35 blur-[80px] transition-all duration-1000 -z-10"
              style={{ backgroundColor: selectedColor.hex }}
            />

            {/* Simulated 3D Air Purifier Device */}
            <div className="relative w-full h-full flex flex-col items-center justify-end">
              
              {/* Strap Overlay (hanging off side) */}
              <div 
                className="absolute top-1/4 -right-2 w-7 h-28 rounded-r-2xl origin-top rotate-12 transition-all duration-500 shadow-md"
                style={{ 
                  backgroundColor: selectedStrap.hex,
                  borderLeft: '4px solid rgba(0,0,0,0.15)',
                  boxShadow: 'inset 0 10px 10px rgba(255,255,255,0.1)'
                }}
              >
                <div className="absolute top-[85%] left-1.5 w-4 h-4 rounded-full bg-gray-400 border border-gray-600 shadow-inner" />
              </div>

              {/* Purifier Body Shell */}
              <div 
                className="relative w-56 sm:w-64 h-80 rounded-[45px] transition-all duration-500 flex flex-col justify-between overflow-hidden shadow-2xl"
                style={{ 
                  backgroundColor: selectedColor.hex,
                  border: `2px solid ${selectedColor.accent}`,
                  boxShadow: '0 25px 50px -12px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.15)'
                }}
              >
                {/* Glowing LED Ring (Top Intake) */}
                <div className="h-6 w-full relative flex items-center justify-center border-b border-black/20" style={{ backgroundColor: 'rgba(0,0,0,0.15)' }}>
                  <div 
                    className={`h-1.5 w-[85%] rounded-full transition-all duration-500 shadow-[0_0_12px_rgba(34,197,94,0.4)] ${
                      powerOn 
                        ? 'bg-emerald-400 opacity-90 animate-pulse' 
                        : 'bg-neutral-600 opacity-40'
                    }`} 
                  />
                </div>

                {/* Speaker Grill Ventilation Pattern (Laser Cut) */}
                <div className="flex-1 w-full px-8 py-6 grid grid-cols-6 gap-y-2 gap-x-2.5 opacity-60">
                  {Array.from({ length: 48 }).map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-1.5 w-1.5 rounded-full transition-all duration-500 ${
                        selectedColor.name === "Alpine White" ? "bg-neutral-400" : "bg-white/30"
                      }`}
                    />
                  ))}
                </div>

                {/* Matte Finish Highlights */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 pointer-events-none" />

                {/* Minimalist PureFlow Logo */}
                <div className="pb-8 w-full flex justify-center">
                  <span className={`text-[10px] font-semibold tracking-[0.25em] ${
                    selectedColor.name === "Alpine White" ? "text-neutral-500" : "text-white/40"
                  }`}>
                    PUREFLOW
                  </span>
                </div>
              </div>

              {/* Base Stand & Shadow */}
              <div className="w-48 h-3 bg-neutral-950/40 rounded-full blur-md mt-4 transition-all duration-500" />
            </div>

            {/* Quick Interactive Power Switch */}
            <button 
              onClick={() => setPowerOn(!powerOn)}
              className="absolute top-6 left-6 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gray-900/10 hover:bg-gray-900/20 border border-white/20 transition-all cursor-pointer text-xs font-semibold text-gray-800"
            >
              <span className={`w-2 h-2 rounded-full ${powerOn ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
              {powerOn ? 'Device Active' : 'Offline'}
            </button>
          </div>
          
          <p className="text-xs text-gray-500 mt-6 text-center italic max-w-sm">
            Live preview of customized configuration. Dynamic power metrics reflect operational states.
          </p>
        </div>

        {/* Right column: Customization Options */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 tracking-tight">Configure PureFlow One</h1>
            <p className="text-gray-700 leading-relaxed">
              Tailor the aesthetics and performance specs of your portable air purifier. Handmade accessories and performance-tuned filters designed to fit your unique lifestyle.
            </p>
          </div>

          <hr className="border-gray-200" />

          {/* Option Section: Color */}
          <div>
            <div className="flex justify-between items-baseline mb-4">
              <span className="text-sm font-semibold tracking-wider text-gray-600 uppercase">1. Metallic Finish</span>
              <span className="text-sm font-bold text-gray-900">{selectedColor.name}</span>
            </div>
            
            <div className="flex gap-4">
              {colors.map((c) => {
                const isSelected = selectedColor.name === c.name;
                return (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c)}
                    className={`w-12 h-12 rounded-full relative flex items-center justify-center cursor-pointer transition-all duration-300 ${c.className} ${
                      isSelected 
                        ? 'ring-2 ring-offset-2 ring-gray-900 scale-105' 
                        : 'hover:scale-105 border border-black/10'
                    }`}
                    aria-label={`Color: ${c.name}`}
                  >
                    {isSelected && (
                      <Check 
                        size={18} 
                        className={c.name === "Alpine White" ? "text-gray-900" : "text-white"} 
                      />
                    )}
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-gray-500 mt-3">{selectedColor.desc}</p>
          </div>

          {/* Option Section: Straps */}
          <div>
            <div className="flex justify-between items-baseline mb-4">
              <span className="text-sm font-semibold tracking-wider text-gray-600 uppercase">2. Carrying Loop Strap</span>
              <span className="text-sm font-bold text-gray-900">
                {selectedStrap.name} {selectedStrap.price > 0 ? `(+$${selectedStrap.price})` : '(Included)'}
              </span>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              {straps.map((s) => {
                const isSelected = selectedStrap.name === s.name;
                return (
                  <button
                    key={s.name}
                    onClick={() => setSelectedStrap(s)}
                    className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                      isSelected 
                        ? 'border-gray-900 bg-gray-900 text-white shadow-md' 
                        : 'border-gray-200 bg-white/40 hover:bg-white/80 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-xs font-semibold uppercase opacity-75">{s.color}</span>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-bold truncate">{s.name.split(' ')[0]}</span>
                      <div 
                        className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-inner"
                        style={{ backgroundColor: s.hex }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Option Section: Filters */}
          <div>
            <div className="flex justify-between items-baseline mb-4">
              <span className="text-sm font-semibold tracking-wider text-gray-600 uppercase">3. Air Filtration Core</span>
              <span className="text-sm font-bold text-gray-900">
                {selectedFilter.name} {selectedFilter.price > 0 ? `(+$${selectedFilter.price})` : '(Included)'}
              </span>
            </div>
            
            <div className="flex flex-col gap-3">
              {filters.map((f) => {
                const isSelected = selectedFilter.name === f.name;
                return (
                  <button
                    key={f.name}
                    onClick={() => setSelectedFilter(f)}
                    className={`p-4 rounded-3xl border text-left flex items-start justify-between gap-4 transition-all cursor-pointer ${
                      isSelected 
                        ? 'border-gray-900 bg-white shadow-md ring-1 ring-gray-900' 
                        : 'border-gray-200 bg-white/40 hover:bg-white/80 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 text-base mb-1">{f.name}</h4>
                      <p className="text-xs text-gray-600 leading-relaxed">{f.desc}</p>
                      
                      <div className="flex gap-4 mt-3 text-[10px] sm:text-xs font-semibold text-gray-500">
                        <span className="flex items-center gap-1"><Zap size={12} className="text-yellow-500" /> CADR: {f.cadr} m³/h</span>
                        <span className="flex items-center gap-1"><Award size={12} className="text-blue-500" /> Efficiency: {f.efficiency}</span>
                      </div>
                    </div>
                    {isSelected ? (
                      <div className="w-5 h-5 rounded-full bg-gray-900 flex items-center justify-center text-white shrink-0">
                        <Check size={12} />
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full border border-gray-300 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* Interactive Specs Summary Board */}
          <div className="bg-white/30 backdrop-blur-lg rounded-3xl p-6 border border-gray-200">
            <h4 className="font-bold text-gray-900 text-sm tracking-wider uppercase mb-4 flex items-center gap-2">
              <Sparkles size={16} className="text-indigo-600" /> Live Configuration Specs
            </h4>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-gray-500 uppercase">Coverage</span>
                <span className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{selectedFilter.area} m²</span>
                <span className="text-[10px] text-gray-500 italic mt-0.5">Approx. {Math.round(selectedFilter.area * 10.76)} sq ft</span>
              </div>
              
              <div className="flex flex-col border-l border-r border-gray-200 px-4">
                <span className="text-xs font-semibold text-gray-500 uppercase">Air Output</span>
                <span className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{selectedFilter.cadr} m³/h</span>
                <span className="text-[10px] text-gray-500 italic mt-0.5">CADR Rate</span>
              </div>
              
              <div className="flex flex-col pl-2">
                <span className="text-xs font-semibold text-gray-500 uppercase">Energy</span>
                <span className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{powerOn ? '9.5 Watts' : '0.0 W'}</span>
                <span className="text-[10px] text-gray-500 italic mt-0.5">Ultra-Low Power</span>
              </div>
            </div>
          </div>

          {/* Pricing Box & Add to Cart */}
          <div className="bg-gray-900 text-white rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="text-center sm:text-left">
              <span className="text-xs font-semibold uppercase opacity-65 tracking-widest">Total Price</span>
              <div className="text-3xl font-extrabold mt-1">${totalPrice}</div>
              <span className="text-[10px] opacity-75">Free carbon-neutral shipping</span>
            </div>
            
            <button 
              onClick={() => alert(`PureFlow Configured successfully! Color: ${selectedColor.name}, Filter: ${selectedFilter.name}, Strap: ${selectedStrap.name}. Price: $${totalPrice}`)}
              className="w-full sm:w-auto bg-white text-gray-900 font-bold px-8 py-4 rounded-full hover:bg-gray-100 transition-all flex items-center justify-center gap-2 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <ShieldCheck size={18} />
              Reserve Device
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}

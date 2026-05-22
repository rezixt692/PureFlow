import React, { useState } from 'react';
import { usePageTitle } from '../utils/seo';
import { Shield, Info, Activity, Thermometer, Wind, AlertCircle } from 'lucide-react';

interface ParticleStage {
  size: string;
  name: string;
  examples: string;
  healthEffect: string;
  targetFilter: string;
  efficiency: string;
  colorClass: string;
  percentage: number;
}

export default function Science() {
  usePageTitle(
    "The Science of Clean Air | PureFlow",
    "Discover how our multi-stage HEPA filtration, active carbon cells, and quiet motors sanitize your indoor air down to PM0.1."
  );

  // Particle slider stages
  const stages: ParticleStage[] = [
    {
      size: "PM 10.0",
      name: "Coarse Particulates",
      examples: "Pollen, mold spores, pet dander, insect dust, large allergens.",
      healthEffect: "Triggers nasal allergies, sneezing, coughing, and sinus inflammation.",
      targetFilter: "Micro-Mesh Pre-Filter",
      efficiency: "100% captured instantly",
      colorClass: "from-amber-400 to-orange-500",
      percentage: 100
    },
    {
      size: "PM 2.5",
      name: "Fine Dust & Smoke",
      examples: "Wildfire smoke, vehicle exhaust, cooking emissions, fine household dust.",
      healthEffect: "Can penetrate deep into the lungs, triggering asthma and bronchitis.",
      targetFilter: "Medical Grade H13 HEPA Core",
      efficiency: "99.98% captured",
      colorClass: "from-orange-500 to-rose-500",
      percentage: 60
    },
    {
      size: "PM 0.3",
      name: "Micro-Particulates",
      examples: "Combustion particles, bacteria, virus droplets, tobacco residues.",
      healthEffect: "Enters lung alveoli and can cross into the bloodstream, impacting cardiac health.",
      targetFilter: "H13 HEPA & Active Carbon Bed",
      efficiency: "99.97% captured",
      colorClass: "from-rose-500 to-red-600",
      percentage: 30
    },
    {
      size: "PM 0.1",
      name: "Ultra-Fine Viruses",
      examples: "Single viruses, sub-micron chemical vapor particles, molecular smog.",
      healthEffect: "Causes systemic cellular stress, immune strain, and long-term health risks.",
      targetFilter: "Dense Electrostatic HEPA Fibers",
      efficiency: "99.91% captured",
      colorClass: "from-red-600 to-indigo-800",
      percentage: 10
    }
  ];

  const [currentStageIdx, setCurrentStageIdx] = useState(1);
  const activeStage = stages[currentStageIdx];

  // AQI Calculator states
  const [inputAQI, setInputAQI] = useState<number>(145);

  const getAQIStatus = (aqi: number) => {
    if (aqi <= 50) return { label: "Good", color: "text-green-600 bg-green-500/10 border-green-500/20", cleanAqi: Math.max(2, Math.round(aqi * 0.05)), desc: "Air quality is satisfactory, and air pollution poses little or no risk." };
    if (aqi <= 100) return { label: "Moderate", color: "text-yellow-600 bg-yellow-500/10 border-yellow-500/20", cleanAqi: Math.max(3, Math.round(aqi * 0.06)), desc: "Air quality is acceptable. However, sensitive individuals may experience minor symptoms." };
    if (aqi <= 150) return { label: "Unhealthy for Sensitive Groups", color: "text-orange-600 bg-orange-500/10 border-orange-500/20", cleanAqi: Math.max(5, Math.round(aqi * 0.07)), desc: "Members of sensitive groups may experience health effects. The general public is less likely to be affected." };
    if (aqi <= 200) return { label: "Unhealthy", color: "text-red-600 bg-red-500/10 border-red-500/20", cleanAqi: Math.max(6, Math.round(aqi * 0.08)), desc: "Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects." };
    if (aqi <= 300) return { label: "Very Unhealthy", color: "text-purple-600 bg-purple-500/10 border-purple-500/20", cleanAqi: Math.max(9, Math.round(aqi * 0.09)), desc: "Health alert: everyone may experience more serious health effects. Keep windows closed." };
    return { label: "Hazardous", color: "text-rose-950 bg-red-950/20 border-red-950/30", cleanAqi: Math.max(12, Math.round(aqi * 0.1)), desc: "Health warning of emergency conditions: the entire population is more likely to be affected." };
  };

  const aqiInfo = getAQIStatus(inputAQI);

  return (
    <div className="min-h-screen py-28 sm:py-36 px-5 sm:px-8 max-w-7xl mx-auto w-full pointer-events-auto">
      
      {/* Hero Header */}
      <div className="max-w-3xl mb-20">
        <span className="text-xs font-semibold tracking-[0.2em] text-gray-500 uppercase mb-3 block">Scientific Rigor</span>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 tracking-tight">The Science of Air.</h1>
        <p className="text-lg text-gray-700 leading-relaxed">
          How do we clean the air without building bulky, noisy industrial machines? PureFlow combines fluid dynamics, advanced materials science, and smart sensors to engineer clean breathing spaces.
        </p>
      </div>

      {/* Part 1: Interactive Particle Size Slider */}
      <section className="bg-white/20 backdrop-blur-lg border border-gray-200 rounded-[35px] p-6 sm:p-12 mb-16 shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left panel: Info & Slider */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Particulate Filter Test</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2 mb-4 tracking-tight">Interactive Particle Filter</h2>
              <p className="text-gray-700 leading-relaxed text-sm">
                Drag the slider below to inspect particle sizes, their health implications, and how different layers of the PureFlow filtration core isolate and eliminate them.
              </p>
            </div>

            {/* Slider Widget */}
            <div className="my-4 bg-gray-900/5 p-6 rounded-2xl border border-black/5">
              <div className="flex justify-between text-xs font-bold text-gray-500 mb-2">
                <span>PM 10 (Large)</span>
                <span>PM 0.1 (Ultra-Fine)</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="3" 
                value={currentStageIdx} 
                onChange={(e) => setCurrentStageIdx(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-gray-900"
              />
              <div className="flex justify-between mt-4">
                {stages.map((st, i) => (
                  <button 
                    key={st.size}
                    onClick={() => setCurrentStageIdx(i)}
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                      currentStageIdx === i 
                        ? 'bg-gray-900 text-white shadow' 
                        : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    {st.size}
                  </button>
                ))}
              </div>
            </div>

            {/* Particle Stage Details */}
            <div className="bg-white/40 p-6 rounded-2xl border border-white/40">
              <div className="flex items-center gap-3 mb-2">
                <span className={`text-sm font-bold px-3 py-1 rounded-full bg-gradient-to-r text-white ${activeStage.colorClass}`}>
                  {activeStage.size}
                </span>
                <h3 className="text-lg font-bold text-gray-900">{activeStage.name}</h3>
              </div>
              <div className="space-y-3 mt-4 text-sm leading-relaxed">
                <p className="text-gray-800"><strong>Source examples:</strong> {activeStage.examples}</p>
                <p className="text-gray-800"><strong>Health Impact:</strong> {activeStage.healthEffect}</p>
                <div className="pt-2 border-t border-black/5 flex items-center justify-between text-xs font-bold text-indigo-950">
                  <span className="flex items-center gap-1.5"><Shield size={14} className="text-indigo-600" /> Layer: {activeStage.targetFilter}</span>
                  <span className="text-emerald-700 bg-emerald-500/10 px-2 py-0.5 rounded-full">{activeStage.efficiency}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right panel: Visualization */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center min-h-[300px] relative">
            {/* Box container representing filter cross section */}
            <div className="w-full max-w-[360px] aspect-square rounded-[35px] border border-dashed border-gray-300 relative flex items-center justify-center overflow-hidden bg-slate-950 p-6 shadow-inner">
              
              {/* Particle flow grid */}
              <div className="absolute inset-0 grid grid-cols-5 gap-3 p-6 opacity-30 pointer-events-none">
                {Array.from({ length: 25 }).map((_, i) => (
                  <div key={i} className="h-full w-0.5 bg-cyan-400/20 mx-auto" />
                ))}
              </div>

              {/* Dynamic simulated particles based on stage */}
              <div className="relative w-full h-full flex flex-col items-center justify-center">
                {/* Clean zone split line */}
                <div className="absolute bottom-12 left-0 right-0 h-0.5 bg-green-500/40 border-t border-dashed border-green-500 flex items-center justify-center">
                  <span className="text-[9px] font-bold text-green-400 bg-slate-950 px-2 uppercase tracking-widest">PureFlow Filter Shield</span>
                </div>

                {/* Animated Particles floating */}
                {Array.from({ length: 45 }).map((_, i) => {
                  const size = currentStageIdx === 0 ? 14 : currentStageIdx === 1 ? 8 : currentStageIdx === 2 ? 4 : 2.5;
                  const duration = 2 + (i % 3);
                  const delay = (i % 5) * 0.4;
                  // Larger indices float above the filter guard line (bottom 30%)
                  const reachesCleanZone = i % 8 === 0; // Only a tiny fraction leak past standard specs
                  const topPos = reachesCleanZone ? (30 + (i % 60)) : (10 + (i % 50));
                  
                  return (
                    <div 
                      key={i}
                      className={`absolute rounded-full transition-all duration-1000 animate-pulse ${
                        reachesCleanZone 
                          ? 'bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.5)]' 
                          : currentStageIdx === 0 ? 'bg-amber-400' : currentStageIdx === 1 ? 'bg-orange-400' : 'bg-rose-500'
                      }`}
                      style={{
                        width: `${size}px`,
                        height: `${size}px`,
                        left: `${15 + (i * 1.6) % 75}%`,
                        top: `${topPos}%`,
                        opacity: reachesCleanZone ? 0.35 : 0.75,
                        transitionDelay: `${delay}s`
                      }}
                    />
                  );
                })}

                {/* Airflow Indicator */}
                <div className="absolute top-4 text-[10px] font-semibold text-cyan-400/80 tracking-widest uppercase flex items-center gap-1">
                  <Wind size={12} className="animate-spin" style={{ animationDuration: '6s' }} /> Air Intake Flow
                </div>

                <div className="absolute bottom-4 text-[10px] font-semibold text-emerald-400 tracking-widest uppercase flex items-center gap-1">
                  <Activity size={12} className="animate-pulse" /> Sanitized Fresh Air Output
                </div>
              </div>
            </div>
            
            <p className="text-xs text-gray-500 mt-4 italic text-center max-w-xs">
              Simulated particle entrapment. At {activeStage.size}, the {activeStage.targetFilter} blocks {activeStage.efficiency}.
            </p>
          </div>

        </div>
      </section>

      {/* Part 2: Interactive AQI Impact Simulator */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left panel: AQI description & calculator inputs */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div>
            <span className="text-xs font-semibold tracking-wider text-gray-500 uppercase">Interactive Tool</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-4 tracking-tight">AQI Impact Simulator</h2>
            <p className="text-gray-700 leading-relaxed text-sm">
              The Air Quality Index (AQI) measures particle concentration in your local area. Input your local outdoor index level to see how quickly the PureFlow One cleanses an average living space.
            </p>
          </div>

          <div className="bg-white/30 backdrop-blur-md p-6 rounded-3xl border border-gray-200 flex flex-col gap-4">
            <div>
              <label htmlFor="aqi-range" className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 block">
                Local Outdoor AQI Level
              </label>
              <div className="flex items-center gap-4">
                <input 
                  id="aqi-range"
                  type="range" 
                  min="10" 
                  max="400" 
                  value={inputAQI}
                  onChange={(e) => setInputAQI(parseInt(e.target.value))}
                  className="flex-1 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-900"
                />
                <input 
                  type="number"
                  min="10"
                  max="500"
                  value={inputAQI}
                  onChange={(e) => setInputAQI(Math.min(500, Math.max(0, parseInt(e.target.value) || 0)))}
                  className="w-20 px-3 py-1.5 rounded-xl border border-gray-300 text-center text-sm font-bold text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
                />
              </div>
            </div>

            {/* Quick preset buttons */}
            <div className="flex flex-wrap gap-2">
              {[
                { name: "Clear Day", value: 25 },
                { name: "City Smog", value: 95 },
                { name: "Pollen Spike", value: 145 },
                { name: "Wildfire Smoke", value: 280 }
              ].map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => setInputAQI(preset.value)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                    inputAQI === preset.value
                      ? 'bg-gray-900 border-gray-900 text-white'
                      : 'bg-white/40 border-gray-200 text-gray-700 hover:bg-white/80'
                  }`}
                >
                  {preset.name} ({preset.value})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right panel: Calculator comparison graphics */}
        <div className="lg:col-span-7 bg-white/20 backdrop-blur-lg border border-gray-200 rounded-[35px] p-6 sm:p-8 shadow-lg flex flex-col gap-6">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Column A: Without PureFlow */}
            <div className="bg-white/40 p-6 rounded-2xl border border-white/50 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-red-700 uppercase tracking-widest">Untreated Space</span>
                <div className="text-5xl font-extrabold text-red-950 mt-2 mb-1">{inputAQI}</div>
                <div className={`text-xs font-bold px-2 py-0.5 rounded border inline-block ${aqiInfo.color}`}>
                  {aqiInfo.label}
                </div>
              </div>
              <p className="text-xs text-gray-700 mt-4 leading-relaxed">
                {aqiInfo.desc}
              </p>
            </div>

            {/* Column B: With PureFlow */}
            <div className="bg-emerald-500/10 p-6 rounded-2xl border border-emerald-500/20 flex flex-col justify-between shadow-sm">
              <div>
                <span className="text-xs font-semibold text-emerald-800 uppercase tracking-widest">PureFlow Treatment</span>
                <div className="text-5xl font-extrabold text-emerald-600 mt-2 mb-1">
                  {aqiInfo.cleanAqi}
                </div>
                <div className="text-xs font-bold px-2 py-0.5 rounded border text-emerald-700 bg-emerald-500/10 border-emerald-500/20 inline-block">
                  Pristine (Good)
                </div>
              </div>
              <p className="text-xs text-emerald-950 mt-4 leading-relaxed">
                Particle count reduced by <strong>99.9%</strong>. Calculated AQI remains stable below 12 within 15 minutes of device activation.
              </p>
            </div>

          </div>

          {/* Efficiency Bar Chart Mock */}
          <div className="p-4 bg-white/50 rounded-2xl border border-white/40">
            <span className="text-xs font-bold text-gray-600 uppercase tracking-wider block mb-3">Allergen Clearance Timeline</span>
            
            <div className="space-y-2">
              <div className="flex items-center text-xs font-semibold text-gray-700">
                <span className="w-16">Start:</span>
                <div className="flex-1 h-3 bg-red-400 rounded-full" />
                <span className="w-10 text-right">0%</span>
              </div>
              <div className="flex items-center text-xs font-semibold text-gray-700">
                <span className="w-16">5 Mins:</span>
                <div className="flex-1 h-3 bg-orange-400 rounded-full" style={{ width: '45%' }} />
                <span className="w-10 text-right">45%</span>
              </div>
              <div className="flex items-center text-xs font-semibold text-gray-700">
                <span className="w-16">10 Mins:</span>
                <div className="flex-1 h-3 bg-blue-400 rounded-full" style={{ width: '85%' }} />
                <span className="w-10 text-right">85%</span>
              </div>
              <div className="flex items-center text-xs font-semibold text-gray-700">
                <span className="w-16">15 Mins:</span>
                <div className="flex-1 h-3 bg-emerald-500 rounded-full" style={{ width: '99%' }} />
                <span className="w-10 text-right">99.9%</span>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2.5 text-xs text-gray-600 bg-blue-500/5 border border-blue-500/10 p-3 rounded-xl">
            <Info size={16} className="text-blue-500 shrink-0 mt-0.5" />
            <p>
              Simulation assumes standard airflow coverage (45m²) with continuous high CADR operation. Actual performance may vary based on ventilation leaks and furniture materials.
            </p>
          </div>

        </div>

      </section>

    </div>
  );
}

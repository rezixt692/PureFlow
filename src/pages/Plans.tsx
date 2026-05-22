import React, { useState } from 'react';
import { usePageTitle } from '../utils/seo';
import { Check, ArrowRight, ShieldCheck, Truck, RefreshCw, Calculator, HelpCircle } from 'lucide-react';

interface PricingPlan {
  name: string;
  tagline: string;
  priceMonthly: number;
  priceYearly: number;
  billingType: string;
  features: string[];
  ctaText: string;
  isPopular: boolean;
  colorClass: string;
}

export default function Plans() {
  usePageTitle(
    "Choose Your PureFlow | Plans & Pricing",
    "Compare purchase packages and filter subscription services. Find the perfect device configuration for apartments, homes, or workspaces."
  );

  const [isAnnual, setIsAnnual] = useState(true);
  const [homeSize, setHomeSize] = useState<number>(65); // square meters
  const [pollutionLevel, setPollutionLevel] = useState<string>("moderate"); // low, moderate, high

  const plans: PricingPlan[] = [
    {
      name: "Solo Purifier",
      tagline: "One-off purchase. Ideal for personal workspaces or bedrooms.",
      priceMonthly: 299, // flat rate
      priceYearly: 299,
      billingType: "one-time",
      features: [
        "PureFlow One Device",
        "Tan Leather loop strap",
        "Medical-grade H13 HEPA Filter",
        "2-Year manufacturer warranty",
        "Free carbon-neutral shipping"
      ],
      ctaText: "Buy Now",
      isPopular: false,
      colorClass: "border-gray-200 bg-white/30"
    },
    {
      name: "FreshAir Subscription",
      tagline: "Total peace of mind. Automated filter delivery + hardware cover.",
      priceMonthly: 24,
      priceYearly: 19, // 19/mo billed annually
      billingType: "subscription",
      features: [
        "PureFlow One leased device",
        "Custom loop strap color of choice",
        "Replacement filters shipped every 6 months",
        "Lifetime hardware warranty",
        "Upgrade to next-gen device when released",
        "Pause or cancel anytime"
      ],
      ctaText: "Start Subscription",
      isPopular: true,
      colorClass: "border-gray-900 bg-white shadow-xl ring-2 ring-gray-900"
    },
    {
      name: "All-Home Bundle",
      tagline: "Complete coverage for multi-room spaces and families.",
      priceMonthly: 549, // flat rate
      priceYearly: 549,
      billingType: "one-time",
      features: [
        "2x PureFlow One Devices",
        "Any 2 carrying straps of choice",
        "2x Standard HEPA Filters",
        "15% off subsequent replacement filters",
        "3-Year extended warranty",
        "Priority dedicated customer support"
      ],
      ctaText: "Secure Bundle",
      isPopular: false,
      colorClass: "border-gray-200 bg-white/30"
    }
  ];

  // Ownership cost calculations
  const getFilterLifespan = (pollution: string) => {
    if (pollution === "low") return 9; // months
    if (pollution === "moderate") return 6; // months
    return 4; // months
  };

  const filterLifespan = getFilterLifespan(pollutionLevel);
  const replacementsPerYear = Math.ceil(12 / filterLifespan);
  const filterPrice = 45; // base price of a filter
  
  // Calculate average annual cost based on home size and pollution
  const calculateAnnualCost = () => {
    const devicesNeeded = homeSize > 90 ? 2 : 1;
    const initialCost = devicesNeeded === 1 ? 299 : 549;
    const maintenanceCost = devicesNeeded * replacementsPerYear * filterPrice;
    return initialCost + maintenanceCost;
  };

  const annualCost = calculateAnnualCost();

  return (
    <div className="min-h-screen py-28 sm:py-36 px-5 sm:px-8 max-w-7xl mx-auto w-full pointer-events-auto">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-semibold tracking-[0.2em] text-gray-500 uppercase mb-3 block">Flexible Options</span>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 tracking-tight">Simple, honest pricing.</h1>
        <p className="text-lg text-gray-700 leading-relaxed">
          Own it outright or join our automated filter replacement plan. Clean air shouldn't require complex maintenance or surprises.
        </p>

        {/* Monthly / Annual Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <span className={`text-sm font-semibold transition-colors ${!isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
            Monthly
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className="w-12 h-6 rounded-full bg-gray-900 p-1 flex items-center justify-start cursor-pointer transition-all duration-300"
            style={{ justifyContent: isAnnual ? 'flex-end' : 'flex-start' }}
          >
            <span className="w-4 h-4 rounded-full bg-white shadow-md block" />
          </button>
          <span className={`text-sm font-semibold transition-colors flex items-center gap-1.5 ${isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
            Annual Plan <span className="bg-emerald-500/10 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/20">Save 20%</span>
          </span>
        </div>
      </div>

      {/* Plan Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-24">
        {plans.map((plan) => {
          const isSub = plan.billingType === "subscription";
          const displayPrice = isSub 
            ? (isAnnual ? plan.priceYearly : plan.priceMonthly) 
            : plan.priceMonthly;

          return (
            <div 
              key={plan.name}
              className={`rounded-[35px] border p-8 flex flex-col justify-between relative transition-all duration-300 ${plan.colorClass} ${
                plan.isPopular ? 'scale-[1.02] shadow-xl md:-translate-y-2' : 'hover:scale-[1.01]'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-900 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full shadow border border-white/20">
                  Most Popular
                </div>
              )}

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-xs text-gray-600 leading-relaxed mb-6">{plan.tagline}</p>
                
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl font-extrabold text-gray-900">${displayPrice}</span>
                  <span className="text-xs font-semibold text-gray-500">
                    {isSub ? '/month' : ' flat'}
                  </span>
                </div>

                <hr className="border-gray-200/60 mb-6" />

                <ul className="space-y-4">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5 text-xs text-gray-800 leading-relaxed">
                      <Check size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <button 
                  onClick={() => alert(`Selected Plan: ${plan.name} (Billed: ${plan.billingType})`)}
                  className={`w-full font-bold text-xs uppercase tracking-wider py-4 rounded-2xl flex items-center justify-center gap-1.5 cursor-pointer transition-all duration-300 hover:scale-[1.03] active:scale-95 ${
                    plan.isPopular 
                      ? 'bg-gray-900 text-white hover:bg-gray-800' 
                      : 'bg-white border border-gray-300 text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  {plan.ctaText}
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Calculator Section */}
      <section className="bg-white/20 backdrop-blur-lg border border-gray-200 rounded-[35px] p-6 sm:p-10 shadow-lg max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          <div className="md:col-span-6 flex flex-col gap-5">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Calculator size={20} className="text-indigo-600" /> Cost of Ownership Estimator
            </h3>
            <p className="text-xs text-gray-700 leading-relaxed">
              Air purifier ownership involves subsequent filter maintenance. Adjust parameters below to estimate average device requirements and filter life for your environment.
            </p>

            {/* Slider: Home Size */}
            <div>
              <label htmlFor="home-size" className="text-xs font-bold text-gray-600 uppercase mb-2 block">
                Total Covered Area: {homeSize} m² / {Math.round(homeSize * 10.76)} sq ft
              </label>
              <input
                id="home-size"
                type="range"
                min="20"
                max="150"
                value={homeSize}
                onChange={(e) => setHomeSize(parseInt(e.target.value))}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-900"
              />
            </div>

            {/* Selector: Pollution level */}
            <div>
              <span className="text-xs font-bold text-gray-600 uppercase mb-2 block">Indoor/Outdoor Smoke Level</span>
              <div className="flex gap-2">
                {['low', 'moderate', 'high'].map((level) => (
                  <button
                    key={level}
                    onClick={() => setPollutionLevel(level)}
                    className={`flex-1 text-xs font-semibold py-2 rounded-xl border capitalize cursor-pointer transition-all ${
                      pollutionLevel === level
                        ? 'bg-gray-900 text-white border-gray-900 shadow-sm'
                        : 'bg-white/40 border-gray-200 text-gray-700 hover:bg-white/80'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="md:col-span-6 bg-white/40 p-6 rounded-2xl border border-white/50 space-y-4">
            <div className="flex justify-between items-center text-xs font-semibold text-gray-700 border-b border-black/5 pb-2">
              <span>Devices Needed:</span>
              <span className="font-bold text-gray-900">{homeSize > 90 ? "2x PureFlow One" : "1x PureFlow One"}</span>
            </div>
            
            <div className="flex justify-between items-center text-xs font-semibold text-gray-700 border-b border-black/5 pb-2">
              <span>Filter Replacement Cycle:</span>
              <span className="font-bold text-gray-900">Every {filterLifespan} months</span>
            </div>

            <div className="flex justify-between items-center text-xs font-semibold text-gray-700 border-b border-black/5 pb-2">
              <span>Filters Consumed / Year:</span>
              <span className="font-bold text-gray-900">
                {replacementsPerYear * (homeSize > 90 ? 2 : 1)} filters
              </span>
            </div>

            <div className="pt-2 flex justify-between items-baseline">
              <span className="text-sm font-bold text-gray-800">Est. Year 1 Budget:</span>
              <span className="text-2xl font-extrabold text-gray-900">${annualCost}</span>
            </div>
            
            <p className="text-[10px] text-gray-500 italic mt-2">
              Year 1 estimates include device purchase cost ($299/$549) and necessary replacement filter cartridges ($45 each).
            </p>
          </div>

        </div>
      </section>

      {/* Guarantee Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto text-center">
        <div className="flex flex-col items-center p-4">
          <Truck className="text-gray-900 mb-2" size={24} />
          <h4 className="font-bold text-gray-900 text-sm mb-1">Free Carbon Neutral Shipping</h4>
          <p className="text-xs text-gray-500 leading-relaxed">Arrives in 2-3 business days in zero-plastic recyclable cardboard.</p>
        </div>
        <div className="flex flex-col items-center border-t sm:border-t-0 sm:border-l sm:border-r border-gray-200 p-4">
          <ShieldCheck className="text-gray-900 mb-2" size={24} />
          <h4 className="font-bold text-gray-900 text-sm mb-1">30-Day Sleep-On-It Trial</h4>
          <p className="text-xs text-gray-500 leading-relaxed">Breathe easy for 30 nights. If you're not wowed, return it for a full refund.</p>
        </div>
        <div className="flex flex-col items-center p-4">
          <RefreshCw className="text-gray-900 mb-2" size={24} />
          <h4 className="font-bold text-gray-900 text-sm mb-1">Automated Delivery Upgrade</h4>
          <p className="text-xs text-gray-500 leading-relaxed">Subscriptions auto-adapt shipping schedules based on device air filters sensors.</p>
        </div>
      </div>

    </div>
  );
}

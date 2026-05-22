import React, { useState } from 'react';
import { usePageTitle } from '../utils/seo';
import { Star, MessageCircle, Heart, PlusCircle, Check } from 'lucide-react';

interface ReviewItem {
  id: number;
  name: string;
  location: string;
  rating: number;
  category: string;
  tag: string;
  date: string;
  story: string;
  likes: number;
}

export default function RealStories() {
  usePageTitle(
    "Real Stories & Reviews | PureFlow Experience",
    "Read customer reviews, user stories, and clinical transformations from pet owners, city apartments, and allergy sufferers using PureFlow."
  );

  const initialReviews: ReviewItem[] = [
    {
      id: 1,
      name: "Amanda L.",
      location: "Seattle, WA",
      rating: 5,
      category: "allergies",
      tag: "Allergy Sufferer",
      date: "May 12, 2026",
      story: "PureFlow completely changed the way I work from home. My allergies have subsided and I feel significantly more energetic throughout the day. I no longer wake up with a stuffed nose, and the dust accumulation on my desk has dropped by at least 80%. Highly recommend the Allergy Plus filter upgrade!",
      likes: 34
    },
    {
      id: 2,
      name: "Robert T.",
      location: "Boston, MA",
      rating: 5,
      category: "sleep",
      tag: "Night Sleeper",
      date: "April 29, 2026",
      story: "As someone with severe asthma, this device has been a lifesaver. It's so quiet I often forget it's even running in my bedroom. The 22dB low fan setting is incredibly peaceful, and the ambient LED light acts as a perfect subtle nightlight. My sleep quality score on my smartwatch has gone up consistently.",
      likes: 19
    },
    {
      id: 3,
      name: "Chloe & Winston",
      location: "Austin, TX",
      rating: 5,
      category: "pets",
      tag: "Golden Retriever Owner",
      date: "April 15, 2026",
      story: "With two heavy-shedding Goldens, the pet dander and odor in our living room was constant. We set up the PureFlow One next to their bed with the Carbon Odor Guard, and within three hours the room smelled completely neutral. It's compact enough to move around, and the leather loop makes carrying it simple.",
      likes: 42
    },
    {
      id: 4,
      name: "Marcus J.",
      location: "Chicago, IL",
      rating: 4,
      category: "urban",
      tag: "Urban Dweller",
      date: "March 20, 2026",
      story: "Living right next to a busy freeway meant diesel exhaust particles were always leaking in. This purifier keeps my living room fresh and clean. The AQI display simulator in their app showed me exactly how much fine soot was being removed. I only wish the replacement filter filters were slightly cheaper, but the subscription helps.",
      likes: 12
    },
    {
      id: 5,
      name: "Sophia K.",
      location: "Denver, CO",
      rating: 5,
      category: "allergies",
      tag: "Asthma Relief",
      date: "March 02, 2026",
      story: "Spring in Colorado means heavy pine pollen. I bought this portable purifier for my office cubicle. My coworkers are amazed at how quiet it is, and I haven't sneezed once since the season started. It's beautiful and doesn't look like an ugly clinical appliance.",
      likes: 27
    }
  ];

  const [reviews, setReviews] = useState<ReviewItem[]>(initialReviews);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  
  // Submit modal / inputs
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [newCategory, setNewCategory] = useState("allergies");
  const [newStory, setNewStory] = useState("");

  const handleLike = (id: number) => {
    setReviews((prev) => 
      prev.map((r) => r.id === id ? { ...r, likes: r.likes + 1 } : r)
    );
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newStory) return;

    const newReview: ReviewItem = {
      id: Date.now(),
      name: newName,
      location: newLocation || "Verified Buyer",
      rating: newRating,
      category: newCategory,
      tag: newCategory === "allergies" ? "Allergy Relief" : newCategory === "pets" ? "Pet Owner" : newCategory === "urban" ? "Urban Dweller" : "Night Sleeper",
      date: "Today",
      story: newStory,
      likes: 0
    };

    setReviews([newReview, ...reviews]);
    setNewName("");
    setNewLocation("");
    setNewRating(5);
    setNewStory("");
    setShowSubmitModal(false);
    alert("Thank you! Your story has been submitted and added below.");
  };

  const filteredReviews = activeCategory === "all"
    ? reviews
    : reviews.filter((r) => r.category === activeCategory);

  return (
    <div className="min-h-screen py-28 sm:py-36 px-5 sm:px-8 max-w-7xl mx-auto w-full pointer-events-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold tracking-[0.2em] text-gray-500 uppercase mb-3 block">User Experiences</span>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">Real Stories.</h1>
          <p className="text-lg text-gray-700 leading-relaxed mt-4">
            See how the PureFlow One helps pet owners, allergy sufferers, city dwellers, and light sleepers enjoy pristine, restorative air every day.
          </p>
        </div>

        <button 
          onClick={() => setShowSubmitModal(true)}
          className="bg-gray-900 text-white font-bold text-xs uppercase tracking-wider px-6 py-4 rounded-2xl flex items-center gap-2 hover:bg-gray-800 transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95 shrink-0"
        >
          <PlusCircle size={16} />
          Share Your Story
        </button>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-10 pb-4 border-b border-gray-200">
        {[
          { id: "all", label: "All Stories" },
          { id: "allergies", label: "Allergy Relief" },
          { id: "pets", label: "Pet Dander" },
          { id: "urban", label: "Urban Smog" },
          { id: "sleep", label: "Quiet Sleep" }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id)}
            className={`text-xs font-semibold px-4.5 py-2.5 rounded-full transition-all cursor-pointer ${
              activeCategory === tab.id
                ? 'bg-gray-900 text-white shadow-sm'
                : 'bg-white/40 border border-gray-200 text-gray-700 hover:bg-white/85'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {filteredReviews.map((rev) => (
          <div 
            key={rev.id}
            className="bg-white/20 backdrop-blur-md rounded-[30px] border border-gray-200 p-8 flex flex-col justify-between hover:border-gray-300 transition-all shadow-sm group hover:scale-[1.01]"
          >
            <div>
              {/* Stars & Category Tag */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-0.5 text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      size={15} 
                      className={i < rev.rating ? 'fill-amber-500 text-amber-500' : 'text-gray-300'} 
                    />
                  ))}
                </div>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest bg-gray-900/5 px-2.5 py-1 rounded-full border border-black/5">
                  {rev.tag}
                </span>
              </div>

              {/* Review Text */}
              <p className="text-gray-800 text-sm leading-relaxed font-medium mb-6 italic">
                "{rev.story}"
              </p>
            </div>

            {/* Author info & Likes */}
            <div className="flex items-center justify-between border-t border-black/5 pt-4">
              <div>
                <h4 className="font-bold text-gray-900 text-sm">{rev.name}</h4>
                <span className="text-[10px] text-gray-500">{rev.location} • {rev.date}</span>
              </div>

              <div className="flex items-center gap-4">
                <button 
                  onClick={() => handleLike(rev.id)}
                  className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-red-500 transition-colors cursor-pointer group"
                >
                  <Heart size={14} className="group-hover:fill-red-500 transition-all text-gray-400 group-hover:text-red-500" /> 
                  <span>{rev.likes}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Share Modal (Mock popup) */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-5">
          <div className="bg-white rounded-[35px] border border-gray-200 shadow-2xl p-6 sm:p-8 max-w-lg w-full flex flex-col gap-5 pointer-events-auto">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">Share Your Story</h3>
              <button 
                onClick={() => setShowSubmitModal(false)}
                className="text-gray-400 hover:text-gray-900 font-bold text-lg p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="modal-name" className="text-[10px] font-bold text-gray-600 uppercase">Your Name</label>
                  <input 
                    id="modal-name"
                    type="text" 
                    required 
                    placeholder="Jane D."
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-gray-900"
                  />
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="modal-location" className="text-[10px] font-bold text-gray-600 uppercase">Location</label>
                  <input 
                    id="modal-location"
                    type="text" 
                    placeholder="New York, NY"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-gray-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="modal-rating" className="text-[10px] font-bold text-gray-600 uppercase">Star Rating</label>
                  <select 
                    id="modal-rating"
                    value={newRating}
                    onChange={(e) => setNewRating(parseInt(e.target.value))}
                    className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold bg-white focus:outline-none focus:ring-1 focus:ring-gray-900"
                  >
                    <option value={5}>5 Stars (Excellent)</option>
                    <option value={4}>4 Stars (Good)</option>
                    <option value={3}>3 Stars (Average)</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="modal-category" className="text-[10px] font-bold text-gray-600 uppercase">Category Tag</label>
                  <select 
                    id="modal-category"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold bg-white focus:outline-none focus:ring-1 focus:ring-gray-900"
                  >
                    <option value="allergies">Allergy Relief</option>
                    <option value="pets">Pet Owner</option>
                    <option value="urban">Urban Smog</option>
                    <option value="sleep">Quiet Sleep</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="modal-story" className="text-[10px] font-bold text-gray-600 uppercase">Your Story</label>
                <textarea 
                  id="modal-story"
                  rows={4} 
                  required
                  placeholder="How did PureFlow change your space?"
                  value={newStory}
                  onChange={(e) => setNewStory(e.target.value)}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-gray-900 resize-none"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-gray-900 text-white font-bold text-xs uppercase tracking-wider py-4 rounded-xl flex items-center justify-center gap-1.5 hover:bg-gray-800 transition-all cursor-pointer"
              >
                Submit Story
                <Check size={14} />
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

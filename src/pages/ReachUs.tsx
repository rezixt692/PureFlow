import React, { useState, useRef, useEffect } from 'react';
import { usePageTitle } from '../utils/seo';
import { Send, MapPin, Mail, Phone, Clock, MessageSquare, Bot, User } from 'lucide-react';

interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
}

export default function ReachUs() {
  usePageTitle(
    "Contact PureFlow | Reach Us & Live Support",
    "Get in touch with the PureFlow support team, send inquiries, or chat with our live automated assistant for instant solutions."
  );

  // Form states
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formMsg, setFormMsg] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formMsg) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setFormName("");
      setFormEmail("");
      setFormMsg("");
      setFormSubmitted(false);
      alert("Message sent! A support specialist will follow up within 2 hours.");
    }, 1500);
  };

  // Automated Chat states
  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: 'bot', text: "Hello! I am FlowBot, your PureFlow virtual assistant. How can I help you breathe easier today?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const FAQ_RESPONSES: Record<string, string> = {
    "shipping": "We offer free carbon-neutral shipping across North America and Europe. In-stock units are dispatched within 24 hours and typically arrive within 2-3 business days.",
    "filter": "For typical usage, we recommend replacing the H13 HEPA filter core every 6 months. In environments with pets or high smog levels, replacement every 4 months is optimal.",
    "warranty": "Standard purchases include a 2-year warranty on parts and labor. If you sign up for our subscription plan, you get an active lifetime warranty that never expires.",
    "noise": "The PureFlow One utilizes aerodynamically shaped blades running at just 22dB on low. That is quieter than rustling leaves, making it perfect for nightstands."
  };

  const handleAskQuestion = (key: string, label: string) => {
    if (isTyping) return;
    
    // Add user message
    setMessages((prev) => [...prev, { sender: 'user', text: label }]);
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev, 
        { sender: 'bot', text: FAQ_RESPONSES[key] || "I am here to help. Please select one of the core questions below." }
      ]);
    }, 1000);
  };

  // Scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="min-h-screen py-28 sm:py-36 px-5 sm:px-8 max-w-7xl mx-auto w-full pointer-events-auto">
      
      {/* Grid container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
        
        {/* Left Side: Contact details + Form */}
        <div className="lg:col-span-6 flex flex-col justify-between gap-10">
          <div>
            <span className="text-xs font-semibold tracking-[0.2em] text-gray-500 uppercase mb-3 block">Get in Touch</span>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 tracking-tight">Reach Us.</h1>
            <p className="text-gray-700 leading-relaxed">
              Have questions about your order, technical specifications, or bulk commercial options? Send a message directly to our North American engineering facility.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleFormSubmit} className="bg-white/20 backdrop-blur-lg border border-gray-200 rounded-[35px] p-6 sm:p-8 flex flex-col gap-4 shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Send a Message</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name-input" className="text-[10px] font-bold text-gray-600 uppercase tracking-wider">Your Name</label>
                <input 
                  id="name-input"
                  type="text" 
                  required
                  placeholder="John Doe" 
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="px-4 py-3 rounded-2xl border border-gray-200 bg-white/40 focus:outline-none focus:ring-1 focus:ring-gray-900 text-sm font-medium text-gray-900"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email-input" className="text-[10px] font-bold text-gray-600 uppercase tracking-wider">Email Address</label>
                <input 
                  id="email-input"
                  type="email" 
                  required
                  placeholder="john@example.com" 
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  className="px-4 py-3 rounded-2xl border border-gray-200 bg-white/40 focus:outline-none focus:ring-1 focus:ring-gray-900 text-sm font-medium text-gray-900"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="message-input" className="text-[10px] font-bold text-gray-600 uppercase tracking-wider">Message Content</label>
              <textarea 
                id="message-input"
                rows={4}
                required
                placeholder="How can we assist you?"
                value={formMsg}
                onChange={(e) => setFormMsg(e.target.value)}
                className="px-4 py-3 rounded-2xl border border-gray-200 bg-white/40 focus:outline-none focus:ring-1 focus:ring-gray-900 text-sm font-medium text-gray-900 resize-none"
              />
            </div>

            <button 
              type="submit" 
              disabled={formSubmitted}
              className="mt-2 bg-gray-900 text-white font-bold text-xs uppercase tracking-wider py-4 rounded-2xl flex items-center justify-center gap-1.5 hover:bg-gray-800 transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60"
            >
              {formSubmitted ? 'Sending...' : 'Send Message'}
              <Send size={14} />
            </button>
          </form>

          {/* Quick Details Icons */}
          <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-gray-700">
            <div className="flex items-center gap-2.5">
              <MapPin size={18} className="text-gray-900" />
              <div>
                <span className="block text-gray-500 text-[10px] uppercase">Headquarters</span>
                <span className="text-gray-900">San Francisco, CA</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone size={18} className="text-gray-900" />
              <div>
                <span className="block text-gray-500 text-[10px] uppercase">Call Line</span>
                <span className="text-gray-900">+1 (800) 555-0192</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail size={18} className="text-gray-900" />
              <div>
                <span className="block text-gray-500 text-[10px] uppercase">Support Mail</span>
                <span className="text-gray-900">hello@pureflow.tech</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Clock size={18} className="text-gray-900" />
              <div>
                <span className="block text-gray-500 text-[10px] uppercase">Operating Hours</span>
                <span className="text-gray-900">Mon - Fri, 9am - 6pm PST</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Virtual Assistant Chat Dashboard */}
        <div className="lg:col-span-6 bg-white/20 backdrop-blur-lg border border-gray-200 rounded-[35px] shadow-lg flex flex-col justify-between overflow-hidden">
          
          {/* Chat Header */}
          <div className="bg-gray-900 text-white px-6 py-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white border border-white/10 relative">
              <Bot size={20} />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-400 border border-gray-900 animate-pulse" />
            </div>
            <div>
              <h4 className="font-bold text-sm">FlowBot</h4>
              <span className="text-[10px] opacity-75">Automated Support Assistant • Online</span>
            </div>
          </div>

          {/* Message Stream */}
          <div className="flex-1 p-6 space-y-4 overflow-y-auto max-h-[360px] min-h-[300px]">
            {messages.map((m, i) => (
              <div 
                key={i} 
                className={`flex gap-3 max-w-[85%] ${
                  m.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${
                  m.sender === 'user' 
                    ? 'bg-gray-900 text-white border-gray-800' 
                    : 'bg-white text-gray-900 border-gray-200'
                }`}>
                  {m.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
                </div>
                
                <div className={`p-4 rounded-2xl text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-gray-900 text-white rounded-tr-none'
                    : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none shadow-sm'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 max-w-[80%]">
                <div className="w-8 h-8 rounded-full bg-white text-gray-900 border border-gray-200 flex items-center justify-center shrink-0">
                  <Bot size={14} />
                </div>
                <div className="bg-white border border-gray-200 text-gray-500 rounded-2xl rounded-tl-none p-4 text-xs shadow-sm flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick FAQ Selection Board */}
          <div className="p-6 border-t border-gray-200 bg-white/40 flex flex-col gap-3">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
              <MessageSquare size={12} /> Select a topic to ask FlowBot:
            </span>
            
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => handleAskQuestion("shipping", "What is your shipping policy?")}
                className="text-left text-xs font-semibold p-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-all cursor-pointer truncate"
              >
                🚚 Delivery & Shipping
              </button>
              
              <button 
                onClick={() => handleAskQuestion("filter", "How often should I swap filters?")}
                className="text-left text-xs font-semibold p-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-all cursor-pointer truncate"
              >
                🍃 Filter Lifecycles
              </button>
              
              <button 
                onClick={() => handleAskQuestion("warranty", "Explain the device warranty")}
                className="text-left text-xs font-semibold p-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-all cursor-pointer truncate"
              >
                🛡️ Product Warranty
              </button>
              
              <button 
                onClick={() => handleAskQuestion("noise", "How quiet is the device?")}
                className="text-left text-xs font-semibold p-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-all cursor-pointer truncate"
              >
                🤫 Quiet Fan dB Level
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

import React from 'react';
import { ArrowRight } from 'lucide-react';

export const CTASection: React.FC = () => {
  return (
    <div className="footer-cta pt-20 pb-32 bg-[#0a1633] text-center relative z-20">
      <h2 className="text-4xl md:text-5xl font-medium text-white tracking-wider mb-8">
        體驗優質游泳課程
      </h2>
      <button className="inline-flex items-center px-8 py-3 rounded-full border border-white text-white hover:bg-white hover:text-[#0a1633] transition-colors duration-300 text-lg group">
        立即報名 
        <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
      </button>
      
      {/* Curved transition to bottom section */}
      <div className="absolute bottom-0 left-0 w-full h-24 overflow-hidden translate-y-1">
        <svg viewBox="0 0 1440 100" className="w-full h-full" preserveAspectRatio="none">
          <path d="M0,100 C480,100 960,0 1440,0 L1440,100 L0,100 Z" fill="#0072ce"></path>
        </svg>
      </div>
    </div>
  );
};


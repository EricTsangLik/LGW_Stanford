import React from 'react';
import { Phone, Facebook, Instagram } from 'lucide-react';

// Custom WhatsApp Icon since Lucide might not have the brand icon in this version
const WhatsAppIcon = ({ size = 24, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
  </svg>
);

export const Footer: React.FC = () => {
  return (
    <footer className="site-footer relative overflow-hidden">
      {/* Main Footer Content */}
      <div className="footer-main bg-[#0072ce] text-white pb-32 pt-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            
            {/* Column 1 */}
            <div className="space-y-6 border-r border-blue-400/30 md:pr-8">
              <h3 className="text-xl font-medium">報名及查詢</h3>
              <p className="opacity-90 leading-relaxed">
                立即聯絡我們，體驗優質游泳課程，<br />
                並讓我們解答您的所有疑問。
              </p>
              <div className="flex flex-col space-y-2 text-lg">
                <div className="flex items-center gap-2">
                  <Phone size={20} />
                  <span>2267 8866</span>
                </div>
                <div className="flex items-center gap-2">
                  <WhatsAppIcon size={20} />
                  <span>9877 0486</span>
                </div>
              </div>
            </div>

            {/* Column 2 */}
            <div className="space-y-6 border-r border-blue-400/30 md:pr-8 md:pl-8">
              <div className="flex flex-col space-y-4">
                <a href="#" className="hover:opacity-80 transition-opacity">惡劣天氣安排</a>
                <a href="#" className="hover:opacity-80 transition-opacity">家長及學員需知</a>
              </div>
            </div>

            {/* Column 3 */}
            <div className="space-y-6 md:pl-8">
              <div className="flex flex-col space-y-4">
                <a href="#" className="hover:opacity-80 transition-opacity">就業機會</a>
                <a href="#" className="hover:opacity-80 transition-opacity">聯絡我們</a>
              </div>
              <div className="flex gap-4 pt-2">
                <a href="#" className="w-10 h-10 rounded-full border border-white flex items-center justify-center hover:bg-white/10 transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-white flex items-center justify-center hover:bg-white/10 transition-colors">
                  <Instagram size={20} />
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Wave Decoration */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg 
            viewBox="0 0 1440 320" 
            className="w-full h-auto min-h-[200px]" 
            preserveAspectRatio="none"
          >
             {/* Light Blue Wave (Back) */}
            <path 
              fill="#00b4d8" 
              fillOpacity="1" 
              d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
            
            {/* Yellow Wave (Middle) */}
            <path 
              fill="#ffb703" 
              fillOpacity="1" 
              d="M0,320L48,320C96,320,192,320,288,309.3C384,299,480,277,576,266.7C672,256,768,256,864,266.7C960,277,1056,299,1152,298.7C1248,299,1344,277,1392,266.7L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
            
            {/* Orange Wave (Front Right) */}
            <path 
              fill="#fb8500" 
              fillOpacity="1" 
              d="M0,320L120,320C240,320,480,320,720,320C960,320,1200,320,1320,288L1440,256L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
            ></path>
             
             {/* Another Orange/Red Wave to match image precisely */}
             <path 
              fill="#f46036" 
              fillOpacity="1" 
              d="M800,320 C1000,320 1100,250 1440,200 L1440,320 Z"
            ></path>
          </svg>
        </div>
      </div>
    </footer>
  );
};


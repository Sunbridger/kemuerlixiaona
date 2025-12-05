import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CarAnimation } from './components/CarAnimation';
import { TipsCarousel } from './components/TipsCarousel';
import { generateEncouragement } from './services/geminiService';
import { Trophy, RefreshCw, Heart, Sparkles, MapPin, CheckCircle } from 'lucide-react';

interface FloatingText {
  id: number;
  x: number;
  y: number;
  text: string;
}

const App: React.FC = () => {
  const [cheerCount, setCheerCount] = useState(0);
  const [luckLevel, setLuckLevel] = useState(0);
  const [aiMessage, setAiMessage] = useState<string>("正在接收来自外太空的好运信号...");
  const [isLoading, setIsLoading] = useState(false);
  const [floatingTexts, setFloatingTexts] = useState<FloatingText[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Initial load message
  useEffect(() => {
    fetchNewMessage();
  }, []);

  const fetchNewMessage = async () => {
    setIsLoading(true);
    const msg = await generateEncouragement();
    setAiMessage(msg);
    setIsLoading(false);
  };

  const handleCheer = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    // Increment stats
    setCheerCount(prev => prev + 1);
    setLuckLevel(prev => Math.min(prev + 10, 100));

    // Fire confetti
    if (window.confetti) {
      window.confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#3b82f6', '#ef4444', '#facc15', '#ffffff'],
        disableForReducedMotion: true
      });
    }

    // Trigger phone vibration if available
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }

    // Floating text logic
    const phrases = ["稳住!", "必过!", "加油!", "漂亮!", "满分!", "不压线!", "心态好!"];
    const randomText = phrases[Math.floor(Math.random() * phrases.length)];
    
    // Calculate position
    let clientX, clientY;
    if ('touches' in e) {
       clientX = e.touches[0].clientX;
       clientY = e.touches[0].clientY;
    } else {
       clientX = (e as React.MouseEvent).clientX;
       clientY = (e as React.MouseEvent).clientY;
    }

    // Adjust position relative to button center if specific coordinates aren't perfect
    const id = Date.now();
    setFloatingTexts(prev => [...prev, { id, x: clientX, y: clientY, text: randomText }]);

    // Remove after animation
    setTimeout(() => {
      setFloatingTexts(prev => prev.filter(ft => ft.id !== id));
    }, 1000);

  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-20 overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0 opacity-30 pointer-events-none">
         <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-200 rounded-full blur-[100px] animate-pulse"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-200 rounded-full blur-[100px] animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="max-w-md mx-auto min-h-screen flex flex-col relative z-10 bg-white/60 backdrop-blur-sm shadow-2xl">
        
        {/* Header Section */}
        <header className="pt-8 px-6 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl font-cute text-blue-600 drop-shadow-sm mb-1">
              加油，李小娜！
            </h1>
            <p className="text-slate-500 text-xs font-bold tracking-[0.2em] uppercase text-blue-400">
              Subject 2 Final Boss Battle
            </p>
          </motion.div>
        </header>

        {/* Hero Animation */}
        <div className="mt-6">
          <CarAnimation />
        </div>

        {/* Status / Luck Meter */}
        <div className="px-6 mb-6 relative">
          <div className="flex justify-between items-end mb-2">
            <span className="font-bold text-slate-700 flex items-center gap-1.5 text-sm">
              <Sparkles size={16} className="text-yellow-500" /> 
              当前好运值 (Luck Level)
            </span>
            <motion.span 
               key={luckLevel}
               initial={{ scale: 1.5, color: '#3b82f6' }}
               animate={{ scale: 1, color: luckLevel === 100 ? '#22c55e' : '#3b82f6' }}
               className="text-2xl font-black"
            >
              {luckLevel}%
            </motion.span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-5 overflow-hidden border border-white shadow-inner relative">
            <motion.div 
              className="h-full bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500"
              initial={{ width: 0 }}
              animate={{ width: `${luckLevel}%` }}
              transition={{ type: "spring", stiffness: 50, damping: 15 }}
            />
            {/* Gloss effect on bar */}
            <div className="absolute top-0 left-0 w-full h-[50%] bg-white/30 rounded-t-full"></div>
          </div>
          
          {/* PASS Stamp Animation */}
          <AnimatePresence>
            {luckLevel >= 100 && (
              <motion.div 
                initial={{ opacity: 0, scale: 2, rotate: -20 }}
                animate={{ opacity: 1, scale: 1, rotate: -15 }}
                className="absolute top-[-10px] right-2 border-[6px] border-green-500 text-green-500 rounded-lg px-4 py-1 font-black text-4xl shadow-xl bg-white/80 backdrop-blur-sm z-20 pointer-events-none"
              >
                PASS
              </motion.div>
            )}
          </AnimatePresence>
          
          <AnimatePresence>
            {luckLevel >= 100 && (
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-xs text-green-600 font-bold mt-2 flex items-center justify-center gap-1"
              >
                <CheckCircle size={12} /> 欧气已加满！考试必过！💯
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* AI Message Card */}
        <div className="px-4 mb-6">
          <div className="bg-white/80 rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-blue-50 relative group hover:shadow-lg transition-shadow">
            <div className="absolute -top-3 -right-3 bg-gradient-to-br from-yellow-400 to-orange-400 text-white p-2 rounded-full shadow-md transform group-hover:scale-110 transition-transform">
              <Heart fill="white" size={20} />
            </div>
            
            <h3 className="text-indigo-300 text-[10px] font-black uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-ping"></span>
              AI Coach Message
            </h3>
            
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div 
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-16 flex items-center justify-center space-x-2"
                >
                  {[0, 1, 2].map(i => (
                    <motion.span 
                      key={i}
                      className="w-2.5 h-2.5 bg-indigo-300 rounded-full"
                      animate={{ y: [0, -8, 0], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                    />
                  ))}
                </motion.div>
              ) : (
                <motion.p 
                  key="message"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-lg text-slate-700 font-medium leading-relaxed font-cute"
                >
                  “{aiMessage}”
                </motion.p>
              )}
            </AnimatePresence>

            <div className="mt-4 flex justify-end">
              <button 
                onClick={fetchNewMessage}
                disabled={isLoading}
                className="text-xs flex items-center gap-1.5 text-slate-400 hover:text-blue-500 transition-colors py-1 px-2 rounded-lg hover:bg-blue-50"
              >
                <RefreshCw size={12} className={isLoading ? 'animate-spin' : ''} />
                <span>换一句鼓励</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Action Button */}
        <div className="px-6 flex justify-center mb-8 relative">
          {/* Floating Texts Layer */}
          <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            <AnimatePresence>
              {floatingTexts.map(ft => (
                <motion.div
                  key={ft.id}
                  initial={{ opacity: 1, y: ft.y - 20, x: ft.x }}
                  animate={{ opacity: 0, y: ft.y - 150 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="absolute text-2xl font-black text-transparent bg-clip-text bg-gradient-to-t from-blue-600 to-cyan-400 drop-shadow-sm pointer-events-none font-cute whitespace-nowrap"
                  style={{ left: 0, top: 0 }} // Position handled by motion initial
                >
                  {ft.text}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <motion.button
            ref={buttonRef}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCheer}
            className="w-full py-4 bg-gradient-to-r from-blue-500 via-indigo-600 to-blue-500 bg-[length:200%_auto] animate-[gradient_3s_ease-in-out_infinite] text-white rounded-2xl shadow-lg shadow-blue-500/30 flex items-center justify-center gap-3 text-xl font-bold group relative overflow-hidden"
          >
            <Trophy className="group-hover:rotate-12 transition-transform" fill="currentColor" fillOpacity={0.2} />
            <span className="tracking-wide">为小娜加油! ({cheerCount})</span>
          </motion.button>
        </div>

        {/* Tips Carousel */}
        <TipsCarousel />

        {/* Footer Info */}
        <div className="mt-auto pt-10 pb-6 text-center text-slate-400 text-[10px] uppercase tracking-widest">
          <p className="flex items-center justify-center gap-1 opacity-70">
            <MapPin size={10} /> 
            Target: Driver's License Center
          </p>
          <p className="mt-2 opacity-50">Designed with ❤️ for Li Xiaona</p>
        </div>

      </div>
      
      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};

export default App;
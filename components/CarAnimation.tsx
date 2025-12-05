import React from 'react';
import { motion } from 'framer-motion';

const CloudIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size * 0.6} viewBox="0 0 100 60" fill="currentColor">
    <path d="M10,45 Q25,25 40,40 T70,40 T90,45" stroke="none" />
    <circle cx="30" cy="35" r="15" />
    <circle cx="50" cy="25" r="20" />
    <circle cx="75" cy="35" r="18" />
    <rect x="10" y="35" width="80" height="20" rx="10" />
  </svg>
);

export const CarAnimation: React.FC = () => {
  return (
    <div className="relative w-full h-48 overflow-hidden bg-sky-300 rounded-b-[3rem] shadow-[inset_0_-10px_20px_rgba(0,0,0,0.1)] mb-6 border-b-4 border-blue-400 z-0">
      {/* Moving Clouds */}
      <motion.div 
        className="absolute top-4 left-10 text-white opacity-70"
        animate={{ x: [0, 60, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        <CloudIcon size={60} />
      </motion.div>
       <motion.div 
        className="absolute top-10 right-20 text-white opacity-50"
        animate={{ x: [0, -40, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <CloudIcon size={40} />
      </motion.div>

      {/* Sun */}
       <motion.div 
        className="absolute top-4 right-6 w-14 h-14 bg-yellow-300 rounded-full opacity-90 shadow-[0_0_30px_rgba(253,224,71,0.8)]"
        animate={{ scale: [1, 1.15, 1], rotate: 360 }}
        transition={{ scale: { duration: 4, repeat: Infinity }, rotate: { duration: 60, repeat: Infinity, ease: "linear" } }}
      >
        <div className="absolute inset-0 m-auto w-10 h-10 bg-yellow-100 rounded-full blur-sm opacity-60"></div>
      </motion.div>

      {/* Road / Test Course */}
      <div className="absolute bottom-0 w-full h-16 bg-slate-700 flex items-center overflow-hidden border-t-4 border-slate-600">
        {/* Yellow Solid Line (Subject 2 Style) */}
        <div className="absolute top-3 w-full h-1 bg-yellow-400 opacity-90 shadow-[0_0_5px_rgba(250,204,21,0.5)]" />
        
        {/* Moving Environment (Cones/Marks) */}
        <motion.div 
          className="flex space-x-32 absolute bottom-2"
          animate={{ x: [-100, -350] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex flex-col items-center group">
               {/* Traffic Cone */}
               <div className="relative">
                 <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[20px] border-b-orange-500 relative z-10">
                    <div className="absolute top-2.5 -left-[5px] w-[10px] h-[4px] bg-white/90 transform -skew-x-2"></div>
                 </div>
                 <div className="w-8 h-1.5 bg-orange-600 rounded-sm -mt-0.5 z-0"></div>
               </div>
               {/* Shadow */}
               <div className="w-8 h-1 bg-black/30 rounded-full blur-[1px] mt-0.5"></div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Car */}
      <motion.div 
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
        animate={{ 
          y: [0, -1.5, 0.5, -1, 0], 
          rotate: [0, 0.5, -0.5, 0]
        }}
        transition={{ 
          duration: 0.6, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      >
         <div className="relative">
           {/* Car Shadow */}
           <div className="absolute -bottom-2 left-2 w-28 h-3 bg-black/40 rounded-full blur-md" />
           
           {/* Car Body */}
           <div className="w-32 h-14 bg-red-500 rounded-2xl relative z-10 shadow-[inset_0_-4px_8px_rgba(0,0,0,0.2)] border-2 border-red-600 flex items-center justify-center overflow-hidden">
             {/* Glossy Shine */}
             <div className="absolute -top-10 -left-10 w-20 h-40 bg-white/20 rotate-12 blur-sm"></div>
             <span className="text-white font-bold text-xs mt-6 z-20 drop-shadow-md tracking-wider">科二必过</span>
           </div>
           
           {/* Cabin/Window */}
           <div className="absolute -top-7 left-4 w-24 h-10 bg-red-400 rounded-t-2xl z-0 border-2 border-red-500 overflow-hidden">
              <div className="absolute top-1 left-1 w-[88px] h-8 bg-sky-200 rounded-t-xl opacity-90 border-b-4 border-red-500 overflow-hidden">
                 {/* Driver Silhouette (Xiaona) */}
                 <div className="absolute bottom-0 left-6 w-8 h-7 bg-indigo-900/20 rounded-t-full"></div>
                 <div className="absolute top-1 right-2 w-10 h-10 bg-white/40 skew-x-12 blur-md"></div>
              </div>
           </div>
           
           {/* Lights */}
           <div className="absolute top-4 right-0.5 w-1.5 h-5 bg-yellow-200 rounded-l-sm blur-[0.5px] z-20 opacity-80"></div>
           <div className="absolute top-4 left-0.5 w-1.5 h-5 bg-red-800 rounded-r-sm z-20"></div>

           {/* Wheels */}
           <div className="absolute -bottom-3 left-4 w-9 h-9 z-20">
             <motion.div 
               className="w-full h-full bg-slate-800 rounded-full border-[3px] border-slate-300 flex items-center justify-center shadow-md"
               animate={{ rotate: 360 }}
               transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
             >
                <div className="w-5 h-5 border-2 border-slate-500 rounded-full border-dashed opacity-50"></div>
             </motion.div>
           </div>
           <div className="absolute -bottom-3 right-4 w-9 h-9 z-20">
             <motion.div 
               className="w-full h-full bg-slate-800 rounded-full border-[3px] border-slate-300 flex items-center justify-center shadow-md"
               animate={{ rotate: 360 }}
               transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
             >
                <div className="w-5 h-5 border-2 border-slate-500 rounded-full border-dashed opacity-50"></div>
             </motion.div>
           </div>
         </div>
      </motion.div>
    </div>
  );
};
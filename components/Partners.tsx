import React, { useState } from 'react';

const Partners: React.FC = () => {
  const partners = [
    "TechCorp", "InnovateLogic", "DataFlow", "NeuralNet", "AutoSystem", "FutureScale", "OpsElite", "NextGen"
  ];

  const [offset, setOffset] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, currentTarget } = e;
    const { width, left } = currentTarget.getBoundingClientRect();
    // Calculate position relative to center (-0.5 to 0.5)
    const xPct = (clientX - left) / width - 0.5;
    // Move slightly opposite to mouse (parallax feel), max ~30px shift
    setOffset(xPct * 30);
  };

  const handleMouseLeave = () => {
    setOffset(0);
  };

  return (
    <div 
      className="w-full bg-black py-12 border-y border-zinc-900 overflow-hidden relative group"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
        <div className="max-w-7xl mx-auto px-4 mb-6 relative z-10 pointer-events-none">
            <p className="text-center text-xs font-mono text-zinc-500 uppercase tracking-[0.3em]">Empresas que escalaram com o Fluxo Invisível™</p>
        </div>
      
      {/* Parallax Wrapper Container */}
      <div 
        className="relative flex overflow-x-hidden transition-transform duration-500 ease-out will-change-transform"
        style={{ transform: `translateX(${-offset}px)` }}
      >
        {/* Infinite Scroll Track - Pauses on Parent Group Hover */}
        <div className="animate-scroll whitespace-nowrap flex gap-24 py-4 group-hover:[animation-play-state:paused]">
          {/* Triple the list to ensure smooth infinite loop */}
          {[...partners, ...partners, ...partners].map((partner, index) => (
            <span
              key={index}
              className="text-3xl font-black text-zinc-800 uppercase tracking-tighter hover:text-zinc-500 transition-all duration-300 cursor-default select-none hover:scale-105"
            >
              {partner}
            </span>
          ))}
        </div>
      </div>

        {/* Gradient fades on sides */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>
    </div>
  );
};

export default Partners;
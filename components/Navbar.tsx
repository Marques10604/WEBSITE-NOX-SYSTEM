import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Radio, Wallet, ArrowRight } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 top-0 left-0 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Left Side: Logo + Nav Links (DEX Style) */}
          <div className="flex items-center gap-10">
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer select-none group">
              <div className="w-10 h-10 bg-zinc-900 rounded-xl border border-zinc-700 flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.05)] group-hover:border-zinc-500 transition-colors">
                  <Radio className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col justify-center">
                  <span className="text-lg font-black tracking-wider text-white leading-none">
                  NOX
                  </span>
                  <span className="text-[0.6rem] font-bold tracking-[0.2em] text-zinc-500 uppercase leading-none mt-1 group-hover:text-zinc-300 transition-colors">
                  SYSTEMS
                  </span>
              </div>
            </div>

            {/* Desktop Links - Simple Text Links like "DCA", "Markets" */}
            <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-zinc-400">
              <a href="#solucoes" className="hover:text-white transition-colors">Soluções</a>
              <a href="#produtos" className="hover:text-white transition-colors">Produtos</a>
              <a href="#portfolio" className="hover:text-white transition-colors">Portfolio</a>
              <a href="#referrals" className="hover:text-white transition-colors flex items-center gap-1">
                Insights <span className="bg-white/10 text-zinc-200 text-[10px] px-1.5 py-0.5 rounded ml-1 border border-zinc-700">NEW</span>
              </a>
            </div>
          </div>

          {/* Right Side: "Connect" Style Button */}
          <div className="hidden md:flex items-center gap-4">
             {/* Language Switcher */}
             <div className="flex items-center gap-1 bg-zinc-900/50 border border-zinc-800 rounded-full p-1 h-10">
                <button className="w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-black bg-white text-black transition-all shadow-sm">
                    PT
                </button>
                <button className="w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-black text-zinc-500 hover:text-white transition-all">
                    EN
                </button>
             </div>

            <button className="bg-white text-black hover:bg-zinc-200 px-6 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] flex items-center gap-2 group">
              <span>Diagnóstico</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-zinc-300 hover:text-white p-2"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-zinc-950 border-t border-zinc-800 absolute w-full left-0">
          <div className="px-4 pt-4 pb-6 space-y-4">
            <a href="#solucoes" className="block py-2 text-zinc-400 hover:text-white font-medium">Soluções</a>
            <a href="#produtos" className="block py-2 text-zinc-400 hover:text-white font-medium">Produtos</a>
            <a href="#portfolio" className="block py-2 text-zinc-400 hover:text-white font-medium">Portfolio</a>
            <a href="#sobre" className="block py-2 text-zinc-400 hover:text-white font-medium">Sobre</a>
            <button className="w-full mt-2 bg-white text-black py-3 rounded-xl font-bold">
              Iniciar Diagnóstico
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
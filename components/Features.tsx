import React, { useState, useEffect } from 'react';
import { Cpu, Smartphone, Zap, ArrowRight, Layout, Database } from 'lucide-react';

const Features: React.FC = () => {
  return (
    <section className="py-24 bg-zinc-950 relative overflow-hidden">
        {/* Background circuit lines decoration - White/Silver Tint */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
            style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #ffffff 1px, transparent 0)', backgroundSize: '40px 40px' }}>
        </div>
        
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-zinc-800/20 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-zinc-400 font-mono text-xs tracking-widest uppercase border border-zinc-800 px-3 py-1 rounded-full bg-zinc-900">Por que NOX Systems?</span>
          <h2 className="mt-6 text-4xl md:text-6xl font-black text-white tracking-tighter uppercase">
            Automação <span className="text-zinc-600">sem Limites.</span>
          </h2>
          <p className="mt-6 text-zinc-400 text-lg leading-relaxed">
            Quando o processo está claro, a automação escala.
            <br className="hidden md:block" />
            Quando não está, a gente começa organizando.
          </p>
        </div>

        {/* The 3 + 1 Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Feature 1 */}
          <div className="bg-zinc-900/40 p-10 rounded-xl border border-zinc-800 hover:border-zinc-500 hover:bg-zinc-900/60 transition-all duration-300 group backdrop-blur-sm">
            <div className="w-14 h-14 bg-zinc-800/50 rounded-lg flex items-center justify-center mb-8 group-hover:bg-zinc-800 transition-colors border border-zinc-700 group-hover:border-white/50">
              <Database className="w-6 h-6 text-zinc-300 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-wide">Integração Perfeita</h3>
            <p className="text-zinc-400 leading-relaxed font-light">
              Interfaces abertas e tecnologia de plataforma 100% proprietária. 
              Conectamos seu ERP, CRM e Whatsapp em um único sistema nervoso central.
              <span className="block mt-4 font-semibold text-zinc-200 uppercase text-[10px] tracking-widest">Sem retrabalho. Sem redigitação. Sem dados soltos.</span>
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-zinc-900/40 p-10 rounded-xl border border-zinc-800 hover:border-zinc-500 hover:bg-zinc-900/60 transition-all duration-300 group backdrop-blur-sm">
            <div className="w-14 h-14 bg-zinc-800/50 rounded-lg flex items-center justify-center mb-8 group-hover:bg-zinc-800 transition-colors border border-zinc-700 group-hover:border-white/50">
              <Zap className="w-6 h-6 text-zinc-300 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-wide">Escalabilidade Ilimitada</h3>
            <p className="text-zinc-400 leading-relaxed font-light">
              Sistemas de segurança e operação que crescem com suas necessidades.
              Modular, expansível e pronto para o dia de amanhã.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-zinc-900/40 p-10 rounded-xl border border-zinc-800 hover:border-zinc-500 hover:bg-zinc-900/60 transition-all duration-300 group backdrop-blur-sm">
            <div className="w-14 h-14 bg-zinc-800/50 rounded-lg flex items-center justify-center mb-8 group-hover:bg-zinc-800 transition-colors border border-zinc-700 group-hover:border-white/50">
              <Cpu className="w-6 h-6 text-zinc-300 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-wide">IA Operacional de Elite</h3>
            <p className="text-zinc-400 leading-relaxed font-light">
              Nossas soluções são certificadas nas classes de segurança mais altas. 
              A NOX transforma dados em ação estratégica que <span className="font-bold text-zinc-200">resolve gargalos reais, não promessas.</span>
            </p>
          </div>

          {/* Feature 4 - The White/Metallic Call to Action Card */}
          <div className="bg-zinc-100 p-10 rounded-xl flex flex-col justify-between shadow-2xl relative overflow-hidden group border border-zinc-200">
             {/* Metallic shine effect */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white to-zinc-300 opacity-50 rounded-full -mr-20 -mt-20 blur-3xl pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="w-14 h-14 bg-black/5 rounded-lg flex items-center justify-center mb-8 border border-black/10">
                <Layout className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-3xl font-black text-zinc-900 mb-4 uppercase italic">
                Realize sua próxima solução conosco!
              </h3>
              <p className="text-zinc-600 mb-8 font-medium">
                Elimine gargalos operacionais e restaure a velocidade do seu negócio.
              </p>
            </div>

            <button className="flex items-center gap-3 text-zinc-900 font-bold uppercase tracking-widest text-sm transition-all duration-300 group-hover:gap-4 group-hover:translate-x-[5px]">
              Entre em Contato <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Features;
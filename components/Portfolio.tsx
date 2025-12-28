import React from 'react';
import { ArrowRight, GitMerge, Zap, Layers } from 'lucide-react';

const Portfolio: React.FC = () => {
  const architectures = [
    {
      title: "Sistema de Resposta Operacional",
      description: "Arquitetura projetada para reduzir tempo de resposta, organizar entradas e priorizar demandas sem dependência humana contínua.",
      // Image: Speed, Light trails, Data processing fast
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop", 
      icon: <Zap className="w-5 h-5 text-zinc-400 mb-4 group-hover:text-white transition-colors" />
    },
    {
      title: "Sistema de Qualificação e Roteamento",
      description: "Sistema responsável por classificar, filtrar e direcionar solicitações, leads ou demandas com base em regras, contexto e critérios operacionais.",
      // Image: Circuit board, paths, logic, connections
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop",
      icon: <GitMerge className="w-5 h-5 text-zinc-400 mb-4 group-hover:text-white transition-colors" />
    },
    {
      title: "Camada de Orquestração Operacional",
      description: "Infraestrutura lógica que coordena agentes, humanos e sistemas em fluxos recorrentes, garantindo estabilidade, rastreabilidade e autonomia operacional.",
      // Image: Global network, structure, interconnected nodes, layer view
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
      icon: <Layers className="w-5 h-5 text-zinc-400 mb-4 group-hover:text-white transition-colors" />
    }
  ];

  return (
    <section id="portfolio" className="py-24 bg-zinc-950 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-20 max-w-4xl">
            <span className="text-zinc-500 text-xs font-bold uppercase tracking-[0.2em] border border-zinc-800 px-3 py-1 rounded-full bg-zinc-900/50">Capacidades Técnicas</span>
            
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mt-8 uppercase tracking-tight">
                Arquiteturas <span className="text-zinc-600">Operacionais NOX</span>
            </h2>
            
            <h3 className="text-xl text-zinc-300 mt-6 font-medium border-l-2 border-emerald-500 pl-6 max-w-2xl leading-relaxed">
                A NOX trabalha em camadas porque automação sem controle vira caos.
                <br />
                <span className="text-zinc-400">Começamos com um ponto crítico. O resto vem depois.</span>
            </h3>

            <p className="mt-8 text-zinc-500 text-sm leading-relaxed max-w-3xl">
                A NOX Systems projeta arquiteturas operacionais focadas em processos críticos, onde a dependência humana gera gargalos, erros recorrentes e perda de previsibilidade.
                Em vez de expor clientes, apresentamos os tipos de sistemas que desenvolvemos para viabilizar automação agentiva de forma segura e escalável.
            </p>
        </div>

        {/* Architecture Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {architectures.map((arch, idx) => (
            <div key={idx} className="relative h-[450px] rounded-sm overflow-hidden group border border-zinc-800 bg-zinc-900">
              
              {/* Background Image (Abstract/Technical) */}
              <img 
                src={arch.image} 
                alt={arch.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3000ms] ease-out group-hover:scale-110 group-hover:translate-x-2 group-hover:-translate-y-2 opacity-40 group-hover:opacity-30 grayscale mix-blend-screen"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-zinc-950/90 to-zinc-950/10"></div>
              
              {/* Card Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="transform md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    {arch.icon}
                    
                    <h3 className="text-white font-bold text-lg mb-3 uppercase tracking-wide leading-tight">
                        {arch.title}
                    </h3>
                    
                    <div className="
                        text-zinc-400 text-xs leading-relaxed border-l border-zinc-700 pl-3
                        transition-all duration-500 ease-out
                        opacity-100 max-h-40 mb-6
                        md:opacity-0 md:max-h-0 md:mb-0
                        md:group-hover:opacity-100 md:group-hover:max-h-40 md:group-hover:mb-6
                    ">
                        {arch.description}
                    </div>
                    
                    <div className="flex justify-start">
                        <div className="w-10 h-10 rounded-sm border border-zinc-700 flex items-center justify-center text-zinc-500 group-hover:bg-white group-hover:text-black group-hover:border-white transition-all">
                            <ArrowRight size={16} />
                        </div>
                    </div>
                </div>
              </div>

              {/* Top Border Accent */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-700 to-transparent opacity-50"></div>
            </div>
          ))}
        </div>

        {/* Authority Footer */}
        <div className="mt-20 pt-10 border-t border-zinc-900 flex justify-center">
            <p className="text-center text-zinc-500 font-mono text-xs uppercase tracking-wider max-w-xl leading-relaxed">
                Cada arquitetura é projetada conforme a maturidade operacional da empresa.<br/>
                <span className="text-zinc-300 font-bold">Não entregamos pacotes prontos. Projetamos fluxo.</span>
            </p>
        </div>

      </div>
    </section>
  );
};

export default Portfolio;
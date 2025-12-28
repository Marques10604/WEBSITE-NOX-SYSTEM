import React from 'react';

const UseCases: React.FC = () => {
  const cases = [
    {
      title: "Agentes de WhatsApp",
      description: "Não apenas responda. Venda, agende e suporte 24/7 com contexto infinito e memória de cliente.",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop"
    },
    {
      title: "UI Design & Dashboards",
      description: "Transformamos dados brutos em painéis de controle visuais. Veja sua empresa em tempo real.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "IA para Apps (SaaS)",
      description: "Integração nativa de inteligência artificial em seu produto. Diferenciação competitiva imediata.",
      image: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  return (
    <section className="py-24 bg-zinc-900 border-t border-zinc-800 text-zinc-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center md:text-left border-b border-zinc-800 pb-8">
          <span className="text-zinc-500 font-mono font-medium uppercase tracking-widest text-xs">NOX Systems na Prática</span>
          <h2 className="mt-4 text-5xl font-black text-white tracking-tighter uppercase">Casos de Uso</h2>
          <p className="mt-4 text-zinc-400 font-medium max-w-xl leading-relaxed text-lg">
            Não automatizamos tudo.
            <br />
            <span className="text-zinc-200">Automatizamos o que gera impacto real.</span>
          </p>
          
          <div className="mt-6 flex items-center gap-3">
            <div className="h-px w-8 bg-zinc-700"></div>
            <p className="text-zinc-500 text-[10px] md:text-xs font-mono uppercase tracking-[0.2em]">
               Cada caso começa com um <span className="text-zinc-300">gargalo claro</span>. Não com uma ferramenta.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {cases.map((item, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="overflow-hidden rounded-sm mb-8 relative aspect-[4/3] border border-zinc-800">
                <div className="absolute inset-0 bg-zinc-800/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 mix-blend-overlay"></div>
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0"
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-zinc-300 transition-colors">{item.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed border-l-2 border-zinc-700 pl-4 group-hover:border-white transition-colors">
                {item.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-20 text-center">
             <p className="text-zinc-600 text-xs font-mono uppercase tracking-widest">Parceiros experientes para projetos exigentes.</p>
        </div>
      </div>
    </section>
  );
};

export default UseCases;
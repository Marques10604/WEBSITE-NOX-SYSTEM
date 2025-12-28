import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronRight, Activity, Cpu, ShieldCheck, RefreshCw, BarChart3, Lock, CheckCircle2, Bot, Terminal, Loader2, Check, Send, MessageSquare, Mail } from 'lucide-react';

// --- Types & Data Structures ---

type Step = {
  id: number;
  question: string;
  options: string[] | { label: string; value: string; group?: string }[];
  type?: 'simple' | 'grouped';
};

const SECTOR_FUNCTIONS: Record<string, string[]> = {
  "Comercial / Vendas": ["Prospecção e qualificação", "Conversas via WhatsApp / CRM", "Follow-up", "Fechamento de propostas"],
  "Marketing / Geração de demanda": ["Anúncios / Tráfego", "Nutrição de Leads", "SEO / Conteúdo", "Planejamento de Campanhas"],
  "Atendimento ao cliente (Front-office)": ["Triagem Inicial", "FAQ / Dúvidas Recorrentes", "Suporte Técnico", "Pós-venda / CS"],
  "Operações / Execução": ["Gestão de Projetos", "Entrega de Serviço", "Controle de Qualidade", "Logística / Fulfillment"],
  "Financeiro / Cobrança": ["Faturamento", "Conciliação Bancária", "Cobrança de Inadimplentes", "Contas a Pagar"],
  "Back-office / Processos internos": ["RH / Departamento Pessoal", "Gestão de Compras", "Arquivamento / Documentos", "TI / Infraestrutura"],
  "Gestão / Decisão / Controle": ["Análise de KPIs", "Planejamento Estratégico", "Gestão de Riscos", "Auditoria"]
};

const SIMULATOR_STEPS: Step[] = [
  {
    id: 1,
    question: "EM QUAL SETOR DA SUA OPERAÇÃO ESTÁ O PRINCIPAL GARGALO HOJE?",
    type: 'simple',
    options: [
      "Comercial / Vendas",
      "Marketing / Geração de demanda",
      "Atendimento ao cliente (Front-office)",
      "Operações / Execução",
      "Financeiro / Cobrança",
      "Back-office / Processos internos",
      "Gestão / Decisão / Controle"
    ]
  },
  {
    id: 2,
    question: "ONDE ESSE PROBLEMA ACONTECE COM MAIS FREQUÊNCIA?",
    type: 'simple',
    options: [] // Dynamic based on Step 1
  },
  {
    id: 3,
    question: "QUAL GARGALO VOCÊ QUER ELIMINAR PRIMEIRO?",
    type: 'simple',
    options: [
      "Perda de tempo operacional",
      "Lentidão nas respostas",
      "Dependência excessiva do dono",
      "Falhas recorrentes no processo",
      "Perda de receita invisível",
      "Sobrecarga da equipe"
    ]
  },
  {
    id: 4,
    question: "COM QUE FREQUÊNCIA ESSE PROBLEMA OCORRE?",
    type: 'simple',
    options: [
      "Todos os dias (crítico)",
      "Toda semana (recorrente)",
      "Esporádico / sazonal",
      "Apenas em picos de crescimento"
    ]
  },
  {
    id: 5,
    question: "NÍVEL ATUAL DA OPERAÇÃO NESTE PONTO:",
    type: 'simple',
    options: [
      "Manual (depende de pessoas)",
      "Semi-automatizado (ferramentas soltas)",
      "Automatizado (mas frágil)",
      "Autônomo (pouca dependência humana)"
    ]
  },
  {
    id: 6,
    question: "O QUE VOCÊ ESPERA GANHAR AO RESOLVER ISSO?",
    type: 'simple',
    options: [
      "Reduzir horas manuais por semana",
      "Acelerar tempo de resposta",
      "Parar de apagar incêndio",
      "Tirar o dono do operacional",
      "Evitar erros repetidos",
      "Ter visão clara da operação"
    ]
  }
];

const AGENT_MAPPING: Record<string, string[]> = {
  "Financeiro": ["Revenue Leakage Agent", "Billing Orchestrator", "Reconciliation Bot"],
  "Vendas": ["Lead Intelligence Agent", "Proposal Generator", "Contract Sentinel"],
  "Operações": ["Project Orchestrator", "Resource Allocator", "Deadline Watchdog"],
  "Suporte": ["Ticket Router Agent", "Contextual Auto-Responder", "Customer Sentiment AI"],
  "Gestão": ["Risk Analyzer Agent", "Approval Flow Bot", "Executive Dashboard AI"]
};

// --- Component ---

const Hero: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [selectingOption, setSelectingOption] = useState<string | null>(null);

  const [contactFormStep, setContactFormStep] = useState<'idle' | 'input' | 'submitting' | 'success' | 'sent'>('input');
  const [contactData, setContactData] = useState({ name: '', contact: '', method: 'whatsapp', company_name: '' });

  const getSelectedZone = (): string => {
    const sector = answers[1] || "";
    if (sector.includes("Financeiro")) return "Financeiro";
    if (sector.includes("Vendas") || sector.includes("Marketing")) return "Vendas";
    if (sector.includes("Atendimento")) return "Suporte";
    if (sector.includes("Gestão")) return "Gestão";
    return "Operações";
  };

  // --- SCORING ENGINE (Weighted Scoring) ---
  const calculateAutonomyScore = () => {
    let maturityVal = 0;
    let frequencyVal = 0;
    let gargaloVal = 100;
    let resultVal = 100;

    const maturity = answers[5];
    if (maturity?.includes("Manual")) maturityVal = 20;
    else if (maturity?.includes("Semi-automatizado")) maturityVal = 50;
    else if (maturity?.includes("Automatizado")) maturityVal = 80;
    else if (maturity?.includes("Autônomo")) maturityVal = 100;

    const frequency = answers[4];
    if (frequency?.includes("Todos os dias")) frequencyVal = 100;
    else if (frequency?.includes("Toda semana")) frequencyVal = 70;
    else if (frequency?.includes("Esporádico")) frequencyVal = 40;
    else if (frequency?.includes("picos")) frequencyVal = 30;

    const finalScore = (maturityVal * 0.35) + (frequencyVal * 0.30) + (gargaloVal * 0.20) + (resultVal * 0.15);
    return Math.round(finalScore);
  };

  const getDiagnosisContent = (score: number) => {
    const zone = getSelectedZone();
    const func = answers[2] || "seu processo";

    if (score <= 40) {
      return {
        tier: 'low',
        color: 'text-red-500',
        bg: 'bg-red-500',
        title: "PRONTIDÃO INICIAL",
        text: `Com base nas respostas informadas, sua operação de ${zone} apresenta pontos críticos que requerem padronização imediata. Antes de automatizar, é necessário isolar o gargalo em ${func} para evitar a replicação de ineficiências em escala.`,
        cta: "Receber diagnóstico completo com validação humana e ajuste fino da arquitetura",
        botMessage: "O score indica que o foco deve ser a estabilização do fluxo em primeiro lugar. A automação entra como camada de suporte e não de substituição total nesta fase.",
        supportType: "Padronização + Agentes Supervisionados"
      };
    } else if (score <= 70) {
      return {
        tier: 'mid',
        color: 'text-yellow-500',
        bg: 'bg-yellow-500',
        title: "PRONTIDÃO PARCIAL",
        text: `Com base nas respostas informadas, sua operação de ${zone} apresenta maturidade operacional suficiente para automação em fluxos recorrentes, especialmente onde há repetição, triagem e encaminhamento técnico em ${func}. A automação recomendada foca em reduzir carga manual sem comprometer controle operacional.`,
        cta: "Receber diagnóstico completo com validação humana e ajuste fino da arquitetura",
        botMessage: "Sua estrutura permite a implementação de agentes para aliviar decisões repetitivas. O ponto de partida deve ser o gargalo mais caro da operação.",
        supportType: "Otimização + Automação Parcial"
      };
    } else {
      return {
        tier: 'high',
        color: 'text-emerald-500',
        bg: 'bg-emerald-500',
        title: "ALTA PRONTIDÃO",
        text: `Com base nas respostas informadas, sua operação de ${zone} está madura para automação autônoma avançada em ${func}. A infraestrutura atual permite integrar agentes que operam com alta previsibilidade, convertendo tarefas manuais de alto volume em fluxos estáveis e escaláveis.`,
        cta: "Receber diagnóstico completo com validação humana e ajuste fino da arquitetura",
        botMessage: "Seu cenário é ideal para arquitetura de orquestração. O foco é a autonomia total onde a lógica de negócio já está consolidada.",
        supportType: "Automação Autônoma + Integração Total"
      };
    }
  };

  const handleOptionClick = (option: string) => {
    if (selectingOption) return;
    setSelectingOption(option);
    
    setTimeout(() => {
      setAnswers(prev => ({ ...prev, [currentStep]: option }));
      setSelectingOption(null);
      
      if (currentStep < 6) {
        setCurrentStep(prev => prev + 1);
      } else {
        finishSimulation();
      }
    }, 550);
  };

  const finishSimulation = () => {
    setIsAnalyzing(true);
    const lines = [
      "MAPPING FRICTION ZONES...",
      "CALCULATING AUTONOMY SCORE...",
      "VERIFYING MATURITY VECTORS...",
      "GENERATING ROI PREDICTION...",
      "COMPILING REPORT..."
    ];
    
    let delay = 0;
    lines.forEach((line) => {
      setTimeout(() => {
        setTerminalLines(prev => [...prev, line]);
      }, delay);
      delay += 600;
    });

    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 3500);
  };

  const resetSimulator = () => {
    setCurrentStep(1);
    setAnswers({});
    setShowResults(false);
    setTerminalLines([]);
    setContactFormStep('input');
    setContactData({ name: '', contact: '', method: 'whatsapp', company_name: '' });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactFormStep('submitting');
    
    // Stage 1: Loading/Submitting
    setTimeout(() => {
      setContactFormStep('success');
      
      // Stage 2: Success Checkmark Visible (User sees a clear validation)
      setTimeout(() => {
        setContactFormStep('sent');
      }, 1200);
    }, 1500);
  };

  // --- Render Functions ---

  const renderProgressBar = () => (
    <div className="w-full flex items-center justify-between mb-8 pt-2 px-1">
      <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest flex items-center gap-2">
         <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
         SEQ_STEP: 0{currentStep} / 06
      </div>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5, 6].map(step => (
          <div 
            key={step} 
            className={`h-1 w-6 rounded-none transition-all duration-300 ${step <= currentStep ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]' : 'bg-zinc-800'}`}
          />
        ))}
      </div>
    </div>
  );

  const renderStep = () => {
    let stepData = SIMULATOR_STEPS.find(s => s.id === currentStep);
    if (!stepData) return null;

    let options = stepData.options;
    if (currentStep === 2) {
      const selectedSector = answers[1];
      options = SECTOR_FUNCTIONS[selectedSector] || [];
    }

    return (
      <div className="animate-in fade-in slide-in-from-right-8 duration-500 h-full flex flex-col">
        <h3 className="text-lg font-bold text-white mb-6 font-mono border-l-2 border-white pl-4 leading-tight uppercase tracking-tight">
          {stepData.question}
        </h3>

        <div className="flex flex-col gap-3 overflow-y-auto pr-2 custom-scrollbar">
          {options.map((opt, idx) => {
            const label = typeof opt === 'string' ? opt : opt.label;
            const subLabel = typeof opt === 'object' && opt.group ? opt.group : null;
            const letter = String.fromCharCode(65 + idx);
            const isSelected = selectingOption === label;
            const isOtherSelected = selectingOption !== null && !isSelected;
            
            return (
              <button
                key={idx}
                onClick={() => handleOptionClick(label)}
                disabled={selectingOption !== null}
                className={`group relative flex items-stretch w-full text-left transition-all duration-300 ${
                  isOtherSelected ? 'opacity-30 grayscale blur-[0.5px]' : 'opacity-100'
                } ${
                  isSelected 
                    ? 'shadow-[0_0_25px_rgba(255,255,255,0.15)] z-20' 
                    : 'hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]'
                }`}
              >
                <div className={`w-1 shrink-0 transition-all duration-300 ${
                  isSelected ? 'bg-white shadow-[0_0_10px_white]' : 'bg-zinc-800 group-hover:bg-zinc-500'
                }`}></div>

                <div className="relative flex-1 flex items-center p-4 border border-l-0 overflow-hidden transition-colors duration-300 bg-black/40 border-zinc-800 group-hover:border-zinc-600 group-hover:bg-zinc-900/30">
                    <div className={`absolute inset-0 bg-zinc-800/80 z-0 transition-transform duration-500 origin-left ease-out ${
                        isSelected ? 'scale-x-100' : 'scale-x-0'
                    }`}></div>
                    
                    <div className="relative z-10 w-full flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <span className={`font-mono text-xs transition-colors duration-300 ${
                              isSelected ? 'text-white font-bold' : 'text-zinc-600 group-hover:text-zinc-400'
                            }`}>
                                [{letter}]
                            </span>
                            
                            <div className="flex flex-col">
                                {subLabel && (
                                <span className={`text-[9px] font-bold uppercase tracking-widest mb-0.5 transition-colors duration-300 ${
                                  isSelected ? 'text-zinc-400' : 'text-zinc-600 group-hover:text-zinc-500'
                                }`}>
                                    {subLabel}
                                </span>
                                )}
                                <span className={`text-xs font-medium uppercase tracking-wide transition-colors duration-300 leading-tight ${
                                  isSelected ? 'text-white translate-x-1' : 'text-zinc-300 group-hover:text-white'
                                }`}>
                                {label}
                                </span>
                            </div>
                        </div>

                        <div className="ml-2 shrink-0">
                          {isSelected ? (
                            <Check className="w-4 h-4 text-white animate-in zoom-in duration-300 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
                          ) : (
                            <ChevronRight className="w-3 h-3 text-zinc-700 group-hover:text-zinc-400 transition-all group-hover:translate-x-1" />
                          )}
                        </div>
                    </div>
                </div>

                <div className={`absolute top-0 right-0 w-2 h-2 border-t border-r transition-colors duration-300 pointer-events-none ${
                    isSelected ? 'border-white' : 'border-transparent group-hover:border-zinc-500'
                }`}></div>
                <div className={`absolute bottom-0 left-1 w-2 h-2 border-b border-l transition-colors duration-300 pointer-events-none ${
                    isSelected ? 'border-white' : 'border-transparent group-hover:border-zinc-500'
                }`}></div>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const renderAnalyzing = () => (
    <div className="flex flex-col items-start justify-center h-full min-h-[400px] p-6 font-mono text-xs bg-black/80">
        {terminalLines.map((line, i) => (
            <div key={i} className="text-zinc-300 mb-3 flex items-center gap-3 animate-in slide-in-from-left-2 duration-300">
                <span className="text-zinc-700 select-none">[{new Date().toLocaleTimeString()}]</span>
                <span className="text-emerald-500 select-none">root@nox:~$</span>
                <span className="animate-pulse text-zinc-100">{line}</span>
            </div>
        ))}
        <div className="mt-6 flex items-center gap-3 text-white pl-1">
            <Loader2 className="w-4 h-4 animate-spin text-emerald-500" />
            <span className="animate-pulse tracking-widest text-zinc-400">CALCULATING_VECTORS...</span>
        </div>
    </div>
  );

  const renderResults = () => {
    const score = calculateAutonomyScore();
    const diagnosis = getDiagnosisContent(score);
    const sector = answers[1];
    const func = answers[2];
    const bottleneck = answers[3];
    const recommendedAgents = AGENT_MAPPING[getSelectedZone()] || AGENT_MAPPING["Operações"];

    const getImpacts = (b: string) => {
      if (b?.includes("Lentidão")) return [
        "Redução do tempo de resposta em fluxos repetitivos",
        "Menos retrabalho manual na triagem e encaminhamento",
        "Atendimento contínuo sem aumento de equipe",
        "Maior previsibilidade do fluxo de atendimento"
      ];
      if (b?.includes("Dependência")) return [
        "Menos decisões operacionais centralizadas no dono",
        "Padronização de critérios e respostas",
        "Redução de interrupções no dia a dia",
        "Maior controle sobre exceções reais"
      ];
      if (b?.includes("Falhas")) return [
        "Redução de erros operacionais repetidos",
        "Padronização de execução entre pessoas e turnos",
        "Menos retrabalho e correções manuais",
        "Maior rastreabilidade do processo"
      ];
      return [ // Fallback for "Perda de tempo", "Sobrecarga", "Perda de receita"
        "Redução de tarefas manuais de baixo valor",
        "Liberação da equipe para atividades críticas",
        "Menos dependência de pessoas específicas",
        "Fluxos mais previsíveis e controláveis"
      ];
    };

    return (
      <div className="animate-in zoom-in-95 duration-500 h-full flex flex-col relative">
        <div className="flex justify-between items-end mb-4 border-b border-zinc-800 pb-3">
          <div>
             <span className={`${diagnosis.color} font-mono text-[10px] tracking-widest uppercase mb-1 flex items-center gap-2`}>
                <span className={`w-1.5 h-1.5 ${diagnosis.bg} rounded-full animate-pulse`}></span>
                STATUS: COMPLETED
             </span>
             <h3 className="text-lg font-bold text-white uppercase tracking-tight">DIAGNÓSTICO_FINAL</h3>
          </div>
          <div className="text-right">
             <div className="text-3xl font-black font-mono text-white tracking-tighter">{score}<span className="text-base text-zinc-600">/100</span></div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-6">
            
            <div className="bg-zinc-900/30 border border-zinc-800 p-4 relative overflow-hidden">
                 <div className={`absolute top-0 left-0 w-1 h-full ${diagnosis.bg}`}></div>
                <div className="font-mono text-[10px] text-zinc-500 mb-2 uppercase tracking-widest">/// RESUMO_ANALITICO</div>
                <p className="text-zinc-200 text-sm leading-relaxed font-light mb-1">
                    {diagnosis.text}
                </p>
                <div className="grid grid-cols-2 gap-4 mt-4 border-t border-zinc-800 pt-3">
                    <div>
                        <div className="text-[9px] font-mono text-zinc-500 uppercase">Foco Sugerido</div>
                        <div className="text-xs text-white font-bold">{sector}</div>
                    </div>
                    <div>
                        <div className="text-[9px] font-mono text-zinc-500 uppercase">Subsetor/Função</div>
                        <div className="text-xs text-white font-bold">{func}</div>
                    </div>
                </div>
            </div>

            {/* IMPACTS SECTION */}
            <div className="bg-zinc-950/50 border border-zinc-900 p-4 rounded-sm">
                <div className="flex flex-col gap-1 mb-4">
                    <h4 className="text-white text-xs font-bold uppercase tracking-widest">Impactos operacionais esperados</h4>
                    <p className="text-[9px] text-zinc-500 font-medium leading-tight italic">
                        "Os impactos abaixo são estimativas operacionais baseadas em cenários semelhantes. Os resultados reais dependem da maturidade e execução da sua operação."
                    </p>
                </div>
                
                <ul className="space-y-2 mb-4">
                    {getImpacts(bottleneck).map((impact, i) => (
                        <li key={i} className="flex items-start gap-2 text-[11px] text-zinc-300">
                            <div className="mt-1 w-1 h-1 bg-zinc-700 rounded-full shrink-0"></div>
                            {impact}
                        </li>
                    ))}
                </ul>

                <div className="mt-4 border-t border-zinc-900/50 pt-3">
                    <p className="text-[10px] text-zinc-500 leading-relaxed font-medium">
                        Esses impactos não substituem a operação humana, mas reduzem o volume de decisões repetitivas que hoje consomem tempo, foco e energia da equipe.
                    </p>
                </div>

                <div className="mt-3 p-2 border border-zinc-800/50 bg-black/40 text-[10px] text-zinc-400 font-mono italic">
                    <span className="text-emerald-500 font-bold">INFO:</span> Em operações com processo minimamente estruturado, este tipo de agente costuma reduzir de 15% a 35% do tempo manual neste fluxo específico.
                </div>
            </div>

            <div>
                <h4 className="text-zinc-600 text-[10px] font-mono font-bold uppercase tracking-widest mb-3 border-b border-zinc-800 pb-1">
                    Arquitetura Recomendada
                </h4>
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                        <div className="text-[8px] font-mono text-emerald-500 font-bold uppercase tracking-tighter flex items-center gap-1">
                            <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse"></div> RECOMENDADO AGORA
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-black border border-emerald-500/20">
                            <Terminal size={12} className="text-emerald-500" />
                            <span className="text-[10px] font-mono font-bold text-zinc-300 uppercase">{recommendedAgents[0]}</span>
                        </div>
                    </div>

                    {score > 40 && recommendedAgents[1] && (
                        <div className="flex flex-col gap-1 opacity-70">
                            <div className="text-[8px] font-mono text-zinc-500 font-bold uppercase tracking-tighter">○ OPCIONAL | FASE 2</div>
                            <div className="flex items-center gap-2 p-2 bg-black border border-zinc-800/50">
                                <Terminal size={12} className="text-zinc-600" />
                                <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase">{recommendedAgents[1]}</span>
                            </div>
                        </div>
                    )}

                    <div className="mt-2 text-[9px] text-zinc-600 leading-tight">
                        Este agente atua como ponto inicial da automação. Agentes adicionais só são sugeridos após validação da carga operacional, estabilidade do fluxo e maturidade do setor analisado.
                    </div>
                </div>
            </div>

            <div className="mt-4 border-t border-dashed border-zinc-800 pt-4">
                {contactFormStep !== 'sent' ? (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-start gap-3 mb-4">
                            <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700 shrink-0">
                                <Bot size={16} className="text-white" />
                            </div>
                            <div className="bg-zinc-800/50 rounded-r-lg rounded-bl-lg p-3 text-xs text-zinc-300 leading-relaxed border border-zinc-700/50">
                                <span className="block mb-2 font-bold text-white text-[10px] uppercase tracking-wider">
                                    Receber diagnóstico completo com validação humana e ajuste fino da arquitetura
                                </span>
                                <p className="text-[11px] leading-tight mb-2">
                                    Nossa equipe analisará seu score e entrará em contato para validar os impactos projetados e sugerir o melhor ponto de partida técnico.
                                </p>
                                <span className="font-bold text-white">Deseja validar este diagnóstico e definir o ponto exato de início da automação?</span>
                            </div>
                        </div>

                        <form onSubmit={handleContactSubmit} className="space-y-3 pl-11">
                            <input 
                                required
                                disabled={contactFormStep === 'submitting' || contactFormStep === 'success'}
                                type="text" 
                                placeholder="Seu Nome" 
                                className="w-full bg-black border border-zinc-800 rounded-sm p-2 text-xs text-white focus:border-emerald-500 outline-none transition-colors disabled:opacity-50"
                                value={contactData.name}
                                onChange={e => setContactData({...contactData, name: e.target.value})}
                            />
                            
                            <div className="flex gap-2">
                                <button 
                                    type="button"
                                    disabled={contactFormStep === 'submitting' || contactFormStep === 'success'}
                                    onClick={() => setContactData({...contactData, method: 'whatsapp'})}
                                    className={`flex-1 py-2 text-[10px] uppercase font-bold border rounded-sm transition-all disabled:opacity-50 ${contactData.method === 'whatsapp' ? 'bg-zinc-800 text-white border-zinc-600' : 'bg-black text-zinc-600 border-zinc-800'}`}
                                >
                                    WhatsApp
                                </button>
                                <button 
                                    type="button"
                                    disabled={contactFormStep === 'submitting' || contactFormStep === 'success'}
                                    onClick={() => setContactData({...contactData, method: 'email'})}
                                    className={`flex-1 py-2 text-[10px] uppercase font-bold border rounded-sm transition-all disabled:opacity-50 ${contactData.method === 'email' ? 'bg-zinc-800 text-white border-zinc-600' : 'bg-black text-zinc-600 border-zinc-800'}`}
                                >
                                    E-mail
                                </button>
                            </div>

                            <input 
                                required
                                disabled={contactFormStep === 'submitting' || contactFormStep === 'success'}
                                type={contactData.method === 'email' ? 'email' : 'tel'} 
                                placeholder={contactData.method === 'email' ? 'Seu melhor e-mail' : 'Seu WhatsApp (com DDD)'}
                                className="w-full bg-black border border-zinc-800 rounded-sm p-2 text-xs text-white focus:border-emerald-500 outline-none transition-colors disabled:opacity-50"
                                value={contactData.contact}
                                onChange={e => setContactData({...contactData, contact: e.target.value})}
                            />

                            <div className="relative">
                                <input 
                                    disabled={contactFormStep === 'submitting' || contactFormStep === 'success'}
                                    type="text" 
                                    placeholder="Nome da empresa (opcional)"
                                    className="w-full bg-black border border-zinc-800 rounded-sm p-2 text-xs text-white focus:border-emerald-500 outline-none transition-colors pr-8 disabled:opacity-50"
                                    value={contactData.company_name}
                                    onChange={e => setContactData({...contactData, company_name: e.target.value})}
                                />
                                <button 
                                    type="submit" 
                                    disabled={contactFormStep === 'submitting' || contactFormStep === 'success'}
                                    className={`absolute right-1 top-1 bottom-1 px-3 rounded-sm flex items-center justify-center transition-all duration-300 z-10 ${
                                        contactFormStep === 'success' 
                                            ? 'bg-emerald-500 text-white scale-110 ring-4 ring-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.4)]' 
                                            : 'bg-white text-black hover:bg-zinc-200'
                                    }`}
                                >
                                    {contactFormStep === 'submitting' ? (
                                        <Loader2 size={14} className="animate-spin" />
                                    ) : contactFormStep === 'success' ? (
                                        <Check size={16} className="animate-in zoom-in spin-in-12 duration-500 stroke-[3px]" />
                                    ) : (
                                        <ArrowRight size={14} />
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 pl-11">
                         <div className="bg-emerald-950/40 border border-emerald-500/40 p-3 rounded-sm mb-4 shadow-[0_4px_20px_rgba(16,185,129,0.1)] relative overflow-hidden group/success">
                            <div className="absolute inset-0 bg-emerald-500/5 translate-x-[-100%] animate-[shimmer_2s_infinite]"></div>
                            <div className="flex items-center gap-2 text-emerald-400 mb-1 relative z-10">
                                <CheckCircle2 size={16} className="animate-in zoom-in spin-in-90 duration-1000" />
                                <span className="text-[11px] font-bold uppercase tracking-widest">Diagnóstico Solicitado com Sucesso</span>
                            </div>
                         </div>
                         
                         <div className="flex items-start gap-3 mt-6 animate-in slide-in-from-left-4 fade-in duration-1000 delay-300 fill-mode-both">
                            <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700 shrink-0 shadow-lg">
                                <Bot size={16} className="text-white" />
                            </div>
                            <div className="bg-zinc-900/80 rounded-r-lg rounded-bl-lg p-4 text-xs text-zinc-200 leading-relaxed border border-zinc-800 shadow-xl relative">
                                <div className="absolute -left-1.5 top-3 w-3 h-3 bg-zinc-900 rotate-45 border-l border-b border-zinc-800"></div>
                                <p className="relative z-10 font-medium italic opacity-90">
                                    {diagnosis.botMessage}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>

        <div className="mt-3 flex justify-center">
            <button 
                onClick={resetSimulator}
                className="flex items-center gap-2 text-zinc-600 hover:text-white py-2 text-[9px] font-mono uppercase tracking-widest transition-colors"
            >
                <RefreshCw className="w-3 h-3" /> RESTART_SEQUENCE
            </button>
        </div>
      </div>
    );
  };

  return (
    <section className="relative w-full min-h-[900px] flex flex-col items-center justify-center pt-24 pb-20 bg-zinc-950 overflow-hidden">
      
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-white/5 blur-[150px] rounded-full"></div>
          <div className="absolute bottom-[-10%] right-[20%] w-[500px] h-[500px] bg-zinc-500/10 blur-[150px] rounded-full"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center">
        
        <div className="text-center mb-12 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6 drop-shadow-2xl">
            Fluxo <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-zinc-600">Invisível™</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 font-medium max-w-2xl mx-auto leading-relaxed">
            Automação só funciona quando o processo está organizado.
            <br className="hidden md:block" />
            Este diagnóstico identifica onde sua operação perde dinheiro — e se faz sentido automatizar agora.
          </p>
        </div>

        <div className="w-full max-w-2xl relative shadow-2xl group/container">
            <div className={`absolute -inset-[1px] bg-gradient-to-b from-zinc-700 via-zinc-900 to-zinc-800 rounded-sm blur-sm opacity-50 transition-opacity duration-1000 ${isAnalyzing ? 'opacity-80 animate-pulse' : 'group-hover/container:opacity-70'}`}></div>
            
            <div className="relative bg-zinc-950 border border-zinc-800 rounded-sm overflow-hidden flex flex-col min-h-[650px]">
                
                <div className="bg-zinc-900 border-b border-zinc-800 p-3 flex justify-between items-center select-none z-20 relative">
                   <div className="flex gap-1.5 ml-1">
                      <div className="w-2.5 h-2.5 rounded-full bg-zinc-800 border border-zinc-600"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-zinc-800 border border-zinc-600"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-zinc-800 border border-zinc-600"></div>
                   </div>
                   <div className="font-mono text-[10px] text-zinc-500 tracking-widest flex items-center gap-2">
                      <Lock size={10} />
                      NOX_QUALIFICATION_ENGINE_V2.0
                   </div>
                   <div className="mr-1">
                      <Activity size={12} className={`text-zinc-600 ${isAnalyzing ? 'animate-pulse text-emerald-500' : ''}`} />
                   </div>
                </div>

                <div className="p-6 md:p-8 flex-1 bg-black relative flex flex-col">
                   <div className="absolute inset-0 bg-repeat-y opacity-[0.03] pointer-events-none z-0" style={{backgroundSize: '100% 3px', backgroundImage: 'linear-gradient(0deg, transparent, transparent 50%, #fff 50%, #fff 51%, transparent 51%)'}}></div>
                   
                   {!showResults && !isAnalyzing && renderProgressBar()}

                   <div className="relative z-10 h-full flex-1">
                       {isAnalyzing 
                         ? renderAnalyzing() 
                         : showResults 
                           ? renderResults() 
                           : renderStep()
                       }
                   </div>
                </div>
            
            </div>

            <div className="flex justify-center mt-8 opacity-60">
                <div className="flex items-center gap-2 px-4 py-2 text-[10px] text-zinc-600 font-mono uppercase tracking-widest bg-zinc-900/50 border border-zinc-800/50 rounded-full">
                    <span className={`w-1.5 h-1.5 rounded-full ${isAnalyzing ? 'bg-emerald-500 animate-ping' : showResults ? 'bg-emerald-500' : 'bg-zinc-500'}`}></span>
                    Status do Sistema: {isAnalyzing ? 'CALCULANDO ROI...' : showResults ? 'DIAGNÓSTICO CONCLUÍDO' : 'AGUARDANDO ENTRADA'}
                </div>
            </div>
        </div>

      </div>
      
      <div className="absolute bottom-0 w-full border-t border-zinc-900 bg-zinc-950/50 backdrop-blur-sm py-6 z-20">
          <div className="max-w-7xl mx-auto px-4 flex justify-center gap-8 md:gap-16 opacity-40 hover:opacity-100 transition-opacity duration-500">
             <div className="flex items-center gap-2 text-zinc-500 text-[10px] font-mono font-bold uppercase tracking-widest"><BarChart3 size={12}/> Dados Seguros</div>
             <div className="flex items-center gap-2 text-zinc-500 text-[10px] font-mono font-bold uppercase tracking-widest"><Lock size={12}/> Criptografia Militar</div>
             <div className="flex items-center gap-2 text-zinc-500 text-[10px] font-mono font-bold uppercase tracking-widest"><Cpu size={12}/> Processamento IA</div>
          </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
};

export default Hero;
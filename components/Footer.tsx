import React, { useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Instagram, Facebook, CheckCircle2, ArrowUpCircle, Loader2 } from 'lucide-react';

const Footer: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    message: '',
    hasDiagnosis: false,
    privacy: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [buttonState, setButtonState] = useState<'idle' | 'loading' | 'success'>('idle');

  const validateField = (name: string, value: string) => {
    let error = '';
    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (value && !emailRegex.test(value)) {
        error = 'E-mail inválido';
      }
    } else if (name === 'phone') {
      // Basic validation for numbers and length (common for BR or international)
      const phoneRegex = /^\+?(\d{2,3})?\s?\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
      if (value && !phoneRegex.test(value)) {
        error = 'Formato inválido';
      }
    }
    setErrors(prev => ({ ...prev, [name]: error }));
    return error;
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    validateField(e.target.name, e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.privacy) return;

    // Final validation check
    const emailErr = validateField('email', formData.email);
    const phoneErr = validateField('phone', formData.phone);

    if (emailErr || phoneErr) return;
    
    setButtonState('loading');

    setTimeout(() => {
        setButtonState('success');
        
        setTimeout(() => {
            setIsSubmitted(true);
            setButtonState('idle');
        }, 1200);
    }, 1500);
  };

  const scrollToSimulator = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-zinc-100 border-t border-zinc-800">
      {/* Upper Section: Form */}
      <div className="bg-zinc-50 border-b border-zinc-200">
        <div className="max-w-4xl mx-auto px-4 py-20">
            
            {!isSubmitted ? (
              <>
                <div className="mb-10 text-center">
                    <h3 className="text-3xl font-black text-zinc-900 uppercase tracking-tighter">SOLICITAR CONVERSA ESTRATÉGICA</h3>
                    <p className="text-zinc-500 mt-2 font-medium">Para operações já estruturadas que buscam automação agentiva.</p>
                    
                    <div className="mt-6">
                        <p className="text-zinc-900 font-bold uppercase tracking-tight text-sm">
                          Essa conversa não é um pitch. <span className="text-zinc-500">É uma validação do seu cenário.</span>
                        </p>
                    </div>

                    <div className="mt-6 inline-block bg-white border border-zinc-200 rounded-sm px-4 py-2 shadow-sm">
                        <p className="text-[11px] text-zinc-500 font-medium">
                            Se você ainda não realizou o Diagnóstico NOX, recomendamos iniciar por ele antes da conversa.
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="relative group">
                        <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Nome *</label>
                        <input 
                            name="name"
                            required
                            disabled={buttonState !== 'idle'}
                            type="text" 
                            className="w-full border-b-2 border-zinc-200 py-2 focus:outline-none focus:border-zinc-900 transition-colors bg-transparent text-zinc-900 font-medium disabled:opacity-50" 
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                    </div>
                    <div className="relative group">
                        <label className={`block text-xs font-bold uppercase tracking-wider mb-2 transition-colors ${errors.phone ? 'text-red-500' : 'text-zinc-400'}`}>Telefone *</label>
                        <input 
                            name="phone"
                            required
                            disabled={buttonState !== 'idle'}
                            type="tel" 
                            className={`w-full border-b-2 py-2 focus:outline-none transition-colors bg-transparent text-zinc-900 font-medium disabled:opacity-50 ${errors.phone ? 'border-red-500' : 'border-zinc-200 focus:border-zinc-900'}`} 
                            value={formData.phone}
                            onBlur={handleBlur}
                            onChange={(e) => {
                              setFormData({...formData, phone: e.target.value});
                              if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }));
                            }}
                        />
                        {errors.phone && <span className="absolute -bottom-5 left-0 text-[10px] font-bold text-red-500 uppercase tracking-tighter">{errors.phone}</span>}
                    </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="relative group">
                        <label className={`block text-xs font-bold uppercase tracking-wider mb-2 transition-colors ${errors.email ? 'text-red-500' : 'text-zinc-400'}`}>Email *</label>
                        <input 
                            name="email"
                            required
                            disabled={buttonState !== 'idle'}
                            type="email" 
                            className={`w-full border-b-2 py-2 focus:outline-none transition-colors bg-transparent text-zinc-900 font-medium disabled:opacity-50 ${errors.email ? 'border-red-500' : 'border-zinc-200 focus:border-zinc-900'}`} 
                            value={formData.email}
                            onBlur={handleBlur}
                            onChange={(e) => {
                              setFormData({...formData, email: e.target.value});
                              if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                            }}
                        />
                        {errors.email && <span className="absolute -bottom-5 left-0 text-[10px] font-bold text-red-500 uppercase tracking-tighter">{errors.email}</span>}
                    </div>
                    <div className="relative group">
                        <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Empresa *</label>
                        <input 
                            name="company"
                            required
                            disabled={buttonState !== 'idle'}
                            type="text" 
                            className="w-full border-b-2 border-zinc-200 py-2 focus:outline-none focus:border-zinc-900 transition-colors bg-transparent text-zinc-900 font-medium disabled:opacity-50" 
                            value={formData.company}
                            onChange={(e) => setFormData({...formData, company: e.target.value})}
                        />
                    </div>
                    </div>
                    <div>
                    <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Mensagem</label>
                    <textarea 
                        name="message"
                        rows={4} 
                        disabled={buttonState !== 'idle'}
                        placeholder="Se já realizou o Diagnóstico NOX, descreva brevemente o fluxo que deseja automatizar."
                        className="w-full border-b-2 border-zinc-200 py-2 focus:outline-none focus:border-zinc-900 transition-colors bg-transparent text-zinc-900 font-medium placeholder-zinc-400 disabled:opacity-50"
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                    ></textarea>
                    </div>
                    
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <input 
                                type="checkbox" 
                                id="diagnosis-done" 
                                disabled={buttonState !== 'idle'}
                                className="rounded text-zinc-900 focus:ring-zinc-500 w-4 h-4 border-zinc-300 disabled:opacity-50" 
                                checked={formData.hasDiagnosis}
                                onChange={(e) => setFormData({...formData, hasDiagnosis: e.target.checked})}
                            />
                            <label htmlFor="diagnosis-done" className="text-sm font-medium text-zinc-700">Já realizei o Diagnóstico NOX</label>
                        </div>

                        <div className="flex items-center gap-2">
                            <input 
                                required
                                type="checkbox" 
                                id="privacy" 
                                disabled={buttonState !== 'idle'}
                                className="rounded text-zinc-900 focus:ring-zinc-500 w-4 h-4 border-zinc-300 disabled:opacity-50" 
                                checked={formData.privacy}
                                onChange={(e) => setFormData({...formData, privacy: e.target.checked})}
                            />
                            <label htmlFor="privacy" className="text-xs text-zinc-500">Aceito a política de privacidade.</label>
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={buttonState !== 'idle'}
                        className={`
                            px-10 py-4 rounded-sm font-bold uppercase tracking-widest transition-all w-full md:w-auto shadow-lg 
                            flex items-center justify-center gap-2 relative overflow-hidden
                            ${buttonState === 'idle' ? 'bg-zinc-900 text-white hover:bg-zinc-700 hover:shadow-xl transform hover:-translate-y-0.5' : ''}
                            ${buttonState === 'loading' ? 'bg-zinc-800 text-zinc-400 cursor-wait' : ''}
                            ${buttonState === 'success' ? 'bg-emerald-600 text-white scale-105 shadow-[0_0_25px_rgba(16,185,129,0.5)] animate-[pulse_1.5s_infinite]' : ''}
                        `}
                    >
                        {buttonState === 'idle' && "SOLICITAR AVALIAÇÃO ESTRATÉGICA"}
                        {buttonState === 'loading' && (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                PROCESSANDO...
                            </>
                        )}
                        {buttonState === 'success' && (
                            <div className="flex items-center gap-2 animate-in zoom-in duration-300">
                                <CheckCircle2 className="w-5 h-5" />
                                SOLICITAÇÃO ENVIADA
                            </div>
                        )}
                        {buttonState === 'success' && (
                            <div className="absolute inset-0 bg-white/20 animate-[ping_1.5s_infinite] pointer-events-none opacity-20"></div>
                        )}
                    </button>
                </form>
              </>
            ) : (
                <div className="py-16 text-center animate-in zoom-in duration-500">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h3 className="text-2xl font-black text-zinc-900 uppercase tracking-tight mb-4">Solicitação Recebida</h3>
                    
                    {formData.hasDiagnosis ? (
                        <div className="max-w-lg mx-auto">
                            <p className="text-zinc-600 mb-6">
                                Confirmamos que sua operação já passou pelo diagnóstico. 
                                Seus dados foram encaminhados para nossa <span className="font-bold text-zinc-900">fila estratégica prioritária</span>.
                            </p>
                            <p className="text-sm text-zinc-500">Entraremos em contato em até 24h úteis.</p>
                        </div>
                    ) : (
                        <div className="max-w-lg mx-auto">
                            <p className="text-zinc-600 mb-8">
                                Recebemos seu interesse. Enquanto nossa equipe processa sua solicitação, 
                                recomendamos fortemente que você realize o Diagnóstico para mapear seu ROI.
                            </p>
                            <button 
                                onClick={scrollToSimulator}
                                className="flex items-center gap-2 mx-auto bg-white border border-zinc-300 px-6 py-3 rounded-sm font-bold uppercase tracking-widest text-xs hover:bg-zinc-50 hover:border-zinc-400 transition-all"
                            >
                                <ArrowUpCircle size={16} />
                                Ir para o Diagnóstico
                            </button>
                        </div>
                    )}
                </div>
            )}

        </div>
      </div>

      <div className="bg-black text-white border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          
          <div className="mb-24 text-center border-b border-zinc-900 pb-16">
            <h4 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter max-w-3xl mx-auto leading-tight italic">
              Automação não é o começo. <br/>
              <span className="text-zinc-600">É a consequência de uma operação bem organizada.</span>
            </h4>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <h3 className="text-2xl font-black mb-8 tracking-tighter uppercase">Contate-nos</h3>
              <ul className="space-y-6 text-zinc-400 text-sm">
                <li className="flex items-center gap-4 group cursor-pointer">
                  <div className="p-2 bg-zinc-900 rounded-sm group-hover:bg-white group-hover:text-black transition-colors"><Phone size={18} className="text-white group-hover:text-black transition-colors" /></div>
                  +55 11 99999-9999
                </li>
                <li className="flex items-center gap-4 group cursor-pointer">
                  <div className="p-2 bg-zinc-900 rounded-sm group-hover:bg-white group-hover:text-black transition-colors"><Mail size={18} className="text-white group-hover:text-black transition-colors" /></div>
                  info@noxsystems.com
                </li>
                <li className="flex items-center gap-4 group cursor-pointer">
                  <div className="p-2 bg-zinc-900 rounded-sm group-hover:bg-white group-hover:text-black transition-colors"><MapPin size={18} className="text-white group-hover:text-black transition-colors" /></div>
                  Av. Paulista, 1000 - São Paulo, SP
                </li>
              </ul>

              <div className="mt-12">
                <h4 className="font-bold mb-4 text-xs uppercase tracking-widest text-zinc-600">Certificações</h4>
                <div className="flex gap-4 opacity-70">
                    <div className="w-10 h-10 bg-zinc-800 rounded-sm border border-zinc-700"></div>
                    <div className="w-10 h-10 bg-zinc-800 rounded-sm border border-zinc-700"></div>
                    <div className="w-10 h-10 bg-zinc-800 rounded-sm border border-zinc-700"></div>
                </div>
              </div>
              
              <div className="mt-12 pt-8 border-t border-zinc-900 text-[10px] text-zinc-600 flex justify-between items-center uppercase tracking-widest">
                <span>© 2024 NOX Systems.</span>
                <div className="flex gap-6">
                  <Linkedin size={16} className="cursor-pointer hover:text-white transition-colors" />
                  <Instagram size={16} className="cursor-pointer hover:text-white transition-colors" />
                  <Facebook size={16} className="cursor-pointer hover:text-white transition-colors" />
                </div>
              </div>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800 rounded-sm p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full"></div>
              <h3 className="text-xl font-bold mb-1 text-white uppercase">Nunca perca uma novidade</h3>
              <p className="text-zinc-500 text-sm mb-8">Com NOX Insights.</p>
              
              <form className="space-y-4 relative z-10">
                <select className="w-full bg-black border border-zinc-800 rounded-sm p-3 text-sm text-zinc-400 focus:border-white outline-none">
                    <option>Senhor</option>
                    <option>Senhora</option>
                </select>
                <input type="text" placeholder="Primeiro Nome*" className="w-full bg-black border border-zinc-800 rounded-sm p-3 text-sm text-white placeholder-zinc-600 focus:border-white outline-none" />
                <input type="text" placeholder="Sobrenome*" className="w-full bg-black border border-zinc-800 rounded-sm p-3 text-sm text-white placeholder-zinc-600 focus:border-white outline-none" />
                <input type="email" placeholder="E-mail*" className="w-full bg-black border border-zinc-800 rounded-sm p-3 text-sm text-white placeholder-zinc-600 focus:border-white outline-none" />
                
                <div className="flex items-center gap-2">
                    <input type="checkbox" className="rounded bg-black border-zinc-700 focus:ring-zinc-500" />
                    <label className="text-xs text-zinc-500">Aceito a política de privacidade.</label>
                </div>

                <button className="w-full bg-white text-black py-3 rounded-sm font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors shadow-lg shadow-white/10">
                    Inscrever-se
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
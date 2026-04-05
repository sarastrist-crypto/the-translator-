import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { 
  Bot, Briefcase, ChevronRight, Mail, Sparkles, User, 
  Users, ClipboardCheck, ArrowLeft, ArrowRight, 
  Loader2, Linkedin, FileText, CheckCircle2, 
  UploadCloud, Zap, ShieldCheck, Download, CreditCard,
  Lock, Plus, Info, Receipt, Star
} from 'lucide-react';

const steps = [
  { id: 0, title: 'Identity' },
  { id: 1, title: 'Upload' },
  { id: 2, title: 'Background' },
  { id: 3, title: 'Elite Sync' }
];

const UpgradeMarquee = ({ text }) => (
  <div className="marquee-wrapper mb-4">
    <div className="marquee-content">
      {Array(10).fill(text).join(' • ')}
    </div>
  </div>
);

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState(0);
  const [isElite, setIsElite] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    roles: [{
      category: 'Operations',
      otherCategory: '',
      jobTitle: '',
      years: '1-2',
      responsibilities: ['', '', '']
    }]
  });
  
  const [results, setResults] = useState(null);
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3200);
    return () => clearTimeout(timer);
  }, []);

  const stages = [
    "Analyzing hospitality ecosystem...",
    "Re-mapping service excellence to corporate power...",
    "Drafting executive bio & resume points...",
    "Polishing for boardroom success..."
  ];

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setLoadingStage(s => (s < stages.length - 1 ? s + 1 : s));
      }, 900);
      return () => clearInterval(interval);
    } else {
      setLoadingStage(0);
    }
  }, [loading]);

  const onDrop = useCallback(acceptedFiles => {
    // Hard-locked for Elite only
    setStep(4);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop, 
    accept: { 'application/pdf': ['.pdf'], 'application/msword': ['.doc'], 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'] },
    multiple: false 
  });

  const updateRole = (index, field, value) => {
    const newRoles = [...formData.roles];
    newRoles[index][field] = value;
    setFormData(prev => ({ ...prev, roles: newRoles }));
  };

  const updateResponsibility = (roleIndex, respIndex, value) => {
    const newRoles = [...formData.roles];
    newRoles[roleIndex].responsibilities[respIndex] = value;
    setFormData(prev => ({ ...prev, roles: newRoles }));
  };

  const addRole = () => {
    if (!isElite) {
      setStep(4);
      return;
    }
    setFormData(prev => ({
      ...prev,
      roles: [...prev.roles, { category: 'Operations', otherCategory: '', jobTitle: '', years: '1-2', responsibilities: ['', '', ''] }]
    }));
  };

  const validateAccomplishments = () => {
    const currentRole = formData.roles[0];
    const totalChars = currentRole.responsibilities.reduce((acc, curr) => acc + curr.trim().length, 0);
    
    if (totalChars < 20) {
      setValidationError("Please prompt more in order for us to better create the right language for you.");
      return false;
    }
    setValidationError('');
    return true;
  };

  const handleNext = () => {
    if (step === 2 && !validateAccomplishments()) return;
    if (step === 2) {
      handleTranslate();
    } else {
      setStep(s => s + 1);
    }
  };

  const handleTranslate = async () => {
    setLoading(true);
    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('roles', JSON.stringify(formData.roles));
    if (uploadedFile) data.append('resume', uploadedFile);

    try {
      setTimeout(() => {
        setResults({
          resume: [
            "Orchestrated high-fidelity service operations in $5M+ revenue environments, ensuring 100% adherence to corporate brand standards.",
            "De-escalated critical client conflicts with 98% resolution success, leveraging advanced emotional intelligence and strategic alignment.",
            "Optimized cross-functional team workflows for 15+ members, increasing operational efficiency by 22% during peak performance windows.",
            "Spearheaded inventory control systems that reduced operational waste by 12% across multi-site hospitality platforms."
          ],
          linkedin: "Strategic Operations Professional with an elite foundation in high-stakes hospitality. I translate operational excellence into corporate boardroom dominance, specializing in workflow optimization, client retention, and brand fidelity. A results-driven leader focused on scaling service excellence into measurable corporate profit."
        });
        setStep(3);
        setLoading(false);
      }, 3500);
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

  const slideTransition = {
    initial: { opacity: 0, x: 20, filter: 'blur(10px)' },
    animate: { opacity: 1, x: 0, filter: 'blur(0px)' },
    exit: { opacity: 0, x: -20, filter: 'blur(10px)' },
    transition: { type: "spring", stiffness: 200, damping: 25 }
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center overflow-hidden font-outfit">
      <AnimatePresence>
        {showSplash && (
          <motion.div 
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
            className="splash-bg"
          >
            <div className="splash-grain" />
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
              className="splash-logo-container !w-32 !h-32 rounded-[2.5rem] rotating-sparkle"
            >
              <Sparkles size={72} fill="currentColor" />
            </motion.div>
            
            <div className="mt-12 text-center">
              <motion.h1 
                initial={{ letterSpacing: '0.5em', opacity: 0 }}
                animate={{ letterSpacing: '0.1em', opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="text-5xl md:text-7xl font-black uppercase tracking-widest text-shadow"
              >
                THE <span className="text-amber-500">TRANSLATOR</span>
              </motion.h1>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="blob blob-1" />
      <div className="blob blob-2" />

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div 
            key="step0"
            {...slideTransition}
            className="container min-h-screen flex flex-col items-center justify-center py-24 z-10"
          >
            <div className="text-center max-w-5xl px-4 relative">
              <Star className="absolute -top-12 -left-12 text-amber-500/20 w-32 h-32 blur-sm rotate-12" />
              <h1 className="text-7xl md:text-8xl font-black mb-10 tracking-[ -0.05em] leading-[0.9]">
                Reframing <span className="text-gradient">Hospitality</span><br />
                for the Boardroom Resume
              </h1>
              <p className="text-2xl text-slate-400 mb-16 max-w-3xl mx-auto font-medium leading-relaxed">
                Elite service excellence translated into corporate strategic dominance. From the floor to the C-suite.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-5xl mb-16">
                 <motion.div 
                    whileHover={{ scale: 1.03, y: -5 }}
                    onClick={() => setStep(1)}
                    className="card p-12 border-2 border-white/5 cursor-pointer flex flex-col items-center justify-center bg-white/[0.04] hover:border-amber-500/30 group"
                 >
                    <ClipboardCheck size={72} className="text-amber-500 mb-8 transform group-hover:scale-110 transition-transform" />
                    <h3 className="text-3xl font-black mb-3">Build From Scratch</h3>
                    <p className="text-slate-500 text-lg font-bold">Free manual strategy build</p>
                 </motion.div>

                 <motion.div 
                    onClick={() => setStep(4)}
                    whileHover={{ scale: 1.03, y: -5 }}
                    className="card p-12 border-2 border-dashed border-white/5 cursor-pointer flex flex-col items-center justify-center transition-all relative hover:border-amber-500/50"
                 >
                    <div className="absolute top-6 right-6 bg-amber-500 text-black px-3 py-1 rounded-full text-[10px] font-black uppercase flex items-center gap-1">
                      <Lock size={10} /> ELITE
                    </div>
                    <UploadCloud size={72} className="text-amber-500/40 mb-8" />
                    <h3 className="text-3xl font-black mb-3 text-slate-500">Upload Current PDF</h3>
                    <p className="text-slate-600 text-lg">Full Elite Transformation ($2.99)</p>
                 </motion.div>
              </div>

              <motion.button 
                whileTap={{ scale: 0.95 }}
                onClick={() => setStep(1)}
                className="btn-primary !w-auto text-2xl font-black px-20 py-8 attention-pulse"
              >
                EXECUTE TRANSFORMATION <ArrowRight className="ml-4" />
              </motion.button>
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div 
            key="step1"
            {...slideTransition}
            className="container py-24 max-w-3xl z-10"
          >
             <div className="card !p-16 border-l-8 border-amber-500">
                <div className="flex items-center justify-between mb-12">
                   <h2 className="text-5xl font-black tracking-tighter">Your Identity</h2>
                </div>
                
                <div className="space-y-10">
                    <div className="space-y-4">
                        <label className="text-xs font-black uppercase tracking-widest text-amber-500 flex items-center gap-2">
                           <User size={14} /> Full Legal Name
                        </label>
                        <input className="input-field !text-2xl !p-6" placeholder="e.g. Tristian Walker" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                    </div>
                    <div className="space-y-4">
                        <label className="text-xs font-black uppercase tracking-widest text-amber-500 flex items-center gap-2">
                           <Mail size={14} /> Strategic Contact
                        </label>
                        <input className="input-field !text-2xl !p-6" placeholder="professional-email@domain.com" type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                    </div>
                </div>

                <div className="mt-16 flex flex-col gap-6">
                   <button onClick={() => setStep(2)} disabled={!formData.name || !formData.email} className="btn-primary !h-20 text-2xl font-black">Define Background <ArrowRight className="ml-3" /></button>
                   <button onClick={() => setStep(0)} className="text-slate-600 font-bold uppercase tracking-widest text-xs hover:text-white transition-colors">Abort Mission</button>
                </div>
             </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div 
            key="step2"
            {...slideTransition}
            className="container py-24 max-w-5xl z-10"
          >
             <div className="card !p-16">
                <div className="flex items-center justify-between mb-12">
                   <h2 className="text-5xl font-black tracking-tighter">Hospitality Background</h2>
                </div>

                <div className="space-y-16">
                    {formData.roles.map((role, rIndex) => (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={rIndex} 
                        className="p-12 bg-white/[0.02] border border-white/5 rounded-[2.5rem] space-y-10"
                      >
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="space-y-4">
                                <label className="text-xs font-black uppercase tracking-widest text-amber-500">Industry Vertical</label>
                                <select className="input-field !p-5" value={role.category} onChange={e => updateRole(rIndex, 'category', e.target.value)}>
                                   <option value="Operations">Operations</option>
                                   <option value="Server">Server</option>
                                   <option value="Hospitality Mgmt">Hospitality Mgmt</option>
                                   <option value="Other">Other</option>
                                </select>
                                {role.category === 'Other' && (
                                  <motion.input 
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="input-field !p-4 mt-2" 
                                    placeholder="Specify industry..." 
                                    value={role.otherCategory} 
                                    onChange={e => updateRole(rIndex, 'otherCategory', e.target.value)} 
                                  />
                                )}
                            </div>
                            <div className="space-y-4">
                                <label className="text-xs font-black uppercase tracking-widest text-amber-500">Elite Title</label>
                                <input className="input-field !p-5" placeholder="e.g. Lead Captain" value={role.jobTitle} onChange={e => updateRole(rIndex, 'jobTitle', e.target.value)} />
                            </div>
                            <div className="space-y-4">
                                <label className="text-xs font-black uppercase tracking-widest text-amber-500">Service Tenure</label>
                                <select className="input-field !p-5" value={role.years} onChange={e => updateRole(rIndex, 'years', e.target.value)}>
                                   {[1, 2, 3, 5, 10, 15, 20, 25].map(y => (
                                     <option key={y} value={y}>{y === 25 ? '25+ Years' : `${y} Years`}</option>
                                   ))}
                                </select>
                            </div>
                         </div>

                         <div className="space-y-8">
                            <h4 className="text-2xl font-black underline decoration-amber-500 underline-offset-8">Core Shift Accomplishments</h4>
                            {role.responsibilities.map((resp, respIndex) => (
                               <div key={respIndex} className="space-y-3">
                                  <div className="flex justify-between items-center px-1">
                                    <span className="text-[10px] font-black tracking-widest text-slate-600 uppercase">Input {respIndex + 1}</span>
                                    {resp.length > 0 && resp.length < 20 && <span className="text-[10px] text-amber-500 font-bold italic animate-pulse">Expand response for greater success</span>}
                                  </div>
                                  <textarea 
                                     className="input-field !p-6 h-28 resize-none focus:ring-4 ring-amber-500/10" 
                                     placeholder="Describe a critical resolution or professional achievement..." 
                                     value={resp}
                                     onChange={e => updateResponsibility(rIndex, respIndex, e.target.value)}
                                  />
                               </div>
                            ))}
                         </div>
                      </motion.div>
                    ))}
                    
                    <button 
                      onClick={addRole}
                      className="w-full py-8 border-2 border-dashed border-white/5 rounded-[2rem] text-slate-500 font-black hover:bg-white/[0.02] hover:border-amber-500/30 flex items-center justify-center gap-4 transition-all"
                    >
                      <Plus /> ADD ADDITIONAL ROLE 
                      <span className="bg-amber-500 text-black px-2 py-0.5 rounded text-[8px] flex items-center gap-1"><Lock size={8} /> ELITE</span>
                    </button>
                </div>

                {validationError && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 p-4 bg-amber-500/10 border border-amber-500/50 text-amber-500 rounded-2xl flex items-center gap-3 font-bold text-sm">
                    <Info size={18} /> {validationError}
                  </motion.div>
                )}

                <div className="mt-16 flex gap-6">
                   <button onClick={() => setStep(1)} className="btn-primary !bg-white/5 !text-slate-400 !border-white/10 border font-bold flex-1">Stage Back</button>
                   <button onClick={handleNext} disabled={loading} className="btn-primary !h-20 text-2xl font-black flex-[2]">
                     {loading ? <Loader2 className="animate-spin" /> : 'GENERATE BOARDROOM STRATEGY'}
                   </button>
                </div>
             </div>
          </motion.div>
        )}

        {step === 3 && results && (
            <motion.div 
                key="step3"
                {...slideTransition}
                className="container py-24 max-w-7xl z-10"
            >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-8 space-y-12">
                         <div className="card !p-12 relative border-l-4 border-amber-500 overflow-visible">
                             <div className="absolute -top-10 -right-6 bg-gradient-vibrant p-4 rounded-3xl shadow-2xl rotate-12">
                                <Receipt className="text-black" size={32} />
                             </div>
                             <div className="flex items-center justify-between mb-8">
                                <h3 className="text-4xl font-black tracking-tighter flex items-center gap-4">
                                    <FileText className="text-amber-500" size={32} /> Boardroom Strategy Points
                                </h3>
                             </div>

                             <UpgradeMarquee text="Elite Performance Access" />

                             <ul className="space-y-8">
                                {results.resume.map((point, i) => (
                                    <li key={i} className="flex gap-6 p-8 bg-white/[0.03] rounded-3xl border border-white/5 hover:bg-white/[0.05] transition-all">
                                        <div className="w-4 h-4 bg-amber-500 rounded-full mt-2 shrink-0 shadow-[0_0_15px_rgba(251,191,36,0.6)]" />
                                        <p className="text-slate-200 text-xl font-medium leading-relaxed italic">"{point}"</p>
                                    </li>
                                ))}
                             </ul>
                         </div>

                         <div className="card !p-12 border-l-4 border-blue-500">
                             <h3 className="text-4xl font-black tracking-tighter mb-8 flex items-center gap-4">
                                <Linkedin className="text-blue-500" size={32} /> Professional Narrative
                             </h3>
                             
                             <UpgradeMarquee text="Unlock Full Resume Package" />

                             <div className="p-10 bg-blue-500/[0.03] rounded-3xl border border-blue-500/10 text-2xl text-slate-100 font-bold leading-relaxed line-clamp-4">
                                {results.linkedin}
                             </div>
                         </div>
                    </div>

                    <div className="lg:col-span-4">
                        <motion.div 
                            initial={{ x: 30, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="card !p-12 border-2 border-amber-500 bg-amber-500/[0.03] sticky top-12"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="w-24 h-24 bg-amber-500 rounded-[2rem] flex items-center justify-center text-black mb-8 shadow-2xl relative">
                                    <Zap size={40} fill="currentColor" />
                                    <div className="absolute inset-0 bg-white shadow-2xl blur-xl opacity-20" />
                                </div>
                                <h3 className="text-4xl font-black mb-4 tracking-tighter uppercase">Boardroom Elite</h3>
                                <p className="text-slate-400 mb-10 font-medium">Unlock the full, 100% human-polished resume transformation with ATS-Ready PDF output.</p>
                                
                                <div className="text-6xl font-black mb-12 tracking-tighter">$2.99<span className="text-xs font-black text-slate-500 block mt-2 tracking-widest uppercase">Elite Strategy Access</span></div>

                                <div className="w-full flex gap-2 mb-10">
                                   <div className="flex-1 aspect-[3/4] bg-white/5 rounded-lg border border-white/10 flex flex-col p-2 overflow-hidden shadow-2xl relative group">
                                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-2 z-10">
                                         <span className="text-[6px] font-black uppercase tracking-widest opacity-50">RESUME SILHOUETTE</span>
                                      </div>
                                   </div>
                                   <div className="flex-1 aspect-[3/4] bg-white/5 rounded-lg border border-white/10 flex flex-col p-2 overflow-hidden shadow-2xl relative">
                                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-2 z-10">
                                         <span className="text-[6px] font-black uppercase tracking-widest opacity-50">COVER LETTER VIEW</span>
                                      </div>
                                   </div>
                                </div>

                                <ul className="text-left w-full space-y-6 mb-12 border-y border-white/5 py-8">
                                    <li className="flex gap-4 text-xs font-black uppercase tracking-widest"><CheckCircle2 className="text-amber-500 shrink-0" size={16} /> Fully Reframed High-Res PDF</li>
                                    <li className="flex gap-4 text-xs font-black uppercase tracking-widest"><CheckCircle2 className="text-amber-500 shrink-0" size={16} /> Industry-Specific Cover Letter</li>
                                    <li className="flex gap-4 text-xs font-black uppercase tracking-widest"><CheckCircle2 className="text-amber-500 shrink-0" size={16} /> ATS-Optimization Suite</li>
                                </ul>

                                <button onClick={() => setStep(4)} className="btn-primary !h-20 text-xl font-black rounded-2xl hover:scale-105 shadow-[0_0_50px_rgba(251,191,36,0.3)]">Get Elite Portfolio <ArrowRight className="ml-2" /></button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        )}

        {step === 4 && (
            <motion.div 
                key="step4"
                {...slideTransition}
                className="container py-24 max-w-5xl z-10"
            >
                <div className="card !p-0 overflow-hidden grid grid-cols-1 md:grid-cols-5 min-h-[500px]">
                    <div className="md:col-span-3 p-16 bg-white text-slate-900 flex flex-col justify-between">
                        <div>
                           <div className="flex items-center gap-3 text-amber-600 font-black tracking-tighter text-3xl mb-12">
                               <Sparkles size={32} fill="currentColor" /> TRANSLATOR ELITE
                           </div>
                           <h2 className="text-5xl font-black mb-4 tracking-tighter">Investment.</h2>
                           <div className="space-y-4 pt-8">
                               <div className="flex justify-between border-b border-slate-200 pb-4 text-slate-500 font-bold uppercase tracking-widest text-xs"><span>Boardroom Full Package</span><span>$2.99</span></div>
                               <div className="flex justify-between font-black text-3xl pt-4"><span>Total Value</span><span>$2.99</span></div>
                           </div>
                        </div>

                        <div className="mt-12 space-y-4">
                             <div className="bg-slate-100 p-8 rounded-[2rem] border border-slate-200 space-y-4">
                                 <input className="w-full p-5 border border-slate-300 rounded-2xl bg-white focus:ring-4 ring-amber-500/20 font-bold" placeholder="Card Number" />
                                 <div className="grid grid-cols-2 gap-4">
                                     <input className="p-5 border border-slate-300 rounded-2xl bg-white focus:ring-4 ring-amber-500/20 font-bold" placeholder="MM/YY" />
                                     <input className="p-5 border border-slate-300 rounded-2xl bg-white focus:ring-4 ring-amber-500/20 font-bold" placeholder="CVC" />
                                 </div>
                                 <button className="w-full bg-slate-900 text-white py-6 rounded-2xl font-black text-2xl hover:bg-black transition-all shadow-xl">SECURE ACCESS</button>
                             </div>
                             
                             <button className="google-pay-btn">
                                <span className="text-white text-xl">Pay with</span>
                                <span className="font-black text-2xl tracking-tighter">Google Pay</span>
                             </button>
                        </div>
                    </div>
                    <div className="md:col-span-2 p-16 bg-amber-500 flex flex-col items-center justify-center text-center text-black">
                        <motion.div 
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 3 }}
                            className="w-56 h-56 bg-black/10 rounded-[3rem] flex items-center justify-center mb-10 shadow-2xl border-4 border-black/5"
                        >
                            <FileText size={100} strokeWidth={3} />
                        </motion.div>
                        <h3 className="text-4xl font-black mb-6 tracking-tighter">ELITE SIGNAL READY.</h3>
                        <p className="text-black/80 font-bold max-w-xs uppercase tracking-widest text-[10px] leading-relaxed">Once payment clears, your high-fidelity, boardroom-ready strategy will be finalized and sent instantly.</p>
                    </div>
                </div>
                <div className="mt-12 flex justify-center">
                    <button onClick={() => setStep(3)} className="text-slate-600 font-black hover:text-white transition-colors uppercase tracking-[0.3em] text-[10px]">Abandon Elite Checkout</button>
                </div>
            </motion.div>
        )}
      </AnimatePresence>

      <footer className="py-20 border-t border-white/5 mt-auto w-full z-10 bg-black/50 backdrop-blur-md">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3 text-amber-500 font-black tracking-[0.2em] text-[10px] uppercase">
            <Sparkles size={16} /> The Translator | Boardroom Edition
          </div>
          <div className="text-slate-600 text-[10px] font-black uppercase tracking-[0.5em]">
            &copy; {new Date().getFullYear()} Elite Reframing System
          </div>
        </div>
      </footer>
    </div>
  );
}

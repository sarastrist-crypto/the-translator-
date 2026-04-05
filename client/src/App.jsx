import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { 
  Bot, Briefcase, ChevronRight, Mail, Sparkles, User, 
  Users, ClipboardCheck, ArrowLeft, ArrowRight, 
  Loader2, Linkedin, FileText, CheckCircle2, 
  UploadCloud, Zap, ShieldCheck, Download, CreditCard,
  Lock, Plus, Info, Receipt, Star, Crown
} from 'lucide-react';

const steps = [
  { id: 0, title: 'Concierge Profile' },
  { id: 1, title: 'Upload' },
  { id: 2, title: 'Professional Narrative' },
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
    "Refining hospitality insights...",
    "Drafting relationship-led narratives...",
    "Polishing service excellence profiles...",
    "Mastering boardroom-ready content..."
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
    setStep(4);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop, multiple: false });

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
      setValidationError("Please provide more insight so we can better craft the right professional language for you.");
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
    try {
      setTimeout(() => {
        setResults({
          resume: [
            "Maintained high-fidelity relationship management in complex service environments, ensuring consistent brand dominance.",
            "De-escalated stakeholder conflicts with expert precision, utilizing advanced emotional intelligence and strategic alignment.",
            "Mastered cross-functional team orchestration to drive service excellence during peak performance intervals.",
            "Refined operational protocols that eliminated friction across multi-site hospitality platforms."
          ],
          linkedin: "A discreet, boardroom-ready narrative specializing in workflow optimization and high-stakes hospitality. I translate service excellence into corporate leadership dominance, focusing on relationship equity and brand fidelity."
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
            className="splash-bg"
          >
            <div className="splash-grain" />
            <motion.div 
              animate={{ rotateY: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="splash-logo-container !w-32 !h-32 rounded-[2.5rem] relative"
              style={{ perspective: 1000 }}
            >
               <Sparkles size={72} fill="currentColor" />
            </motion.div>
            
            <div className="mt-12 text-center">
              <motion.h1 className="text-5xl md:text-7xl font-black uppercase tracking-widest text-shadow">
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
          <motion.div key="step0" {...slideTransition} className="container min-h-screen flex flex-col items-center justify-center py-24 z-10">
            <div className="text-center max-w-5xl px-4 relative">
              <Star className="absolute -top-12 -left-12 text-amber-500/20 w-32 h-32 blur-sm rotate-12" />
              <h1 className="text-7xl md:text-8xl font-black mb-10 tracking-[ -0.05em] leading-[0.9]">
                Reframing <span className="text-gradient">Hospitality</span><br />
                for your Boardroom Career
              </h1>
              <p className="text-2xl text-slate-400 mb-16 max-w-3xl mx-auto font-medium leading-relaxed">
                Elevating your professional service narrative into boardroom strategic dominance. Your career concierge starts here.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-5xl mb-16 text-left">
                 <motion.div 
                    whileHover={{ scale: 1.03, y: -5 }}
                    onClick={() => setStep(1)}
                    className="card p-12 border-2 border-white/5 cursor-pointer flex flex-col items-start justify-center bg-white/[0.04] hover:border-amber-500/30 group"
                 >
                    <Sparkles size={72} className="text-amber-500 mb-8 transform group-hover:rotate-12 transition-transform" />
                    <h3 className="text-4xl font-black mb-3">Professional Narrative</h3>
                    <p className="text-slate-500 text-lg font-bold">Complimentary experience refinement.</p>
                 </motion.div>

                 <motion.div 
                    onClick={() => setStep(4)}
                    whileHover={{ scale: 1.03, y: -5 }}
                    className="card p-12 border-2 border-dashed border-white/5 cursor-pointer flex flex-col items-start justify-center transition-all relative hover:border-amber-500/50"
                 >
                    <div className="absolute top-6 right-6 bg-amber-500 text-black px-3 py-1 rounded-full text-[10px] font-black uppercase flex items-center gap-1">
                      <Lock size={10} /> ELITE
                    </div>
                    <UploadCloud size={72} className="text-amber-500/40 mb-8" />
                    <h3 className="text-4xl font-black mb-3 text-slate-500">Concierge Upload</h3>
                    <p className="text-slate-600 text-lg">Full Boardroom Transformation ($2.99)</p>
                 </motion.div>
              </div>

              <motion.button onClick={() => setStep(1)} className="btn-primary !w-auto text-2xl font-black px-24 py-10 attention-pulse flex items-center gap-3">
                <Sparkles size={24} /> BEGIN REFINEMENT <ArrowRight className="ml-2" />
              </motion.button>
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div key="step1" {...slideTransition} className="container py-24 max-w-3xl z-10">
             <div className="card !p-16">
                <h2 className="text-5xl font-black mb-12 tracking-tighter">Concierge Profile</h2>
                <div className="space-y-10">
                    <div className="space-y-4">
                        <label className="text-xs font-black uppercase tracking-widest text-amber-500">Professional Name</label>
                        <input className="input-field !text-2xl" placeholder="Full Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                    </div>
                    <div className="space-y-4">
                        <label className="text-xs font-black uppercase tracking-widest text-amber-500">Professional Email</label>
                        <input className="input-field !text-2xl" placeholder="email@domain.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                    </div>
                </div>
                <div className="mt-16 flex flex-col gap-6">
                   <button onClick={() => setStep(2)} disabled={!formData.name || !formData.email} className="btn-primary flex items-center justify-center gap-3">
                    <Sparkles size={20} /> DEFINE NARRATIVE <ArrowRight size={20} />
                   </button>
                </div>
             </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="step2" {...slideTransition} className="container py-24 max-w-5xl z-10">
             <div className="card !p-16">
                <h2 className="text-6xl font-black mb-12 tracking-tighter">Hospitality Career Narrative</h2>
                <div className="space-y-16">
                    {formData.roles.map((role, rIndex) => (
                      <div key={rIndex} className="p-12 bg-white/[0.02] border border-white/5 rounded-[2.5rem] space-y-10">
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="space-y-4">
                                <label className="text-xs font-black uppercase tracking-widest text-amber-500">Industry Sector</label>
                                <select className="input-field" value={role.category} onChange={e => updateRole(rIndex, 'category', e.target.value)}>
                                   <option value="Operations">Operations Excellence</option>
                                   <option value="Server">Service Strategy</option>
                                   <option value="Hospitality Mgmt">Executive Mgmt</option>
                                   <option value="Other">Specialized Sector</option>
                                </select>
                                {role.category === 'Other' && <input className="input-field mt-2" placeholder="Specify sector..." value={role.otherCategory} onChange={e => updateRole(rIndex, 'otherCategory', e.target.value)} />}
                            </div>
                            <div className="space-y-4">
                                <label className="text-xs font-black uppercase tracking-widest text-amber-500">Professional Title</label>
                                <input className="input-field" placeholder="e.g. Service Lead" value={role.jobTitle} onChange={e => updateRole(rIndex, 'jobTitle', e.target.value)} />
                            </div>
                            <div className="space-y-4">
                                <label className="text-xs font-black uppercase tracking-widest text-amber-500">Service Tenure</label>
                                <select className="input-field" value={role.years} onChange={e => updateRole(rIndex, 'years', e.target.value)}>
                                   {[1, 2, 3, 5, 10, 15, 20, 25].map(y => <option key={y} value={y}>{y === 25 ? '25+ Years' : `${y} Years`}</option>)}
                                </select>
                            </div>
                         </div>
                         <div className="space-y-8">
                            <h4 className="text-2xl font-black">Professional Achievement Insights</h4>
                            {role.responsibilities.map((resp, respIndex) => (
                               <div key={respIndex} className="space-y-3">
                                  <label className="text-[10px] font-black tracking-widest text-slate-600 uppercase">Hospitality Insight {respIndex + 1}</label>
                                  <textarea className="input-field h-28 resize-none" placeholder="Describe a high-stakes resolution or service save..." value={resp} onChange={e => updateResponsibility(rIndex, respIndex, e.target.value)} />
                               </div>
                            ))}
                         </div>
                      </div>
                    ))}
                    <button onClick={addRole} className="w-full py-8 border-2 border-dashed border-white/5 rounded-[2rem] text-slate-500 font-black hover:bg-white/[0.02] flex items-center justify-center gap-4 transition-all">
                      <Plus /> ADD ADDITIONAL SECTOR INSIGHT <Lock size={12} />
                    </button>
                </div>
                <div className="mt-16 flex gap-6">
                   <button onClick={handleNext} disabled={loading} className="btn-primary !h-24 text-3xl font-black flex items-center justify-center gap-4">
                     {loading ? <Loader2 className="animate-spin" /> : <><Sparkles size={28} /> MASTER EXPERIENCE REFINEMENT</>}
                   </button>
                </div>
             </div>
          </motion.div>
        )}

        {step === 3 && results && (
            <motion.div key="step3" {...slideTransition} className="container py-24 max-w-7xl z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-8 space-y-12">
                         <div className="card !p-12 relative border-l-4 border-amber-500">
                             <h3 className="text-4xl font-black mb-8 flex items-center gap-4">
                                <Sparkles className="text-amber-500" size={32} /> Boardroom Professional Narrative
                             </h3>
                             <UpgradeMarquee text="Concierge Portfolio Access" />
                             <ul className="space-y-8">
                                {results.resume.map((point, i) => (
                                    <li key={i} className="flex gap-6 p-8 bg-white/[0.03] rounded-3xl border border-white/5 italic text-xl font-medium leading-relaxed">
                                        <CheckCircle2 className="text-amber-500 shrink-0" /> "{point}"
                                    </li>
                                ))}
                             </ul>
                         </div>
                    </div>
                    <div className="lg:col-span-4">
                        <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="card !p-12 border-2 border-amber-500 sticky top-12 flex flex-col items-center">
                            <h3 className="text-4xl font-black mb-10 text-center">Boardroom Concierge</h3>
                            <div className="text-6xl font-black mb-10">$2.99</div>
                            <div className="w-full space-y-4 mb-10 overflow-hidden rounded-2xl">
                                <div className="aspect-video bg-white/5 border border-white/10 relative p-4 flex flex-col justify-end">
                                    <div className="w-full h-2 bg-amber-500/20 mb-2" />
                                    <div className="w-2/3 h-2 bg-white/10" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50" />
                                    <span className="relative z-10 text-[8px] font-black tracking-widest text-slate-500">ELITE PORTFOLIO SILHOUETTE</span>
                                </div>
                            </div>
                            <button onClick={() => setStep(4)} className="btn-primary flex items-center gap-3">
                                <Sparkles /> GET FULL CONCIERGE PACKAGE
                            </button>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        )}

        {step === 4 && (
            <motion.div key="step4" {...slideTransition} className="container py-24 min-h-screen flex items-center justify-center z-10">
                <div className="card !p-16 max-w-4xl w-full border-t-[12px] border-amber-500 flex flex-col items-center">
                    <Crown size={64} className="text-amber-500 mb-8" />
                    <h2 className="text-7xl font-black mb-4 tracking-tighter text-center">Executive Investment</h2>
                    <p className="text-center text-slate-400 text-xl font-medium mb-12 max-w-lg">One-time concierge fee for full career reframing and professional high-fidelity deliverables.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full">
                        <div className="space-y-6">
                            <div className="flex justify-between font-black text-2xl border-b border-white/5 pb-4">
                                <span>Full Concierge Portfolio</span>
                                <span className="text-amber-500">$2.99</span>
                            </div>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-3 text-slate-400 font-bold uppercase text-[10px] tracking-widest"><Sparkles size={14} /> Refined Boardroom Resume</li>
                                <li className="flex items-center gap-3 text-slate-400 font-bold uppercase text-[10px] tracking-widest"><Sparkles size={14} /> Strategic Relationship Narrative</li>
                                <li className="flex items-center gap-3 text-slate-400 font-bold uppercase text-[10px] tracking-widest"><Sparkles size={14} /> Human-Polished Quality Guarantee</li>
                            </ul>
                        </div>
                        <div className="space-y-6">
                            <div className="bg-white/5 p-8 rounded-3xl space-y-4">
                                <input className="input-field" placeholder="Card Number" />
                                <div className="grid grid-cols-2 gap-4">
                                    <input className="input-field" placeholder="MM/YY" />
                                    <input className="input-field" placeholder="CVC" />
                                </div>
                                <button className="btn-primary !h-16 text-xl">FINALIZE INVESTMENT</button>
                                <button className="google-pay-btn"><Sparkles size={16} /> Pay with Google Pay</button>
                            </div>
                        </div>
                    </div>
                    <button onClick={() => setStep(0)} className="mt-12 text-slate-600 font-black tracking-widest uppercase text-xs hover:text-white">Relinquish Concierge Session</button>
                </div>
            </motion.div>
        )}
      </AnimatePresence>

      <footer className="py-12 border-t border-white/5 mt-auto w-full z-10 bg-black/50 backdrop-blur-md">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3 text-amber-500 font-black tracking-[0.2em] text-[10px] uppercase">
            <Sparkles size={16} /> The Translator | Concierge Boardroom Edition
          </div>
          <div className="text-slate-600 text-[10px] font-black uppercase tracking-[0.5em]">
            &copy; 2026 Elite Reframing Concierge
          </div>
        </div>
      </footer>
    </div>
  );
}

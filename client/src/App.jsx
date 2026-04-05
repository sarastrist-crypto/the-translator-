import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { 
  Bot, Briefcase, ChevronRight, Mail, Sparkles, User, 
  Users, ClipboardCheck, ArrowLeft, ArrowRight, 
  Loader2, Linkedin, FileText, CheckCircle2, 
  UploadCloud, Zap, ShieldCheck, Download, CreditCard,
  Lock, Plus, Info, Receipt, Star, Crown, Diamond
} from 'lucide-react';

const steps = [
  { id: 0, title: 'Concierge Initiation' },
  { id: 1, title: 'Profile' },
  { id: 2, title: 'Professional Narrative' },
  { id: 3, title: 'Elite Sync' }
];

const UpgradeMarquee = ({ text }) => (
  <div className="marquee-wrapper mb-6">
    <div className="marquee-content font-black">
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
    const timer = setTimeout(() => setShowSplash(false), 3800);
    return () => clearTimeout(timer);
  }, []);

  const stages = [
    "Refining hospitality insights...",
    "Drafting relationship-led narratives...",
    "Polishing service excellence profiles...",
    "Finalizing boardroom-ready strategies..."
  ];

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setLoadingStage(s => (s < stages.length - 1 ? s + 1 : s));
      }, 950);
      return () => clearInterval(interval);
    } else {
      setLoadingStage(0);
    }
  }, [loading]);

  const onDrop = useCallback(() => {
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
      setValidationError("Please provide more professional insight for us to refine. Quality narratives require detailed experience.");
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
            "Orchestrated high-fidelity relationship management in complex service environments, ensuring brand dominance.",
            "De-escalated stakeholder conflicts with professional precision and strategic emotional intelligence.",
            "Led cross-functional team orchestration to drive service excellence during high-stakes intervals.",
            "Mastered operational protocols that increased service quality across multi-site platforms."
          ],
          linkedin: "A discreet guest-centric professional specializing in workflow optimization and high-stakes hospitality. I translate service excellence into corporate leadership dominance, focusing on relationship equity and brand fidelity."
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
    initial: { opacity: 0, x: 20, filter: 'blur(20px)' },
    animate: { opacity: 1, x: 0, filter: 'blur(0px)' },
    exit: { opacity: 0, x: -20, filter: 'blur(20px)' },
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center overflow-hidden font-outfit">
      <AnimatePresence>
        {showSplash && (
          <motion.div 
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'brightness(0)' }}
            transition={{ duration: 1 }}
            className="splash-bg"
          >
            <div className="splash-grain" />
            <div className="logo-3d-wrapper">
              <div className="star-glow" />
              <div className="logo-3d-star">
                 <Sparkles size={100} className="text-amber-500" fill="currentColor" />
              </div>
            </div>
            
            <div className="mt-16 text-center">
              <motion.h1 
                initial={{ opacity: 0, letterSpacing: '1em' }}
                animate={{ opacity: 1, letterSpacing: '0.2em' }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="text-6xl md:text-8xl font-black uppercase tracking-[0.2em] text-shadow"
              >
                THE <span className="text-amber-500">TRANSLATOR</span>
              </motion.h1>
              <div className="mt-4 text-slate-500 tracking-[0.5em] font-black text-xs">BOARDROOM CONCIERGE EDITION</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="blob blob-1" />
      <div className="blob blob-2" />

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div key="step0" {...slideTransition} className="container min-h-screen flex flex-col items-center justify-center py-24 z-10 text-center">
             <Star className="text-amber-500/20 w-48 h-48 blur-xl absolute -top-12 -left-12 rotate-45" />
             <h1 className="text-8xl md:text-[10rem] font-black mb-12 tracking-[-0.05em] leading-[0.85]">
                Reframing <span className="text-gradient">Hospitality</span><br />
                for the Boardroom
              </h1>
              <p className="text-3xl text-slate-400 mb-20 max-w-4xl mx-auto font-medium leading-relaxed italic">
                Elevate your professional service narrative into boardroom strategic dominance. Your elite career concierge begins.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-6xl mb-20 text-left">
                 <motion.div 
                    whileHover={{ scale: 1.02, y: -10 }}
                    onClick={() => setStep(1)}
                    className="card p-16 flex flex-col items-start gap-10 hover:border-amber-500/50 group cursor-pointer"
                 >
                    <Sparkles size={80} className="text-amber-500 group-hover:rotate-45 transition-transform duration-700" />
                    <div>
                      <h3 className="text-5xl font-black mb-4 tracking-tighter">Narrative Session</h3>
                      <p className="text-slate-500 text-xl font-bold uppercase tracking-widest leading-none">Complimentary Experience Refinement</p>
                    </div>
                 </motion.div>

                 <motion.div 
                    onClick={() => setStep(4)}
                    whileHover={{ scale: 1.02, y: -10 }}
                    className="card p-16 flex flex-col items-start gap-10 border-2 border-dashed border-white/10 hover:border-amber-500/50 group cursor-pointer"
                 >
                    <UploadCloud size={80} className="text-amber-500/40 group-hover:scale-110 transition-transform duration-700" />
                    <div>
                      <h3 className="text-5xl font-black mb-4 tracking-tighter text-slate-500">Portfolio Upload</h3>
                      <p className="text-slate-600 text-xl font-bold uppercase tracking-widest leading-none">Full Elite Concierge Package ($2.99)</p>
                    </div>
                    <div className="absolute top-8 right-8 bg-amber-500 text-black px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.2em] flex items-center gap-2">
                       <Lock size={12} /> ELITE ACCESS
                    </div>
                 </motion.div>
              </div>

              <button onClick={() => setStep(1)} className="sparkle-btn !px-24 !py-12 attention-pulse flex items-center gap-6">
                BEGIN YOUR REFINEMENT <Sparkles size={32} />
              </button>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div key="step1" {...slideTransition} className="container py-24 max-w-4xl z-10">
             <div className="card !p-20 shadow-[0_0_100px_rgba(251,191,36,0.1)]">
                <h2 className="text-6xl font-black mb-16 tracking-tighter border-l-8 border-amber-500 pl-10 uppercase">Concierge Profile</h2>
                <div className="space-y-12">
                    <div className="space-y-6">
                        <label className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-500">Full Professional Name</label>
                        <input className="concierge-input !text-3xl" placeholder="e.g. Alexander Sterling" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                    </div>
                    <div className="space-y-6">
                        <label className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-500">Professional Contact</label>
                        <input className="concierge-input !text-3xl" placeholder="professional@narrative.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                    </div>
                </div>
                <div className="mt-20">
                   <button onClick={() => setStep(2)} disabled={!formData.name || !formData.email} className="sparkle-btn w-full">
                     PROCEED TO NARRATIVE <ArrowRight size={28} className="ml-2" />
                   </button>
                </div>
             </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="step2" {...slideTransition} className="container py-24 max-w-6xl z-10">
             <div className="card !p-20">
                <div className="flex items-center gap-4 mb-2">
                   <Diamond size={24} className="text-amber-500" />
                   <span className="text-[10px] font-black tracking-[0.5em] text-slate-500 uppercase">Boardroom Transition Engine</span>
                </div>
                <h2 className="text-7xl font-black mb-16 tracking-tighter">Hospitality Career Narrative</h2>
                
                <div className="space-y-20">
                    {formData.roles.map((role, rIndex) => (
                      <div key={rIndex} className="p-16 bg-white/[0.02] border border-white/5 rounded-[3rem] space-y-12 relative overflow-hidden">
                         <div className="absolute top-0 right-0 p-8 text-white/5 font-black text-8xl pointer-events-none">{rIndex + 1}</div>
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-widest text-amber-500">Service Sector</label>
                                <select className="concierge-input" value={role.category} onChange={e => updateRole(rIndex, 'category', e.target.value)}>
                                   <option value="Operations">Operations Excellence</option>
                                   <option value="Server">Client Experience Strategy</option>
                                   <option value="Hospitality Mgmt">Elite Management</option>
                                   <option value="Other">Specialized Luxury Sector</option>
                                </select>
                                {role.category === 'Other' && <input className="concierge-input mt-4" placeholder="Specify sector..." value={role.otherCategory} onChange={e => updateRole(rIndex, 'otherCategory', e.target.value)} />}
                            </div>
                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-widest text-amber-500">Elite Title</label>
                                <input className="concierge-input" placeholder="e.g. Lead Guest Officer" value={role.jobTitle} onChange={e => updateRole(rIndex, 'jobTitle', e.target.value)} />
                            </div>
                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-widest text-amber-500">Professional Tenure</label>
                                <select className="concierge-input" value={role.years} onChange={e => updateRole(rIndex, 'years', e.target.value)}>
                                   {[1, 2, 3, 5, 10, 15, 20, 25].map(y => <option key={y} value={y}>{y === 25 ? '25+ Years' : `${y} Years`}</option>)}
                                </select>
                            </div>
                         </div>

                         <div className="space-y-10 relative z-10">
                            <h4 className="text-3xl font-black uppercase tracking-tighter">Achievement Insights</h4>
                            {role.responsibilities.map((resp, respIndex) => (
                               <div key={respIndex} className="space-y-4">
                                  <label className="text-[10px] font-black tracking-widest text-slate-600 uppercase">Hospitality Achievement Insight {respIndex + 1}</label>
                                  <textarea className="concierge-input h-32 resize-none italic" placeholder="Describe a high-stakes resolution or client relationship save..." value={resp} onChange={e => updateResponsibility(rIndex, respIndex, e.target.value)} />
                               </div>
                            ))}
                         </div>
                      </div>
                    ))}
                    
                    {!isElite && (
                       <button onClick={() => setStep(4)} className="w-full py-10 border-2 border-dashed border-white/5 rounded-[2.5rem] text-slate-500 font-black hover:bg-white/[0.04] transition-all tracking-widest uppercase text-xs flex items-center justify-center gap-4">
                         <Lock size={14} /> ADD ADDITIONAL SECTOR NARRATIVE (ELITE ONLY)
                       </button>
                    )}
                </div>

                {validationError && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-12 p-6 bg-amber-500/10 border border-amber-500/40 rounded-3xl text-amber-500 font-bold flex items-center gap-4">
                    <Info /> {validationError}
                  </motion.div>
                )}

                <div className="mt-20">
                   <button onClick={handleNext} disabled={loading} className="sparkle-btn w-full !h-24 !text-3xl">
                     {loading ? <Loader2 className="animate-spin text-black" size={40} /> : <><Sparkles size={32} /> RE-MAP TO BOARDROOM STRATEGY</>}
                   </button>
                </div>
             </div>
          </motion.div>
        )}

        {step === 3 && results && (
            <motion.div key="step3" {...slideTransition} className="container py-24 max-w-7xl z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-8 space-y-16">
                         <div className="card !p-16 border-l-[12px] border-amber-500 shadow-[0_0_120px_rgba(251,191,36,0.15)]">
                             <div className="flex items-center justify-between mb-12">
                                <h3 className="text-5xl font-black tracking-tighter flex items-center gap-6">
                                    <Crown className="text-amber-500" size={48} /> Boardroom Strategy Narrative
                                </h3>
                             </div>
                             <UpgradeMarquee text="BOARDROOM CONCIERGE DELIVERABLE" />
                             <ul className="space-y-10">
                                {results.resume.map((point, i) => (
                                    <li key={i} className="flex gap-8 p-10 bg-white/[0.02] border border-white/5 rounded-[2.5rem] italic text-2xl leading-relaxed text-slate-100">
                                        <Sparkles className="text-amber-500 shrink-0 mt-1" size={24} /> "{point}"
                                    </li>
                                ))}
                             </ul>
                         </div>
                    </div>
                    <div className="lg:col-span-4">
                        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="card !p-16 border-2 border-amber-500 sticky top-12 flex flex-col items-center text-center">
                            <Diamond className="text-amber-500 mb-8" size={64} fill="currentColor" />
                            <h3 className="text-5xl font-black mb-8 tracking-tighter">Elite Portfolio Upgrade</h3>
                            <div className="text-7xl font-black mb-12 tracking-tighter">$2.99</div>
                            <p className="text-slate-500 font-medium text-lg mb-12 uppercase tracking-widest">A one-time professional investment in your career trajectory.</p>
                            <button onClick={() => setStep(4)} className="sparkle-btn !text-xl !px-10">
                                FINALIZE ELITE UPGRADE
                            </button>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        )}

        {step === 4 && (
            <motion.div key="step4" {...slideTransition} className="container min-h-screen flex items-center justify-center py-24 z-10">
                <div className="card !p-20 max-w-4xl w-full flex flex-col items-center bg-gradient-to-b from-white/[0.04] to-transparent border-t-[16px] border-amber-500">
                    <Crown size={80} className="text-amber-500 mb-10 drop-shadow-[0_0_30px_rgba(251,191,36,0.5)]" />
                    <h2 className="text-8xl font-black mb-6 tracking-tight text-center">Professional Investment</h2>
                    <p className="text-center text-slate-400 text-2xl font-medium mb-16 max-w-xl italic">Securing your boardroom-ready concierge package. Human-polished, relationship-driven, and designed for dominance.</p>
                    
                    <div className="w-full space-y-12 mb-16">
                        <div className="p-12 bg-white/[0.02] border border-white/5 rounded-[3rem] space-y-8">
                           <div className="flex justify-between items-center px-2">
                              <span className="text-slate-500 font-black tracking-widest uppercase text-xs">Selection</span>
                              <span className="text-slate-300 font-black text-2xl underline decoration-amber-500 decoration-4">Elite Concierge Portfolio</span>
                           </div>
                           <div className="flex justify-between items-center px-2">
                              <span className="text-slate-500 font-black tracking-widest uppercase text-xs">One-time Fee</span>
                              <span className="text-amber-500 font-black text-6xl tracking-tighter">$2.99</span>
                           </div>
                        </div>

                        <div className="space-y-6">
                            <input className="concierge-input !bg-white/[0.04]" placeholder="Mastercard or Visa" />
                            <div className="grid grid-cols-2 gap-6">
                                <input className="concierge-input !bg-white/[0.04]" placeholder="MM / YY" />
                                <input className="concierge-input !bg-white/[0.04]" placeholder="CVC" />
                            </div>
                            <button className="sparkle-btn w-full !h-24 !text-3xl">FINALIZE INVESTMENT <ArrowRight size={32} className="ml-3" /></button>
                            
                            <button className="google-pay-concierge">
                                <Sparkles size={24} className="text-amber-500" /> 
                                <span className="text-white text-3xl font-black tracking-tighter">Pay with <span className="text-amber-500">Google Pay</span></span>
                            </button>
                        </div>
                    </div>

                    <button onClick={() => setStep(0)} className="text-slate-600 font-black tracking-[0.4em] uppercase text-xs hover:text-white transition-colors">Abstain from Investment Session</button>
                </div>
            </motion.div>
        )}
      </AnimatePresence>

      <footer className="py-20 border-t border-white/5 mt-auto w-full z-10 bg-black/80 backdrop-blur-3xl">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
          <div className="flex items-center gap-4 text-amber-500 font-black tracking-[0.3em] text-xs uppercase">
            <Sparkles size={24} /> THE TRANSLATOR | BOARDROOM CONCIERGE EDITION
          </div>
          <div className="text-slate-700 text-xs font-black uppercase tracking-[0.8em]">
            &copy; 2026 PROFESSIONAL REFRAMING SYSTEM
          </div>
        </div>
      </footer>
    </div>
  );
}

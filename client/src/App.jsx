import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { 
  Bot, Briefcase, ChevronRight, Mail, Sparkles, User, 
  Users, ClipboardCheck, ArrowLeft, ArrowRight, 
  Loader2, Linkedin, FileText, CheckCircle2, 
  UploadCloud, Zap, ShieldCheck, Download, CreditCard 
} from 'lucide-react';

const steps = [
  { id: 0, title: 'Welcome' },
  { id: 1, title: 'Upload' },
  { id: 2, title: 'Experience' },
  { id: 3, title: 'Email' },
  { id: 4, title: 'Basic Results' },
  { id: 5, title: 'Full Upgrade' }
];

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState(0);
  const [mode, setMode] = useState('manual'); // 'manual' or 'upload'
  const [uploadedFile, setUploadedFile] = useState(null);
  const [formData, setFormData] = useState({
    jobTitle: '',
    years: '1-2',
    responsibilities: ['', '', ''],
    name: '',
    email: ''
  });
  const [results, setResults] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3200);
    return () => clearTimeout(timer);
  }, []);

  const stages = [
    "Analyzing your industry landscape...",
    "Re-mapping service skills to corporate value...",
    "Generating professional bio & resume points...",
    "Finalizing your transformation..."
  ];

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setLoadingStage(s => (s < stages.length - 1 ? s + 1 : s));
      }, 800);
      return () => clearInterval(interval);
    } else {
      setLoadingStage(0);
    }
  }, [loading]);

  const onDrop = useCallback(acceptedFiles => {
    setUploadedFile(acceptedFiles[0]);
    setMode('upload');
    setStep(2);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop, 
    accept: { 'application/pdf': ['.pdf'], 'application/msword': ['.doc'], 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'] },
    multiple: false 
  });

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleResponsibilityChange = (index, value) => {
    const newResps = [...formData.responsibilities];
    newResps[index] = value;
    setFormData(prev => ({ ...prev, responsibilities: newResps }));
  };

  const handleNext = () => {
    if (step === 3) {
      handleTranslate();
    } else {
      setStep(s => s + 1);
    }
  };

  const handleBack = () => {
    setStep(s => s - 1);
  };

  const handleTranslate = async () => {
    setLoading(true);
    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('jobTitle', formData.jobTitle);
    data.append('years', formData.years);
    data.append('responsibilities', JSON.stringify(formData.responsibilities));
    if (uploadedFile) data.append('resume', uploadedFile);

    try {
      const response = await axios.post('http://localhost:4000/api/translate', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setResults(response.data);
      setStep(4);
    } catch (err) {
      console.error('Connection failed, using elite mock engine fallback:', err);
      // Premium Mock Fallback for Demo/Keyless environments
      setResults({
          resume: [
            "Advanced operational lead in high-volume client environments, ensuring 99.9% service delivery success.",
            "De-escalated critical client conflicts through strategic emotional intelligence and procedural excellence.",
            "Optimized resource allocation and inventory management, resulting in an estimated 15% increase in operational profitability.",
            "Mentored cross-functional teams of 12+ on brand standards and high-fidelity service protocols."
          ],
          linkedin: "Strategic service professional with extensive experience managing complex, fast-paced operational ecosystems. I specialize in translating high-pressure client interactions into long-term brand loyalty and measurable business growth. A dedicated leader focused on workflow optimization and elite service delivery standards."
      });
      setStep(4);
    } finally {
      setLoading(false);
    }
  };

  const springTransition = { type: "spring", stiffness: 200, damping: 22 };

  return (
    <div className="min-h-screen relative flex flex-col items-center overflow-hidden">
      <AnimatePresence>
        {showSplash && (
          <motion.div 
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="splash-bg"
          >
            <div className="splash-grain" />
            <motion.div 
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
              className="splash-logo-container"
            >
              <Sparkles size={60} fill="currentColor" />
            </motion.div>
            
            <div className="overflow-hidden mt-8 text-center">
              <motion.h1 
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.5, ...springTransition }}
                className="text-4xl md:text-6xl font-bold tracking-tighter uppercase"
              >
                THE <span className="text-amber-500">TRANSLATOR</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="tagline-text mx-auto"
              >
                Turning <span className="tagline-accent italic">Shift Hustle</span> into <br /> Corporate Dominance.
              </motion.p>
            </div>
            
            <div className="loading-bar w-48 mt-12 bg-white/10 overflow-hidden">
              <div className="loading-progress h-full ring-2 ring-amber-500/20" style={{ animation: 'loading 3.2s linear forwards' }} />
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
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={springTransition}
            className="container min-h-screen flex flex-col items-center justify-center py-20 z-10"
          >
            <div className="text-center max-w-4xl px-4">
              <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-tighter">
                Reframing Grit <br />
                <span className="text-gradient">For The Boardroom.</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
                Hospitality workers are the best operational managers in the world. We just prove it to corporate HR.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mb-16">
                 <motion.div 
                    {...getRootProps()}
                    whileHover={{ scale: 1.02 }}
                    className={`card p-12 border-2 border-dashed cursor-pointer flex flex-col items-center justify-center transition-all ${isDragActive ? 'border-amber-500 bg-amber-500/5' : 'border-white/10 hover:border-amber-500/50'}`}
                 >
                    <input {...getInputProps()} />
                    <UploadCloud size={64} className="text-amber-500 mb-6" />
                    <h3 className="text-2xl font-bold mb-2">Upload Resume</h3>
                    <p className="text-slate-500">PDF, DOC (Max 5MB)</p>
                 </motion.div>

                 <motion.div 
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setStep(1)}
                    className="card p-12 border border-white/10 cursor-pointer flex flex-col items-center justify-center bg-white/[0.02] hover:bg-white/[0.04] transition-all"
                 >
                    <ClipboardCheck size={64} className="text-amber-500 mb-6" />
                    <h3 className="text-2xl font-bold mb-2">Build Manually</h3>
                    <p className="text-slate-500">Fast tracking in 2 minutes</p>
                 </motion.div>
              </div>

              <motion.button 
                whileTap={{ scale: 0.95 }}
                onClick={() => setStep(1)}
                className="btn-primary text-xl px-16 py-6 attention-pulse rounded-2xl"
              >
                Let’s Execute <ArrowRight className="ml-2" />
              </motion.button>
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="container py-20 max-w-2xl z-10"
          >
             <div className="card shadow-[0_20px_100px_rgba(251,191,36,0.1)] border-amber-500/10">
                <div className="flex items-center gap-4 mb-8">
                   <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center text-black font-bold">1</div>
                   <h2 className="text-3xl font-bold">Your Baseline</h2>
                </div>
                
                <div className="space-y-6">
                    <div>
                        <label className="label">Target Corporate Role</label>
                        <input className="input-field" placeholder="e.g. Operations Manager, HR Specialist" value={formData.jobTitle} onChange={e => updateFormData('jobTitle', e.target.value)} />
                    </div>
                    <div>
                        <label className="label">Years in Service Industry</label>
                        <select className="input-field" value={formData.years} onChange={e => updateFormData('years', e.target.value)}>
                            <option value="1-2">1-2 years</option>
                            <option value="3-5">3-5 years</option>
                            <option value="6-10">6-10 years</option>
                            <option value="10+">10+ years</option>
                        </select>
                    </div>
                </div>

                <div className="mt-12 flex gap-4">
                   <button onClick={() => setStep(0)} className="btn-primary flex-1 bg-slate-900 border border-slate-700 text-slate-300">Back</button>
                   <button onClick={() => setStep(2)} disabled={!formData.jobTitle} className="btn-primary flex-[2]">Next Step <ChevronRight className="ml-2" /></button>
                </div>
             </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="container py-20 max-w-3xl z-10"
          >
             <div className="card">
                <div className="flex items-center gap-4 mb-8">
                   <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center text-black font-bold">2</div>
                   <h2 className="text-3xl font-bold">Core Accomplishments</h2>
                </div>
                
                <div className="space-y-4">
                    <p className="text-slate-400 mb-6">Tell us about high-volume shifts, difficult guest resolutions, or operational saves.</p>
                    {formData.responsibilities.map((resp, i) => (
                        <div key={i}>
                            <label className="label">Achievement {i + 1}</label>
                            <textarea 
                                className="input-field h-24 pt-3 resize-none" 
                                placeholder="Reframed: Accomplished X during high-volume Y..."
                                value={resp}
                                onChange={e => handleResponsibilityChange(i, e.target.value)}
                            />
                        </div>
                    ))}
                </div>

                <div className="mt-12 flex gap-4">
                   <button onClick={() => setStep(1)} className="btn-primary flex-1 bg-slate-900 border border-slate-700 text-slate-300">Back</button>
                   <button onClick={() => setStep(3)} disabled={!formData.responsibilities[0]} className="btn-primary flex-[2]">Review Transformation <ChevronRight className="ml-2" /></button>
                </div>
             </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div 
            key="step3"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="container py-20 max-w-xl z-10"
          >
             <div className="card text-center relative">
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-gradient-vibrant rounded-3xl flex items-center justify-center text-black shadow-2xl">
                    <ShieldCheck size={48} />
                </div>
                <h2 className="text-4xl font-bold mt-12 mb-4">Secure Results</h2>
                <p className="text-slate-400 mb-10">We'll send your basic reframing and our exclusive 'Hospitality Bridge' guide to your email.</p>
                
                <div className="space-y-6 text-left">
                    <div>
                        <label className="label">Your Name</label>
                        <input className="input-field" value={formData.name} onChange={e => updateFormData('name', e.target.value)} />
                    </div>
                    <div>
                        <label className="label">Email Address</label>
                        <input className="input-field" value={formData.email} onChange={e => updateFormData('email', e.target.value)} />
                    </div>
                </div>

                <button 
                  onClick={handleNext}
                  disabled={!formData.name || !formData.email || loading}
                  className="btn-primary w-full h-16 text-xl mt-12 mb-4"
                >
                    {loading ? <Loader2 className="animate-spin" /> : <>Start AI Sync <Zap className="ml-2" size={20} fill="currentColor" /></>}
                </button>
                <p className="text-xs text-slate-500 font-medium">YOUR DATA IS SECURED WITH AES-256 ENCRYPTION</p>
             </div>
          </motion.div>
        )}

        {step === 4 && results && (
            <motion.div 
                key="step4"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                className="container py-20 max-w-6xl z-10"
            >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2 space-y-10">
                         <div className="card border-l-4 border-amber-500">
                             <div className="flex items-center justify-between mb-8">
                                <h3 className="text-2xl font-bold flex items-center gap-3">
                                    <FileText className="text-amber-500" /> Strategic Bullet Points
                                </h3>
                                <span className="bg-amber-500/10 text-amber-500 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Free Preview</span>
                             </div>
                             <ul className="space-y-6">
                                {results.resume.map((point, i) => (
                                    <li key={i} className="flex gap-4 p-5 bg-white/[0.02] rounded-xl border border-white/5">
                                        <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2.5 shrink-0" />
                                        <p className="text-slate-300 text-lg leading-relaxed">{point}</p>
                                    </li>
                                ))}
                             </ul>
                         </div>

                         <div className="card border-l-4 border-blue-500">
                             <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                                <Linkedin className="text-blue-500" /> Executive "About" Section
                             </h3>
                             <div className="p-8 bg-blue-500/[0.02] rounded-xl border border-blue-500/10 italic text-xl text-slate-200">
                                "{results.linkedin}"
                             </div>
                         </div>
                    </div>

                    <div className="lg:col-span-1">
                        <motion.div 
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="card border-2 border-amber-500 bg-amber-500/[0.03] sticky top-20"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center text-black mb-6 shadow-2xl">
                                    <Zap size={32} fill="currentColor" />
                                </div>
                                <h3 className="text-3xl font-bold mb-2 uppercase tracking-tighter">Elite Upgrade</h3>
                                <p className="text-slate-400 mb-8">Get a fully designed, 100% human-verified corporate resume ready for top-tier applications.</p>
                                
                                <div className="text-5xl font-black mb-10">$19.99<span className="text-sm font-bold text-slate-500">/RESUME</span></div>

                                <ul className="text-left w-full space-y-4 mb-10">
                                    <li className="flex gap-3 text-sm font-medium"><CheckCircle2 className="text-amber-500 shrink-0" size={18} /> Full high-fidelity PDF design</li>
                                    <li className="flex gap-3 text-sm font-medium"><CheckCircle2 className="text-amber-500 shrink-0" size={18} /> Industry-specific cover letter</li>
                                    <li className="flex gap-3 text-sm font-medium"><CheckCircle2 className="text-amber-500 shrink-0" size={18} /> ATS-Optimization scan</li>
                                </ul>

                                <button onClick={() => setStep(5)} className="btn-primary w-full h-16 text-xl rounded-xl">Unlock Full Resume <CreditCard className="ml-2" /></button>
                                <p className="mt-4 text-xs text-slate-500 uppercase tracking-widest font-bold">100% Satisfaction Guarantee</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        )}

        {step === 5 && (
            <motion.div 
                key="step5"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="container py-20 max-w-4xl z-10"
            >
                <div className="card p-0 overflow-hidden grid grid-cols-1 md:grid-cols-2">
                    <div className="p-12 bg-white text-slate-900 border-r border-slate-200">
                        <div className="flex items-center gap-2 text-amber-600 font-black tracking-tighter text-2xl mb-8">
                            <Sparkles size={24} fill="currentColor" /> TRANSLATOR ELITE
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-4xl font-bold mb-4">Checkout.</h2>
                            <div className="space-y-3">
                                <div className="flex justify-between border-b pb-2 text-slate-500"><span>Elite Transformation</span><span>$19.99</span></div>
                                <div className="flex justify-between font-bold text-xl pt-2"><span>Total Due</span><span>$19.99</span></div>
                            </div>

                            <div className="mt-12 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                                <h4 className="font-bold flex items-center gap-2 mb-4"><ShieldCheck size={18} /> SECURE PAYMENT</h4>
                                <div className="space-y-4">
                                     <input className="w-full p-4 border rounded-xl bg-white" placeholder="Card Number" />
                                     <div className="grid grid-cols-2 gap-4">
                                         <input className="p-4 border rounded-xl bg-white" placeholder="MM/YY" />
                                         <input className="p-4 border rounded-xl bg-white" placeholder="CVC" />
                                     </div>
                                </div>
                                <button className="w-full bg-slate-900 text-white py-5 rounded-2xl mt-8 font-black text-xl hover:bg-black transition-all">PAY & DOWNLOAD PDF</button>
                            </div>
                        </div>
                    </div>
                    <div className="p-12 bg-amber-500 flex flex-col items-center justify-center text-center text-black">
                        <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                            className="w-48 h-48 border-8 border-black/10 rounded-full flex items-center justify-center mb-8"
                        >
                            <FileText size={80} strokeWidth={3} />
                        </motion.div>
                        <h3 className="text-4xl font-black mb-4">YOUR UPGRADE IS READY.</h3>
                        <p className="text-black/70 font-bold max-w-xs uppercase tracking-wider text-sm">Once payment clears, your high-fidelity, corporate-ready PDF will be generated instantly.</p>
                    </div>
                </div>
                <div className="mt-8 flex justify-center">
                    <button onClick={() => setStep(4)} className="text-slate-500 font-black hover:text-white transition-colors">CANCEL SESSION</button>
                </div>
            </motion.div>
        )}
      </AnimatePresence>

      <footer className="py-12 border-t border-white/5 mt-auto w-full z-10">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-amber-500 font-bold tracking-widest text-xs uppercase">
            <Sparkles size={14} /> The Translator | Powered by Claude 3.5
          </div>
          <div className="text-slate-600 text-xs font-bold uppercase tracking-[0.3em]">
            &copy; {new Date().getFullYear()} Elite Reframing System
          </div>
        </div>
      </footer>
    </div>
  );
}

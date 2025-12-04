import React, { useEffect, useState, useRef } from 'react';
import RequestDemoForm from './components/RequestDemoForm';
import { Logo, CheckCircle, MenuIcon, ArrowRight, Microphone, Pill, CreditCard, Beaker, Clipboard, Shield, Lock, BadgeCheck } from './components/Icons';
import AIChat from './components/AIChat';

// --- Hooks & Utilities ---

const useScrollReveal = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
};

const Counter: React.FC<{ end: number; prefix?: string; suffix?: string; duration?: number }> = ({ end, prefix = '', suffix = '', duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTimestamp: number | null = null;
          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) {
              window.requestAnimationFrame(step);
            }
          };
          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
};

// --- Components ---

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToDemo = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-3 bg-white/95 backdrop-blur-md shadow-sm' : 'py-6 bg-transparent'}`}>
      <div className="container mx-auto px-4 md:px-12 flex justify-between items-center">
        {/* Adjusted Logo container to align nicely */}
        <div className="flex items-center">
          <Logo variant="full" className="h-10 md:h-12 w-auto transition-transform duration-300 hover:scale-105" />
        </div>
        
        <nav className="hidden md:flex gap-8 items-center font-medium text-base">
          {['Product', 'Summit Voice', 'Pricing', 'Company'].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-gray-600 hover:text-summit-600 transition-colors relative group">
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-summit-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          <button 
            onClick={scrollToDemo}
            className="bg-summit-600 hover:bg-summit-700 text-white px-5 py-2.5 rounded-full transition-all shadow-lg shadow-summit-200 hover:shadow-summit-300 hover:-translate-y-0.5 text-base font-semibold"
          >
            Book Demo
          </button>
        </nav>
        
        <button className="md:hidden text-gray-800">
          <MenuIcon className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
};

const StatsBar: React.FC = () => (
  <div className="bg-summit-950 py-12 text-white border-t border-summit-900 overflow-hidden">
    <div className="container mx-auto px-4 md:px-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-summit-800/50">
        <div className="reveal reveal-up">
          <div className="text-3xl md:text-4xl font-bold text-summit-400 mb-2">
            <Counter end={2} suffix="h+" />
          </div>
          <div className="text-base text-gray-400 uppercase tracking-wider">Saved Daily</div>
        </div>
        <div className="reveal reveal-up delay-100">
          <div className="text-3xl md:text-4xl font-bold text-summit-400 mb-2">
             <Counter end={99} suffix="%" />
          </div>
          <div className="text-base text-gray-400 uppercase tracking-wider">Clean Claims</div>
        </div>
        <div className="reveal reveal-up delay-200">
          <div className="text-3xl md:text-4xl font-bold text-summit-400 mb-2">
             <Counter end={30} prefix="<" suffix="s" />
          </div>
          <div className="text-base text-gray-400 uppercase tracking-wider">Note Completion</div>
        </div>
        <div className="reveal reveal-up delay-300">
          <div className="text-3xl md:text-4xl font-bold text-summit-400 mb-2">ONC</div>
          <div className="text-base text-gray-400 uppercase tracking-wider">Certified HealthIT</div>
        </div>
      </div>
    </div>
  </div>
);

const Hero: React.FC = () => {
  const scrollToDemo = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 bg-gradient-to-b from-white to-summit-50 overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-summit-100 rounded-full blur-3xl opacity-40 translate-x-1/3 -translate-y-1/3 animate-pulse" style={{animationDuration: '8s'}}></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-100 rounded-full blur-3xl opacity-40 -translate-x-1/3 translate-y-1/3 animate-pulse" style={{animationDuration: '10s'}}></div>

      <div className="container mx-auto px-4 md:px-12 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16">
          <div className="reveal reveal-down inline-flex items-center gap-2 px-3 py-1 rounded-full bg-summit-100 text-summit-700 text-sm font-bold uppercase tracking-wide mb-6 border border-summit-200 hover:bg-summit-200 transition-colors cursor-default">
            <span className="w-2 h-2 rounded-full bg-summit-500 animate-pulse"></span>
            Now featuring Summit Voice AI
          </div>
          <h1 className="reveal reveal-up delay-100 text-5xl md:text-7xl font-serif font-bold text-gray-900 mb-6 leading-[1.1]">
            The EHR that listens, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-summit-600 to-ocean-500">learns, and lets you lead.</span>
          </h1>
          <p className="reveal reveal-up delay-200 text-2xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Reclaim your time with summitEHR. The first platform built on ambient intelligence to eliminate burnout and restore the patient connection.
          </p>
          <div className="reveal reveal-up delay-300 flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
            <button 
              onClick={scrollToDemo}
              className="bg-summit-600 hover:bg-summit-700 text-white font-bold py-4 px-10 rounded-full transition-all shadow-xl shadow-summit-200 hover:shadow-summit-300 hover:-translate-y-1 flex items-center justify-center gap-2 text-lg active:scale-95"
            >
              Start Free Trial <ArrowRight className="w-5 h-5" />
            </button>
            <button className="bg-white hover:bg-gray-50 text-gray-700 font-bold py-4 px-10 rounded-full border border-gray-200 transition-all hover:border-gray-300 hover:shadow-md hover:-translate-y-1 flex items-center justify-center gap-2 text-lg active:scale-95">
               See How It Works
            </button>
          </div>
        </div>

        {/* Dashboard Mockup */}
        <div className="relative max-w-6xl mx-auto reveal reveal-zoom delay-300">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-white transform transition-transform hover:scale-[1.01] duration-500">
            <div className="absolute top-0 left-0 right-0 h-12 bg-gray-50 border-b border-gray-200 flex items-center px-4 gap-2">
              <div className="flex gap-2">
                 <div className="w-3 h-3 rounded-full bg-red-400"></div>
                 <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                 <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="mx-auto text-sm font-medium text-gray-400 bg-white px-3 py-1 rounded-md border border-gray-200 shadow-sm">app.summitehr.com/dashboard</div>
            </div>
            <img src="https://dataqhealth.com/wp-content/uploads/dasboard-ehr.png" alt="Dashboard" className="w-full h-auto mt-12" />
            
            {/* Floating UI Element 1 */}
            <div className="absolute top-24 right-8 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/40 max-w-xs animate-float hidden md:block hover:scale-105 transition-transform">
              <div className="flex items-center gap-3 mb-2">
                 <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600"><CheckCircle className="w-4 h-4"/></div>
                 <div>
                    <div className="text-sm text-gray-500">Efficiency Score</div>
                    <div className="font-bold text-gray-800 text-lg">98/100</div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'provider' | 'admin' | 'patient'>('provider');

  const content = {
    provider: {
      title: "Clinician-First Design",
      desc: "Workflows that flow. Smart templates that learn your preferences, and a mobile interface that actually works.",
      features: ["iPad Native Charting", "One-Click Orders", "Smart Macros"],
      image: "https://picsum.photos/600/500?random=11"
    },
    admin: {
      title: "Powerful RCM & Analytics",
      desc: "Stop revenue leakage before it starts. Real-time eligibility, automated claim scrubbing, and insightful reporting.",
      features: ["99% First Pass Rate", "HEDIS Measures", "Staff Productivity"],
      image: "https://picsum.photos/600/500?random=12"
    },
    patient: {
      title: "Engaged Patient Portal",
      desc: "A portal patients actually use. Self-scheduling, easy bill pay, and secure messaging in a friendly interface.",
      features: ["Mobile Check-in", "Telehealth Built-in", "Digital Intake Forms"],
      image: "https://picsum.photos/600/500?random=13"
    }
  };

  return (
    <section id="product" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-12">
        <div className="text-center mb-16 reveal reveal-up">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-4">One Platform, Three Perspectives</h2>
          <p className="text-xl text-gray-600">Designed to unify your entire practice ecosystem.</p>
        </div>

        <div className="flex justify-center mb-12 reveal reveal-up delay-100">
          <div className="inline-flex bg-gray-100 p-1.5 rounded-full">
            {(['provider', 'admin', 'patient'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-full text-base font-bold capitalize transition-all duration-300 ${
                  activeTab === tab 
                    ? 'bg-white text-summit-700 shadow-sm scale-105' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-summit-50 rounded-3xl p-8 md:p-12 transition-all duration-500 reveal reveal-zoom delay-200">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 key={activeTab} animate-fade-in-up">
              <h3 className="text-3xl font-bold text-gray-900">{content[activeTab].title}</h3>
              <p className="text-xl text-gray-600 leading-relaxed">{content[activeTab].desc}</p>
              <ul className="space-y-4 pt-4">
                {content[activeTab].features.map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-800 font-medium text-lg">
                    <CheckCircle className="w-5 h-5 text-summit-500" /> {f}
                  </li>
                ))}
              </ul>
              <button className="mt-6 text-summit-700 font-bold hover:text-summit-800 inline-flex items-center gap-2 text-lg group">
                Learn more about {activeTab} tools <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="relative group">
               <div className="absolute inset-0 bg-gradient-to-tr from-summit-200 to-transparent rounded-2xl transform rotate-3 scale-105 opacity-50 group-hover:rotate-6 transition-transform duration-500"></div>
               <img 
                 key={activeTab} // Forces re-render for animation
                 src={content[activeTab].image} 
                 alt={activeTab} 
                 className="relative rounded-2xl shadow-xl w-full h-auto object-cover transform transition-all duration-500 hover:scale-[1.01] animate-fade-in" 
               />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const VoiceSection: React.FC = () => (
  <section id="summit-voice" className="py-24 bg-gray-900 text-white relative overflow-hidden">
    {/* Grid Background */}
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
    
    <div className="container mx-auto px-4 md:px-12 relative z-10">
      <div className="flex flex-col md:flex-row items-center gap-16">
        <div className="flex-1 reveal reveal-left">
           <div className="w-16 h-16 bg-summit-500 rounded-2xl flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(34,197,94,0.4)] animate-pulse">
              <Microphone className="w-8 h-8 text-white" />
           </div>
           <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6">Summit Voice.</h2>
           <h3 className="text-2xl text-summit-400 mb-6 font-light">Don't type. Just talk.</h3>
           <p className="text-gray-300 text-xl leading-relaxed mb-8">
             Our ambient clinical intelligence listens to your patient visits (securely and privately) and generates structured SOAP notes in seconds. 
             It integrates seamlessly into the chart, ready for your review.
           </p>
           <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-lg border border-white/10 hover:bg-white/10 transition-colors cursor-default">
                 <div className="w-2 h-8 bg-summit-500 rounded-full animate-pulse"></div>
                 <div className="w-2 h-12 bg-summit-400 rounded-full animate-pulse" style={{animationDelay: '0.1s'}}></div>
                 <div className="w-2 h-6 bg-summit-600 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                 <div className="w-2 h-10 bg-summit-500 rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></div>
                 <div className="text-base text-gray-400 ml-4">Capturing ambient audio...</div>
              </div>
           </div>
        </div>
        <div className="flex-1 reveal reveal-right delay-200">
           <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-2xl max-w-md mx-auto relative hover:scale-105 transition-transform duration-500">
              <div className="absolute -top-4 -right-4 bg-yellow-500 text-gray-900 text-sm font-bold px-3 py-1 rounded-full shadow-lg">BETA ACCESS</div>
              <div className="space-y-4">
                 <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-600"></div>
                    <div className="flex-1 space-y-2">
                       <div className="h-2 bg-gray-600 rounded w-1/4"></div>
                       <div className="h-16 bg-gray-700 rounded w-full"></div>
                    </div>
                 </div>
                 <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-summit-600 flex items-center justify-center text-sm font-bold">AI</div>
                    <div className="flex-1 space-y-2">
                       <div className="h-2 bg-gray-600 rounded w-1/4"></div>
                       <div className="bg-summit-900/50 p-3 rounded text-base text-summit-100 border border-summit-800">
                          <span className="text-summit-400 font-bold">Assessment:</span> Patient presents with acute bronchitis. Lungs are clear to auscultation bilaterally, though mild wheezing noted...
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  </section>
);

const ComprehensiveFeatures: React.FC = () => {
  const scrollToDemo = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-24 bg-gray-50" id="features">
       <div className="container mx-auto px-4 md:px-12">
          <div className="text-center mb-16 reveal reveal-up">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-4">Complete Practice Management</h2>
            <p className="text-xl text-gray-600">From intake to reimbursement, we handle the complex details.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(300px,auto)]">
             
             {/* Large Card: ePrescribing */}
             <div className="md:col-span-2 bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group reveal reveal-left">
                <div className="relative z-10">
                   <div className="w-12 h-12 bg-ocean-500/10 rounded-xl flex items-center justify-center text-ocean-500 mb-6 group-hover:scale-110 transition-transform">
                      <Pill className="w-6 h-6" />
                   </div>
                   <h3 className="text-2xl font-bold text-gray-900 mb-3">Real-Time ePrescribing & Pharmacy</h3>
                   <p className="text-gray-600 max-w-md text-base">Instantly route prescriptions to over 65,000 pharmacies nationwide. Features automatic interaction checks, medication history, and EPCS compliance built-in.</p>
                   <ul className="mt-6 space-y-2">
                      <li className="flex items-center gap-2 text-base text-gray-700"><CheckCircle className="w-4 h-4 text-summit-500"/> Real-time benefit checks</li>
                      <li className="flex items-center gap-2 text-base text-gray-700"><CheckCircle className="w-4 h-4 text-summit-500"/> PDMP integration</li>
                      <li className="flex items-center gap-2 text-base text-gray-700"><CheckCircle className="w-4 h-4 text-summit-500"/> Pharmacy preference management</li>
                   </ul>
                </div>
                {/* Decorative background */}
                <div className="absolute right-0 bottom-0 w-64 h-64 bg-ocean-500/5 rounded-tl-full opacity-50 group-hover:scale-110 transition-transform duration-700"></div>
             </div>

             {/* Tall Card: RCM */}
             <div className="md:row-span-2 bg-gray-900 text-white rounded-2xl p-8 shadow-xl relative overflow-hidden group reveal reveal-right delay-100 hover:shadow-2xl transition-all">
                <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10">
                   <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-white mb-6 group-hover:bg-summit-600 transition-colors duration-300">
                      <CreditCard className="w-6 h-6" />
                   </div>
                   <h3 className="text-2xl font-bold mb-3">Revenue Cycle (RCM)</h3>
                   <p className="text-gray-300 mb-8 text-base">Stop revenue leakage with our end-to-end financial suite.</p>
                   
                   <ul className="space-y-6">
                      <li className="flex gap-3 text-base border-b border-gray-700 pb-4">
                         <div className="w-6 h-6 rounded-full bg-summit-500/20 text-summit-400 flex items-center justify-center text-sm shrink-0">1</div>
                         <div>
                            <div className="font-bold">Charge Capture</div>
                            <div className="text-gray-400 text-sm mt-1">Automated coding suggestions at the point of care.</div>
                         </div>
                      </li>
                      <li className="flex gap-3 text-base border-b border-gray-700 pb-4">
                         <div className="w-6 h-6 rounded-full bg-summit-500/20 text-summit-400 flex items-center justify-center text-sm shrink-0">2</div>
                         <div>
                            <div className="font-bold">Smart Superbills</div>
                            <div className="text-gray-400 text-sm mt-1">Instant generation at checkout with scrubbing.</div>
                         </div>
                      </li>
                      <li className="flex gap-3 text-base">
                         <div className="w-6 h-6 rounded-full bg-summit-500/20 text-summit-400 flex items-center justify-center text-sm shrink-0">3</div>
                         <div>
                            <div className="font-bold">Claims Submission</div>
                            <div className="text-gray-400 text-sm mt-1">99% first-pass acceptance rate.</div>
                         </div>
                      </li>
                   </ul>
                </div>
             </div>

             {/* Card: Labs */}
             <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 reveal reveal-up delay-200 group">
                <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 mb-4 group-hover:scale-110 transition-transform">
                   <Beaker className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Integrated Labs</h3>
                <p className="text-gray-600 text-base">Bi-directional interfaces with Quest, LabCorp, and hospital systems. Results flow directly into the patient chart.</p>
             </div>

             {/* Card: Intake Forms */}
             <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 reveal reveal-up delay-300 group">
                <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600 mb-4 group-hover:scale-110 transition-transform">
                   <Clipboard className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Digital Intake</h3>
                <p className="text-gray-600 text-base">Send HIPAA-compliant forms to patients before they arrive. Data auto-populates the encounter note, saving staff time.</p>
             </div>

             {/* Wide Card: Patient Encounters (Span 3) */}
             <div className="md:col-span-3 bg-gradient-to-r from-summit-600 to-summit-800 text-white rounded-2xl p-8 shadow-lg relative overflow-hidden flex flex-col md:flex-row items-center gap-8 reveal reveal-up delay-200 group">
                 <div className="flex-1 relative z-10">
                    <h3 className="text-2xl font-bold mb-3">Streamlined Patient Encounters</h3>
                    <p className="text-summit-100 mb-6 text-lg">Whether you prefer SOAP, AP, or custom templates, our encounter engine adapts to your specialty. View history, vitals, and documents in a single pane without clicking away.</p>
                    <div className="flex gap-4">
                      <div className="bg-white/10 px-4 py-2 rounded-lg text-base border border-white/20 hover:bg-white/20 cursor-default transition-colors">Problem-Oriented Charting</div>
                      <div className="bg-white/10 px-4 py-2 rounded-lg text-base border border-white/20 hover:bg-white/20 cursor-default transition-colors">Specialty Templates</div>
                    </div>
                 </div>
                 <div className="flex-1 w-full relative hidden md:block">
                    {/* Abstract visual of an encounter timeline or chart */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 transform rotate-1 group-hover:rotate-0 group-hover:scale-105 transition-all duration-500">
                       <div className="flex items-center gap-3 mb-4 border-b border-white/10 pb-4">
                          <div className="w-10 h-10 rounded-full bg-white/20"></div>
                          <div>
                             <div className="h-2 bg-white/40 w-24 rounded mb-1"></div>
                             <div className="h-2 bg-white/20 w-16 rounded"></div>
                          </div>
                       </div>
                       <div className="space-y-3">
                          <div className="flex gap-2">
                            <div className="h-20 bg-white/10 w-full rounded p-2">
                               <div className="h-2 bg-white/20 w-12 mb-2 rounded"></div>
                               <div className="h-1 bg-white/10 w-full mb-1 rounded"></div>
                               <div className="h-1 bg-white/10 w-3/4 rounded"></div>
                            </div>
                            <div className="h-20 bg-white/10 w-full rounded p-2">
                               <div className="h-2 bg-white/20 w-12 mb-2 rounded"></div>
                               <div className="h-1 bg-white/10 w-full mb-1 rounded"></div>
                            </div>
                          </div>
                       </div>
                    </div>
                 </div>
             </div>

             {/* Wide Card: Many More Features & CTA */}
             <div className="md:col-span-3 bg-summit-950 rounded-2xl p-12 md:p-16 shadow-2xl relative overflow-hidden text-center flex flex-col items-center justify-center gap-8 reveal reveal-zoom mt-6">
                 {/* Background effects */}
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
                 <div className="absolute top-0 left-0 w-64 h-64 bg-summit-600 rounded-full blur-[100px] opacity-30 animate-pulse"></div>
                 <div className="absolute bottom-0 right-0 w-64 h-64 bg-ocean-600 rounded-full blur-[100px] opacity-30 animate-pulse" style={{animationDelay: '1s'}}></div>
                 
                 <div className="relative z-10 max-w-3xl">
                    <h3 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">Many More Features to Explore</h3>
                    <p className="text-gray-400 mb-8 text-xl">We have packed summitEHR with everything you need to run a modern practice.</p>
                    
                    <div className="flex flex-wrap justify-center gap-3 mb-10">
                       {['Telehealth Video', 'Secure Messaging', 'Patient Portal', 'Document Management', 'Fax Integration', 'MIPS Dashboard', 'Inventory Management', 'Direct Messaging', 'Custom Reporting', 'Multi-Location Support'].map((feature, i) => (
                          <span key={i} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 text-base font-medium hover:bg-white/10 hover:text-white hover:border-summit-500 transition-all cursor-default hover:scale-105">
                             {feature}
                          </span>
                       ))}
                    </div>
                    
                    <button 
                      onClick={scrollToDemo}
                      className="bg-gradient-to-r from-summit-500 to-summit-600 hover:from-summit-400 hover:to-summit-500 text-white font-bold py-4 px-12 rounded-full transition-all shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:shadow-[0_0_30px_rgba(34,197,94,0.6)] hover:-translate-y-1 flex items-center gap-2 mx-auto group text-lg"
                    >
                      Request a Demo <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                 </div>
             </div>

          </div>
       </div>
    </section>
  );
}

const CertificationsSection: React.FC = () => (
  <section className="py-24 bg-summit-950 text-white relative overflow-hidden border-t border-summit-900">
    {/* Background decorative elements */}
    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-summit-800 rounded-full blur-[120px] opacity-30 translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-ocean-900 rounded-full blur-[120px] opacity-30 -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

    <div className="container mx-auto px-4 md:px-12 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="reveal reveal-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-summit-800/50 text-summit-400 text-sm font-bold uppercase tracking-wide mb-6 border border-summit-700/50">
              <Shield className="w-4 h-4" /> Security First
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">ONC Certified & Secure by Design.</h2>
            <p className="text-gray-300 text-xl mb-10 leading-relaxed">
              summitEHR meets the rigorous standards of the 21st Century Cures Act. We exceed industry benchmarks for data security, interoperability, and patient privacy so you can focus on care, not compliance.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-summit-500/10 border border-summit-500/20 flex items-center justify-center shrink-0 group-hover:bg-summit-500/20 transition-colors">
                  <BadgeCheck className="w-6 h-6 text-summit-400" />
                </div>
                <div>
                  <h4 className="font-bold text-xl text-white mb-2">2015 Edition Cures Update</h4>
                  <p className="text-gray-400 leading-relaxed text-lg">Fully certified for MIPS and Promoting Interoperability (PI) programs. We ensure you maximize your reimbursements without the headache.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-summit-500/10 border border-summit-500/20 flex items-center justify-center shrink-0 group-hover:bg-summit-500/20 transition-colors">
                  <Lock className="w-6 h-6 text-summit-400" />
                </div>
                <div>
                  <h4 className="font-bold text-xl text-white mb-2">Bank-Grade Encryption</h4>
                  <p className="text-gray-400 leading-relaxed text-lg">Your data is protected by AES-256 bit encryption at rest and in transit. We maintain SOC2 Type II certification for peace of mind.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-2xl reveal reveal-right delay-200">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-8 text-center">Compliance Standards We Meet</h3>
            <div className="grid grid-cols-2 gap-4">
               {/* Badges */}
               {['ONC', 'HIPAA', 'SOC2', 'FHIR'].map((badge, i) => (
                  <div key={badge} className={`bg-white/5 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-white/10 transition-colors border border-white/5 hover:border-white/20 group cursor-default delay-${i * 100} reveal reveal-zoom`}>
                      <div className="text-3xl font-bold mb-2 text-white group-hover:text-summit-400 transition-colors">{badge}</div>
                      <div className="text-sm text-gray-400 uppercase tracking-wide">
                        {badge === 'ONC' ? 'Health IT Certified' : badge === 'HIPAA' ? 'Compliant' : badge === 'SOC2' ? 'Type II Verified' : 'Native API'}
                      </div>
                  </div>
               ))}
            </div>
            
            <div className="mt-10 pt-6 border-t border-white/10 text-center">
               <a href="#" className="text-summit-400 hover:text-summit-300 text-base font-semibold flex items-center justify-center gap-2 transition-colors">
                 View Transparency Disclosure <ArrowRight className="w-4 h-4" />
               </a>
            </div>
          </div>
        </div>
    </div>
  </section>
);

const Pricing: React.FC = () => (
  <section id="pricing" className="py-24 bg-summit-50">
    <div className="container mx-auto px-4 md:px-12">
      <div className="text-center mb-16 reveal reveal-up">
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-4">Transparent Pricing</h2>
        <p className="text-xl text-gray-600">No hidden setup fees. No long-term contracts.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Starter */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 reveal reveal-up">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Starter</h3>
          <div className="text-4xl font-bold text-gray-900 mb-6">$399<span className="text-base font-normal text-gray-500">/mo per provider</span></div>
          <p className="text-gray-600 mb-8 text-base">Perfect for solo practitioners starting out.</p>
          <ul className="space-y-3 mb-8">
             {['Cloud EHR', 'ePrescribing (EPCS)', 'Patient Portal', 'Standard Support'].map(f => (
               <li key={f} className="flex items-center gap-3 text-base text-gray-700">
                 <CheckCircle className="w-4 h-4 text-green-500" /> {f}
               </li>
             ))}
          </ul>
          <button className="w-full py-3 rounded-lg border-2 border-gray-200 font-bold text-gray-700 hover:border-gray-900 hover:bg-gray-50 transition-colors text-base">Get Started</button>
        </div>

        {/* Practice - Highlighted */}
        <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-summit-500 relative transform md:-translate-y-4 hover:-translate-y-6 transition-transform duration-300 reveal reveal-up delay-100 z-10">
          <div className="absolute top-0 right-0 bg-summit-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg shadow-sm">MOST POPULAR</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Practice</h3>
          <div className="text-4xl font-bold text-gray-900 mb-6">$549<span className="text-base font-normal text-gray-500">/mo per provider</span></div>
          <p className="text-gray-600 mb-8 text-base">For growing clinics needing efficiency.</p>
          <ul className="space-y-3 mb-8">
             {['Everything in Starter', 'Summit Voice AI (Unlimited)', 'RCM Integration', 'Telehealth', 'Priority Support'].map(f => (
               <li key={f} className="flex items-center gap-3 text-base text-gray-700">
                 <CheckCircle className="w-4 h-4 text-summit-500" /> {f}
               </li>
             ))}
          </ul>
          <button className="w-full py-3 rounded-lg bg-summit-600 text-white font-bold hover:bg-summit-700 transition-colors shadow-lg shadow-summit-200 hover:shadow-summit-300 text-base">Start Free Trial</button>
        </div>

        {/* Enterprise */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 reveal reveal-up delay-200">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Enterprise</h3>
          <div className="text-4xl font-bold text-gray-900 mb-6">Custom</div>
          <p className="text-gray-600 mb-8 text-base">For hospitals and multi-specialty groups.</p>
          <ul className="space-y-3 mb-8">
             {['Everything in Practice', 'Custom API Access', 'On-premise Options', 'Dedicated Success Manager', 'SLA Guarantees'].map(f => (
               <li key={f} className="flex items-center gap-3 text-base text-gray-700">
                 <CheckCircle className="w-4 h-4 text-green-500" /> {f}
               </li>
             ))}
          </ul>
          <button className="w-full py-3 rounded-lg border-2 border-gray-200 font-bold text-gray-700 hover:border-gray-900 hover:bg-gray-50 transition-colors text-base">Contact Sales</button>
        </div>
      </div>
    </div>
  </section>
);

const Footer: React.FC = () => (
  <footer className="bg-gray-900 text-white pt-20 pb-10">
    <div className="container mx-auto px-4 md:px-12">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div className="space-y-6 reveal reveal-up">
          {/* Footer Logo */}
          <Logo variant="small" className="h-10 w-auto bg-white/90 p-2 rounded-lg" />
          <p className="text-gray-400 text-base leading-relaxed">
            DataQ Health is pioneering the future of connected care. 
            We build tools that make healthcare human again.
          </p>
          <div className="flex gap-4">
             {/* Social placeholders */}
             {[1, 2, 3].map(i => (
                <div key={i} className="w-8 h-8 rounded-full bg-gray-800 hover:bg-summit-600 transition-colors cursor-pointer flex items-center justify-center group">
                  <div className="w-4 h-4 bg-gray-500 group-hover:bg-white rounded-sm transition-colors"></div>
                </div>
             ))}
          </div>
        </div>
        
        {[
          { header: "Product", links: ["Features", "Summit Voice", "Telehealth", "RCM", "Security"] },
          { header: "Company", links: ["About Us", "Careers", "Press", "Contact"] },
          { header: "Resources", links: ["Blog", "Case Studies", "Help Center", "API Docs"] }
        ].map((col, i) => (
          <div key={i} className={`reveal reveal-up delay-${(i + 1) * 100}`}>
            <h4 className="font-bold text-lg mb-6">{col.header}</h4>
            <ul className="space-y-3 text-gray-400">
              {col.links.map(l => (
                <li key={l}><a href="#" className="hover:text-summit-400 transition-colors text-base inline-block hover:translate-x-1 duration-200">{l}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500 reveal reveal-up delay-500">
        <div>&copy; {new Date().getFullYear()} DataQ Health, LLC. All rights reserved.</div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
);

function App() {
  useScrollReveal();

  return (
    <div className="font-sans antialiased text-gray-900 bg-white selection:bg-summit-100 selection:text-summit-900">
      <Header />
      <main>
        <Hero />
        <StatsBar />
        <FeatureTabs />
        <VoiceSection />
        <ComprehensiveFeatures />
        <CertificationsSection />
        <Pricing />
        
        {/* Contact / CTA Section */}
        <section id="contact" className="py-24 bg-gradient-to-br from-summit-600 to-ocean-500 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
           <div className="container mx-auto px-4 md:px-12 relative z-10 grid md:grid-cols-2 gap-16 items-center">
              <div className="text-white space-y-6 reveal reveal-left">
                 <h2 className="text-4xl md:text-5xl font-serif font-bold">Ready to modernize your practice?</h2>
                 <p className="text-2xl text-summit-50">Join 5,000+ clinicians who have switched to summitEHR this year.</p>
                 <ul className="space-y-4 pt-4">
                    {["Free Data Migration", "On-site Training", "60-Day Money Back Guarantee"].map((item, i) => (
                       <li key={i} className="flex items-center gap-3 font-medium text-lg">
                          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center"><CheckCircle className="w-4 h-4 text-white" /></div>
                          {item}
                       </li>
                    ))}
                 </ul>
              </div>
              <div className="reveal reveal-right delay-200">
                 <RequestDemoForm theme="blue" />
              </div>
           </div>
        </section>
      </main>
      <Footer />
      <AIChat />
    </div>
  );
}

export default App;
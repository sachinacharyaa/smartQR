import { useEffect, useMemo, useRef, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import WorkflowTabs from './components/WorkflowTabs.jsx';
import StepOne from './components/StepOne.jsx';
import StepTwo from './components/StepTwo.jsx';
import TrustedBy from './components/TrustedBy.jsx';
import WhatIsQr from './components/WhatIsQr.jsx';
import HowTo from './components/HowTo.jsx';
import Templates from './components/Templates.jsx';
import Features from './components/Features.jsx';
import Faq from './components/Faq.jsx';
import Pricing from './components/Pricing.jsx';
import Footer from './components/Footer.jsx';
import PaywallModal from './components/PaywallModal.jsx';
import { createQr, trackPageView } from './api.js';
import { buildQuickPresetUrl } from './quickLinkPresets.js';

const workflows = [
  { id: 'url', label: 'URL', icon: 'url' },
  { id: 'vcard', label: 'vCard', icon: 'vcard' },
  { id: 'file', label: 'File', icon: 'file' },
  { id: 'linkpage', label: 'Link Page', icon: 'linkpage' },
  { id: 'googleform', label: 'Google Form', icon: 'googleform' },
  { id: 'menu', label: 'Menu', icon: 'menu' },
  { id: 'app', label: 'App stores', icon: 'app' },
  { id: 'landing', label: 'Landing page', icon: 'landing' },
  { id: 'smart', label: 'Smart URL', icon: 'smart' },
  { id: 'gs1', label: 'GS1 Digital', icon: 'gs1' },
  { id: 'mp3', label: 'MP3', icon: 'mp3' },
  { id: 'video', label: 'Video', icon: 'video' },
  { id: 'wifi', label: 'Wifi', icon: 'wifi' }
];

const defaultStyle = {
  pattern: 'rounded',
  eyeSquare: 'extra-rounded',
  eyeDot: 'dot',
  dotsColor: '#1f4bd8',
  eyeColor: '#1f4bd8',
  backgroundColor: '#ffffff',
  logo: null,
  logoPreset: null,
  logoMargin: 6,
  gradient: false,
  frameText: 'Scan me',
  frameStyle: 'soft',
  proFrame: false,
  template: 'Clean',
  saveTemplate: false,
  dynamic: false,
  password: false,
  expire: false,
  geoRouting: false,
  scanLimit: false,
  utmTracking: false
};

export default function App() {
  const [activeWorkflow, setActiveWorkflow] = useState('url');
  /** When set, Step 1 collects a short handle; full URL is built with a hidden base (e.g. instagram.com/). */
  const [quickPreset, setQuickPreset] = useState(null);
  const [stepOneData, setStepOneData] = useState({});
  const [isDynamic, setIsDynamic] = useState(false);
  const [activeTab, setActiveTab] = useState('Pattern');
  const [style, setStyle] = useState(defaultStyle);
  const [paywallOpen, setPaywallOpen] = useState(false);
  const [plan, setPlan] = useState('Free');
  const [downloadExt, setDownloadExt] = useState('png');
  const [isGenerating, setIsGenerating] = useState(false);
  const qrInstanceRef = useRef(null);
  const generateTimeoutRef = useRef(null);

  useEffect(() => {
    trackPageView(window.location.pathname);
  }, []);

  useEffect(() => {
    setStyle((prev) => ({ ...prev, dynamic: isDynamic }));
  }, [isDynamic]);

  useEffect(() => {
    return () => {
      if (generateTimeoutRef.current) clearTimeout(generateTimeoutRef.current);
    };
  }, []);

  const onDataChange = (key, value) => {
    setStepOneData((prev) => ({ ...prev, [key]: value }));
  };

  const handleWorkflowChange = (id) => {
    setActiveWorkflow(id);
    setQuickPreset(null);
  };

  const handleQuickSelect = (presetId) => {
    setActiveWorkflow('url');
    setQuickPreset(presetId);
    setStepOneData((prev) => ({ ...prev, socialHandle: '', locationQuery: '' }));
  };

  const qrData = useMemo(() => {
    if (activeWorkflow === 'vcard') {
      return `BEGIN:VCARD\nVERSION:3.0\nFN:${stepOneData.fullName || ''}\nTITLE:${stepOneData.title || ''}\nTEL:${stepOneData.phone || ''}\nEMAIL:${stepOneData.email || ''}\nEND:VCARD`;
    }
    if (activeWorkflow === 'linkpage') {
      return stepOneData.primaryLink || 'https://smartqr.io';
    }
    if (activeWorkflow === 'googleform') {
      return stepOneData.formUrl || 'https://forms.gle/';
    }
    if (activeWorkflow === 'file') {
      return stepOneData.fileName || stepOneData.fileUpload || 'file-placeholder';
    }
    if (activeWorkflow === 'url' && quickPreset) {
      return buildQuickPresetUrl(quickPreset, stepOneData);
    }
    return stepOneData.url || 'https://smartqr.io';
  }, [activeWorkflow, quickPreset, stepOneData]);

  const handleGenerate = async () => {
    if (generateTimeoutRef.current) clearTimeout(generateTimeoutRef.current);
    setIsGenerating(true);

    generateTimeoutRef.current = setTimeout(() => {
      setIsGenerating(false);
    }, 2000);

    const safeStyle = {
      ...style,
      logo: style.logo ? 'custom' : null
    };

    try {
      await createQr({
        type: activeWorkflow,
        payload: { ...stepOneData, quickPreset, encodedUrl: qrData },
        style: safeStyle,
        isDynamic,
        plan: plan.toLowerCase()
      });
    } catch (err) {
      // Non-blocking for MVP
    }
  };

  const needsPro = useMemo(() => {
    return Boolean(
      style.gradient ||
        style.proFrame ||
        style.dynamic ||
        style.password ||
        style.expire ||
        style.geoRouting ||
        style.scanLimit ||
        style.utmTracking
    );
  }, [style]);

  const handleDownload = () => {
    if (plan === 'Free' && needsPro) {
      setPaywallOpen(true);
      return;
    }
    if (qrInstanceRef.current) {
      qrInstanceRef.current.download({ extension: downloadExt });
    }
  };

  const handleUpgrade = (selectedPlan) => {
    setPlan(selectedPlan);
    setPaywallOpen(false);
  };

  return (
    <div className="app">
      <div className="hero-bg">
        <Navbar />
        <Hero onPrimary={() => document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' })} />
      </div>

      <main>
        <section className="generator" id="generator">
          <WorkflowTabs
            workflows={workflows}
            active={activeWorkflow}
            onChange={handleWorkflowChange}
            quickPreset={quickPreset}
            onQuickSelect={handleQuickSelect}
          />
          <div className="generator__steps">
            <StepOne
              workflow={activeWorkflow}
              data={stepOneData}
              onDataChange={onDataChange}
              isDynamic={isDynamic}
              onToggleDynamic={setIsDynamic}
              onGenerate={handleGenerate}
              quickPreset={quickPreset}
            />
            <StepTwo
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              style={style}
              setStyle={setStyle}
              data={qrData}
              onDownload={handleDownload}
              onSaveTemplate={() => setStyle((prev) => ({ ...prev, saveTemplate: true }))}
              onReady={(qr) => {
                qrInstanceRef.current = qr;
              }}
              downloadExt={downloadExt}
              setDownloadExt={setDownloadExt}
              loading={isGenerating}
            />
          </div>
        </section>

        <TrustedBy />
        <WhatIsQr />
        <HowTo />
        <Templates />
        <Features />
        <Pricing onSelectPlan={setPlan} />
        <Faq />
      </main>

      <Footer />

      <PaywallModal
        open={paywallOpen}
        onClose={() => setPaywallOpen(false)}
        onUpgrade={handleUpgrade}
      />
    </div>
  );
}

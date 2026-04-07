import { useEffect, useMemo, useRef, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import WorkflowTabs from './components/WorkflowTabs.jsx';
import StepOne from './components/StepOne.jsx';
import StepTwo from './components/StepTwo.jsx';
import TrustedBy from './components/TrustedBy.jsx';
import WhatIsQr from './components/WhatIsQr.jsx';
import HowTo from './components/HowTo.jsx';
import Features from './components/Features.jsx';
import Faq from './components/Faq.jsx';
import Pricing from './components/Pricing.jsx';
import CustomerStories from './components/CustomerStories.jsx';
import Footer from './components/Footer.jsx';
import PaywallModal from './components/PaywallModal.jsx';
import InstagramBenefits from './components/InstagramBenefits.jsx';
import { createQr, trackPageView } from './api.js';
import { buildQuickPresetUrl } from './quickLinkPresets.js';
import linkToQrCode from './solutions/linkToQrCode.js';
import pdfToQrCode from './solutions/pdfToQrCode.js';
import instagramQrCode from './solutions/instagramQrCode.js';
import locationQrCode from './solutions/locationQrCode.js';
import youtubeQrCode from './solutions/youtubeQrCode.js';

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

const solutionPages = [
  linkToQrCode,
  pdfToQrCode,
  instagramQrCode,
  locationQrCode,
  youtubeQrCode
];

const solutionById = Object.fromEntries(solutionPages.map((s) => [s.id, s]));
const solutionByPath = Object.fromEntries(solutionPages.map((s) => [`/solutions/${s.slug}`, s]));
const PRICING_PATH = '/pricing-plans';
const STORIES_PATH = '/customer-stories';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
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
    const applyFromPath = (path) => {
      setCurrentPath(path);
      const solution = solutionByPath[path];
      if (!solution) return;
      setActiveWorkflow(solution.workflow);
      setQuickPreset(solution.quickPreset || null);
      setStepOneData(solution.initialData || {});
    };

    applyFromPath(window.location.pathname);
    const onPopState = () => applyFromPath(window.location.pathname);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
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

  const handleSolutionSelect = (solutionId, options = {}) => {
    const solution = solutionById[solutionId];
    if (!solution) return;
    const path = `/solutions/${solution.slug}`;

    if (options.openInNewTab) {
      window.open(path, '_blank', 'noopener,noreferrer');
      return;
    }

    setActiveWorkflow(solution.workflow);
    setQuickPreset(solution.quickPreset || null);
    setStepOneData(solution.initialData || {});
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    trackPageView(path);
    document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' });
  };

  const isSolutionPage = Boolean(solutionByPath[currentPath]);
  const isPricingPage = currentPath === PRICING_PATH;
  const isStoriesPage = currentPath === STORIES_PATH;

  const openPricingPage = () => {
    if (currentPath !== PRICING_PATH) {
      window.history.pushState({}, '', PRICING_PATH);
      setCurrentPath(PRICING_PATH);
      trackPageView(PRICING_PATH);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openStoriesPage = () => {
    if (currentPath !== STORIES_PATH) {
      window.history.pushState({}, '', STORIES_PATH);
      setCurrentPath(STORIES_PATH);
      trackPageView(STORIES_PATH);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    if (plan === 'Free') {
      openPricingPage();
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

  const generatorSection = (
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
        {!isSolutionPage && quickPreset === 'instagram' && <InstagramBenefits />}
      </div>
    </section>
  );

  return (
    <div className={isPricingPage ? 'app app--pricing' : isStoriesPage ? 'app app--stories' : 'app'}>
      <div className={isPricingPage || isStoriesPage ? 'hero-bg hero-bg--compact' : 'hero-bg'}>
        <Navbar onSelectSolution={handleSolutionSelect} onOpenPricing={openPricingPage} />
        {!isSolutionPage && !isPricingPage && !isStoriesPage && (
          <Hero onPrimary={() => document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' })} />
        )}
      </div>

      <main>
        {!isPricingPage && !isStoriesPage && generatorSection}
        {!isSolutionPage && !isPricingPage && !isStoriesPage && (
          <>
            <TrustedBy onOpenStories={openStoriesPage} />
            <WhatIsQr />
            <HowTo />
            <Features />
            <Faq />
          </>
        )}
        {isStoriesPage && <CustomerStories />}
        {isPricingPage && <Pricing onSelectPlan={setPlan} />}
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


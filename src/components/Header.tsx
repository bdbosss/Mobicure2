import React, { useState } from 'react';
import { Menu, X, Wrench, Phone, MapPin, Globe, ChevronDown } from 'lucide-react';
import { useLanguage, Language } from '../lib/LanguageContext';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const { language, setLanguage, t, isRtl } = useLanguage();

  const menuItems = [
    { id: 'accueil', label: t('nav.accueil') },
    { id: 'reparation', label: t('nav.reparation') },
    { id: 'accessoires', label: t('nav.accessoires') },
    { id: 'contact', label: t('nav.contact') },
  ];

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'FR', label: 'Français', flag: '🇫🇷' },
    { code: 'EN', label: 'English', flag: '🇬🇧' },
    { code: 'ES', label: 'Español', flag: '🇪🇸' },
    { code: 'IT', label: 'Italiano', flag: '🇮🇹' },
    { code: 'RU', label: 'Русский', flag: '🇷🇺' },
    { code: 'AR', label: 'العربية', flag: '🇸🇦' },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeLangData = languages.find(l => l.code === language) || languages[0];

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-zinc-950">
      {/* Top Banner */}
      <div className="w-full bg-zinc-950 text-white text-[11px] font-bold uppercase tracking-widest py-2 px-4 border-b border-zinc-900">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-zinc-300">
            <a 
              href="https://maps.app.goo.gl/uh7b2bZeafx5p38N6" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-1.5 hover:text-red-500 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-red-600" />
              {t('foot.address')}
            </a>
            <a 
              href="tel:+33644664404" 
              className="hidden md:flex items-center gap-1.5 hover:text-red-500 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-red-600" />
              +33 6 44 66 44 04
            </a>
          </div>
          
          <div className="flex items-center gap-3.5">
            <span className="bg-red-600 text-white font-black px-2 py-0.5 rounded-sm text-[9px] tracking-widest uppercase">
              {t('nav.serviceNoRdv')}
            </span>
            <span className="text-zinc-400 hidden lg:inline text-[10px]">{t('nav.hours')}</span>
            
            {/* Flag / Language selector integration */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1.5 px-3 py-1 rounded bg-zinc-900 hover:border-red-600 border border-zinc-850 text-white uppercase text-[10px] font-black tracking-wider transition-all cursor-pointer"
                id="lang-selector-btn"
                aria-label="Change language/Changer de langue"
              >
                <Globe className="w-3.5 h-3.5 text-red-600" />
                <span className="mr-0.5">{activeLangData.flag}</span>
                <span>{language}</span>
                <ChevronDown className={`w-3 h-3 text-zinc-400 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
              </button>

              {isLangOpen && (
                <>
                  <div className="fixed inset-0 z-40 bg-transparent" onClick={() => setIsLangOpen(false)} />
                  <div className={`absolute ${isRtl ? 'left-0' : 'right-0'} mt-1.5 w-36 bg-zinc-900 border border-zinc-800 rounded-lg shadow-2xl py-1 z-50 text-left`} id="lang-dropdown-menu">
                    {languages.map((lang) => {
                      const isCurrent = language === lang.code;
                      return (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code);
                            setIsLangOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 text-[10px] font-black tracking-widest uppercase hover:bg-zinc-800 hover:text-red-500 transition-colors flex items-center gap-2 cursor-pointer ${
                            isCurrent ? 'text-red-500 bg-zinc-800' : 'text-zinc-300'
                          }`}
                        >
                          <span className="text-sm shrink-0">{lang.flag}</span>
                          <span className="truncate">{lang.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="w-full bg-white px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <button 
            onClick={() => handleNavClick('accueil')} 
            className="flex items-center gap-2 focus:outline-none cursor-pointer group"
            id="nav-logo"
          >
            <div className="bg-red-600 text-white p-2 border border-zinc-950 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-[1px] group-hover:translate-y-[1px] group-hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all">
              <Wrench className="w-5 h-5" />
            </div>
            <div className={`text-left ${isRtl ? 'text-right' : 'text-left'}`}>
              <h1 className="text-xl sm:text-2xl font-black tracking-tighter text-zinc-950 flex items-center">
                MOBI<span className="text-red-600">CURE</span>
              </h1>
              <p className="text-[9px] font-black tracking-widest text-zinc-550 uppercase -mt-1 leading-none">
                {t('nav.subTitle')}
              </p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2 font-black uppercase tracking-widest text-xs">
            {menuItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-4 py-2 hover:text-red-600 transition-colors cursor-pointer relative ${
                    isActive
                      ? 'text-red-600 font-extrabold'
                      : 'text-zinc-950'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-red-650" />
                  )}
                </button>
              );
            })}
            
            {/* Quick Contact CTA */}
            <a
              href="https://wa.me/33644664404"
              target="_blank"
              rel="noopener noreferrer"
              id="nav-cta-contact"
              className="ml-4 bg-red-600 hover:bg-zinc-950 text-white text-[10px] font-black uppercase tracking-widest px-5 py-2.5 rounded-full transition-colors cursor-pointer flex items-center gap-1.5 border border-zinc-950 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] mb-1"
            >
              {t('nav.whatsappTitle')}
            </a>
          </div>

          {/* Mobile Menu Button with embedded Flag preview inside dropdown triggers */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              id="mobile-menu-toggle"
              className="text-zinc-950 hover:text-red-600 p-2 focus:outline-none cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      {isMenuOpen && (
        <div id="mobile-drawer" className="md:hidden w-full bg-white border-t border-zinc-100 py-4 px-4 transition-all animate-in fade-in duration-200">
          <div className="flex flex-col gap-2">
            {menuItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left py-3 px-4 rounded-lg text-base font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'text-red-600 bg-red-50/80'
                      : 'text-zinc-800 hover:text-red-600 hover:bg-zinc-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            
            <button
              onClick={() => handleNavClick('contact')}
              id="mobile-nav-cta"
              className="mt-4 w-full justify-center bg-red-600 hover:bg-red-700 text-white font-bold text-center py-3 rounded-lg transition-colors cursor-pointer flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              {t('btn.bookRepair')}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

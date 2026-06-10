import React, { useState } from 'react';
import { Menu, X, Wrench, ShoppingBag, Phone, MapPin } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { id: 'accueil', label: 'Accueil' },
    { id: 'reparation', label: 'Réparation' },
    { id: 'accessoires', label: 'Accessoires' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (    <header className="sticky top-0 z-50 w-full bg-white border-b border-zinc-950">
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
              42 Avenue Jean Jaurès, 93350 Le Bourget
            </a>
            <a 
              href="tel:+33644664404" 
              className="hidden md:flex items-center gap-1.5 hover:text-red-500 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-red-600" />
              +33 6 44 66 44 04
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="bg-red-600 text-white font-black px-2 py-0.5 rounded-sm text-[9px] tracking-widest uppercase">
              Service sans rdv
            </span>
            <span className="text-zinc-400">LUN - JEUDI: 9H15 - 21H30</span>
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
            <div className="text-left">
              <h1 className="text-xl sm:text-2xl font-black tracking-tighter text-zinc-950 flex items-center">
                MOBI<span className="text-red-600">CURE</span>
              </h1>
              <p className="text-[9px] font-black tracking-widest text-zinc-550 uppercase -mt-1 leading-none">
                Réparation & Accessoires
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
              WHATSAPP : +33 6 44 66 44 04
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            id="mobile-menu-toggle"
            className="md:hidden text-zinc-950 hover:text-red-600 p-2 focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
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
              Prendre RDV / Devis Gratuit
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

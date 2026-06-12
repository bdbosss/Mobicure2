import React, { useState } from 'react';
import { MapPin, Phone, ShieldCheck, Mail, MessageCircle, ArrowUp } from 'lucide-react';
import { businessHours } from '../data';
import TermsModal from './TermsModal';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-zinc-950 text-white pt-16 pb-8 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Brand Column */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-red-600 text-white p-1.5 rounded-md">
              <span className="font-extrabold text-sm">MB</span>
            </div>
            <span className="text-xl font-black tracking-tight">
              MOBI<span className="text-red-600">CURE</span>
            </span>
          </div>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Spécialiste de la réparation de smartphones, tablettes et ordinateurs au Bourget. Pièces de haute qualité et réparations rapides garanties.
          </p>
          <div className="flex flex-col gap-2 mt-2">
            <div className="flex items-center gap-2.5 text-xs text-zinc-300">
              <ShieldCheck className="w-4 h-4 text-red-600 shrink-0" />
              <span>Garantie de 2 mois sur les réparations*</span>
            </div>
          </div>
        </div>

        {/* Navigation Quick Links */}
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white border-b border-red-600 pb-2 w-max">
            Plan du site
          </h3>
          <ul className="flex flex-col gap-2.5 text-sm text-zinc-400">
            {['accueil', 'reparation', 'accessoires', 'contact'].map((tab) => (
              <li key={tab}>
                <button
                  id={`footer-link-${tab}`}
                  onClick={() => handleNavClick(tab)}
                  className="hover:text-red-600 hover:translate-x-1 transition-all cursor-pointer text-left capitalize"
                >
                  {tab === 'reparation' ? 'Réparation' : tab}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Business Hours Column */}
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white border-b border-red-600 pb-2 w-max">
            Horaires d'Ouverture
          </h3>
          <div className="flex flex-col gap-2 text-sm text-zinc-400">
            {businessHours.map((item, index) => (
              <div key={index} className="flex justify-between items-start border-b border-zinc-900 pb-1.5 last:border-0">
                <span className="font-medium text-zinc-300 whitespace-pre-line">{item.day}</span>
                <span className="text-red-500 font-semibold text-right whitespace-pre-line">{item.hours}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Direct Contact Column */}
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white border-b border-red-600 pb-2 w-max">
            Nous Contacter
          </h3>
          <div className="flex flex-col gap-3 text-sm text-zinc-400">
            <a 
              href="https://maps.app.goo.gl/uh7b2bZeafx5p38N6" 
              target="_blank" 
              referrerPolicy="no-referrer" 
              className="flex items-start gap-2.5 hover:text-red-500 transition-colors"
              id="footer-address-link"
            >
              <MapPin className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>42 Avenue Jean Jaurès,<br />93350 Le Bourget</span>
            </a>
            
            <a 
              href="tel:+33644664404" 
              className="flex items-center gap-2.5 hover:text-red-500 transition-colors"
              id="footer-phone-link"
            >
              <Phone className="w-4 h-4 text-red-600 shrink-0" />
              <span>+33 6 44 66 44 04</span>
            </a>

            <a 
              href="mailto:mobicure93@gmail.com" 
              className="flex items-center gap-2.5 hover:text-red-500 transition-colors"
              id="footer-email-link"
            >
              <Mail className="w-4 h-4 text-red-600 shrink-0" />
              <span>mobicure93@gmail.com</span>
            </a>

            {/* Red WhatsApp CTA for fast queries */}
            <a
              href="https://wa.me/33644664404"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-2 bg-red-650 hover:bg-red-750 text-white font-bold py-2 px-4 rounded-lg text-xs tracking-wider uppercase transition-colors"
              id="footer-whatsapp-link"
            >
              <MessageCircle className="w-4 h-4" />
              Discuter sur WhatsApp
            </a>
          </div>
        </div>

      </div>

      {/* Underbar */}
      <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-zinc-500">
        <div>
          <p>© {new Date().getFullYear()} MOBICURE. Tous droits réservés.</p>
          <p className="mt-1">
            <a 
              href="https://maps.app.goo.gl/uh7b2bZeafx5p38N6" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-red-500 hover:underline transition-colors"
            >
              42 Avenue Jean Jaurès, 93350 Le Bourget
            </a> — Téléphone: <a href="tel:+33644664404" className="hover:text-red-500 hover:underline">+33 6 44 66 44 04</a>
          </p>
          <p className="mt-2.5">
            <button
              onClick={() => setIsTermsOpen(true)}
              className="text-red-500 hover:text-red-400 font-black tracking-wider uppercase hover:underline cursor-pointer text-left py-0.5"
              id="footer-terms-notice-link"
            >
              CONDITIONS GÉNÉRALES DE RÉPARATION – MOBICURE
            </button>
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-zinc-400">Qualité supérieure • Tarifs Compétitifs • Réparation Express</span>
          <button
            onClick={handleScrollTop}
            className="bg-zinc-900 hover:bg-red-600 hover:text-white p-2.5 rounded-full transition-colors cursor-pointer"
            id="back-to-top-btn"
            aria-label="Retour en haut"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Interactive Conditions details from PDF modal */}
      <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
    </footer>
  );
}

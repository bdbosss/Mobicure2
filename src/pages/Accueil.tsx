import React from 'react';
import { Smartphone, Laptop, Tablet, ShieldCheck, Zap, Clock, ThumbsUp, MapPin, Phone, MessageSquare, ArrowRight, Wrench } from 'lucide-react';
import { clientReviews } from '../data';
import { useLanguage } from '../lib/LanguageContext';

interface AccueilProps {
  setActiveTab: (tab: string) => void;
}

export default function Accueil({ setActiveTab }: AccueilProps) {
  const { t, isRtl, language } = useLanguage();
  return (
    <div id="page-accueil" className="w-full bg-white text-zinc-950 animate-in fade-in duration-300">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white border-b border-zinc-950 py-16 lg:py-24">
        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col items-start gap-6 text-left">
            <div className="inline-flex items-center gap-2 bg-red-655 text-white border border-zinc-950 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] px-4 py-1.5 text-xs font-black uppercase tracking-widest">
              <Zap className="w-4 h-4 shrink-0" />
              {t('nav.serviceNoRdv')}
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tighter text-zinc-950 leading-none">
              {language === 'FR' ? (
                <>Donnez une <br className="hidden sm:block" />seconde vie à vos <span className="text-red-655 inline-block bg-white border border-zinc-950 px-2 py-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-1">appareils.</span></>
              ) : language === 'EN' ? (
                <>Give a <br className="hidden sm:block" />second life to your <span className="text-red-655 inline-block bg-white border border-zinc-950 px-2 py-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-1">devices.</span></>
              ) : language === 'ES' ? (
                <>Dele una <br className="hidden sm:block" />segunda vida a sus <span className="text-red-655 inline-block bg-white border border-zinc-950 px-2 py-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-1">dispositivos.</span></>
              ) : language === 'IT' ? (
                <>Dai una <br className="hidden sm:block" />seconda vita ai tuoi <span className="text-red-655 inline-block bg-white border border-zinc-950 px-2 py-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-1">dispositivi.</span></>
              ) : language === 'RU' ? (
                <>Дайте <br className="hidden sm:block" />вторую жизнь вашим <span className="text-red-655 inline-block bg-white border border-zinc-950 px-2 py-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-1">устройствам.</span></>
              ) : (
                <>أعطِ <br className="hidden sm:block" />حياة ثانية <span className="text-red-655 inline-block bg-white border border-zinc-950 px-2 py-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-1">لأجهزتك.</span></>
              )}
            </h1>
            
            <p className="text-base sm:text-lg text-zinc-800 max-w-2xl leading-relaxed font-semibold">
              {t('hero.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4">
              <button
                onClick={() => setActiveTab('reparation')}
                id="hero-cta-repair"
                className="w-full sm:w-auto px-8 py-4 bg-zinc-950 hover:bg-red-600 text-white text-xs font-black uppercase tracking-widest border border-zinc-950 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>{t('btn.bookRepairShort')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={() => setActiveTab('contact')}
                id="hero-cta-contact"
                className="w-full sm:w-auto px-8 py-4 bg-white border border-zinc-950 text-zinc-950 hover:bg-zinc-50 text-xs font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{t('nav.contact')}</span>
              </button>
            </div>

            {/* Quick trust indicators */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t-2 border-zinc-950 w-full mt-6">
              <div className="text-left">
                <span className="block text-3xl sm:text-4xl font-black text-red-600">30 MIN</span>
                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mt-1">{t('banner.repairTime')}</span>
              </div>
              <div className="text-left">
                <span className="block text-3xl sm:text-4xl font-black text-zinc-950">100%</span>
                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mt-1">SATISFACTION</span>
              </div>
              <div className="text-left">
                <span className="block text-3xl sm:text-4xl font-black text-red-655">GARANTIE</span>
                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mt-1">{t('banner.guarantee')}</span>
              </div>
            </div>
          </div>

          {/* Right Hero illustration visual */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-[360px] aspect-square bg-white border-2 border-zinc-950 p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between overflow-hidden">
              <div className="absolute right-0 top-0 w-24 h-24 bg-red-655 border-l border-b border-zinc-950 opacity-10" />
              
              <div className="flex justify-between items-start">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-655 border border-zinc-950" />
                  <div className="w-3 h-3 rounded-full bg-zinc-950" />
                  <div className="w-3 h-3 rounded-full bg-zinc-200" />
                </div>
                <span className="text-xs font-bold text-zinc-950 font-mono text-[9px] tracking-widest uppercase">MOBICURE LAB</span>
              </div>

              {/* Graphic Center */}
              <div className="my-auto py-6 flex flex-col items-center gap-4 text-center">
                <div className="relative">
                  <Smartphone className="w-20 h-20 text-zinc-950 stroke-[2]" />
                  <Wrench className="w-8 h-8 text-white bg-red-655 absolute bottom-0 -right-2 p-1.5 rounded-none border-2 border-zinc-950 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" />
                </div>
                <div>
                  <h3 className="font-black text-base uppercase tracking-wider text-zinc-950">Diagnostic Immédiat*</h3>
                  <p className="text-xs text-zinc-500 mt-1 max-w-[200px] mx-auto font-medium">Présentez-vous en boutique sans rendez-vous préalable.</p>
                </div>
              </div>

              <div className="bg-zinc-950 p-3 flex items-center justify-between text-white border border-zinc-950">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-red-655 shrink-0" />
                  <span className="text-[10px] font-black uppercase tracking-wider">Prise en charge instantanée</span>
                </div>
                <span className="text-[10px] font-black uppercase text-red-500 tracking-widest">ACTIF</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specialty categories grid */}
      <section className="py-20 max-w-7xl mx-auto px-6 border-b border-zinc-950">
        <div className="text-center max-w-3xl mx-auto flex flex-col items-center gap-4 mb-16">
          <div className="bg-red-50 text-red-655 border border-red-250 px-3 py-1 font-black text-xs uppercase tracking-widest">
            Savoir-Faire Technique
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-950 uppercase">
            Nos domaines de <span className="text-red-655">spécialité</span>
          </h2>
          <p className="text-base text-zinc-650 font-medium">
            Que ce soit pour un écran de smartphone brisé, une tablette qui refuse de charger ou un ordinateur portable ralenti, nous possédons l'expertise nécessaire.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Smartphone Speciality Card */}
          <div className="border-2 border-zinc-950 p-8 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all group flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 border-2 border-zinc-950 text-zinc-950 flex items-center justify-center mb-6 bg-red-655 text-white font-bold">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight text-zinc-950 mb-3">Smartphones</h3>
              <p className="text-xs text-zinc-655 leading-relaxed font-semibold mb-6">
                Remplacement d'écran OLED/LCD, changement de batterie fatiguée, micros, caméras et boutons de tranche pour iPhone, Samsung, Xiaomi et plus.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('reparation')}
              className="text-xs font-black uppercase tracking-widest text-red-655 hover:text-zinc-950 flex items-center gap-1.5 transition-colors cursor-pointer self-start"
            >
              <span>Voir les tarifs Réparation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Tablettes Speciality Card */}
          <div className="border-2 border-zinc-950 p-8 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all group flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 border-2 border-zinc-950 text-zinc-950 flex items-center justify-center mb-6 bg-red-655 text-white font-bold">
                <Tablet className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight text-zinc-950 mb-3">Tablettes</h3>
              <p className="text-xs text-zinc-655 leading-relaxed font-semibold mb-6">
                iPad Pro, iPad Air ou tablettes Android. Nous résolvons les problèmes d'écrans tactiles fissurés, de batterie déchargée ou de ports de charge abîmés.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('reparation')}
              className="text-xs font-black uppercase tracking-widest text-red-655 hover:text-zinc-950 flex items-center gap-1.5 transition-colors cursor-pointer self-start"
            >
              <span>Voir les tarifs Réparation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Ordinateurs Speciality Card */}
          <div className="border-2 border-zinc-950 p-8 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all group flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 border-2 border-zinc-950 text-zinc-950 flex items-center justify-center mb-6 bg-red-655 text-white font-bold">
                <Laptop className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight text-zinc-950 mb-3">Ordinateurs</h3>
              <p className="text-xs text-zinc-655 leading-relaxed font-semibold mb-6">
                PC fixes & portables Windows et macOS (MacBook Pro/Air). Nettoyage de ventilateur, changement de clavier, installation de SSD ultra rapide et sauvetage de fichiers.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('reparation')}
              className="text-xs font-black uppercase tracking-widest text-red-655 hover:text-zinc-950 flex items-center gap-1.5 transition-colors cursor-pointer self-start"
            >
              <span>Voir les tarifs Réparation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* Interactive Step Timeline (How it works) */}
      <section className="bg-zinc-50 py-20 border-y border-zinc-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto flex flex-col items-center gap-4 mb-16">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-zinc-950">
              Une Réparation Simple & <span className="text-red-600">Transparente</span>
            </h2>
            <p className="text-base text-zinc-500">
              Pas de mauvaise surprise de prix ou d'attente interminable chez MOBICURE. On s'occupe de tout rapidement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            
            {/* Step 1 */}
            <div className="flex flex-col items-start text-left bg-white p-6 rounded-2xl border border-zinc-150 shadow-xs relative">
              <span className="text-4xl font-black text-red-100 absolute right-4 top-4 select-none">01</span>
              <div className="w-10 h-10 rounded-lg bg-red-600 text-white flex items-center justify-center font-bold text-sm mb-6">
                1
              </div>
              <h3 className="font-extrabold text-lg text-zinc-950 mb-2">{t('step.1')}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                {t('step.1Desc')}
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-start text-left bg-white p-6 rounded-2xl border border-zinc-150 shadow-xs relative">
              <span className="text-4xl font-black text-red-100 absolute right-4 top-4 select-none">02</span>
              <div className="w-10 h-10 rounded-lg bg-zinc-950 text-white flex items-center justify-center font-bold text-sm mb-6">
                2
              </div>
              <h3 className="font-extrabold text-lg text-zinc-950 mb-2">{t('step.2')}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                {t('step.2Desc')}
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-start text-left bg-white p-6 rounded-2xl border border-zinc-150 shadow-xs relative">
              <span className="text-4xl font-black text-red-100 absolute right-4 top-4 select-none">03</span>
              <div className="w-10 h-10 rounded-lg bg-red-600 text-white flex items-center justify-center font-bold text-sm mb-6">
                3
              </div>
              <h3 className="font-extrabold text-lg text-zinc-950 mb-2">{t('step.3')}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                {t('step.3Desc')}
              </p>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-start text-left bg-white p-6 rounded-2xl border border-zinc-150 shadow-xs relative">
              <span className="text-4xl font-black text-red-100 absolute right-4 top-4 select-none">04</span>
              <div className="w-10 h-10 rounded-lg bg-zinc-950 text-white flex items-center justify-center font-bold text-sm mb-6">
                4
              </div>
              <h3 className="font-extrabold text-lg text-zinc-950 mb-2">{t('step.4')}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                {t('step.4Desc')}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Accessories Banner Highlight on Home Page */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="bg-zinc-950 text-white rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="absolute right-0 top-0 w-48 h-48 bg-red-600 rounded-bl-full pointer-events-none opacity-20" />
          
          <div className="text-left max-w-xl flex flex-col gap-4">
            <span className="bg-red-600 text-white font-bold px-3 py-1 rounded-md text-[10px] uppercase tracking-widest w-max">
              Boutique Accessoires
            </span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              Des accessoires officiels & premium pour vos smartphones !
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              Venez découvrir en magasin notre large gamme de câbles solides, chargeurs rapides nouvelle technologie GaN, coques anti-choc et protecteurs écran en verre trempé.
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={() => setActiveTab('accessoires')}
              id="home-accessories-cta"
              className="px-8 py-4 bg-white text-zinc-950 hover:bg-red-600 hover:text-white font-black rounded-xl transition-all shadow-lg cursor-pointer flex items-center gap-2 uppercase tracking-wider text-xs"
            >
              <span>Découvrir le Catalogue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials block */}
      <section className="bg-zinc-50 py-20 border-t border-zinc-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto flex flex-col items-center gap-4 mb-16">
            <div className="inline-block bg-red-100 text-red-650 px-3 py-1 rounded-full text-xs font-extrabold uppercase">
              Avis Clients au Bourget
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-zinc-950">
              Faites confiance à notre <span className="text-red-600">expertise</span>
            </h2>
            <p className="text-zinc-500 text-sm sm:text-base">
              Découvrez les retours d'expérience de nos clients suite à des réparations de téléphones ou d'ordinateurs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {clientReviews.map((rev) => (
              <div key={rev.id} className="bg-white p-8 rounded-2xl border border-zinc-150 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-red-600 mb-4">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <span key={i} className="text-lg">★</span>
                    ))}
                  </div>
                  <p className="text-sm text-zinc-600 italic leading-relaxed mb-6">
                    "{rev.comment}"
                  </p>
                </div>
                
                <div className="flex justify-between items-center border-t border-zinc-100 pt-4">
                  <div className="text-left">
                    <span className="block font-extrabold text-sm text-zinc-950">{rev.name}</span>
                    <span className="block text-[10px] text-zinc-400 font-mono">{rev.date}</span>
                  </div>
                  <span className="bg-red-50 text-red-650 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                    {rev.device}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Prompt to contact / address */}
          <div className="mt-12 bg-white rounded-2xl border border-zinc-200 p-6 flex flex-col sm:flex-row justify-between items-center gap-6 max-w-4xl mx-auto">
            <div className="flex items-center gap-4 text-left">
              <div className="p-3 bg-red-50 text-red-600 rounded-full shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-zinc-950">Où nous trouver ?</h4>
                <p className="text-zinc-500 text-xs mt-0.5">
                  <a 
                    href="https://maps.app.goo.gl/uh7b2bZeafx5p38N6" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-red-650 font-bold hover:underline transition-colors"
                  >
                    42 Avenue Jean Jaurès, 93350 Le Bourget
                  </a> (Près des transports)
                </p>
              </div>
            </div>
            
            <a
              href="https://wa.me/33644664404"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-black uppercase tracking-wider bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-xl transition-colors cursor-pointer flex items-center gap-2 shrink-0"
              id="home-wa-chat"
            >
              <MessageSquare className="w-4 h-4" />
              WhatsApp: +33 6 44 66 44 04
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}

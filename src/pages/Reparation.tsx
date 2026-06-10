import React, { useState } from 'react';
import { Smartphone, Tablet, Monitor, Info, Clock, CheckCircle2, AlertOctagon, HelpCircle, ArrowRight } from 'lucide-react';
import { repairCategories } from '../data';
import { useLanguage } from '../lib/LanguageContext';

interface ReparationProps {
  setActiveTab: (tab: string) => void;
  setPreselectedDevice?: (device: string) => void;
}

export default function Reparation({ setActiveTab, setPreselectedDevice }: ReparationProps) {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<'smartphones' | 'tablets' | 'computers'>('smartphones');
  
  // Interactive estimator state
  const [estimatorBrand, setEstimatorBrand] = useState('');
  const [estimatorModel, setEstimatorModel] = useState('');
  const [estimatorIssue, setEstimatorIssue] = useState('Vitre / Écran cassé');

  const popularModelsMap = {
    Smartphones: [
      { brand: 'Apple', models: ['iPhone 15 / 15 Pro', 'iPhone 14 / 14 Pro', 'iPhone 13 / 13 Pro', 'iPhone 12 / 12 Pro', 'iPhone 11', 'iPhone SE 2022'] },
      { brand: 'Samsung', models: ['Galaxy S24 / S24 Ultra', 'Galaxy S23 / S23 Ultra', 'Galaxy S22', 'Galaxy A54 / A34', 'Galaxy A15'] },
      { brand: 'Xiaomi', models: ['Redmi Note 13', 'Redmi Note 12', 'Xiaomi 13T'] },
      { brand: 'Autres', models: ['Google Pixel 8/7', 'Huawei', 'OnePlus'] }
    ],
    Tablettes: [
      { brand: 'Apple', models: ['iPad Pro (toutes tailles)', 'iPad Air', 'iPad Mini', 'iPad standard 9/10ème Gen'] },
      { brand: 'Samsung', models: ['Galaxy Tab S9 / S8', 'Galaxy Tab A9 / A8'] },
      { brand: 'Autres', models: ['Lenovo Tab', 'Tablette générique'] }
    ],
    Ordinateurs: [
      { brand: 'Apple', models: ['MacBook Pro (M1/M2/M3)', 'MacBook Air (M1/M2/M3)', 'iMac'] },
      { brand: 'ASUS', models: ['ZenBook', 'VivoBook', 'ROG Gaming'] },
      { brand: 'Lenovo', models: ['ThinkPad', 'IdeaPad'] },
      { brand: 'HP / Dell', models: ['HP Pavillion', 'HP Envy', 'Dell XPS', 'Dell Latitude'] }
    ]
  };

  const currentModelsData = selectedCategory === 'smartphones' 
    ? popularModelsMap.Smartphones 
    : selectedCategory === 'tablets' 
      ? popularModelsMap.Tablettes 
      : popularModelsMap.Ordinateurs;

  // Simple simulator pricing maps
  const getEstimatedPrice = () => {
    const brandLower = estimatorBrand.toLowerCase();
    const isApple = brandLower.includes('apple') || brandLower.includes('iphone') || brandLower.includes('ipad') || brandLower.includes('mac');
    if (selectedCategory === 'smartphones') {
      if (estimatorIssue === 'Vitre / Écran cassé') {
        return isApple ? 'À partir de 69€' : 'À partir de 59€';
      }
      if (estimatorIssue === 'Batterie à remplacer') {
        return '39€ - 59€';
      }
      return '35€ - 49€';
    } 
    
    if (selectedCategory === 'tablets') {
      if (estimatorIssue === 'Vitre / Écran cassé') {
        return 'À partir de 89€';
      }
      if (estimatorIssue === 'Batterie à remplacer') {
        return '59€ - 79€';
      }
      return '49€ - 69€';
    }

    // Computers
    if (estimatorIssue === 'Vitre / Écran cassé') {
      return 'À partir de 129€';
    }
    if (estimatorIssue === 'Batterie à remplacer') {
      return '89€ - 119€';
    }
    if (estimatorIssue === 'Nettoyage & Pâte Thermique') {
      return '49€';
    }
    return 'Dès 59€';
  };

  const getEstimatedDuration = () => {
    if (estimatorIssue === 'Vitre / Écran cassé') return '30 min à 1h';
    if (estimatorIssue === 'Batterie à remplacer') return '20 à 40 min';
    if (estimatorIssue === 'Nettoyage & Pâte Thermique') return '45 min';
    return 'Sous devis';
  };

  const handleBookRepair = () => {
    if (setPreselectedDevice) {
      const deviceStr = [estimatorBrand.trim(), estimatorModel.trim()].filter(Boolean).join(' ');
      setPreselectedDevice(`${deviceStr || 'Appareil'} (${estimatorIssue})`);
    }
    setActiveTab('contact');
    window.scrollTo({ top: 1200, behavior: 'smooth' }); // Scroll to contact form
  };

  const currentCategoryData = repairCategories.find(c => c.id === selectedCategory)!;

  return (
    <div id="page-reparation" className="w-full bg-white text-zinc-950 animate-in fade-in duration-300">
      
      {/* Title Header Section */}
      <section className="bg-zinc-50 border-b border-zinc-100 py-12 text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-3">
          <div className="bg-red-100 text-red-650 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
            {t('banner.freeQuote')}
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-zinc-950">
            {language === 'FR' ? (
              <>Services de <span className="text-red-600">Réparation</span></>
            ) : language === 'EN' ? (
              <>Our <span className="text-red-600">Repair</span> Services</>
            ) : language === 'ES' ? (
              <>Servicios de <span className="text-red-600">Reparación</span></>
            ) : language === 'IT' ? (
              <>Servizi di <span className="text-red-600">Riparazione</span></>
            ) : language === 'RU' ? (
              <>Услуги по <span className="text-red-650">ремонту</span></>
            ) : (
              <>خدمات <span className="text-red-600">الإصلاح</span> المعتمدة</>
            )}
          </h1>
          <p className="text-zinc-650 max-w-2xl text-sm sm:text-base">
            {t('rep.subtitle')}
          </p>
        </div>
      </section>

      {/* Category selector pills */}
      <div className="max-w-7xl mx-auto px-4 mt-12">
        <div className="flex justify-center border-b border-zinc-100 max-w-lg mx-auto p-1.5 bg-zinc-50 rounded-2xl">
          {(['smartphones', 'tablets', 'computers'] as const).map((cat) => {
            const currentCat = repairCategories.find(c => c.id === cat)!;
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  // Reset brand and model so the box starts empty and the user can fill it
                  setEstimatorBrand('');
                  setEstimatorModel('');
                }}
                className={`flex-1 py-3 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-zinc-950 text-white shadow-md'
                    : 'text-zinc-500 hover:text-zinc-950 hover:bg-zinc-100/50'
                }`}
                id={`cat-btn-${cat}`}
              >
                {cat === 'smartphones' && <Smartphone className="w-4 h-4 shrink-0" />}
                {cat === 'tablets' && <Tablet className="w-4 h-4 shrink-0" />}
                {cat === 'computers' && <Monitor className="w-4 h-4 shrink-0" />}
                <span>{currentCat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of repair offerings */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main listings (Col span 7) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="flex justify-between items-center border-b border-zinc-150 pb-4">
              <h2 className="text-xl font-black text-zinc-950 uppercase tracking-tight">
                Tarifs de Réparation : <span className="text-red-650">{currentCategoryData.name}</span>
              </h2>
              <span className="text-xs text-zinc-400 font-bold font-mono">
                {currentCategoryData.repairs.length} Services Disponibles
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {currentCategoryData.repairs.map((repair) => (
                <div 
                  key={repair.id} 
                  className="p-5 sm:p-6 border-2 border-zinc-950 bg-white shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center group"
                >
                  <div className="text-left flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-extrabold text-base text-zinc-950 group-hover:text-red-600 transition-colors">
                        {repair.name}
                      </h3>
                      <span className="inline-flex items-center gap-1 bg-zinc-100 border border-zinc-950 text-[10px] text-zinc-950 px-2 py-0.5 font-bold uppercase tracking-wider">
                        <Clock className="w-3 h-3 text-red-600 shrink-0" />
                        {repair.duration}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500 mt-2 leading-relaxed max-w-xl font-medium">
                      {repair.description}
                    </p>
                  </div>
                  
                  <div className="flex sm:flex-col items-end justify-between w-full sm:w-auto border-t sm:border-t-0 border-zinc-100 pt-3 sm:pt-0 shrink-0 gap-3">
                    <span className="text-sm font-black text-white bg-zinc-950 border border-zinc-950 px-3 py-1.5 shadow-[2px_2px_0px_0px_rgba(220,38,38,1)] tracking-tight inline-block shrink-0 uppercase">
                      {repair.price}
                    </span>
                    <button
                      onClick={() => {
                        if (setPreselectedDevice) {
                          setPreselectedDevice(`${currentCategoryData.name} (${repair.name})`);
                        }
                        setActiveTab('contact');
                      }}
                      className="text-[10px] font-black uppercase text-red-600 hover:text-zinc-950 tracking-widest flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <span>Sélectionner</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-red-50/50 rounded-2xl p-4 flex gap-3 text-left border border-red-100">
              <Info className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div className="text-xs text-red-950">
                <span className="font-bold block mb-1">Information importante sur nos prix :</span>
                Les tarifs indiqués sont des approximations de base incluant la pièce de rechange certifiée et la main-d'œuvre. Pour certains modèles ultra-haut de gamme, un supplément constructeur peut s'appliquer.
              </div>
            </div>
          </div>

          {/* Interactive Estimator Block (Col span 5) */}
          <div className="lg:col-span-5">
            <div className="bg-zinc-950 text-white rounded-2xl p-6 sm:p-8 shrink-0 sticky top-36 border border-zinc-800">
              <div className="flex flex-col gap-1 mb-6 text-left border-b border-zinc-800 pb-4">
                <span className="text-red-500 font-extrabold text-[10px] uppercase tracking-widest font-mono">{t('rep.estimateDetails')}</span>
                <h2 className="text-lg font-black tracking-tight uppercase">{t('rep.title')}</h2>
                <p className="text-xs text-zinc-400">{t('rep.subtitle')}</p>
              </div>

              <div className="flex flex-col gap-4 text-left">
                {/* Brand select */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-zinc-300 uppercase">{t('rep.brand')}</label>
                  <input
                    type="text"
                    value={estimatorBrand}
                    onChange={(e) => setEstimatorBrand(e.target.value)}
                    placeholder={t('rep.brandPlaceholder')}
                    className="bg-zinc-900 border border-zinc-800 text-white rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-red-600 w-full"
                    id="estimator-brand-input"
                  />
                </div>

                {/* Model select */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-zinc-300 uppercase">{t('rep.model')}</label>
                  <input
                    type="text"
                    value={estimatorModel}
                    onChange={(e) => setEstimatorModel(e.target.value)}
                    placeholder={t('rep.modelPlaceholder')}
                    className="bg-zinc-900 border border-zinc-800 text-white rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-red-600 w-full"
                    id="estimator-model-input"
                  />
                </div>

                {/* Problem type */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-zinc-300 uppercase">Type de problème constaté</label>
                  <select
                    value={estimatorIssue}
                    onChange={(e) => setEstimatorIssue(e.target.value)}
                    className="bg-zinc-900 border border-zinc-800 text-white rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-red-600 cursor-pointer"
                  >
                    <option value="Vitre / Écran cassé">Écran cassé / Vitre fissurée</option>
                    <option value="Batterie à remplacer">La batterie ne tient plus la charge / Chauffe</option>
                    {selectedCategory === 'computers' && <option value="Nettoyage & Pâte Thermique">Chauffe importante / Dépoussiérage requis</option>}
                    <option value="Port de charge / Boutons">Problème de charge / Boutons bloqués</option>
                    <option value="Caméra / Lentille cassée">Appareil photo flou / lentille brisée</option>
                    <option value="Diagnostic / Autre">Diagnostic général / Autre panne indéterminée</option>
                  </select>
                </div>

                {/* Estimator Result panel */}
                <div className="bg-zinc-900/80 border border-zinc-800 p-5 rounded-2xl flex flex-col gap-4 mt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-zinc-400 font-semibold font-mono uppercase">Estimation Estimée :</span>
                    <span className="bg-red-950 text-red-500 font-bold px-2 py-0.5 rounded text-[10px] uppercase font-mono tracking-wider">
                      Spécial Promo Bourget
                    </span>
                  </div>
                  
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-black text-red-500">
                      {getEstimatedPrice()}
                    </span>
                    <span className="text-xs font-mono text-zinc-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-red-500 shrink-0" />
                      ≈ {getEstimatedDuration()}
                    </span>
                  </div>

                  <p className="text-[11px] text-zinc-500 leading-relaxed border-t border-zinc-800 pt-3">
                    Cette estimation comprend la pièce de rechange sélectionnée et la pose express par notre technicien qualifié MOBICURE.
                  </p>
                </div>

                <button
                  onClick={handleBookRepair}
                  id="estimator-cta-book"
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-extrabold py-4 rounded-xl text-center text-xs uppercase tracking-wider transition-all mt-2 cursor-pointer shadow-md flex items-center justify-center gap-2"
                >
                  <span>Prendre RDV en Boutique avec ce devis</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Quality Guarantees Banner (High quality at affordable rate text) */}
      <section className="bg-zinc-50 border-t border-zinc-100 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto flex flex-col items-center gap-3 mb-12">
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-950 uppercase tracking-tight">
              Pourquoi confier votre matériel à <span className="text-red-600">MOBICURE</span> ?
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500">
              Des méthodes éprouvées, un outillage à la pointe du secteur et un souci du détail constant.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl border border-zinc-150 text-left">
              <CheckCircle2 className="w-8 h-8 text-red-600 mb-4" />
              <h4 className="font-extrabold text-base text-zinc-950 mb-2">Pièces Premium Uniquement</h4>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Nous boudons les pièces d'imitation bas de gamme qui risquent d'abîmer le système ou de lâcher en un mois. Nos pièces sont garanties d'origine constructeur ou génériques de qualité supérieure.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-zinc-150 text-left">
              <CheckCircle2 className="w-8 h-8 text-black mb-4" />
              <h4 className="font-extrabold text-base text-zinc-950 mb-2">Aucun Frais Caché</h4>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Notre diagnostic est gratuit et sans aucun engagement. Le prix qui vous est communiqué avant réparation reste le prix final payé à la caisse.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-zinc-150 text-left">
              <CheckCircle2 className="w-8 h-8 text-red-600 mb-4" />
              <h4 className="font-extrabold text-base text-zinc-950 mb-2">Sécurité Absolue de vos Données</h4>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Pas besoin de réinitialiser votre appareil avant de nous le confier. Vos photos, fichiers professionnels et applications restent stockés en toute sécurité lors du remplacement de l'écran ou de composant.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mini FAQ Section */}
      <section className="py-20 max-w-4xl mx-auto px-4">
        <div className="text-center flex flex-col items-center gap-3 mb-12">
          <HelpCircle className="w-10 h-10 text-red-600" />
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-zinc-950">
            Foire Aux Questions Réparation
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          <div className="border border-zinc-150 p-6 rounded-xl text-left bg-white">
            <h4 className="font-bold text-sm text-zinc-950">Dois-je prendre rendez-vous pour faire réparer mon smartphone ?</h4>
            <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
              Non ! Vous pouvez vous présenter librement dans notre boutique au Bourget du Lundi au Samedi. La plupart des pièces de rechange sont en stock permanent, facilitant un dépannage express en moins de 30 minutes.
            </p>
          </div>

          <div className="border border-zinc-150 p-6 rounded-xl text-left bg-white">
            <h4 className="font-bold text-sm text-zinc-950">Que se passe-t-il si mon appareil est jugé non-réparable ?</h4>
            <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
              Si, suite à notre diagnostic gratuit, il s'avère qu'un appareil souffre d'un défaut critique (carte mère broyée, processeur endommagé), nous vous l'indiquons sans vous réclamer le moindre frais de dossier.
            </p>
          </div>

          <div className="border border-zinc-150 p-6 rounded-xl text-left bg-white">
            <h4 className="font-bold text-sm text-zinc-950">Quelle est la durée de la garantie MOBICURE ?</h4>
            <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
              Toutes nos réparations d'écrans de smartphone, de tablettes, et de batterie de PC portables sont accompagnées d'une garantie claire de 3 à 12 mois couvrant n'importe quel défaut matériel ou anomalie de fonctionnement.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}

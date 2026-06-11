import React, { useState } from 'react';
import { ShoppingBag, Search, Filter, Check, Tag, Info, Heart, ArrowRight } from 'lucide-react';
import { accessoriesItems } from '../data';
import { AccessoryItem } from '../types';
import { useLanguage } from '../lib/LanguageContext';

interface AccessoiresProps {
  setActiveTab: (tab: string) => void;
  onAddToCart: (item: AccessoryItem) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export default function Accessoires({ setActiveTab, onAddToCart, favorites, onToggleFavorite }: AccessoiresProps) {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'smartphones' | 'tablets' | 'computers'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const filteredItems = accessoriesItems.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesQuery = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const handleAddToCartWithLocalNotice = (item: AccessoryItem) => {
    onAddToCart(item);
    setAlertMessage(`"${item.name}" a été ajouté à votre présélection de réservation !`);
    setTimeout(() => {
      setAlertMessage(null);
    }, 4000);
  };

  return (
    <div id="page-accessoires" className="w-full bg-white text-zinc-950 animate-in fade-in duration-300">
      
      {/* Page Title Banner */}
      <section className="bg-zinc-50 border-b border-zinc-100 py-12 text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-3">
          <div className="bg-red-100 text-red-650 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
            {t('acc.badge')}
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-zinc-950">
            Boutique <span className="text-red-600">Accessoires</span>
          </h1>
          <p className="text-zinc-655 max-w-2xl text-sm sm:text-base">
            Équipez vos smartphones, tablettes et ordinateurs portables avec ce qui se fait de mieux sur le marché. Disponibles dès aujourd'hui en retrait magasin sans file d'attente.
          </p>
        </div>
      </section>

      {/* Toast alert message */}
      {alertMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md w-full bg-zinc-950 text-white border-l-4 border-red-650 p-4 rounded-xl shadow-xl animate-in slide-in-from-bottom duration-300 flex justify-between items-start gap-3">
          <div className="flex gap-2">
            <ShoppingBag className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div className="text-left text-xs text-white">
              <span className="font-bold block mb-0.5">Produit réservé !</span>
              {alertMessage}
            </div>
          </div>
          <button 
            onClick={() => setAlertMessage(null)} 
            className="text-zinc-400 hover:text-white font-bold text-xs"
          >
            ×
          </button>
        </div>
      )}

      {/* Filter and Search Action bar */}
      <div className="max-w-7xl mx-auto px-4 mt-12">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-zinc-50 p-4 rounded-2xl border border-zinc-150">
          
          {/* Quick Categories Filter Tab */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <span className="text-xs font-bold text-zinc-400 uppercase mr-2 hidden lg:inline">Catégories:</span>
            {[
              { id: 'all', label: 'Tous les Articles' },
              { id: 'smartphones', label: 'Smartphones' },
              { id: 'tablets', label: 'Tablettes' },
              { id: 'computers', label: 'Ordinateurs' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id as any)}
                className={`py-2 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === tab.id
                    ? 'bg-zinc-950 text-white shadow-sm'
                    : 'bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-100 hover:text-zinc-900'
                }`}
                id={`filter-tab-${tab.id}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search box input */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Rechercher un accessoire..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-zinc-250 rounded-xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
              id="acc-search-input"
            />
          </div>

        </div>
      </div>

      {/* Main accessories listings grid */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        {filteredItems.length === 0 ? (
          <div className="py-20 text-center border-2 border-dashed border-zinc-200 rounded-3xl max-w-2xl mx-auto">
            <ShoppingBag className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-zinc-950">Aucun accessoire trouvé</h3>
            <p className="text-zinc-500 text-xs mt-1">Essayer d'ajuster votre recherche ou de changer la catégorie filtrée.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 text-xs font-bold text-red-600 hover:underline"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => {
              const isFavorite = favorites.includes(item.id);
              return (
                <div 
                  key={item.id} 
                  className="bg-white border border-zinc-150 rounded-2xl overflow-hidden hover:border-red-650 transition-all flex flex-col justify-between hover:shadow-lg relative group"
                  id={`acc-card-${item.id}`}
                >
                  
                  {/* Image mock box */}
                  <div className="relative bg-zinc-50 p-8 flex items-center justify-center border-b border-zinc-100 aspect-video select-none">
                    
                    {/* Badge */}
                    {item.tag && (
                      <span className="absolute top-4 left-4 bg-red-600 text-white font-black text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-sm">
                        {item.tag}
                      </span>
                    )}

                    {/* Stock Status Indicator */}
                    <span className="absolute top-4 right-4 bg-white border border-zinc-200 text-xs py-0.5 px-2 rounded-full font-bold text-green-600 bg-emerald-50/80 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Disponible
                    </span>

                    {/* Aesthetic CSS Device Drawing representing category */}
                    <div className="transition-transform group-hover:scale-105 duration-300">
                      {item.category === 'smartphones' ? (
                        <div className="w-12 h-20 rounded-lg border-2 border-zinc-400 bg-white shadow-xs relative flex items-center justify-center">
                          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-zinc-300 rounded-full" />
                          <ShoppingBag className="w-5 h-5 text-red-600 stroke-[1.5]" />
                          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full border border-zinc-350" />
                        </div>
                      ) : item.category === 'tablets' ? (
                        <div className="w-20 h-16 rounded-lg border-2 border-zinc-400 bg-white shadow-xs relative flex items-center justify-center">
                          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-zinc-300" />
                          <ShoppingBag className="w-5 h-5 text-zinc-950 stroke-[1.5]" />
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <div className="w-24 h-14 rounded-lg border-2 border-zinc-400 bg-white shadow-xs relative flex items-center justify-center">
                            <ShoppingBag className="w-5 h-5 text-red-600 stroke-[1.5]" />
                          </div>
                          <div className="w-28 h-1.5 bg-zinc-400 rounded-b" />
                        </div>
                      )}
                    </div>

                    {/* Favorite click action */}
                    <button
                      onClick={() => onToggleFavorite(item.id)}
                      className="absolute bottom-4 right-4 bg-white hover:bg-red-50 p-2 rounded-full shadow-xs border border-zinc-150 text-zinc-400 hover:text-red-600 transition-colors cursor-pointer"
                      id={`fav-btn-${item.id}`}
                    >
                      <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-600 text-red-650' : ''}`} />
                    </button>
                  </div>

                  {/* Body Text */}
                  <div className="p-6 text-left flex-1 flex flex-col justify-between">
                    <div>
                      {/* Price & Name */}
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <h3 className="font-black text-base text-zinc-950 line-clamp-2 leading-tight group-hover:text-red-500 transition-colors">
                          {item.name}
                        </h3>
                        <span className="text-lg font-black text-red-650 shrink-0 font-sans">
                          {item.price.toFixed(2)}€
                        </span>
                      </div>

                      <p className="text-xs text-zinc-500 leading-relaxed mb-4 line-clamp-2">
                        {item.description}
                      </p>

                      {/* Feature specs checklist */}
                      <ul className="flex flex-col gap-1.5 mb-6">
                        {item.features.map((feat, idx) => (
                          <li key={idx} className="flex gap-2 items-start text-[11px] text-zinc-700 font-semibold leading-normal">
                            <Check className="w-3.5 h-3.5 text-red-600 mt-0.5 shrink-0 stroke-[3]" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Pre-order reservation cta buttons */}
                    <div className="border-t border-zinc-100 pt-4 flex gap-2">
                      <button
                        onClick={() => handleAddToCartWithLocalNotice(item)}
                        id={`btn-reserve-${item.id}`}
                        className="flex-1 bg-zinc-950 hover:bg-red-600 text-white font-extrabold py-3 rounded-lg text-center text-xs tracking-wider uppercase transition-colors cursor-pointer"
                      >
                        Réserver à la boutique
                      </button>

                      <button
                        onClick={() => {
                          setActiveTab('contact');
                          // Inject preselected message about reserving this specific item
                          const formNode = document.getElementById('contact-remarks') as HTMLTextAreaElement | null;
                          if (formNode) {
                            formNode.value = `Bonjour MOBICURE, je souhaiterais venir retirer en magasin l'accessoire suivant : "${item.name}" à ${item.price.toFixed(2)}€. Vos équipes l'ont-elles de côté ?`;
                            formNode.dispatchEvent(new Event('input', { bubbles: true }));
                          }
                          window.scrollTo({ top: 1200, behavior: 'smooth' });
                        }}
                        className="bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 text-zinc-900 px-3 rounded-lg transition-colors cursor-pointer flex items-center justify-center"
                        title="Demander conseil"
                      >
                        <Info className="w-4 h-4 text-zinc-500" />
                      </button>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Custom Promo block */}
      <section className="bg-zinc-50 border-t border-zinc-150 py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-left flex flex-col gap-4">
            <span className="bg-zinc-950 text-white font-bold px-2 py-0.5 rounded text-[10px] uppercase w-max tracking-wider">
              Engagement Mobicure
            </span>
            <h2 className="text-xl sm:text-3xl font-extrabold text-zinc-950">
              Des accessoires garantis compatibles et durables
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed">
              Nous sélectionnons chaque référence avec minutie pour s'assurer qu'elle respecte les tensions électriques des batteries constructeurs. Évitez les surchauffes ou les usures prématurées causées par des chargeurs factices ou de mauvaises coques protectrices qui emprisonnent la chaleur.
            </p>
            <div className="flex gap-4 mt-2">
              <span className="text-xs font-bold text-red-650">• Garantie Constructeur</span>
              <span className="text-xs font-bold text-zinc-950">• Retours gratuits</span>
              <span className="text-xs font-bold text-red-655">• Test en boutique possible</span>
            </div>
          </div>

          <div className="bg-white border border-zinc-150 p-8 rounded-2xl text-left shadow-xs flex flex-col justify-between gap-6">
            <div>
              <h3 className="font-black text-lg text-zinc-950 uppercase border-b border-red-600 pb-2">
                Demande d'accessoire sur commande ?
              </h3>
              <p className="text-xs text-zinc-550 leading-relaxed mt-3">
                Vous recherchez une pièce ou une housse pour un modèle très spécifique (ex: ancienne tablette, pc portable pro rare) ? Notre service achat peut passer commande chez notre fournisseur en direct sous 24 heures.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('contact')}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-center text-xs tracking-wider uppercase transition-colors cursor-pointer self-start flex items-center gap-2"
            >
              <span>Envoyer une demande spécifique</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Accueil from './pages/Accueil';
import Reparation from './pages/Reparation';
import Accessoires from './pages/Accessoires';
import Contact from './pages/Contact';
import { AccessoryItem } from './types';
import { ShoppingBag, X, Check, Heart, ShieldCheck } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('accueil');
  const [preselectedDevice, setPreselectedDevice] = useState<string>('');
  
  // Cart/Reservation list
  const [cartItems, setCartItems] = useState<AccessoryItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Add accessory to preselected list
  const handleAddToCart = (item: AccessoryItem) => {
    // Only add if not already in list to avoid duplicates
    if (!cartItems.find((i) => i.id === item.id)) {
      setCartItems([...cartItems, item]);
    }
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleToggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const handleClearPreselectedDevice = () => {
    setPreselectedDevice('');
  };

  // Switch to contact tab and prefill message with cart reservations
  const handleCheckoutCart = () => {
    setIsCartOpen(false);
    
    const itemsList = cartItems.map((item) => `"${item.name}" (${item.price.toFixed(2)}€)`).join(', ');
    const totalPrice = cartItems.reduce((acc, curr) => acc + curr.price, 0).toFixed(2);
    
    setPreselectedDevice(`Réservation d'Accessoires (${cartItems.length} articles - ${totalPrice}€)`);
    
    // Switch to contact page
    setActiveTab('contact');
    
    // Wait a brief delay for rendering then inject detailed message
    setTimeout(() => {
      const formNode = document.getElementById('contact-remarks') as HTMLTextAreaElement | null;
      if (formNode) {
        formNode.value = `Bonjour MOBICURE, je souhaiterais venir retirer en magasin au Bourget ma sélection de ${cartItems.length} accessoires pour un montant total de ${totalPrice}€ :\n\n• ${cartItems.map((i) => i.name).join('\n• ')}\n\nMerci de me confirmer la mise de côté de ces articles !`;
        formNode.dispatchEvent(new Event('input', { bubbles: true }));
      }
      window.scrollTo({ top: 1200, behavior: 'smooth' }); // Scroll to contact form
    }, 100);
  };

  const cartTotal = cartItems.reduce((acc, curr) => acc + curr.price, 0);

  return (
    <div className="min-h-screen bg-white text-zinc-950 flex flex-col font-sans selection:bg-red-600 selection:text-white">
      
      {/* Main Navigation Header */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Cart Quick Floating Sticky Badge */}
      {cartItems.length > 0 && (
        <button
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-6 left-6 z-40 bg-zinc-950 text-white p-4 rounded-full shadow-2xl border-2 border-red-650 hover:bg-red-650 cursor-pointer transition-all flex items-center gap-2 group animate-bounce"
          id="floating-cart-btn"
          title="Consulter vos réservations"
        >
          <ShoppingBag className="w-6 h-6 text-white group-hover:scale-105 transition-transform" />
          <span className="bg-red-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-full min-w-5 h-5 flex items-center justify-center -mt-8 -mr-6 absolute border border-white">
            {cartItems.length}
          </span>
        </button>
      )}

      {/* Cart Slide-Over Modal Sidebar */}
      {isCartOpen && (
        <div id="cart-drawer-overlay" className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs flex justify-end transition-opacity animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-zinc-100 animate-in slide-in-from-right duration-350">
            
            {/* Drawer Header */}
            <div className="p-6 border-b border-zinc-150 flex justify-between items-center bg-zinc-50">
              <div className="flex items-center gap-2 text-left">
                <div className="bg-red-600 text-white p-1.5 rounded-md">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-zinc-950 uppercase tracking-tight">Vos réservations</h3>
                  <p className="text-[10px] text-zinc-500 font-mono">MOBICURE LE BOURGET STORE</p>
                </div>
              </div>
              
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 rounded-lg border border-zinc-200 text-zinc-500 hover:text-red-600 hover:bg-zinc-50 cursor-pointer"
                id="close-cart-drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List of reserved items */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
              {cartItems.length === 0 ? (
                <div className="my-auto text-center py-12">
                  <ShoppingBag className="w-12 h-12 text-zinc-200 mx-auto mb-3" />
                  <p className="text-sm font-bold text-zinc-500">Aucun accessoire sélectionné</p>
                  <p className="text-xs text-zinc-400 mt-1 max-w-[200px] mx-auto">Explorez l'onglet boutique et réservez vos articles préférés.</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="border border-zinc-150 p-4 rounded-xl flex gap-4 bg-white hover:border-red-600 transition-colors relative">
                    <div className="w-12 h-12 rounded bg-zinc-50 flex items-center justify-center shrink-0 border border-zinc-100">
                      <span className="font-black text-xs text-red-600">ACC</span>
                    </div>

                    <div className="text-left flex-1">
                      <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wide">
                        {item.category === 'smartphones' ? 'Smartphone' : item.category === 'tablets' ? 'Tablette' : 'Ordinateur'}
                      </span>
                      <h4 className="font-bold text-xs text-zinc-950 line-clamp-1">{item.name}</h4>
                      <p className="text-xs font-black text-red-600 mt-1 font-mono">{item.price.toFixed(2)}€</p>
                    </div>

                    <button 
                      onClick={() => handleRemoveFromCart(item.id)}
                      className="absolute top-2 right-2 p-1 text-zinc-400 hover:text-red-600 rounded cursor-pointer"
                      title="Supprimer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Panel Summary Footer */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-zinc-150 bg-zinc-50 flex flex-col gap-4 text-left">
                <div className="flex justify-between items-center text-sm font-semibold">
                  <span className="text-zinc-600">Articles présélectionnés :</span>
                  <span className="text-zinc-900 font-mono font-bold">{cartItems.length}</span>
                </div>
                
                <div className="flex justify-between items-baseline border-b border-zinc-200 pb-3">
                  <span className="text-zinc-950 font-extrabold text-base uppercase">Total estimé :</span>
                  <span className="text-xl font-black text-red-655 font-mono">{cartTotal.toFixed(2)}€</span>
                </div>

                <div className="flex items-start gap-2.5 bg-white p-3 rounded-xl border border-zinc-200 text-[10px] text-zinc-500 leading-normal">
                  <ShieldCheck className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>Aucun paiement en ligne requis ! Vous réglez sur place lors de la récupération des articles à notre boutique au Bourget.</span>
                </div>

                <button
                  onClick={handleCheckoutCart}
                  id="cart-checkout-btn"
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-extrabold py-3.5 rounded-xl text-center text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Confirmer ma réservation</span>
                  <Check className="w-4 h-4 stroke-[3]" />
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Render Active Tab / Content */}
      <main className="flex-grow w-full">
        {activeTab === 'accueil' && (
          <Accueil setActiveTab={setActiveTab} />
        )}
        
        {activeTab === 'reparation' && (
          <Reparation 
            setActiveTab={setActiveTab} 
            setPreselectedDevice={setPreselectedDevice} 
          />
        )}
        
        {activeTab === 'accessoires' && (
          <Accessoires 
            setActiveTab={setActiveTab} 
            onAddToCart={handleAddToCart}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
        )}
        
        {activeTab === 'contact' && (
          <Contact 
            preselectedDevice={preselectedDevice} 
            onClearPreselectedDevice={handleClearPreselectedDevice} 
          />
        )}
      </main>

      {/* Footer block holding address, coordinates and site outline links */}
      <Footer setActiveTab={setActiveTab} />

    </div>
  );
}

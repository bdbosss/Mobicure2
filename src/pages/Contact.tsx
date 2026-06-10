import React, { useState, useEffect } from 'react';
import { MapPin, Phone, MessageCircle, Mail, Send, Clock, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';
import { businessHours } from '../data';

interface ContactProps {
  preselectedDevice?: string;
  onClearPreselectedDevice?: () => void;
}

export default function Contact({ preselectedDevice, onClearPreselectedDevice }: ContactProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [deviceVal, setDeviceVal] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Sync preselected estimates from Repair page
  useEffect(() => {
    if (preselectedDevice) {
      setDeviceVal(preselectedDevice);
      setMessage(`Bonjour MOBICURE, je souhaiterais obtenir la confirmation de mon devis pour mon appareil : ${preselectedDevice}. Merci !`);
    }
  }, [preselectedDevice]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      setErrorMessage("Veuillez remplir tous les champs obligatoires (Nom, Email et Téléphone).");
      return;
    }

    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("https://formsubmit.co/ajax/mobicure93@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          Nom: name,
          Email: email,
          Telephone: phone,
          "Appareil / Modele": deviceVal || "Non specifié",
          Message: message || "Aucun message",
          _subject: `Nouveau Message Client Mobicure - ${name}`,
        })
      });

      let data: any = {};
      try {
        data = await response.json();
      } catch (jsonErr) {
        console.warn("Could not parse JSON response:", jsonErr);
      }

      if (response.ok && (data.success === "true" || data.success === true)) {
        setIsSubmitted(true);
        if (onClearPreselectedDevice) {
          onClearPreselectedDevice();
        }
      } else {
        throw new Error(data.message || "Une erreur s'est produite lors du traitement du formulaire.");
      }
    } catch (err: any) {
      console.warn("Contact form submission notice:", err);
      const isActivation = err.message && (
        err.message.toLowerCase().includes("activation") ||
        err.message.toLowerCase().includes("activate")
      );

      if (isActivation) {
        setErrorMessage(
          "Activation requise : FormSubmit a envoyé un e-mail d'activation à mobicure93@gmail.com. Veuillez ouvrir votre messagerie et cliquer sur le lien reçu pour activer ce formulaire et commencer à recevoir les messages de vos clients !"
        );
      } else {
        setErrorMessage(
          "Erreur de transmission. Veuillez réessayer ou nous contacter directement via WhatsApp."
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setDeviceVal('');
    setIsSubmitted(false);
  };

  return (
    <div id="page-contact" className="w-full bg-white text-zinc-950 animate-in fade-in duration-300">
      
      {/* Page Title Section */}
      <section className="bg-zinc-50 border-b border-zinc-100 py-12 text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-3">
          <div className="bg-red-100 text-red-650 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
            Assistance & Devis gratuit immédiat
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-zinc-950">
            Contactez <span className="text-red-600">MOBICURE</span>
          </h1>
          <p className="text-zinc-650 max-w-2xl text-sm sm:text-base">
            Notre équipe se tient mobilisée pour répondre à vos interrogations matérielles et logicielles dans les plus brefs délais. Écrivez-nous ou passez en magasin !
          </p>
        </div>
      </section>

      {/* Main Grid Content */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Coordinates and Map (Col span 5) */}
          <div className="lg:col-span-5 flex flex-col gap-8 text-left">
            <div>
              <span className="text-red-600 font-extrabold text-xs uppercase tracking-widest font-mono block mb-1">Coordonnées Professionnelles</span>
              <h2 className="text-xl sm:text-2xl font-black text-zinc-950 uppercase tracking-tight mb-4">Informations d'Entreprise</h2>
              <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed">
                Retrouvez toutes les façons de nous contacter et l'emplacement de notre atelier de diagnostic technique agréé Mobicure au Bourget.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="flex flex-col gap-4">
              
              {/* Address card */}
              <div className="border border-zinc-150 p-4 rounded-xl flex gap-4 bg-white items-start">
                <div className="p-3 bg-red-55 text-red-650 rounded-xl shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-zinc-950 uppercase tracking-wide">Notre Boutique</h4>
                  <a 
                    href="https://maps.google.com/?q=42+Avenue+Jean+Jaures,+93350+Le+Bourget" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs text-zinc-500 hover:text-red-600 transition-colors mt-1 block leading-normal"
                    id="contact-address-link"
                  >
                    42 Avenue Jean Jaurès, 93350 Le Bourget
                  </a>
                  <span className="text-[10px] text-zinc-400 font-bold uppercase mt-1 block">Région Parisienne (93)</span>
                </div>
              </div>

              {/* Phone card */}
              <div className="border border-zinc-150 p-4 rounded-xl flex gap-4 bg-white items-start">
                <div className="p-3 bg-zinc-950 text-white rounded-xl shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-zinc-950 uppercase tracking-wide">Numéro de Téléphone</h4>
                  <a 
                    href="tel:+33644664404" 
                    className="text-xs text-zinc-650 font-bold hover:text-red-600 transition-colors mt-1 block font-mono"
                    id="contact-phone-link"
                  >
                    +33 6 44 66 44 04
                  </a>
                  <span className="text-[10px] text-zinc-400 font-medium block mt-1">Appel non surtaxé • Accueil technique direct</span>
                </div>
              </div>

              {/* Link WhatsApp - requested explicitly */}
              <div className="border border-zinc-150 bg-red-50/50 p-5 rounded-xl border-dashed border-red-200">
                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-red-600 text-white rounded-xl shrink-0">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-zinc-950 uppercase tracking-wide">Lien WhatsApp Direct</h4>
                    <p className="text-[11px] text-zinc-500 mt-1 leading-normal">
                      Échangez en direct avec notre technicien ! Envoyez la photo de votre matériel cassé pour un chiffrage instantané.
                    </p>
                    <a 
                      href="https://wa.me/33644664404" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white font-extrabold px-4 py-2 mt-3 rounded-lg text-[10px] uppercase tracking-wider transition-colors cursor-pointer"
                      id="contact-whatsapp-link"
                    >
                      <span>Lancer le Chat WhatsApp</span>
                      <MessageCircle className="w-4 h-4 fill-white" />
                    </a>
                  </div>
                </div>
              </div>

            </div>

            {/* Hours list info */}
            <div className="border border-zinc-150 p-6 rounded-xl bg-zinc-50">
              <h4 className="font-black text-sm text-zinc-950 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-red-600" />
                Heures de Réception au Bourget
              </h4>
              <ul className="flex flex-col gap-2 text-xs text-zinc-600 border-t border-zinc-200 pt-3">
                {businessHours.map((h, i) => (
                  <li key={i} className="flex justify-between items-start font-semibold border-b border-zinc-100 pb-2 last:border-0 last:pb-0">
                    <span className="whitespace-pre-line text-left">{h.day}</span>
                    <span className="text-red-600 font-bold whitespace-pre-line text-right">{h.hours}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Static Visual Map Representation */}
            <div className="border border-zinc-150 rounded-2xl overflow-hidden aspect-video relative bg-zinc-100 flex items-center justify-center select-none shadow-xs">
              {/* Map grid decoration representing Le Bourget blocks */}
              <svg className="absolute inset-0 w-full h-full text-zinc-300 opacity-20" xmlns="http://www.w3.org/2000/svg">
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#grid)" />
                {/* Diagonal roads */}
                <line x1="0" y1="20" x2="400" y2="220" stroke="currentColor" strokeWidth="12" />
                <line x1="200" y1="0" x2="300" y2="300" stroke="currentColor" strokeWidth="8" />
              </svg>

              <div className="relative text-center p-4 flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center animate-bounce shadow-md">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="bg-white px-4 py-2.5 rounded-xl shadow-md border border-zinc-150 max-w-[240px]">
                  <span className="font-extrabold text-xs text-zinc-950 block">MOBICURE Le Bourget</span>
                  <span className="text-[10px] text-zinc-400 block mt-0.5">42 Avenue Jean Jaurès, 93350</span>
                </div>
                <a 
                  href="https://maps.google.com/?q=42+Avenue+Jean+Jaures,+93350+Le+Bourget" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[10px] font-black text-red-650 hover:underline mt-1 bg-white hover:bg-zinc-50 px-3 py-1.5 rounded-lg shadow-xs border border-zinc-200"
                  id="contact-map-external-link"
                >
                  Itinéraire Google Maps
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Form (Col span 7) */}
          <div className="lg:col-span-7">
            <div className="border border-zinc-150 rounded-2xl p-6 sm:p-10 bg-white shadow-xs">
              
              {isSubmitted ? (
                /* Success submisison screen */
                <div className="text-left py-12 px-2 flex flex-col items-start gap-6 animate-in fade-in duration-300" id="form-success-screen">
                  <div className="w-16 h-16 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 stroke-[2]" />
                  </div>
                  <div>
                    <span className="text-red-655 font-extrabold text-xs uppercase tracking-widest font-mono">Formulaire Transmis</span>
                    <h3 className="text-2xl font-black text-zinc-950 tracking-tight mt-1">Message envoyé avec succès !</h3>
                    <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
                      Merci pour votre confiance, <strong className="text-zinc-900 font-semibold">{name}</strong>. Nos conseillers techniques de la boutique au Bourget analysent votre demande et reviendront vers vous très vite.
                    </p>
                  </div>

                  <div className="w-full bg-zinc-50 border border-zinc-150 rounded-xl p-5 flex flex-col gap-3 text-xs text-zinc-600">
                    <div className="border-b border-zinc-200 pb-2">
                      <span className="text-zinc-400 block font-mono text-[9px] uppercase font-bold">Récapitulatif de votre saisie</span>
                    </div>
                    <div>
                      <strong className="text-zinc-900">Adresse E-mail :</strong> {email}
                    </div>
                    <div>
                      <strong className="text-zinc-900">Numéro de Téléphone :</strong> {phone}
                    </div>
                    {deviceVal && (
                      <div>
                        <strong className="text-zinc-900">Appareil Spécifié :</strong> <span className="bg-red-50 text-red-655 px-2 py-0.5 rounded font-bold">{deviceVal}</span>
                      </div>
                    )}
                    {message && (
                      <div className="bg-white p-3 rounded-lg border border-zinc-200 mt-1 italic">
                        "{message}"
                      </div>
                    )}
                  </div>

                  <div className="flex gap-4 w-full">
                    <button
                      onClick={handleResetForm}
                      className="px-6 py-3 border border-zinc-250 hover:bg-zinc-50 text-zinc-800 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                    >
                      Envoyer un autre message
                    </button>
                    
                    <a
                      href="https://wa.me/33644664404"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                    >
                      Nous parler direct sur WhatsApp
                    </a>
                  </div>
                </div>
              ) : (
                /* Regular Contact Form */
                <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left" id="contact-form">
                  <div className="border-b border-zinc-150 pb-4 mb-2">
                    <h3 className="text-xl font-bold text-zinc-950 uppercase tracking-tight">Formulaire de Contact</h3>
                    <p className="text-xs text-zinc-450 mt-1">Remplissez ces informations et recevez une estimation chiffrée gratuite par e-mail ou SMS.</p>
                  </div>

                  {errorMessage && (
                    <div className="bg-red-50 border border-red-200 text-red-950 text-xs p-4 rounded-xl flex gap-2.5 items-start">
                      <AlertCircle className="w-5 h-5 text-red-650 shrink-0 mt-0.5" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Preselected helper notice */}
                  {preselectedDevice && (
                    <div className="bg-red-50 border border-red-200 p-4 rounded-xl flex justify-between items-center text-xs text-red-950">
                      <div>
                        Devis pré-configuré : <strong className="text-red-700 font-bold">{preselectedDevice}</strong>
                      </div>
                      <button
                        type="button"
                        onClick={onClearPreselectedDevice}
                        className="text-[10px] text-zinc-500 hover:text-red-600 underline cursor-pointer"
                      >
                        Annuler
                      </button>
                    </div>
                  )}

                  {/* Input Name */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-name" className="text-xs font-bold text-zinc-700 uppercase tracking-wider">
                      Nom complet <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      placeholder="Ex: Jean Dupont"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white border border-zinc-250 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Input Email */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="contact-email" className="text-xs font-bold text-zinc-700 uppercase tracking-wider">
                        E-mail <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="email"
                        id="contact-email"
                        placeholder="Ex: jean.dupont@gmail.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white border border-zinc-250 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                      />
                    </div>

                    {/* Input Phone */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="contact-phone" className="text-xs font-bold text-zinc-700 uppercase tracking-wider">
                        Numéro de téléphone <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="tel"
                        id="contact-phone"
                        placeholder="Ex: 06 12 34 56 78"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-white border border-zinc-250 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                      />
                    </div>
                  </div>

                  {/* Select device kind (optional but premium helper) */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-device-select" className="text-xs font-bold text-zinc-700 uppercase tracking-wider">
                      Modèle ou Appareil concerné (Optionnel)
                    </label>
                    <input
                      type="text"
                      id="contact-device-select"
                      placeholder="Ex: iPhone 14 Pro, Samsung Tab A8, ASUS Vivobook..."
                      value={deviceVal}
                      onChange={(e) => setDeviceVal(e.target.value)}
                      className="w-full bg-white border border-zinc-250 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-red-600"
                    />
                  </div>

                  {/* Input Message */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-remarks" className="text-xs font-bold text-zinc-700 uppercase tracking-wider">
                      Détails de la panne ou de l'accessoire souhaité
                    </label>
                    <textarea
                      id="contact-remarks"
                      rows={5}
                      placeholder="Indiquez brièvement les symptômes constatés (écran cassé, la batterie se décharge vite, surchauffe...) ou l'accessoire recherché."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-white border border-zinc-250 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                    />
                  </div>

                  {/* Direct indicators */}
                  <div className="flex flex-col gap-2 border-t border-zinc-100 pt-4 text-[10px] text-zinc-400 font-medium">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-red-600 shrink-0" />
                      Ces données ne servent qu'à la prise de contact technique et restent strictement confidentielles.
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    id="contact-submit-btn"
                    disabled={isSubmitting}
                    className={`w-full font-black py-4 rounded-xl text-center text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 mt-2 ${
                      isSubmitting
                        ? "bg-zinc-400 cursor-not-allowed text-zinc-200"
                        : "bg-red-600 hover:bg-black text-white hover:shadow-lg cursor-pointer"
                    }`}
                  >
                    <span>{isSubmitting ? "Envoi en cours..." : "Envoyer la demande"}</span>
                    <Send className={`w-4 h-4 ml-1 ${isSubmitting ? "animate-bounce" : ""}`} />
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>
      </section>

    </div>
  );
}

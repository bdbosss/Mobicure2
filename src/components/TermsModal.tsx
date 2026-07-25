import React, { useRef, useState } from 'react';
import { X, Printer, Download, Eye, ShieldAlert, FileText, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TermsModal({ isOpen, onClose }: TermsModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const printRef = useRef<HTMLDivElement>(null);

  // Trigger print logic for the terms only
  const handlePrint = () => {
    const printContent = printRef.current?.innerHTML;
    const windowUrl = 'about:blank';
    const uniqueName = new Date().getTime();
    const windowName = `Print_${uniqueName}`;
    const printWindow = window.open(windowUrl, windowName, 'left=50,top=50,width=800,height=900,toolbar=0,scrollbars=1,status=0');
    
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>CONDITIONS GÉNÉRALES DE RÉPARATION - MOBICURE</title>
            <style>
              body {
                font-family: system-ui, -apple-system, sans-serif;
                color: #0c0a09;
                padding: 40px;
                line-height: 1.6;
                font-size: 14px;
                max-width: 800px;
                margin: 0 auto;
              }
              h1 {
                font-size: 24px;
                text-transform: uppercase;
                border-bottom: 2px solid #dc2626;
                padding-bottom: 8px;
                margin-bottom: 4px;
                text-align: center;
              }
              .date {
                font-size: 12px;
                text-align: right;
                color: #57534e;
                margin-bottom: 30px;
              }
              h2 {
                font-size: 16px;
                text-transform: uppercase;
                color: #0c0a09;
                margin-top: 30px;
                margin-bottom: 12px;
                border-bottom: 1px solid #e7e5e4;
                padding-bottom: 4px;
              }
              h3 {
                font-size: 14px;
                color: #1c1917;
                margin-top: 15px;
                margin-bottom: 8px;
              }
              p {
                margin: 0 0 12px 0;
              }
              ul {
                margin: 0 0 15px 0;
                padding-left: 20px;
              }
              li {
                margin-bottom: 6px;
              }
              .warning {
                background-color: #fef2f2;
                border-left: 4px solid #dc2626;
                padding: 12px;
                margin: 15px 0;
              }
              @media print {
                body { padding: 0; }
                .no-print { display: none; }
              }
            </style>
          </head>
          <body>
            ${printContent}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 300);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className="relative bg-white w-full max-w-4xl h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden text-zinc-900 border border-zinc-200"
            id="terms-conditions-modal"
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between bg-zinc-50 shrink-0">
              <div className="flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-red-600" />
                <div>
                  <h2 className="font-extrabold text-base tracking-tight text-zinc-950 uppercase">
                    Conditions Générales de Réparation
                  </h2>
                  <p className="text-[11px] text-zinc-500 font-medium">
                    MOBICURE — Version active au 01/01/2026
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-200 hover:bg-zinc-300 text-zinc-700 transition-colors text-xs font-semibold"
                  title="Imprimer ou enregistrer en PDF"
                  id="print-terms-btn"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Imprimer / PDF</span>
                </button>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-zinc-450 hover:bg-zinc-200 hover:text-zinc-850 transition-colors"
                  aria-label="Fermer"
                  id="close-terms-btn"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Live Document Search Bar */}
            <div className="px-6 py-2 border-b border-zinc-100 bg-white flex items-center gap-2 shrink-0">
              <Search className="w-4 h-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Rechercher une condition (ex: garantie, données, délai)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs bg-zinc-50 hover:bg-zinc-100/70 focus:bg-white px-3 py-1.5 rounded-lg border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-600 transition-all"
                id="search-terms-input"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-zinc-400 hover:text-zinc-700 font-semibold px-2"
                >
                  Effacer
                </button>
              )}
            </div>

            {/* Scrollable Terms Text Container */}
            <div className="flex-1 overflow-y-auto px-8 py-6 bg-zinc-50/50">
              <div 
                ref={printRef} 
                className="prose prose-zinc max-w-none text-zinc-800 text-xs sm:text-sm leading-relaxed"
                id="printable-terms-content"
              >
                {/* PDF Original Text Structured */}
                <h1 className="text-xl sm:text-2xl font-black text-center text-zinc-950 uppercase tracking-tight mb-2">
                  CONDITIONS GÉNÉRALES DE RÉPARATION – MOBICURE
                </h1>
                <div className="text-right text-xs text-zinc-500 font-medium italic mb-6">
                  Date de dernière mise à jour : 01/01/2026
                </div>

                <div className="p-4 bg-zinc-100 rounded-xl mb-6 text-xs text-zinc-600 font-medium">
                  Les présentes conditions de réparation sont mises en œuvre par la société <strong>MOBICURE</strong>, domiciliée <a href="https://maps.app.goo.gl/uh7b2bZeafx5p38N6" target="_blank" rel="noopener noreferrer" className="text-red-600 underline font-semibold">42 Avenue Jean Jaurès, 93350 Le Bourget</a>. Elles régissent les prestations de réparation effectuées dans les points de vente MOBICURE en France métropolitaine. Toute demande de réparation est soumise aux présentes Conditions Générales de Réparation (CGR), consultables sur <a href="https://www.mobicure.fr" target="_blank" rel="noopener noreferrer" className="text-red-600 underline font-semibold">www.mobicure.fr</a> et en magasin.
                  <p className="mt-2 text-zinc-850 font-bold">
                    Les présentes CGR s’appliquent uniquement aux consommateurs.
                  </p>
                </div>

                {/* Section 1 */}
                <h2 className="text-base font-extrabold text-zinc-950 uppercase tracking-wider border-b border-red-600 pb-1 mt-6 mb-3">
                  DESCRIPTION DE LA PRESTATION :
                </h2>
                <p>
                  Lors du dépôt de votre appareil dans un magasin MOBICURE, un ordre de réparation vous est remis.
                </p>
                <p>
                  MOBICURE peut refuser la réparation d’un appareil obsolète, oxydé, contrefait ou non référencé dans son catalogue.
                </p>
                <div className="p-3 bg-red-50/70 border-l-4 border-red-650 rounded-r-lg my-3 text-red-950 font-semibold flex items-start gap-2">
                  <ShieldAlert className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>Attention :</strong> Vous devez préalablement sauvegarder toutes vos données. MOBICURE décline toute responsabilité en cas de perte ou d’altération de données.
                  </div>
                </div>

                {/* Section 2 */}
                <h2 className="text-base font-extrabold text-zinc-950 uppercase tracking-wider border-b border-red-600 pb-1 mt-6 mb-3">
                  RÉPARATION SOUS GARANTIE DU FABRICANT :
                </h2>
                <p>
                  Si vous bénéficiez d'une garantie officielle valide du fournisseur, du constructeur ou du fabricant, et que vous faites réparer votre appareil chez MOBICURE, votre garantie pourrait être annulée.
                </p>
                <p>
                  <strong>MOBICURE décline toute responsabilité à cet égard.</strong>
                </p>
                <p>
                  Si vous bénéficiez d'une garantie du vendeur, nous vous conseillons de le contacter en premier lieu.
                </p>

                {/* Section 3 */}
                <h2 className="text-base font-extrabold text-zinc-950 uppercase tracking-wider border-b border-red-600 pb-1 mt-6 mb-3">
                  RÉPARATION HORS GARANTIE :
                </h2>
                
                <h3 className="font-bold text-zinc-950 mt-3 mb-1 text-sm">3.1 Lieu et durée</h3>
                <p>
                  La réparation peut être effectuée sur place ou en atelier central. Le délai ne peut excéder 22 jours ouvrables (environ 1 mois) à compter du dépôt en magasin (smartphones, tablettes, ordinateurs) ou de l’acceptation du devis. MOBICURE n’est pas responsable des délais constructeurs.
                </p>

                <h3 className="font-bold text-zinc-950 mt-3 mb-1 text-sm">3.2 Obligations du client</h3>
                <ul className="list-disc pl-5 space-y-1 mb-3">
                  <li>Sauvegarde préalable des données.</li>
                  <li>Déclaration de tout antécédent (eau, choc, chaleur, etc.).</li>
                </ul>

                <h3 className="font-bold text-zinc-950 mt-3 mb-1 text-sm">3.3 Devis et diagnostics</h3>
                <ul className="list-disc pl-5 space-y-1 mb-3">
                  <li>Devis en ligne indicatif ou en magasin, valable 7 jours.</li>
                  <li><strong>Diagnostic en magasin :</strong> Gratuit si réparation acceptée.</li>
                  <li>Si le diagnostic nécessite l’ouverture sans réparation : <strong>19,90 €</strong> (smartphones/tablettes).</li>
                  <li>Pour PC portable : diagnostic obligatoire facturé <strong>29,90 €</strong> (déduit si réparation acceptée).</li>
                </ul>

                <h3 className="font-bold text-zinc-950 mt-3 mb-1 text-sm">3.4 Commande de pièces spécifiques</h3>
                <ul className="list-disc pl-5 space-y-1 mb-3">
                  <li>Si pièce non disponible : diagnostic préalable facturé <strong>19,90 €</strong> (déduit du coût final).</li>
                  <li>Vous disposez de <strong>21 jours</strong> pour revenir après arrivée de la pièce, sinon le diagnostic reste acquis.</li>
                  <li>Une empreinte bancaire de <strong>5 à 50 €</strong> peut être effectuée pour les commandes en ligne ou en magasin. Elle est libérée en magasin ou prélevée en cas d’absence.</li>
                </ul>

                <h3 className="font-bold text-zinc-950 mt-3 mb-1 text-sm">3.5 Devis rectificatif</h3>
                <p>
                  En cours de réparation, si des problèmes supplémentaires sont découverts, un devis rectificatif (valable 15 jours) vous sera soumis. La réparation ne continue qu’après votre accord.
                </p>

                <h3 className="font-bold text-zinc-950 mt-3 mb-1 text-sm">3.6 Refus de devis</h3>
                <p>
                  En cas de refus, l’appareil vous est restitué en l’état. Vous pouvez l’abandonner par écrit ; MOBICURE pourra alors le revaloriser ou le recycler.
                </p>

                <h3 className="font-bold text-zinc-950 mt-3 mb-1 text-sm">3.7 Prestation de réparation</h3>
                <ul className="list-disc pl-5 space-y-1 mb-3">
                  <li>Utilisation possible de pièces <strong>neuves ou reconditionnées, d’origine ou compatibles</strong>.</li>
                  <li>Certaines fonctionnalités peuvent être perdues (voir annexe — ex : True Tone, Face ID, indicateur batterie, etc).</li>
                  <li>Les pièces remplacées deviennent propriété de MOBICURE (recyclage).</li>
                </ul>

                {/* Section 4 */}
                <h2 className="text-base font-extrabold text-zinc-950 uppercase tracking-wider border-b border-red-600 pb-1 mt-6 mb-3">
                  RESTITUTION :
                </h2>
                <p>
                  Avant paiement, vous devez vérifier le bon fonctionnement de l’appareil. Après avoir quitté le magasin, MOBICURE n’est plus responsable des dysfonctionnements non identiques à la panne initiale.
                </p>
                <p>
                  En cas de retrait par un tiers, une photocopie de la carte d’identité du déposant et une autorisation écrite sont exigées.
                </p>
                <p>
                  Si l’appareil n’est pas récupéré dans les <strong>6 mois</strong> suivant la notification de fin de réparation, il est considéré comme abandonné (Section : <strong>ABANDON DES APPAREILS</strong>).
                </p>

                {/* Section 5 */}
                <h2 className="text-base font-extrabold text-zinc-950 uppercase tracking-wider border-b border-red-600 pb-1 mt-6 mb-3">
                  MODALITÉS DE PAIEMENT :
                </h2>
                <p>
                  Paiement par espèces, carte bancaire, ou autres moyens acceptés en magasin (si disponible). Les remboursements se font exclusivement sous forme d’avoir (utilisable uniquement pour les réparations ou l'achat d'accessoires).
                </p>

                {/* Section 6 */}
                <h2 className="text-base font-extrabold text-zinc-950 uppercase tracking-wider border-b border-red-600 pb-1 mt-6 mb-3">
                  GARANTIE DES RÉPARATIONS :
                </h2>
                <ul className="list-disc pl-5 space-y-1 mb-3">
                  <li><strong>2 mois</strong> pour les réparations (uniquement pour les pièces compatibles).</li>
                  <li><strong>MOBICURE ne propose aucune garantie</strong> pour les pièces Originales. Donc, vous devez vérifier le bon fonctionnement de l’appareil avant de quitter le Magasin.</li>
                  <li>Couvre uniquement la <strong>même panne</strong>, dans des conditions normales d’utilisation.</li>
                  <li>Exclusions : eau, chocs, chaleur, intervention externe, utilisation anormale.</li>
                  <li>L’étanchéité n’est pas garantie après réparation.</li>
                </ul>

                {/* Section 7 */}
                <h2 className="text-base font-extrabold text-zinc-950 uppercase tracking-wider border-b border-red-600 pb-1 mt-6 mb-3">
                  ABANDON DES APPAREILS :
                </h2>
                <p>
                  Tout appareil non récupéré dans les <strong>6 mois</strong> suivant la dernière relance (email ou courrier) est réputé abandonné. MOBICURE peut alors le revendre, le recycler ou le détruire.
                </p>

                {/* Section 8 */}
                <h2 className="text-base font-extrabold text-zinc-950 uppercase tracking-wider border-b border-red-600 pb-1 mt-6 mb-3">
                  CONTACT ET RÉCLAMATIONS :
                </h2>
                <p>
                  Service client MOBICURE : <a href="mailto:mobicure93@gmail.com" className="text-red-600 font-semibold">mobicure93@gmail.com</a> ou <a href="tel:+33644664404" className="text-red-600 font-semibold">06 44 66 44 04</a>
                </p>
                <p>
                  En cas de litige non résolu, vous pouvez visiter le magasin physiquement puis réclamer votre droit.
                </p>

                {/* Section 9 */}
                <h2 className="text-base font-extrabold text-zinc-950 uppercase tracking-wider border-b border-red-600 pb-1 mt-6 mb-3">
                  DONNÉES PERSONNELLES :
                </h2>
                <p>
                  MOBICURE traite vos données pour la gestion des réparations. Vous pouvez exercer vos droits (accès, rectification, suppression) via RGPD.
                </p>
                <div className="p-3 bg-amber-50 border-l-4 border-amber-500 rounded-r-lg my-3 text-amber-950">
                  <strong>Important :</strong> En déposant votre appareil, vous acceptez que les réparateurs puissent accéder à vos données et à la session pour effectuer les tests nécessaires. Vous devez supprimer tout code de verrouillage et sauvegarder vos données avant dépôt. MOBICURE n’est pas responsable de la perte ou destruction de données.
                </div>

                {/* Section 10 */}
                <h2 className="text-base font-extrabold text-zinc-950 uppercase tracking-wider border-b border-red-600 pb-1 mt-6 mb-3">
                  RESPONSABILITÉ :
                </h2>
                <p>
                  MOBICURE n’est responsable qu’en cas de faute prouvée, et uniquement pour les dommages directs. Aucune responsabilité n’est acceptée pour les pertes de données, pertes d’exploitation, préjudices commerciaux ou indirects.
                </p>

                {/* Section 11 (Annexe) */}
                <h2 className="text-base font-extrabold text-zinc-950 uppercase tracking-wider border-b border-red-600 pb-1 mt-6 mb-3">
                  Annexe simplifiée – Pertes de fonctionnalités possibles (exemples pour iPhone) :
                </h2>
                <p className="text-zinc-600 mb-2">
                  Lors de certaines interventions ou mises à jour, certaines alertes système ou restrictions de pièces constructeurs peuvent se manifester indépendamment de la qualité d'installation :
                </p>
                <ul className="list-disc pl-5 space-y-1 mb-3">
                  <li>True Tone</li>
                  <li>Indicateur de santé batterie</li>
                  <li>Face ID (définitivement inopérant sur certains modèles après réparation)</li>
                  <li>Performance réseau</li>
                  <li>Certains modes photo</li>
                </ul>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-zinc-50 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <span className="text-[11px] text-zinc-500 font-medium">
                * En fermant ce volet ou en commandant, vous validez les Conditions.
              </span>
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
                id="close-terms-footer-btn"
              >
                J'ai pris connaissance
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

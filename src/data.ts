import { DeviceCategory, AccessoryItem } from './types';

export const repairCategories: DeviceCategory[] = [
  {
    id: 'smartphones',
    name: 'Smartphones',
    icon: 'Smartphone',
    popularModels: ['iPhone 15/14/13/12/11/SE', 'Samsung Galaxy S24/S23/S22/A54', 'Xiaomi Redmi Note 13/12', 'Google Pixel 8/7'],
    repairs: [
      {
        id: 'sp-screen',
        name: 'Changement d\'Écran ou Vitre',
        price: 'À partir de 25€',
        duration: '30 min',
        description: 'Remplacement de bloc écran d\'origine (LCD/OLED) suite à une casse ou un défaut d\'affichage.'
      },
      {
        id: 'sp-battery',
        name: 'Remplacement de Batterie',
        price: 'À partir de 29€',
        duration: '30 min',
        description: 'Votre téléphone ne tient plus la charge ? Nous installons une batterie neuve garantie haute performance.'
      },
      {
        id: 'sp-charge',
        name: 'Connecteur de Charge',
        price: 'À PARTIR DE 25€',
        duration: '30 min',
        description: 'Difficulté à insérer le câble ou faux contacts lors de la charge de votre appareil.'
      },
      {
        id: 'sp-camera',
        name: 'Module Caméra (Arrière/Avant)',
        price: 'À partir de 45€',
        duration: '40 min',
        description: 'Photos floues, objectif brisé, ou mise au point impossible.'
      },
      {
        id: 'sp-deox',
        name: 'Désoxydation (Tomber dans l\'eau)',
        price: 'À partir de 39€',
        duration: '12-24h',
        description: 'Séchage ultrason, nettoyage de la carte mère et traitement contre la corrosion.'
      },
      {
        id: 'sp-diag',
        name: 'Diagnostic complet & devis',
        price: 'Gratuit*',
        duration: '30 min',
        description: 'Recherche de panne logicielle ou matérielle sans engagement de votre part.'
      }
    ]
  },
  {
    id: 'tablets',
    name: 'Tablettes',
    icon: 'Tablet',
    popularModels: ['iPad Pro / Air / Mini / Standard', 'Samsung Galaxy Tab S/A', 'Lenovo Tab'],
    repairs: [
      {
        id: 'tb-screen',
        name: 'Remplacement d\'Écran / Vitre tactile',
        price: 'À partir de 69€',
        duration: '1h - 2h',
        description: 'Réparation vitre tactile brisée ou dalle LCD interne défectueuse.'
      },
      {
        id: 'tb-battery',
        name: 'Batterie Neuve Haute Capacité',
        price: 'À partir de 49€',
        duration: '45 min',
        description: 'Restaure l\'autonomie originale de votre tablette pour de longues heures d\'utilisation.'
      },
      {
        id: 'tb-charge',
        name: 'Connecteur de Charge USB-C / Lightning',
        price: 'À partir de 49€',
        duration: '45 min',
        description: 'Réparation du port de charge endommagé ou poussiéreux.'
      },
      {
        id: 'tb-buttons',
        name: 'Boutons Volume / Power',
        price: 'À partir de 39€',
        duration: '30 min',
        description: 'Réparation des nappes de boutons coincés ou inactifs.'
      }
    ]
  },
  {
    id: 'computers',
    name: 'Ordinateurs',
    icon: 'Monitor',
    popularModels: ['MacBook Pro / Air', 'iMac', 'ASUS Rog/ZenBook', 'Lenovo ThinkPad', 'HP Pavillion', 'Dell XPS'],
    repairs: [
      {
        id: 'pc-system',
        name: 'Réinstallation Système (Windows/macOS)',
        price: '59€',
        duration: '1h - 3h',
        description: 'Nettoyage complet, réinstallation du système d\'exploitation, pilotes et mises à jour de sécurité.'
      },
      {
        id: 'pc-thermal',
        name: 'Dépoussiérage & Pâte Thermique',
        price: '39€',
        duration: '45 min',
        description: 'Votre ventilateur fait du bruit ou l\'ordinateur chauffe ? Solution complète anti-surchauffe.'
      },
      {
        id: 'pc-ssd',
        name: 'Boost PC : Installation Disque SSD',
        price: 'À partir de 79€',
        duration: '1h',
        description: 'Remplacez votre vieux disque lent par un SSD ultra-rapide (clone de vos données inclus).'
      },
      {
        id: 'pc-keyboard',
        name: 'Remplacement de Clavier / Trackpad',
        price: 'À partir de 89€',
        duration: '1h30',
        description: 'Touche cassée ou liquide renversé sur le clavier de votre ordinateur portable.'
      },
      {
        id: 'pc-rescue',
        name: 'Récupération de Données Perdues',
        price: 'Sur devis (Dès 49€)',
        duration: '24-48h',
        description: 'Transfert et récupération de fichiers depuis un ordinateur en panne ou disque dur endommagé.'
      },
      {
        id: 'pc-screen',
        name: 'Changement Dalle Écran Ordinateur',
        price: 'À partir de 99€',
        duration: '1h',
        description: 'Remplacement d\'écran de PC portable fissuré, ligné ou sans rétroéclairage.'
      }
    ]
  }
];

export const accessoriesItems: AccessoryItem[] = [
  // Smartphones Category
  {
    id: 'acc-case-1',
    name: 'Coque de Protection Silicon Shock-Proof',
    category: 'smartphones',
    price: 19.99,
    description: 'Protection intégrale militaire avec coins renforcés, silicone doux anti-dérapant.',
    features: ['Coins renforcés anti-chocs', 'Revêtement anti-empreintes', 'Compatible charge sans fil'],
    inStock: true,
    tag: 'Populaire'
  },
  {
    id: 'acc-glass-1',
    name: 'Verre Trempé Premium 9H (Double Force)',
    category: 'smartphones',
    price: 14.99,
    description: 'Protection d\'écran maximale contre les rayures et chutes, traitement oléophobe.',
    features: ['Indice de dureté 9H', 'Sensibilité tactile 100%', 'Kit de pose facile inclus'],
    inStock: true
  },
  {
    id: 'acc-charger-1',
    name: 'Chargeur Rapide GaN 35W Dual USB-C',
    category: 'smartphones',
    price: 24.99,
    description: 'De taille ultra-compacte grâce à la technologie GaN, recharge 2 appareils à pleine vitesse.',
    features: ['Technologie GaN III sécurisée', 'Double port USB-C', 'Recharge 60% en 30 minutes'],
    inStock: true,
    tag: 'Nouveau'
  },
  {
    id: 'acc-cable-1',
    name: 'Câble USB-C vers Lightning / USB-C tressé (2m)',
    category: 'smartphones',
    price: 12.99,
    description: 'Câble en nylon tressé ultra-robuste supportant la charge rapide et le transfert de données.',
    features: ['Longueur idéale de 2 mètres', 'Nylon tressé résistant', 'Fiches renforcées en aluminium'],
    inStock: true
  },
  {
    id: 'acc-earbuds',
    name: 'Écouteurs Sans-Fil Mobicure Sound-Bass',
    category: 'smartphones',
    price: 39.99,
    description: 'Écouteurs ergonomiques Bluetooth 5.3 avec réduction active du bruit ambiant.',
    features: ['Réduction de bruit passive', 'Autonomie 24h avec boîtier', 'Résistant à la transpiration IPX4'],
    inStock: true,
    tag: 'Meilleur Choix'
  },

  // Tablets Category
  {
    id: 'acc-tab-case',
    name: 'Étui Portefeuille & Support Magnétique',
    category: 'tablets',
    price: 29.99,
    description: 'Housse de protection élégante avec rabat intelligent de mise en veille automatique.',
    features: ['Matériau simili-cuir haut de gamme', 'Plusieurs angles de visionnage', 'Rangement stylet intégré'],
    inStock: true
  },
  {
    id: 'acc-tab-pencil',
    name: 'Stylet Tactile Universel Active Stylus',
    category: 'tablets',
    price: 34.99,
    description: 'Stylet actif haute précision avec détection d\'inclinaison, parfait pour le dessin et les notes.',
    features: ['Rechargeable via USB-C', 'Autonomie de 10 heures d\'usage', 'Embout de secours inclus'],
    inStock: true,
    tag: 'Populaire'
  },

  // Computers Category
  {
    id: 'acc-comp-hub',
    name: 'Hub USB-C 8-en-1 Aluminium Premium',
    category: 'computers',
    price: 39.99,
    description: 'Étendez la connectivité de votre ordinateur portable avec ce hub haut de gamme compact.',
    features: ['1x HDMI 4K @30Hz', '3x USB 3.0 ultra-rapides', 'Lecteur SD/MicroSD + RJ45 Ethernet', 'Power Delivery 87W'],
    inStock: true,
    tag: 'Indispensable'
  },
  {
    id: 'acc-comp-mouse',
    name: 'Souris Sans-Fil Ergonomique Silent Click',
    category: 'computers',
    price: 21.99,
    description: 'Prise en main naturelle pour prévenir la fatigue, clics ultra-silencieux et DPI réglable.',
    features: ['Connexion sans-fil 2.4Ghz + Bluetooth', 'Conception ergonomique 30°', '3 niveaux de sensibilité DPI'],
    inStock: true
  },
  {
    id: 'acc-comp-stand',
    name: 'Support d\'Ordinateur Portable en Aluminium',
    category: 'computers',
    price: 29.99,
    description: 'Support ventilé et ajustable pour placer votre écran à la hauteur idéale des yeux.',
    features: ['Structure en alliage d\'aluminium renforcé', 'Pliable pour transport facile', 'Coussinets en silicone anti-glissement'],
    inStock: true
  }
];

export const businessHours = [
  { day: 'Lundi - Jeudi', hours: '09:15 - 21:30' },
  { day: 'Vendredi', hours: "09:15 - 13:00\n14:00 - 21:30" },
  { day: "Samedi & Dimanche", hours: "09:30 - 21:00" }
];

export const clientReviews = [
  {
    id: 'rev-1',
    name: 'Sarah M.',
    rating: 5,
    date: 'Il y a 2 jours',
    comment: 'Écran d\'iPhone réparé en 20 minutes seulement ! Tarif super correct et accueil chaleureux au Bourget. Je recommande les yeux fermés.',
    device: 'iPhone 13'
  },
  {
    id: 'rev-2',
    name: 'Kader L.',
    rating: 5,
    date: 'Il y a 1 semaine',
    comment: 'Mon MacBook Pro chauffait énormément. Nettoyage interne + pâte thermique faits dans l\'après-midi, il ne fait plus aucun bruit ! Un grand merci.',
    device: 'MacBook Pro 2021'
  },
  {
    id: 'rev-3',
    name: 'Mélanie D.',
    rating: 5,
    date: 'Il y a 3 semaines',
    comment: 'Achat d\'un chargeur rapide et pose d\'un verre trempé sur mon nouveau téléphone. Service très pro et rapide.',
    device: 'Samsung S23 Ultra'
  }
];

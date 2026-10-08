// MenuItem is kept for CartContext compatibility — price can be null for A3 Kitchen
export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number | null;
  description: string | null;
  image: string | null;
  labels?: string[];
  isVeg?: boolean;
  isBestseller?: boolean;
  isSpicy?: boolean;
}

export interface BusinessReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  source: 'Google Maps' | 'EazyDiner' | 'Swiggy';
}

export interface BusinessGalleryItem {
  id: string;
  title: string;
  category: string;
  caption: string;
  image: string;
}

export interface Business {
  id: string;
  slug: string;
  name: string;
  brandTitle: string;
  logo: string;
  tagline: string;
  category: string;
  type: string;
  openedDate: string;
  googleMapsUrl: string;
  rating: number;
  reviewCount: number;
  phone: string;
  whatsappNumber: string;
  address: {
    street: string;
    area: string;
    city: string;
    pincode: string;
    fullAddress: string;
    landmark?: string;
  };
  hours: {
    weekdays: string;
    weekends: string;
    status: string;
  };
  theme: {
    primaryColor: string;
    accentHex: string;
    heroGradient: string;
    badgeStyle: string;
    cardBorder: string;
    buttonClass: string;
    accentGlow: string;
  };
  hero: {
    headline: string;
    subheadline: string;
    bgImage: string;
    highlightBadge: string;
  };
  highlights: {
    title: string;
    desc: string;
    iconName: string;
  }[];
  // menu is loaded dynamically from all-menus.json in MenuSection
  // menuCategories is derived from the JSON at runtime
  gallery: BusinessGalleryItem[];
  reviews: BusinessReview[];
  metaSEO: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export const BUSINESSES: Record<string, Business> = {
  'a3-kitchen': {
    id: 'a3-kitchen',
    slug: 'a3-kitchen',
    name: 'A3 KITCHEN',
    brandTitle: 'A3 Kitchen',
    logo: '/images/logos/a3-Kitchen.png',
    tagline: 'Authentic Andhra flavours & aromatic Dum Biryanis',
    category: 'Andhra & North Indian Restaurant',
    type: 'Family Restaurant & Biryani House',
    openedDate: '19-Jul-25',
    googleMapsUrl: 'https://maps.app.goo.gl/SeGthvmdybaa6FNL9',
    rating: 4.6,
    reviewCount: 201,
    phone: '+917013762719',
    whatsappNumber: '',
    address: {
      street: 'Guru Nanak Colony Road',
      area: 'Auto Nagar',
      city: 'Vijayawada',
      pincode: '520007',
      fullAddress: 'Guru Nanak Colony Road, Auto Nagar, Vijayawada, Andhra Pradesh',
      landmark: 'Near Auto Nagar Gate',
    },
    hours: {
      weekdays: '11:30 AM – 10:30 PM',
      weekends: '11:00 AM – 11:00 PM',
      status: 'Open Now',
    },
    theme: {
      primaryColor: 'amber',
      accentHex: '#f59e0b',
      heroGradient: 'from-amber-950/80 via-slate-950/90 to-slate-950',
      badgeStyle: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      cardBorder: 'hover:border-amber-500/50',
      buttonClass: 'bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold shadow-lg shadow-amber-500/25',
      accentGlow: 'bg-amber-500/20',
    },
    hero: {
      headline: 'Authentic Andhra Flavours, Made For Your Table',
      subheadline: 'Indulge in slow-cooked Hyderabadi & Andhra Dum Biryanis, sizzling spicy Rayalaseema starters, and fresh tandoori naans prepared daily in Auto Nagar.',
      bgImage: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1600&q=80',
      highlightBadge: 'Est. 19-Jul-25 • Guru Nanak Colony / Auto Nagar',
    },
    highlights: [
      { title: 'Authentic Andhra Thali', desc: 'Hearty traditional meal spreads with seasonal specials.', iconName: 'UtensilsCrossed' },
      { title: 'Signature Dum Biryani', desc: 'Slow-cooked fragrant basmati rice infused with regional spices.', iconName: 'Flame' },
      { title: 'Family Dining Space', desc: 'Spacious air-conditioned dining designed for gatherings.', iconName: 'Users' },
    ],
    gallery: [
      { id: 'g1', title: 'Aromatic Dum Biryani', category: 'Specialties', caption: 'Slow-cooked in clay pots with rich spices.', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=80' },
      { id: 'g2', title: 'Tandoori Grill Counter', category: 'Kitchen', caption: 'Fresh kebabs grilled over charcoal live.', image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80' },
      { id: 'g3', title: 'Dining Hall Ambience', category: 'Ambience', caption: 'Air-conditioned comfortable seating for families.', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80' },
      { id: 'g4', title: 'Traditional Spices & Thalis', category: 'Menu', caption: 'Authentic Andhra curries served fresh daily.', image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=1200&q=80' },
    ],
    reviews: [
      { id: 'r1', author: 'Ramesh K.', rating: 5, date: 'Recent', comment: 'Authentic Andhra taste in Auto Nagar area! The biryani flavor and spicy chicken fry were top notch.', source: 'Google Maps' },
      { id: 'r2', author: 'Sravani P.', rating: 4.5, date: 'Recent', comment: 'Clean dining space and quick service. The Paneer Tikka and butter naans were delicious.', source: 'Google Maps' },
    ],
    metaSEO: {
      title: 'A3 Kitchen Vijayawada | Andhra Restaurant & Biryani in Auto Nagar',
      description: 'Visit A3 Kitchen in Guru Nanak Colony near Auto Nagar, Vijayawada. Serving authentic Andhra biryanis, thalis, and spicy starters.',
      keywords: ['A3 Kitchen Vijayawada', 'A Three Kitchen Auto Nagar', 'Andhra Biryani Vijayawada', 'Auto Nagar Restaurant'],
    },
  },

  'froth-and-friends': {
    id: 'froth-and-friends',
    slug: 'froth-and-friends',
    name: 'Froth and friends Cafè',
    brandTitle: 'Froth & Friends',
    logo: '/images/logos/froth-and-friends.png',
    tagline: 'Artisanal coffee, handcrafted pasta & gourmet wood-fired pizza',
    category: 'Italian & Continental Café',
    type: 'Boutique Coffee House & Bistro',
    openedDate: 'Dec-24',
    googleMapsUrl: 'https://maps.app.goo.gl/QBYJicUAwHrDghgn9',
    rating: 4.6,
    reviewCount: 490,
    phone: '+91 866 257 6622',
    whatsappNumber: '918662576622',
    address: {
      street: '93, Maruti Cooperative Colony',
      area: 'Patamata (Near Funtimes Club)',
      city: 'Vijayawada',
      pincode: '520008',
      fullAddress: '93, Maruti Cooperative Colony, near Funtimes Club, Patamata, Vijayawada, AP - 520008',
      landmark: 'Near Funtimes Club, Patamata',
    },
    hours: {
      weekdays: '11:00 AM – 10:30 PM',
      weekends: '11:00 AM – 11:30 PM',
      status: 'Open Now',
    },
    theme: {
      primaryColor: 'emerald',
      accentHex: '#10b981',
      heroGradient: 'from-emerald-950/80 via-slate-950/90 to-slate-950',
      badgeStyle: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      cardBorder: 'hover:border-emerald-500/50',
      buttonClass: 'bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold shadow-lg shadow-emerald-500/25',
      accentGlow: 'bg-emerald-500/20',
    },
    hero: {
      headline: 'Freshly Brewed Espresso & Handcrafted Italian Pastas',
      subheadline: 'Unwind in our aesthetic cafe in Maruti Cooperative Colony with rich pesto pastas, hand-stretched pizzas, berry mojitos, and specialty artisan coffee.',
      bgImage: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1600&q=80',
      highlightBadge: 'Est. Dec-24 • Maruti Cooperative Colony / Patamata',
    },
    highlights: [
      { title: 'Handcrafted Pastas', desc: 'Basil Pesto, Creamy Alfredo & classic Mac Cheese.', iconName: 'Coffee' },
      { title: 'Stone-Baked Pizzas', desc: 'Hand-stretched dough loaded with herbs & mozzarella.', iconName: 'Pizza' },
      { title: 'Artisan Coffee & Vibe', desc: 'Cozy minimalist space designed for catching up.', iconName: 'Sparkles' },
    ],
    gallery: [
      { id: 'fg1', title: 'Cozy Interior Seating', category: 'Ambience', caption: 'Warm wooden aesthetic with comfortable booths.', image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80' },
      { id: 'fg2', title: 'Pesto Chicken Pasta', category: 'Food', caption: 'Signature pasta cooked fresh with basil garlic pesto.', image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1200&q=80' },
      { id: 'fg3', title: 'Barista Brew Station', category: 'Coffee', caption: 'Fresh espresso brews and artisan coffee beverages.', image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80' },
      { id: 'fg4', title: 'Hand-Stretched Pizza', category: 'Food', caption: 'Stone-baked pizzas cooked with fresh ingredients.', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80' },
    ],
    reviews: [
      { id: 'fr1', author: 'Ananya R.', rating: 5, date: 'Recent', comment: 'Loved the vibe! The Pesto pasta and Berry Mojito were superb. Great place to catch up with friends.', source: 'Google Maps' },
      { id: 'fr2', author: 'Karthik V.', rating: 4.8, date: 'Recent', comment: 'Very calm location near Funtimes club. Outstanding pizza crust and quick service.', source: 'Google Maps' },
    ],
    metaSEO: {
      title: 'Froth and Friends Café Vijayawada | Italian & Continental Cafe in Patamata',
      description: 'Visit Froth and Friends Cafe at Maruti Cooperative Colony, Vijayawada. Enjoy gourmet pastas, pizza, specialty coffees, and refreshing mocktails.',
      keywords: ['Froth and friends cafe Vijayawada', 'Italian cafe Patamata', 'Pastas Vijayawada', 'Maruti Cooperative Colony Cafe'],
    },
  },

  'arise-cafe': {
    id: 'arise-cafe',
    slug: 'arise-cafe',
    name: 'Arise Café',
    brandTitle: 'Arise Café',
    logo: '/images/logos/arise-cafe.png',
    tagline: "Vijayawada's 1st Anime-Themed Cafe & Bistro",
    category: 'Asian, Continental & Anime Cafe',
    type: 'Themed Concept Cafe',
    openedDate: 'Sep-25',
    googleMapsUrl: 'https://maps.app.goo.gl/ucoCTmTtiK9fRMKq9',
    rating: 4.4,
    reviewCount: 320,
    phone: '+91 866 298 4400',
    whatsappNumber: '918662984400',
    address: {
      street: 'Shop No. 8-1, 54-20, Ground Floor, Service Road',
      area: 'Guru Nanak Colony, Bharathi Nagar',
      city: 'Vijayawada',
      pincode: '520008',
      fullAddress: 'Shop No. 8-1, 54-20, Ground Floor, Service Road, Guru Nanak Colony, Bharathi Nagar, Vijayawada, AP',
      landmark: 'Service Road, Bharathi Nagar',
    },
    hours: {
      weekdays: '12:00 PM – 10:30 PM',
      weekends: '11:30 AM – 11:00 PM',
      status: 'Open Now',
    },
    theme: {
      primaryColor: 'rose',
      accentHex: '#f43f5e',
      heroGradient: 'from-rose-950/80 via-slate-950/90 to-slate-950',
      badgeStyle: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
      cardBorder: 'hover:border-rose-500/50',
      buttonClass: 'bg-rose-600 hover:bg-rose-700 text-white font-bold shadow-lg shadow-rose-600/25',
      accentGlow: 'bg-rose-500/20',
    },
    hero: {
      headline: "Step Into Vijayawada's 1st Anime Dining Realm",
      subheadline: 'Surround yourself with custom anime murals, manga lounge corners, specialty coffees, fusion Pan-Asian delights, and handcrafted pastas in Bharathi Nagar.',
      bgImage: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1600&q=80',
      highlightBadge: 'Est. Sep-25 • 1st Anime Cafe in Vijayawada • Bharathi Nagar',
    },
    highlights: [
      { title: 'Specialty Coffee', desc: 'Espresso, lattes, cold brews & frappes.', iconName: 'Coffee' },
      { title: 'Manga & Anime Decor', desc: 'Wall murals & dedicated manga reading corners.', iconName: 'BookOpen' },
      { title: 'Pan-Asian & Italian', desc: 'Momos, bao, pasta, pizza & rice bowls.', iconName: 'Sparkles' },
    ],
    gallery: [
      { id: 'ag1', title: 'Anime Mural Wall', category: 'Ambience', caption: 'Custom wall murals featuring fan-favorite anime series.', image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80' },
      { id: 'ag2', title: 'Specialty Coffee Bar', category: 'Coffee', caption: 'Freshly pulled espresso and artisan coffee drinks.', image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80' },
      { id: 'ag3', title: 'Steamed Asian Dumplings', category: 'Food', caption: 'Delicate momos served with chili dip.', image: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=1200&q=80' },
      { id: 'ag4', title: 'Pizza & Pasta', category: 'Food', caption: 'Stone-baked pizzas and handcrafted pastas.', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80' },
    ],
    reviews: [
      { id: 'ar1', author: 'Teja V.', rating: 5, date: 'Recent', comment: 'Finally an anime cafe in Vijayawada! The coffee was great and the manga collection is awesome.', source: 'Google Maps' },
      { id: 'ar2', author: 'Divya M.', rating: 4.6, date: 'Recent', comment: 'Great photogenic spot in Bharathi Nagar! Loved the mocktails and the pizza.', source: 'Google Maps' },
    ],
    metaSEO: {
      title: 'Arise Café Vijayawada | 1st Anime-Themed Cafe in Bharathi Nagar',
      description: 'Experience Arise Cafe in Bharathi Nagar, Vijayawada. Anime murals, manga corner, specialty coffee, mocktails, pizza, pasta and Asian dumplings.',
      keywords: ['Arise Cafe Vijayawada', 'Anime cafe Vijayawada', 'Coffee Bharathi Nagar', 'Cafe Vijayawada'],
    },
  },
};

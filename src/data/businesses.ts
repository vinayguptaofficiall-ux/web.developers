export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  isVeg: boolean;
  isBestseller?: boolean;
  isSpicy?: boolean;
  ingredients?: string[];
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
  whatsappNumber: string; // e.g. "918662458899"
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
  menuCategories: string[];
  menu: MenuItem[];
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
    rating: 4.5,
    reviewCount: 380,
    phone: '+91 866 245 8899',
    whatsappNumber: '918662458899',
    address: {
      street: '21/5-24/1A, Ground Floor, Flat Nos. 31, 32, 33',
      area: 'Gurunanak Colony (Near Auto Nagar)',
      city: 'Vijayawada',
      pincode: '520007',
      fullAddress: '21/5-24/1A, Ground Floor, Flat Nos. 31, 32, 33, Gurunanak Colony, Auto Nagar, Vijayawada, AP',
      landmark: 'Near Auto Nagar Gate'
    },
    hours: {
      weekdays: '11:30 AM – 10:30 PM',
      weekends: '11:00 AM – 11:00 PM',
      status: 'Open Now'
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
      subheadline: 'Indulge in slow-cooked Hyderabadi & Andhra Dum Biryanis, sizzling spicy Rayalaseema starters, and fresh tandoori naans prepared daily in Gurunanak Colony.',
      bgImage: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1600&q=80',
      highlightBadge: 'Est. 19-Jul-25 • Gurunanak Colony / Auto Nagar'
    },
    highlights: [
      { title: 'Authentic Andhra Thali', desc: 'Hearty traditional meal spreads with seasonal specials.', iconName: 'UtensilsCrossed' },
      { title: 'Signature Dum Biryani', desc: 'Slow-cooked fragrant basmati rice infused with regional spices.', iconName: 'Flame' },
      { title: 'Family Dining Space', desc: 'Spacious air-conditioned dining designed for gatherings.', iconName: 'Users' }
    ],
    menuCategories: ['All', 'Biryani & Rice', 'Starters', 'Main Course', 'Breads & Tandoor', 'Beverages'],
    menu: [
      {
        id: 'a3-1',
        name: 'Special Chicken Dum Biryani',
        category: 'Biryani & Rice',
        price: 290,
        description: 'Fragrant basmati rice slow-cooked with tender marinated chicken and secret Andhra ground spices.',
        image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
        isVeg: false,
        isBestseller: true,
        isSpicy: true,
        ingredients: ['Basmati Rice', 'Chicken', 'Ghee', 'Saffron', 'Spices']
      },
      {
        id: 'a3-2',
        name: 'Rayalaseema Chicken Fry',
        category: 'Starters',
        price: 270,
        description: 'Crispy pan-fried chicken tossed with crushed coriander, garlic, and fiery red chillies.',
        image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
        isVeg: false,
        isBestseller: true,
        isSpicy: true,
        ingredients: ['Chicken', 'Red Chillies', 'Curry Leaves', 'Garlic']
      },
      {
        id: 'a3-3',
        name: 'Andhra Chicken Curry',
        category: 'Main Course',
        price: 260,
        description: 'Spicy traditional chicken gravy cooked with roasted onion, poppy seeds, and Andhra spices.',
        image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80',
        isVeg: false,
        isSpicy: true,
        ingredients: ['Chicken', 'Onion Gravy', 'Poppy Seeds', 'Chillies']
      },
      {
        id: 'a3-4',
        name: 'Paneer Tikka Starter',
        category: 'Starters',
        price: 240,
        description: 'Charcoal-grilled cottage cheese marinated in spiced hung curd with peppers.',
        image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=80',
        isVeg: true,
        isBestseller: true,
        ingredients: ['Paneer', 'Hung Curd', 'Bell Peppers', 'Tandoori Masala']
      },
      {
        id: 'a3-5',
        name: 'Paneer Butter Masala',
        category: 'Main Course',
        price: 230,
        description: 'Fresh cottage cheese cubes in rich tomato cashew butter cream gravy.',
        image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80',
        isVeg: true,
        ingredients: ['Paneer', 'Cashew Paste', 'Butter', 'Cream', 'Tomatoes']
      },
      {
        id: 'a3-6',
        name: 'Butter Naan',
        category: 'Breads & Tandoor',
        price: 50,
        description: 'Clay oven baked flatbread brushed with rich melted butter.',
        image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=800&q=80',
        isVeg: true,
        ingredients: ['Refined Flour', 'Butter', 'Yeast']
      },
      {
        id: 'a3-7',
        name: 'Ghee Sambar Rice',
        category: 'Biryani & Rice',
        price: 180,
        description: 'Comforting home-style rice served with aromatic lentil sambar and pure cow ghee.',
        image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
        isVeg: true,
        ingredients: ['Rice', 'Lentils', 'Cow Ghee', 'Sambar Spices']
      },
      {
        id: 'a3-8',
        name: 'Fresh Mint Lime Soda',
        category: 'Beverages',
        price: 70,
        description: 'Refreshing sparkling cooler infused with crushed mint leaves and fresh lime.',
        image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
        isVeg: true,
        ingredients: ['Lime', 'Mint', 'Sparkling Soda', 'Rock Salt']
      }
    ],
    gallery: [
      { id: 'g1', title: 'Aromatic Dum Biryani', category: 'Specialties', caption: 'Slow-cooked in clay pots with rich spices.', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=80' },
      { id: 'g2', title: 'Tandoori Grill Counter', category: 'Kitchen', caption: 'Fresh kebabs grilled over charcoal live.', image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80' },
      { id: 'g3', title: 'Dining Hall Ambience', category: 'Ambience', caption: 'Air-conditioned comfortable seating for families.', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80' },
      { id: 'g4', title: 'Traditional Spices & Thalis', category: 'Menu', caption: 'Authentic Andhra curries served fresh daily.', image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=1200&q=80' }
    ],
    reviews: [
      { id: 'r1', author: 'Ramesh K.', rating: 5, date: 'Recent', comment: 'Authentic Andhra taste in Gurunanak Colony area! The biryani flavor and spicy chicken fry were top notch.', source: 'Google Maps' },
      { id: 'r2', author: 'Sravani P.', rating: 4.5, date: 'Recent', comment: 'Clean dining space and quick service. The Paneer Tikka and butter naans were delicious.', source: 'Google Maps' }
    ],
    metaSEO: {
      title: 'A3 Kitchen Vijayawada | Andhra Restaurant & Biryani in Auto Nagar',
      description: 'Visit A3 Kitchen in Gurunanak Colony near Auto Nagar, Vijayawada. Serving authentic Andhra biryanis, thalis, and spicy starters.',
      keywords: ['A3 Kitchen Vijayawada', 'A Three Kitchen Auto Nagar', 'Andhra Biryani Vijayawada', 'Gurunanak Colony Restaurant']
    }
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
    rating: 4.8,
    reviewCount: 490,
    phone: '+91 866 257 6622',
    whatsappNumber: '918662576622',
    address: {
      street: '93, Maruti Cooperative Colony',
      area: 'Patamata (Near Funtimes Club)',
      city: 'Vijayawada',
      pincode: '520008',
      fullAddress: '93, Maruti Cooperative Colony, near Funtimes Club, Patamata, Vijayawada, AP - 520008',
      landmark: 'Near Funtimes Club, Patamata'
    },
    hours: {
      weekdays: '11:00 AM – 10:30 PM',
      weekends: '11:00 AM – 11:30 PM',
      status: 'Open Now'
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
      highlightBadge: 'Est. Dec-24 • Maruti Cooperative Colony / Patamata'
    },
    highlights: [
      { title: 'Handcrafted Pastas', desc: 'Basil Pesto, Creamy Alfredo & classic Mac Cheese.', iconName: 'Coffee' },
      { title: 'Stone-Baked Pizzas', desc: 'Hand-stretched dough loaded with herbs & mozzarella.', iconName: 'Pizza' },
      { title: 'Artisan Coffee & Vibe', desc: 'Cozy minimalist space designed for catching up.', iconName: 'Sparkles' }
    ],
    menuCategories: ['All', 'Pastas', 'Pizzas', 'Bowls & Mains', 'Sandwiches', 'Beverages & Mocktails'],
    menu: [
      {
        id: 'ff-1',
        name: 'Pesto Chicken Pasta',
        category: 'Pastas',
        price: 340,
        description: 'Penne tossed in house-made fresh basil garlic pesto cream with chargrilled chicken strips.',
        image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=80',
        isVeg: false,
        isBestseller: true,
        ingredients: ['Penne', 'Basil Pesto', 'Chargrilled Chicken', 'Garlic', 'Parmesan']
      },
      {
        id: 'ff-2',
        name: 'Creamy Alfredo Chicken Pasta',
        category: 'Pastas',
        price: 320,
        description: 'Rich parmesan garlic cream sauce pasta topped with seasoned chicken.',
        image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=800&q=80',
        isVeg: false,
        isBestseller: true,
        ingredients: ['Fettuccine', 'Heavy Cream', 'Parmesan', 'Garlic Butter', 'Chicken']
      },
      {
        id: 'ff-3',
        name: 'Chicken Tikka Pizza',
        category: 'Pizzas',
        price: 380,
        description: 'Hand-stretched crust topped with spicy tikka chicken, mozzarella, bell peppers & onions.',
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
        isVeg: false,
        isSpicy: true,
        ingredients: ['Hand Dough', 'Chicken Tikka', 'Mozzarella', 'Bell Peppers']
      },
      {
        id: 'ff-4',
        name: 'Fungi Wild Mushroom Pizza',
        category: 'Pizzas',
        price: 350,
        description: 'Sautéed wild mushrooms, fresh thyme, extra virgin olive oil, and melted mozzarella.',
        image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80',
        isVeg: true,
        ingredients: ['Wild Mushrooms', 'Thyme', 'Mozzarella', 'Olive Oil']
      },
      {
        id: 'ff-5',
        name: 'Thai Red Curry Rice Bowl',
        category: 'Bowls & Mains',
        price: 330,
        description: 'Aromatic coconut lemongrass red curry served with steamed jasmine basmati rice.',
        image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=800&q=80',
        isVeg: false,
        ingredients: ['Coconut Milk', 'Red Curry Paste', 'Jasmine Rice', 'Chicken']
      },
      {
        id: 'ff-6',
        name: 'Classic Chicken Club Sandwich',
        category: 'Sandwiches',
        price: 250,
        description: 'Triple-decker toasted bread filled with roasted chicken, lettuce, tomato & mayo.',
        image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80',
        isVeg: false,
        ingredients: ['Artisan Bread', 'Roasted Chicken', 'Lettuce', 'Tomato', 'Mayo']
      },
      {
        id: 'ff-7',
        name: 'Berry Mint Mojito',
        category: 'Beverages & Mocktails',
        price: 160,
        description: 'Refreshing sparkling mocktail with crushed wild berries, mint leaves, and lime.',
        image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
        isVeg: true,
        isBestseller: true,
        ingredients: ['Wild Berries', 'Mint', 'Lime', 'Soda']
      },
      {
        id: 'ff-8',
        name: 'Watermelon Mint Cooler',
        category: 'Beverages & Mocktails',
        price: 140,
        description: 'Chilled freshly pressed watermelon juice with fresh mint twist.',
        image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
        isVeg: true,
        ingredients: ['Fresh Watermelon', 'Mint', 'Crushed Ice']
      }
    ],
    gallery: [
      { id: 'fg1', title: 'Cozy Interior Seating', category: 'Ambience', caption: 'Warm wooden aesthetic with comfortable booths.', image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80' },
      { id: 'fg2', title: 'Pesto Chicken Pasta', category: 'Food', caption: 'Signature pasta cooked fresh with basil garlic pesto.', image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1200&q=80' },
      { id: 'fg3', title: 'Barista Brew Station', category: 'Coffee', caption: 'Fresh espresso brews and artisan coffee beverages.', image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80' },
      { id: 'fg4', title: 'Hand-Stretched Pizza', category: 'Food', caption: 'Stone-baked pizzas cooked with fresh ingredients.', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80' }
    ],
    reviews: [
      { id: 'fr1', author: 'Ananya R.', rating: 5, date: 'Recent', comment: 'Loved the vibe! The Pesto pasta and Berry Mojito were superb. Great place to catch up with friends.', source: 'Google Maps' },
      { id: 'fr2', author: 'Karthik V.', rating: 4.8, date: 'Recent', comment: 'Very calm location near Funtimes club. Outstanding pizza crust and quick service.', source: 'Google Maps' }
    ],
    metaSEO: {
      title: 'Froth and Friends Café Vijayawada | Italian & Continental Cafe in Patamata',
      description: 'Visit Froth and Friends Cafe at Maruti Cooperative Colony, Vijayawada. Enjoy gourmet pastas, pizza, specialty coffees, and refreshing mocktails.',
      keywords: ['Froth and friends cafe Vijayawada', 'Italian cafe Patamata', 'Pastas Vijayawada', 'Maruti Cooperative Colony Cafe']
    }
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
    rating: 4.7,
    reviewCount: 320,
    phone: '+91 866 298 4400',
    whatsappNumber: '918662984400',
    address: {
      street: 'Shop No. 8-1, 54-20, Ground Floor, Service Road',
      area: 'Guru Nanak Colony, Bharathi Nagar',
      city: 'Vijayawada',
      pincode: '520008',
      fullAddress: 'Shop No. 8-1, 54-20, Ground Floor, Service Road, Guru Nanak Colony, Bharathi Nagar, Vijayawada, AP',
      landmark: 'Service Road, Bharathi Nagar'
    },
    hours: {
      weekdays: '12:00 PM – 10:30 PM',
      weekends: '11:30 AM – 11:00 PM',
      status: 'Open Now'
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
      subheadline: 'Surround yourself with custom anime murals, manga lounge corners, piping hot Japanese Shoyu Ramen, Boba teas, and fusion Pan-Asian delights in Bharathi Nagar.',
      bgImage: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1600&q=80',
      highlightBadge: 'Est. Sep-25 • 1st Anime Cafe in Vijayawada • Bharathi Nagar'
    },
    highlights: [
      { title: 'Signature Ramen Bowls', desc: 'Rich chicken broth with wheat noodles & soft-boiled egg.', iconName: 'Soup' },
      { title: 'Manga & Anime Decor', desc: 'Wall murals & dedicated manga reading corners.', iconName: 'BookOpen' },
      { title: 'Pan-Asian & Boba Tea', desc: 'Steamed dumplings, boba teas & smash burgers.', iconName: 'Sparkles' }
    ],
    menuCategories: ['All', 'Ramen & Bowls', 'Pan-Asian Dumplings', 'Burgers & Fries', 'Boba & Teas', 'Desserts'],
    menu: [
      {
        id: 'ac-1',
        name: 'Signature Chicken Shoyu Ramen',
        category: 'Ramen & Bowls',
        price: 360,
        description: 'Rich slow-simmered chicken broth served with wheat noodles, soft-boiled ajitsuke egg, nori sheet, & bamboo shoots.',
        image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80',
        isVeg: false,
        isBestseller: true,
        ingredients: ['Wheat Ramen Noodles', 'Rich Chicken Broth', 'Ajitsuke Egg', 'Nori', 'Bamboo Shoots']
      },
      {
        id: 'ac-2',
        name: 'Veg Miso Ramen Bowl',
        category: 'Ramen & Bowls',
        price: 320,
        description: 'Savory fermented soybean miso broth with bok choy, tofu, sweet corn, and toasted sesame.',
        image: 'https://images.unsplash.com/photo-1591814468924-caf88d1232e1?auto=format&fit=crop&w=800&q=80',
        isVeg: true,
        ingredients: ['Miso Broth', 'Ramen Noodles', 'Tofu', 'Bok Choy', 'Corn']
      },
      {
        id: 'ac-3',
        name: 'Steamed Chicken Momos / Dumplings',
        category: 'Pan-Asian Dumplings',
        price: 210,
        description: 'Juicy minced chicken wrapped in delicate dough, served with spicy chili garlic sauce.',
        image: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=800&q=80',
        isVeg: false,
        isBestseller: true,
        ingredients: ['Chicken Dumpling Wrap', 'Chili Garlic Dip', 'Scallions']
      },
      {
        id: 'ac-4',
        name: 'Crispy Veg Schezwan Dumplings',
        category: 'Pan-Asian Dumplings',
        price: 190,
        description: 'Pan-fried vegetable dumplings tossed in fiery house Schezwan glaze.',
        image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=800&q=80',
        isVeg: true,
        isSpicy: true,
        ingredients: ['Veg Dumpling', 'Schezwan Sauce', 'Sesame Seeds']
      },
      {
        id: 'ac-5',
        name: 'Arise Special Smash Burger',
        category: 'Burgers & Fries',
        price: 280,
        description: 'Juicy smashed chicken patty layered with melted cheese, caramelized onions & secret sauce.',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
        isVeg: false,
        ingredients: ['Brioche Bun', 'Smash Patty', 'Cheddar', 'Secret Sauce']
      },
      {
        id: 'ac-6',
        name: 'Taro Milk Boba Tea',
        category: 'Boba & Teas',
        price: 190,
        description: 'Creamy taro milk tea served with chewy brown sugar tapioca pearls.',
        image: 'https://images.unsplash.com/photo-1558857563-b371033873b8?auto=format&fit=crop&w=800&q=80',
        isVeg: true,
        isBestseller: true,
        ingredients: ['Taro Milk', 'Tapioca Boba', 'Brown Sugar']
      },
      {
        id: 'ac-7',
        name: 'Matcha Iced Latte',
        category: 'Boba & Teas',
        price: 180,
        description: 'Premium Japanese green tea matcha whisked with cold milk and ice.',
        image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=800&q=80',
        isVeg: true,
        ingredients: ['Uji Matcha', 'Milk', 'Ice']
      }
    ],
    gallery: [
      { id: 'ag1', title: 'Signature Shoyu Ramen', category: 'Ramen', caption: 'Freshly prepared hot ramen with rich aromatic broth.', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1200&q=80' },
      { id: 'ag2', title: 'Anime Mural Wall', category: 'Ambience', caption: 'Custom wall murals featuring fan-favorite anime series.', image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80' },
      { id: 'ag3', title: 'Steamed Asian Dumplings', category: 'Food', caption: 'Delicate momos served with chili dip.', image: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=1200&q=80' },
      { id: 'ag4', title: 'Taro Boba Tea', category: 'Beverages', caption: 'Chilled milk teas served with tapioca pearls.', image: 'https://images.unsplash.com/photo-1558857563-b371033873b8?auto=format&fit=crop&w=1200&q=80' }
    ],
    reviews: [
      { id: 'ar1', author: 'Teja V.', rating: 5, date: 'Recent', comment: 'Finally an anime cafe in Vijayawada! The Ramen was surprisingly authentic and the manga collection is awesome.', source: 'Google Maps' },
      { id: 'ar2', author: 'Divya M.', rating: 4.6, date: 'Recent', comment: 'Great photogenic spot in Bharathi Nagar! Loved the Taro Boba Tea and smash burger.', source: 'Google Maps' }
    ],
    metaSEO: {
      title: 'Arise Café Vijayawada | 1st Anime-Themed Cafe in Bharathi Nagar',
      description: 'Experience Arise Cafe in Bharathi Nagar, Vijayawada. Anime murals, manga corner, signature Ramen bowls, Boba teas, and Asian dumplings.',
      keywords: ['Arise Cafe Vijayawada', 'Anime cafe Vijayawada', 'Ramen Bharathi Nagar', 'Boba tea Vijayawada']
    }
  }
};

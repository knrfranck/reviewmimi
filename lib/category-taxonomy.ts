export type BusinessTag = "Local" | "International";

export interface TaxonomyBusiness {
  name: string;
  tag: BusinessTag;
  location: string;
}

export interface TaxonomySubcategory {
  id: string;
  name: string;
  items: TaxonomyBusiness[];
}

export interface TaxonomyCategory {
  id: string;
  name: string;
  icon: string;
  subcategories: TaxonomySubcategory[];
}

export const categoryTaxonomy: TaxonomyCategory[] = [
  {
    id: "food_dining",
    name: "Food & Dining",
    icon: "UtensilsCrossed",
    subcategories: [
      {
        id: "restaurants",
        name: "Restaurants",
        items: [
          { name: "Tamarind Mombasa", tag: "Local", location: "Mombasa" },
          { name: "Char-Choma Restaurant", tag: "Local", location: "Mombasa" },
          { name: "Armaan Restaurant", tag: "Local", location: "Mombasa" },
          { name: "INTI - A Nikkei Experience", tag: "Local", location: "Nairobi" },
          { name: "The Carnivore Restaurant", tag: "Local", location: "Nairobi" },
          { name: "TATU Restaurant", tag: "Local", location: "Nairobi" },
          { name: "Smyth", tag: "International", location: "Chicago, USA" },
          { name: "Addison", tag: "International", location: "San Diego, USA" },
          { name: "Le Bernardin", tag: "International", location: "New York, USA" },
          { name: "The French Laundry", tag: "International", location: "Yountville, USA" },
        ],
      },
      {
        id: "cafes",
        name: "Cafes",
        items: [
          { name: "Cool Beans Cafe", tag: "Local", location: "Mombasa" },
          { name: "Crave Kenya", tag: "Local", location: "Mombasa & Nairobi" },
          { name: "Cafesserie Mombasa", tag: "Local", location: "Mombasa" },
          { name: "Spring Valley Coffee", tag: "Local", location: "Nairobi" },
          { name: "Starbucks", tag: "International", location: "Seattle, USA (global)" },
          { name: "Costa Coffee", tag: "International", location: "London, UK (global)" },
        ],
      },
      {
        id: "catering",
        name: "Catering",
        items: [
          { name: "In House Catering", tag: "Local", location: "Kenya" },
          { name: "Hillary's Food Hut", tag: "Local", location: "Kenya" },
          { name: "Village Caterers", tag: "Local", location: "Kenya" },
          { name: "Sodexo", tag: "International", location: "Issy-les-Moulineaux, France (global)" },
          { name: "Compass Group", tag: "International", location: "London, UK (global)" },
        ],
      },
    ],
  },
  {
    id: "health_wellness",
    name: "Health & Wellness",
    icon: "HeartPulse",
    subcategories: [
      {
        id: "gyms",
        name: "Gyms & Fitness Centres",
        items: [
          { name: "Fitness For Life GYM", tag: "Local", location: "Mombasa" },
          { name: "Legacy Fitness Club", tag: "Local", location: "Mombasa" },
          { name: "Inshape Fitness Kenya", tag: "Local", location: "Mombasa & Nairobi" },
          { name: "SmartGyms", tag: "Local", location: "Nairobi" },
          { name: "Equinox", tag: "International", location: "New York, USA (global)" },
          { name: "Planet Fitness", tag: "International", location: "Dover, USA (global)" },
          { name: "Gold's Gym", tag: "International", location: "Venice, USA (global)" },
        ],
      },
      {
        id: "hospitals",
        name: "Hospitals & Clinics",
        items: [
          { name: "Coast General Hospital", tag: "Local", location: "Mombasa" },
          { name: "Aga Khan Hospital Mombasa", tag: "Local", location: "Mombasa" },
          { name: "The Nairobi Hospital", tag: "Local", location: "Nairobi" },
          { name: "Kenyatta National Hospital", tag: "Local", location: "Nairobi" },
          { name: "Mayo Clinic - Rochester", tag: "International", location: "Rochester, USA" },
          { name: "Cleveland Clinic", tag: "International", location: "Cleveland, USA" },
        ],
      },
      {
        id: "salons",
        name: "Salons & Barbershops",
        items: [
          { name: "Classy Touch", tag: "Local", location: "Mombasa" },
          { name: "Beyjun Barber", tag: "Local", location: "Mombasa" },
          { name: "Elegance Empire Salon Spa & Barber", tag: "Local", location: "Nyali, Mombasa" },
          { name: "Toni&Guy", tag: "International", location: "London, UK (global)" },
        ],
      },
      {
        id: "spas",
        name: "Spas & Massage",
        items: [
          { name: "Maisha Spa Serena Beach Resort", tag: "Local", location: "Mombasa" },
          { name: "Mandarin Oriental", tag: "International", location: "Hong Kong (global)" },
          { name: "Four Seasons", tag: "International", location: "Toronto, Canada (global)" },
        ],
      },
    ],
  },
  {
    id: "home_cleaning",
    name: "Home & Cleaning Services",
    icon: "Home",
    subcategories: [
      {
        id: "plumbers",
        name: "Plumbing",
        items: [
          { name: "Quickfix Plumbers", tag: "Local", location: "Kenya" },
          { name: "Sande Plumber Enterprise", tag: "Local", location: "Kilifi County" },
          { name: "Orchid Plumbing Company", tag: "Local", location: "Nairobi" },
          { name: "Roto-Rooter", tag: "International", location: "Cincinnati, USA (global)" },
        ],
      },
      {
        id: "cleaners",
        name: "Cleaning Services",
        items: [
          { name: "Parapet Cleaning Services", tag: "Local", location: "Kenya" },
          { name: "GM Cleaning Services", tag: "Local", location: "Kenya" },
          { name: "Phoenix Cleaning Services", tag: "Local", location: "Kenya" },
          { name: "Merry Maids", tag: "International", location: "Memphis, USA (global)" },
        ],
      },
      {
        id: "security",
        name: "Security Services",
        items: [
          { name: "G4S Kenya", tag: "Local", location: "Kenya (part of G4S global)" },
          { name: "KK Security", tag: "Local", location: "Kenya" },
          { name: "SGA Security Kenya", tag: "Local", location: "Kenya" },
          { name: "G4S", tag: "International", location: "London, UK (global)" },
        ],
      },
    ],
  },
  {
    id: "shopping_retail",
    name: "Shopping & Retail",
    icon: "ShoppingBag",
    subcategories: [
      {
        id: "clothing_stores",
        name: "Clothing & Fashion Stores",
        items: [
          { name: "Bloom Kenya", tag: "Local", location: "Nairobi" },
          { name: "Hawi Ready to Wear", tag: "Local", location: "Nairobi" },
          { name: "African Inspired", tag: "Local", location: "Nairobi" },
          { name: "Zara", tag: "International", location: "Arteixo, Spain (global)" },
          { name: "H&M", tag: "International", location: "Stockholm, Sweden (global)" },
          { name: "Nike", tag: "International", location: "Beaverton, USA (global)" },
        ],
      },
      {
        id: "electronic_markets",
        name: "Electronic Markets",
        items: [
          { name: "Kongowea Market", tag: "Local", location: "Mombasa" },
          { name: "Marikiti Market", tag: "Local", location: "Mombasa" },
          { name: "Digital City Electronics", tag: "Local", location: "Nairobi" },
        ],
      },
      {
        id: "supermarkets",
        name: "Supermarkets & Hypermarkets",
        items: [
          { name: "Naivas", tag: "Local", location: "Kenya (multiple branches)" },
          { name: "Carrefour Kenya", tag: "Local", location: "Nairobi & Mombasa" },
          { name: "Quickmart", tag: "Local", location: "Kenya" },
          { name: "Walmart", tag: "International", location: "Bentonville, USA (global)" },
          { name: "Tesco", tag: "International", location: "Welwyn Garden City, UK (global)" },
        ],
      },
      {
        id: "phone_shops",
        name: "Mobile Phones & Gadgets",
        items: [
          { name: "Safaricom Shops", tag: "Local", location: "Kenya (multiple)" },
          { name: "Phone Hub Kenya", tag: "Local", location: "Kenya" },
          { name: "Apple Store", tag: "International", location: "Cupertino, USA (global)" },
          { name: "Samsung Experience Stores", tag: "International", location: "Suwon, South Korea (global)" },
        ],
      },
    ],
  },
  {
    id: "education_training",
    name: "Education & Training",
    icon: "GraduationCap",
    subcategories: [
      {
        id: "kindergarten",
        name: "Kindergarten / Pre-Primary",
        items: [
          { name: "Makini School Cambridge", tag: "Local", location: "Nairobi & Mombasa" },
          { name: "Princeton Prep Montessori", tag: "Local", location: "Nairobi" },
          { name: "Aga Khan Nursery School", tag: "Local", location: "Nairobi & nationwide" },
        ],
      },
      {
        id: "primary_schools",
        name: "Primary Schools",
        items: [
          { name: "Brookhurst International School", tag: "Local", location: "Nairobi" },
          { name: "Peponi School", tag: "Local", location: "Nairobi" },
          { name: "Brookhouse Schools", tag: "Local", location: "Nairobi" },
        ],
      },
      {
        id: "secondary_schools",
        name: "Secondary Schools",
        items: [
          { name: "Abuhureira Academy Secondary", tag: "Local", location: "Mombasa" },
          { name: "Mama Ngina's High School", tag: "Local", location: "Mombasa" },
          { name: "Aga Khan High School Mombasa", tag: "Local", location: "Mombasa" },
        ],
      },
      { id: "tutors", name: "Tutors & Home Lessons", items: [] },
      { id: "colleges", name: "Colleges", items: [] },
      {
        id: "universities",
        name: "Universities",
        items: [
          { name: "Technical University of Mombasa (TUM)", tag: "Local", location: "Mombasa" },
          { name: "Harvard University", tag: "International", location: "Cambridge, USA" },
          { name: "Massachusetts Institute of Technology (MIT)", tag: "International", location: "Cambridge, USA" },
          { name: "University of Oxford", tag: "International", location: "Oxford, UK" },
        ],
      },
      {
        id: "tvet",
        name: "TVET Institutions",
        items: [
          { name: "Ahmed Shahame Mwidani TTI", tag: "Local", location: "Changamwe, Mombasa" },
          { name: "Coastal Institute of Technology", tag: "Local", location: "Mombasa" },
        ],
      },
      {
        id: "training_institutes",
        name: "Training Institutes",
        items: [
          { name: "Mombasa Aviation Training Institute", tag: "Local", location: "Mombasa" },
          { name: "Maritime Training Institute", tag: "Local", location: "Mombasa" },
        ],
      },
    ],
  },
  {
    id: "professional_services",
    name: "Professional Services",
    icon: "Briefcase",
    subcategories: [
      {
        id: "lawyers",
        name: "Law Firms & Lawyers",
        items: [
          { name: "MMK Advocates", tag: "Local", location: "Nairobi & Mombasa" },
          { name: "Rachier & Amollo", tag: "Local", location: "Nairobi" },
          { name: "Clifford Chance", tag: "International", location: "London, UK (global)" },
          { name: "Linklaters", tag: "International", location: "London, UK (global)" },
        ],
      },
      {
        id: "accountants",
        name: "Accounting Firms",
        items: [
          { name: "RSM Kenya", tag: "Local", location: "Mombasa" },
          { name: "Deloitte Kenya", tag: "Local", location: "Mombasa" },
          { name: "PwC (PricewaterhouseCoopers)", tag: "International", location: "London, UK (global)" },
          { name: "KPMG", tag: "International", location: "Amstelveen, Netherlands (global)" },
        ],
      },
      {
        id: "real_estate",
        name: "Real Estate Agents",
        items: [
          { name: "Knight Frank Kenya", tag: "Local", location: "Nairobi" },
          { name: "HassConsult", tag: "Local", location: "Nairobi" },
          { name: "RE/MAX", tag: "International", location: "Denver, USA (global)" },
        ],
      },
      {
        id: "banks",
        name: "Banks",
        items: [
          { name: "Equity Bank", tag: "Local", location: "Kenya" },
          { name: "KCB Bank", tag: "Local", location: "Kenya" },
          { name: "Co-operative Bank", tag: "Local", location: "Kenya" },
          { name: "HSBC", tag: "International", location: "London, UK (global)" },
          { name: "Citibank", tag: "International", location: "New York, USA (global)" },
        ],
      },
    ],
  },
  {
    id: "travel_tours",
    name: "Travel & Tours",
    icon: "Plane",
    subcategories: [
      {
        id: "hotels",
        name: "Hotels & Lodges",
        items: [
          { name: "CityBlue Creekside", tag: "Local", location: "Mombasa" },
          { name: "PrideInn Flamingo", tag: "Local", location: "Mombasa" },
          { name: "Serena Beach Resort", tag: "Local", location: "Shanzu, Mombasa" },
          { name: "Hilton", tag: "International", location: "McLean, USA (global)" },
          { name: "Marriott International", tag: "International", location: "Bethesda, USA (global)" },
        ],
      },
      {
        id: "tours",
        name: "Tour Operators",
        items: [
          { name: "Beyond the Plains Safaris", tag: "Local", location: "Kenya" },
          { name: "Natural World Safaris", tag: "Local", location: "Kenya" },
          { name: "G Adventures", tag: "International", location: "Toronto, Canada (global)" },
        ],
      },
      {
        id: "car_hire",
        name: "Car Hire & Rental",
        items: [
          { name: "Avis Kenya", tag: "Local", location: "Mombasa" },
          { name: "Bamm Tours", tag: "Local", location: "Kenya" },
          { name: "Hertz", tag: "International", location: "Estero, USA (global)" },
        ],
      },
      {
        id: "short_stay",
        name: "Airbnb & Short-Stay Rentals",
        items: [
          { name: "Airbnb Mombasa", tag: "International", location: "San Francisco, USA (Mombasa listings)" },
          { name: "Cowrie Shell Beach Apartments", tag: "Local", location: "Mombasa" },
        ],
      },
    ],
  },
  {
    id: "automotive",
    name: "Automotive",
    icon: "Car",
    subcategories: [
      {
        id: "mechanics",
        name: "Mechanics & Garages",
        items: [
          { name: "SBM Auto Garage", tag: "Local", location: "Mombasa" },
          { name: "Northern Bypass Garage", tag: "Local", location: "Nairobi" },
        ],
      },
      {
        id: "car_dealers",
        name: "Car Dealers (New & Used)",
        items: [
          { name: "Khushi Motors", tag: "Local", location: "Mombasa" },
          { name: "MSA Car Market", tag: "Local", location: "Mombasa" },
          { name: "Mombasa Motors Ltd", tag: "Local", location: "Mombasa" },
        ],
      },
      {
        id: "car_wash",
        name: "Car Wash & Detailing",
        items: [
          { name: "Kuela Car Wash", tag: "Local", location: "Mombasa & Nairobi" },
          { name: "Arcadia Car Wash", tag: "Local", location: "Greenpark, Nairobi" },
        ],
      },
    ],
  },
  {
    id: "technology",
    name: "Technology",
    icon: "Cpu",
    subcategories: [
      {
        id: "it_support",
        name: "IT Support & Networking",
        items: [
          { name: "East Africa Hi Tech Solutions", tag: "Local", location: "Kenya" },
          { name: "iDeveloper Technologies", tag: "Local", location: "Nairobi" },
          { name: "Simplify IT", tag: "Local", location: "Nairobi" },
        ],
      },
      {
        id: "web_design",
        name: "Web Design & Development",
        items: [
          { name: "Web Solutions Kenya", tag: "Local", location: "Kenya" },
          { name: "Craft Silicon", tag: "Local", location: "Kenya" },
          { name: "Cellulant", tag: "Local", location: "Kenya" },
        ],
      },
      {
        id: "repair",
        name: "Phone & Computer Repair",
        items: [
          { name: "KevTech Connections", tag: "Local", location: "Jamia Mall, Nairobi" },
          { name: "Phones&Tablets Kenya", tag: "Local", location: "Nairobi" },
        ],
      },
    ],
  },
  {
    id: "coastal_local",
    name: "Coastal & Local",
    icon: "Waves",
    subcategories: [
      {
        id: "beach_resorts",
        name: "Beach Resorts",
        items: [
          { name: "PrideInn Paradise Beach Resort", tag: "Local", location: "Mombasa" },
          { name: "Voyager Beach Resort", tag: "Local", location: "Mombasa" },
          { name: "Bamburi Beach Hotel", tag: "Local", location: "Mombasa" },
          { name: "Swahili Beach Resort", tag: "Local", location: "Mombasa" },
          { name: "Diani Reef Beach Resort", tag: "Local", location: "Mombasa" },
          { name: "Baros Maldives", tag: "International", location: "Maldives" },
          { name: "Sandals Resorts", tag: "International", location: "Montego Bay, Jamaica (Caribbean)" },
        ],
      },
      {
        id: "dhow_cruises",
        name: "Dhow Cruises",
        items: [
          { name: "Tamarind Dhow Dinner Cruise", tag: "Local", location: "Mombasa" },
          { name: "Nobel Sea Tours", tag: "Local", location: "Mombasa" },
        ],
      },
      {
        id: "coastal_tours",
        name: "Coastal Tours & Excursions",
        items: [
          { name: "Fort Jesus tours", tag: "Local", location: "Mombasa" },
          { name: "Mombasa Marine Park excursions", tag: "Local", location: "Mombasa" },
        ],
      },
    ],
  },
  {
    id: "entertainment",
    name: "Entertainment",
    icon: "Film",
    subcategories: [
      {
        id: "movies_local",
        name: "Movies - Local",
        items: [
          { name: "Showmax Kenya", tag: "Local", location: "Kenya" },
          { name: "Citizen TV Originals", tag: "Local", location: "Kenya" },
        ],
      },
      {
        id: "movies_international",
        name: "Movies - International",
        items: [
          { name: "Wicked", tag: "International", location: "USA (2025 film)" },
          { name: "Smyth", tag: "International", location: "Chicago, USA" },
        ],
      },
      {
        id: "tv_series_local",
        name: "TV Series - Local",
        items: [
          { name: "Machachari", tag: "Local", location: "Citizen TV" },
          { name: "Vioja Mahakamani", tag: "Local", location: "Kenya" },
          { name: "Mother-in-Law", tag: "Local", location: "Citizen TV" },
        ],
      },
      {
        id: "tv_series_international",
        name: "TV Series - International",
        items: [
          { name: "Squid Game", tag: "International", location: "South Korea (Netflix)" },
          { name: "Money Heist (La Casa de Papel)", tag: "International", location: "Spain (Netflix)" },
          { name: "Stranger Things", tag: "International", location: "USA (Netflix)" },
          { name: "Bridgerton", tag: "International", location: "UK (Netflix)" },
        ],
      },
      { id: "polls", name: "Polls & Voting", items: [] },
      {
        id: "music_local",
        name: "Music - Local Artists",
        items: [
          { name: "Otile Brown", tag: "Local", location: "Kenya" },
          { name: "Sauti Sol", tag: "Local", location: "Kenya" },
          { name: "Nyashinski", tag: "Local", location: "Kenya" },
          { name: "Khaligraph Jones", tag: "Local", location: "Kenya" },
        ],
      },
      {
        id: "music_international",
        name: "Music - International",
        items: [
          { name: "Taylor Swift", tag: "International", location: "USA" },
          { name: "Bad Bunny", tag: "International", location: "Puerto Rico" },
          { name: "Drake", tag: "International", location: "Canada/USA" },
        ],
      },
      {
        id: "music_genres",
        name: "Music Genres",
        items: [
          { name: "Bongo Flava", tag: "Local", location: "Tanzania" },
          { name: "Gengetone", tag: "Local", location: "Kenya" },
          { name: "Taarab", tag: "Local", location: "Tanzania/Kenya" },
          { name: "Afrobeats / Afrobeat", tag: "International", location: "Nigeria" },
          { name: "Amapiano", tag: "International", location: "South Africa" },
          { name: "Reggae", tag: "International", location: "Jamaica" },
        ],
      },
      {
        id: "movie_sites",
        name: "Movie Review Sites",
        items: [
          { name: "IMDb", tag: "International", location: "Seattle, USA" },
          { name: "Rotten Tomatoes", tag: "International", location: "Los Angeles, USA" },
          { name: "Letterboxd", tag: "International", location: "Wellington, New Zealand" },
        ],
      },
    ],
  },
  {
    id: "nightlife",
    name: "Nightlife",
    icon: "MoonStar",
    subcategories: [
      {
        id: "clubs",
        name: "Clubs",
        items: [
          { name: "Club Hypnotica", tag: "Local", location: "Mombasa" },
          { name: "Casablanca Club", tag: "Local", location: "Nairobi" },
          { name: "Berghain", tag: "International", location: "Berlin, Germany" },
        ],
      },
      {
        id: "bars",
        name: "Bars",
        items: [
          { name: "Mamba International Nightclub & Bar", tag: "Local", location: "Mombasa" },
          { name: "The Alchemist", tag: "Local", location: "Westlands, Nairobi" },
          { name: "Dead Rabbit", tag: "International", location: "New York, USA" },
        ],
      },
      {
        id: "events",
        name: "Events",
        items: [
          { name: "Blankets & Wine", tag: "Local", location: "Kenya" },
          { name: "Koroga Festival", tag: "Local", location: "Nairobi" },
          { name: "Tomorrowland", tag: "International", location: "Boom, Belgium" },
        ],
      },
    ],
  },
];

const SLUG_ALIASES: Record<string, string> = {
  "home-living": "home_cleaning",
  home_living: "home_cleaning",
  "travel-tourism": "travel_tours",
  travel_tourism: "travel_tours",
  nightlighf: "nightlife",
  retail: "shopping_retail",
  movies: "entertainment",
  other: "professional_services",
};

export function resolveTaxonomySlug(slug: string): string {
  const key = slug.trim().toLowerCase();
  return SLUG_ALIASES[key] ?? key.replace(/-/g, "_");
}

export function findTaxonomyCategory(slug: string) {
  const resolved = resolveTaxonomySlug(slug);
  return categoryTaxonomy.find((entry) => entry.id === resolved);
}

export function findTaxonomySubcategory(slug: string) {
  const resolved = resolveTaxonomySlug(slug);
  return categoryTaxonomy
    .flatMap((entry) =>
      entry.subcategories.map((item) => ({ ...item, categoryName: entry.name })),
    )
    .find((entry) => entry.id === resolved);
}

export const taxonomyCategoriesById = Object.fromEntries(
  categoryTaxonomy.map((category) => [category.id, category]),
);

export const taxonomySubcategoriesById = Object.fromEntries(
  categoryTaxonomy.flatMap((category) =>
    category.subcategories.map((subcategory) => [subcategory.id, { ...subcategory, categoryId: category.id }]),
  ),
);

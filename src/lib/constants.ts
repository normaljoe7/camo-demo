// Placeholder data - replace with actual brand content
export const expeditions = [
  {
    id: 1,
    title: 'Bandipur Tiger Reserve',
    description: 'Bandipur isn’t just visited—it’s felt.',
    duration: '14 days',
    difficulty: 'Advanced',
    price: '$4,999',
    season: 'June - August',
    image: '/images/bandipur.png',
    highlights: ['Northern Lights', 'Ice Cave Exploration', 'Wildlife Safari'],
    floraFauna: 'Home to the elusive Bengal tiger, Indian elephants, gaurs, and over 200 species of birds. The dry deciduous forests transition into moist deciduous zones, offering a rich tapestry of biodiversity.',
    safariExperience: 'Embark on guided jeep safaris through the heart of the reserve. Our expert trackers use traditional knowledge and modern tracking techniques to locate wildlife, ensuring a respectful and thrilling encounter.',
    safariTimings: 'Morning: 6:00 AM - 9:00 AM | Evening: 3:30 PM - 6:30 PM',
    packages: [
      { name: 'Standard Explorer', price: '$4,999', desc: 'Includes comfortable lodge stay and shared safaris.' },
      { name: 'Premium Photographic', price: '$6,499', desc: 'Private jeep rights, luxury tented suite, and specialized photography guide.' }
    ],
    exclusions: ['International Flights', 'Personal Insurance', 'Tips & Gratuities', 'Alcoholic Beverages'],
    policy: 'Standard cancellation charges apply. 50% refund if cancelled 30 days prior. No refunds during peak seasons or within 14 days of travel.'
  },
  {
    id: 2,
    title: 'Mudumalai Tiger Reserve',
    description: 'Deep jungle expedition into the heart of the Amazon',
    duration: '10 days',
    difficulty: 'Intermediate',
    price: '$3,499',
    season: 'Year-round',
    image: '/images/mudumalai.png',
    highlights: ['Canopy Walk', 'River Expeditions', 'Indigenous Culture'],
    floraFauna: 'A sanctuary for the Asian elephant and diverse birdlife. The reserve boasts tall grasses, bamboo clumps, and valuable timber species like Teak and Rosewood.',
    safariExperience: 'Experience the jungle from multiple perspectives—jeep safaris for range and elephant camps for a closer look at these gentle giants in their habitat.',
    safariTimings: 'Morning: 6:30 AM - 9:00 AM | Evening: 4:00 PM - 6:00 PM',
    packages: [
      { name: 'Jungle Scout', price: '$3,499', desc: 'Standard accommodation with daily safaris.' },
      { name: 'Wild Luxe', price: '$4,299', desc: 'Treehouse stay with private naturalist.' }
    ],
    exclusions: ['International Flights', 'Camera Fees', 'Laundry', 'Personal Expenses'],
    policy: 'Strict non-refundable deposit. Balance refundable up to 45 days before departure.'
  },
  {
    id: 3,
    title: 'Bhadra Tiger Reserve',
    description: 'Base camp adventure in the world\'s highest mountains',
    duration: '21 days',
    difficulty: 'Expert',
    price: '$5,999',
    season: 'April - October',
    image: '/images/bhadra.png',
    highlights: ['Base Camp Visit', 'Mountain Passes', 'Local Monasteries'],
    floraFauna: 'Known for its lush green hills and shola forests. Home to tigers, leopards, and the Malabar giant squirrel.',
    safariExperience: 'Traverse the undulating terrain of the Western Ghats. The boat safari in the Bhadra reservoir offers unique sightings of mugger crocodiles and water birds.',
    safariTimings: 'Morning: 6:00 AM - 8:30 AM | Evening: 4:00 PM - 6:00 PM',
    packages: [
      { name: 'Base Trek', price: '$5,999', desc: 'Guided trek with camping gear included.' },
      { name: 'Summit Expedition', price: '$7,999', desc: 'Full summit support with oxygen and Sherpa team.' }
    ],
    exclusions: ['Visa Fees', 'Personal Sherpa', 'Evacuation Insurance', 'Summit Bonus'],
    policy: 'Refunds subject to weather-related cancellations by authorities only.'
  },
  {
    id: 4,
    title: 'Kabini Tiger Reserve',
    description: 'Camel trek across the world\'s largest hot desert',
    duration: '8 days',
    difficulty: 'Intermediate',
    price: '$2,999',
    season: 'October - March',
    image: '/images/nagarhole.png',
    highlights: ['Oasis Camping', 'Star Gazing', 'Berber Culture'],
    floraFauna: 'Famous for its high density of tigers and leopards (especially the black panther). Rich in aquatic bird life along the Kabini river.',
    safariExperience: 'The only reserve offering both boat and jeep safaris. The boat safari is famous for large elephant herd sightings on the banks.',
    safariTimings: 'Morning: 6:15 AM - 9:15 AM | Evening: 3:15 PM - 6:15 PM',
    packages: [
      { name: 'River View', price: '$2,999', desc: 'Cottage facing the river with shared boat safari.' },
      { name: 'Leopards Lair', price: '$3,899', desc: 'Luxury cottage with private jeep safari priority.' }
    ],
    exclusions: ['Transfers to Lodge', 'Telephone Calls', 'Hard Drinks', 'Souvenirs'],
    policy: 'No refunds for cancellations within 30 days of check-in.'
  }
];

export const teamMembers = [
  {
    id: 1,
    name: 'Alex Morgan',
    role: 'Lead Expedition Guide',
    experience: '15+ years',
    specialty: 'Mountain & Polar Expeditions',
    image: '/images/team/alex.jpg',
    bio: 'Former mountaineering instructor with summits on 6 continents.'
  },
  {
    id: 2,
    name: 'Sarah Chen',
    role: 'Wilderness Medic & Safety Director',
    experience: '12+ years',
    specialty: 'Emergency Response & Safety',
    image: '/images/team/sarah.jpg',
    bio: 'Certified wilderness EMT with extensive remote area experience.'
  },
  {
    id: 3,
    name: 'Marcus Rivera',
    role: 'Logistics Coordinator',
    experience: '10+ years',
    specialty: 'Supply Chain & Remote Operations',
    image: '/images/team/marcus.jpg',
    bio: 'Expert in coordinating complex expeditions in challenging environments.'
  },
  {
    id: 4,
    name: 'Elena Petrov',
    role: 'Cultural Guide & Interpreter',
    experience: '8+ years',
    specialty: 'Indigenous Cultures & Languages',
    image: '/images/team/elena.jpg',
    bio: 'Fluent in 5 languages with deep cultural knowledge of remote regions.'
  },
];

export const testimonials = [
  {
    id: 1,
    name: 'Michael Rodriguez',
    expedition: 'Arctic 2023',
    content: 'Life-changing experience with the most professional team. Every detail was meticulously planned.',
    rating: 5,
    date: 'March 2024'
  },
  {
    id: 2,
    name: 'Jennifer Kim',
    expedition: 'Amazon 2023',
    content: 'The expertise and care of the guides made all the difference. Felt completely safe throughout.',
    rating: 5,
    date: 'February 2024'
  },
  {
    id: 3,
    name: 'Thomas Wilson',
    expedition: 'Himalayan Trek 2023',
    content: 'Challenging but incredibly rewarding. The team\'s knowledge of the mountains was impressive.',
    rating: 5,
    date: 'January 2024'
  },
];

export const galleryImages = [
  { id: 1, src: '/images/bandipur.png', alt: 'Bandipur Tiger Reserve', category: 'Wildlife' },
  { id: 2, src: '/images/mudumalai.png', alt: 'Mudumalai Tiger Reserve', category: 'Jungle' },
  { id: 3, src: '/images/bhadra.png', alt: 'Bhadra Tiger Reserve', category: 'Mountain' },
  { id: 4, src: '/images/nagarhole.png', alt: 'Nagarhole Tiger Reserve', category: 'River' },
  { id: 5, src: '/images/expeditions/himalayas.jpg', alt: 'Himalayas', category: 'Mountain' },
  { id: 6, src: '/images/expeditions/sahara.jpg', alt: 'Sahara Desert', category: 'Desert' },
];
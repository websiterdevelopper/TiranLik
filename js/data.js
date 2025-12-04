// Mock venue data for Casablanca sports venues
const venues = [
  {
    id: 1,
    name: "Stade Mohammed V - Terrain A",
    address: "Boulevard Zerktouni, Casablanca",
    district: "Maarif",
    sports: ["Football"],
    pricePerHour: 300,
    rating: 4.8,
    reviews: [
      { author: "Ahmed B.", rating: 5, comment: "Excellent terrain, très bien entretenu!" },
      { author: "Fatima K.", rating: 4, comment: "Bon rapport qualité-prix, je recommande." }
    ],
    images: ["https://via.placeholder.com/800x600?text=Stade+Mohammed+V"],
    amenities: ["Parking", "Vestiaires", "Éclairage", "Tribunes"],
    availability: {
      hours: { start: "08:00", end: "22:00" },
      blockedDates: []
    },
    phone: "+212 522-123456"
  },
  {
    id: 2,
    name: "Complexe Sportif Anfa",
    address: "Avenue Anfa, Casablanca",
    district: "Anfa",
    sports: ["Basketball", "Volleyball"],
    pricePerHour: 200,
    rating: 4.5,
    reviews: [
      { author: "Youssef M.", rating: 5, comment: "Super complexe, deux terrains disponibles." },
      { author: "Sara L.", rating: 4, comment: "Bon emplacement, facile d'accès." }
    ],
    images: ["https://via.placeholder.com/800x600?text=Complexe+Anfa"],
    amenities: ["Parking", "Vestiaires", "Douches", "Snack-bar"],
    availability: {
      hours: { start: "09:00", end: "21:00" },
      blockedDates: []
    },
    phone: "+212 522-234567"
  },
  {
    id: 3,
    name: "Tennis Club Casablanca",
    address: "Route d'El Jadida, Casablanca",
    district: "Ain Diab",
    sports: ["Tennis", "Paddle"],
    pricePerHour: 250,
    rating: 4.7,
    reviews: [
      { author: "Karim T.", rating: 5, comment: "Terrains de tennis impeccables!" },
      { author: "Layla H.", rating: 4, comment: "Service professionnel, je reviendrai." }
    ],
    images: ["https://via.placeholder.com/800x600?text=Tennis+Club"],
    amenities: ["Parking", "Club-house", "Pro-shop", "Restaurant"],
    availability: {
      hours: { start: "07:00", end: "23:00" },
      blockedDates: []
    },
    phone: "+212 522-345678"
  },
  {
    id: 4,
    name: "Terrain de Football Hay Riad",
    address: "Hay Riad, Casablanca",
    district: "Hay Riad",
    sports: ["Football"],
    pricePerHour: 150,
    rating: 4.2,
    reviews: [
      { author: "Omar S.", rating: 4, comment: "Bon terrain pour le prix." },
      { author: "Nadia A.", rating: 4, comment: "Accessible et bien situé." }
    ],
    images: ["https://via.placeholder.com/800x600?text=Terrain+Hay+Riad"],
    amenities: ["Parking", "Éclairage"],
    availability: {
      hours: { start: "10:00", end: "20:00" },
      blockedDates: []
    },
    phone: "+212 522-456789"
  },
  {
    id: 5,
    name: "Basketball Arena Sidi Maarouf",
    address: "Sidi Maarouf, Casablanca",
    district: "Sidi Maarouf",
    sports: ["Basketball"],
    pricePerHour: 180,
    rating: 4.6,
    reviews: [
      { author: "Mehdi B.", rating: 5, comment: "Parfait pour les matchs entre amis!" },
      { author: "Salma K.", rating: 4, comment: "Terrain de qualité, bon éclairage." }
    ],
    images: ["https://via.placeholder.com/800x600?text=Basketball+Arena"],
    amenities: ["Parking", "Vestiaires", "Éclairage LED", "Scoreboard"],
    availability: {
      hours: { start: "08:00", end: "22:00" },
      blockedDates: []
    },
    phone: "+212 522-567890"
  },
  {
    id: 6,
    name: "Paddle Club Casablanca",
    address: "Corniche, Ain Diab",
    district: "Ain Diab",
    sports: ["Paddle"],
    pricePerHour: 220,
    rating: 4.9,
    reviews: [
      { author: "Hassan R.", rating: 5, comment: "Le meilleur club de paddle à Casa!" },
      { author: "Aicha M.", rating: 5, comment: "Installations modernes et professionnelles." }
    ],
    images: ["https://via.placeholder.com/800x600?text=Paddle+Club"],
    amenities: ["Parking", "Club-house", "Bar", "Douches", "Pro-shop"],
    availability: {
      hours: { start: "08:00", end: "23:00" },
      blockedDates: []
    },
    phone: "+212 522-678901"
  },
  {
    id: 7,
    name: "Volleyball Center Maarif",
    address: "Boulevard Mohammed V, Maarif",
    district: "Maarif",
    sports: ["Volleyball"],
    pricePerHour: 170,
    rating: 4.4,
    reviews: [
      { author: "Rachid L.", rating: 4, comment: "Bon centre pour jouer au volley." },
      { author: "Imane F.", rating: 4, comment: "Prix raisonnable, bon service." }
    ],
    images: ["https://via.placeholder.com/800x600?text=Volleyball+Center"],
    amenities: ["Parking", "Vestiaires", "Filets professionnels"],
    availability: {
      hours: { start: "09:00", end: "21:00" },
      blockedDates: []
    },
    phone: "+212 522-789012"
  },
  {
    id: 8,
    name: "Complexe Multi-Sports Bourgogne",
    address: "Bourgogne, Casablanca",
    district: "Bourgogne",
    sports: ["Football", "Basketball", "Tennis"],
    pricePerHour: 280,
    rating: 4.7,
    reviews: [
      { author: "Tarik N.", rating: 5, comment: "Excellent complexe avec plusieurs sports!" },
      { author: "Zineb K.", rating: 4, comment: "Très bien équipé, je recommande." }
    ],
    images: ["https://via.placeholder.com/800x600?text=Complexe+Bourgogne"],
    amenities: ["Parking", "Vestiaires", "Restaurant", "Éclairage", "Tribunes"],
    availability: {
      hours: { start: "08:00", end: "22:00" },
      blockedDates: []
    },
    phone: "+212 522-890123"
  },
  {
    id: 9,
    name: "Tennis Academy Oasis",
    address: "Oasis, Casablanca",
    district: "Oasis",
    sports: ["Tennis"],
    pricePerHour: 200,
    rating: 4.5,
    reviews: [
      { author: "Amine D.", rating: 4, comment: "Bon club de tennis avec de bons courts." },
      { author: "Houda S.", rating: 5, comment: "Professeurs disponibles, excellent service." }
    ],
    images: ["https://via.placeholder.com/800x600?text=Tennis+Academy"],
    amenities: ["Parking", "Club-house", "Cours disponibles", "Pro-shop"],
    availability: {
      hours: { start: "07:00", end: "22:00" },
      blockedDates: []
    },
    phone: "+212 522-901234"
  },
  {
    id: 10,
    name: "Terrain de Football Sidi Bernoussi",
    address: "Sidi Bernoussi, Casablanca",
    district: "Sidi Bernoussi",
    sports: ["Football"],
    pricePerHour: 120,
    rating: 4.1,
    reviews: [
      { author: "Bilal A.", rating: 4, comment: "Bon terrain pour le prix modique." },
      { author: "Khadija M.", rating: 4, comment: "Accessible et pratique." }
    ],
    images: ["https://via.placeholder.com/800x600?text=Terrain+Sidi+Bernoussi"],
    amenities: ["Parking", "Éclairage"],
    availability: {
      hours: { start: "10:00", end: "20:00" },
      blockedDates: []
    },
    phone: "+212 522-012345"
  },
  {
    id: 11,
    name: "Basketball Court California",
    address: "California, Casablanca",
    district: "California",
    sports: ["Basketball"],
    pricePerHour: 160,
    rating: 4.3,
    reviews: [
      { author: "Yassine T.", rating: 4, comment: "Bon terrain de basket en extérieur." },
      { author: "Meryem L.", rating: 4, comment: "Prix correct pour la qualité." }
    ],
    images: ["https://via.placeholder.com/800x600?text=Basketball+California"],
    amenities: ["Parking", "Éclairage"],
    availability: {
      hours: { start: "09:00", end: "21:00" },
      blockedDates: []
    },
    phone: "+212 522-123450"
  },
  {
    id: 12,
    name: "Volleyball Beach Ain Diab",
    address: "Plage Ain Diab, Casablanca",
    district: "Ain Diab",
    sports: ["Volleyball"],
    pricePerHour: 100,
    rating: 4.0,
    reviews: [
      { author: "Said R.", rating: 4, comment: "Beach volley, ambiance sympa!" },
      { author: "Nora B.", rating: 4, comment: "Parfait pour l'été." }
    ],
    images: ["https://via.placeholder.com/800x600?text=Beach+Volleyball"],
    amenities: ["Parking", "Douches", "Snack-bar"],
    availability: {
      hours: { start: "10:00", end: "19:00" },
      blockedDates: []
    },
    phone: "+212 522-234501"
  },
  {
    id: 13,
    name: "Paddle & Tennis Club Palmier",
    address: "Avenue du Palmier, Casablanca",
    district: "Maarif",
    sports: ["Tennis", "Paddle"],
    pricePerHour: 240,
    rating: 4.8,
    reviews: [
      { author: "Khalid M.", rating: 5, comment: "Installations de première classe!" },
      { author: "Leila H.", rating: 5, comment: "Service exceptionnel, je reviendrai." }
    ],
    images: ["https://via.placeholder.com/800x600?text=Paddle+Tennis+Club"],
    amenities: ["Parking", "Club-house", "Restaurant", "Pro-shop", "Douches"],
    availability: {
      hours: { start: "07:00", end: "23:00" },
      blockedDates: []
    },
    phone: "+212 522-345012"
  },
  {
    id: 14,
    name: "Complexe Sportif Belvédère",
    address: "Belvédère, Casablanca",
    district: "Belvédère",
    sports: ["Football", "Basketball", "Volleyball"],
    pricePerHour: 190,
    rating: 4.4,
    reviews: [
      { author: "Hamza K.", rating: 4, comment: "Bon complexe multi-sports." },
      { author: "Sanae D.", rating: 4, comment: "Prix raisonnable pour plusieurs sports." }
    ],
    images: ["https://via.placeholder.com/800x600?text=Complexe+Belvedere"],
    amenities: ["Parking", "Vestiaires", "Éclairage"],
    availability: {
      hours: { start: "09:00", end: "21:00" },
      blockedDates: []
    },
    phone: "+212 522-450123"
  },
  {
    id: 15,
    name: "Tennis Club Les Almohades",
    address: "Les Almohades, Casablanca",
    district: "Les Almohades",
    sports: ["Tennis"],
    pricePerHour: 210,
    rating: 4.6,
    reviews: [
      { author: "Reda S.", rating: 5, comment: "Excellents courts de tennis!" },
      { author: "Samira A.", rating: 4, comment: "Bien entretenu et professionnel." }
    ],
    images: ["https://via.placeholder.com/800x600?text=Tennis+Almohades"],
    amenities: ["Parking", "Club-house", "Pro-shop"],
    availability: {
      hours: { start: "08:00", end: "22:00" },
      blockedDates: []
    },
    phone: "+212 522-501234"
  }
];

// Initialize localStorage bookings if not exists
if (!localStorage.getItem('bookings')) {
  localStorage.setItem('bookings', JSON.stringify([]));
}

// Initialize owner settings if not exists
if (!localStorage.getItem('ownerSettings')) {
  localStorage.setItem('ownerSettings', JSON.stringify({}));
}

// Helper function to get all bookings
function getBookings() {
  return JSON.parse(localStorage.getItem('bookings') || '[]');
}

// Helper function to save booking
function saveBooking(booking) {
  const bookings = getBookings();
  booking.id = Date.now().toString();
  booking.status = 'pending';
  bookings.push(booking);
  localStorage.setItem('bookings', JSON.stringify(bookings));
  return booking.id;
}

// Helper function to get venue by ID
function getVenueById(id) {
  return venues.find(venue => venue.id === parseInt(id));
}

// Helper function to check availability
function checkAvailability(venueId, date, time, duration) {
  const bookings = getBookings();
  const venue = getVenueById(venueId);
  if (!venue) return false;

  const bookingDate = new Date(date);
  const bookingTime = parseInt(time.split(':')[0]);
  const endTime = bookingTime + duration;

  // Check if time is within venue hours
  const venueStart = parseInt(venue.availability.hours.start.split(':')[0]);
  const venueEnd = parseInt(venue.availability.hours.end.split(':')[0]);
  if (bookingTime < venueStart || endTime > venueEnd) {
    return false;
  }

  // Check for conflicts with existing bookings
  for (const booking of bookings) {
    if (booking.venueId === venueId && booking.date === date && booking.status !== 'cancelled') {
      const existingTime = parseInt(booking.time.split(':')[0]);
      const existingEnd = existingTime + booking.duration;
      if ((bookingTime >= existingTime && bookingTime < existingEnd) ||
          (endTime > existingTime && endTime <= existingEnd) ||
          (bookingTime <= existingTime && endTime >= existingEnd)) {
        return false;
      }
    }
  }

  return true;
}


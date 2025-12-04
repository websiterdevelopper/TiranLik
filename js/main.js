// Main JavaScript for homepage

// Initialize page
document.addEventListener("DOMContentLoaded", function () {
  displayVenues(venues);
  setupEventListeners();
  loadSavedFilters();
});

// Display venues in grid
function displayVenues(venuesToShow) {
  const venuesGrid = document.getElementById("venuesGrid");
  const noResults = document.getElementById("noResults");

  if (venuesToShow.length === 0) {
    venuesGrid.innerHTML = "";
    noResults.style.display = "block";
    return;
  }

  noResults.style.display = "none";
  venuesGrid.innerHTML = venuesToShow
    .map((venue) => createVenueCard(venue))
    .join("");

  // Add click event to venue cards
  document.querySelectorAll(".venue-card").forEach((card) => {
    card.addEventListener("click", function () {
      const venueId = this.dataset.venueId;
      window.location.href = `venue-detail.html?id=${venueId}`;
    });
  });
}

// Create venue card HTML
function createVenueCard(venue) {
  const stars =
    "★".repeat(Math.floor(venue.rating)) +
    "☆".repeat(5 - Math.floor(venue.rating));
  const sportsBadges = venue.sports
    .map((sport) => `<span class="sport-badge">${sport}</span>`)
    .join("");

  return `
        <div class="venue-card" data-venue-id="${venue.id}">
            <img src="" 
                 alt="${venue.name}" 
                 class="venue-card-image"
                 >
            <div class="venue-card-content">
                <h3 class="venue-card-title">${venue.name}</h3>
                <p class="venue-card-location">📍 ${venue.district}, ${
    venue.address
  }</p>
                <div class="venue-card-sports">
                    ${sportsBadges}
                </div>
                <div class="venue-card-footer">
                    <div>
                        <div class="venue-card-price">${
                          venue.pricePerHour
                        } MAD/h</div>
                        <div class="venue-card-rating">
                            <span class="stars">${stars}</span>
                            <span>${venue.rating.toFixed(1)}</span>
                        </div>
                    </div>
                    <button class="btn-primary">Voir détails</button>
                </div>
            </div>
        </div>
    `;
}

// Setup event listeners
function setupEventListeners() {
  const searchInput = document.getElementById("searchInput");
  const sportFilter = document.getElementById("sportFilter");
  const districtFilter = document.getElementById("districtFilter");
  const priceFilter = document.getElementById("priceFilter");
  const clearFiltersBtn = document.getElementById("clearFilters");
  const searchBtn = document.querySelector(".search-btn");

  // Search functionality
  searchInput.addEventListener("input", filterVenues);
  searchBtn.addEventListener("click", filterVenues);

  // Filter functionality
  sportFilter.addEventListener("change", filterVenues);
  districtFilter.addEventListener("change", filterVenues);
  priceFilter.addEventListener("change", filterVenues);

  // Clear filters
  clearFiltersBtn.addEventListener("click", function () {
    searchInput.value = "";
    sportFilter.value = "";
    districtFilter.value = "";
    priceFilter.value = "";
    filterVenues();
    localStorage.removeItem("savedFilters");
  });
}

// Filter venues based on search and filters
function filterVenues() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  const selectedSport = document.getElementById("sportFilter").value;
  const selectedDistrict = document.getElementById("districtFilter").value;
  const maxPrice = document.getElementById("priceFilter").value;

  // Save filters to localStorage
  saveFilters(searchTerm, selectedSport, selectedDistrict, maxPrice);

  const filteredVenues = venues.filter((venue) => {
    // Search filter
    const matchesSearch =
      !searchTerm ||
      venue.name.toLowerCase().includes(searchTerm) ||
      venue.address.toLowerCase().includes(searchTerm) ||
      venue.district.toLowerCase().includes(searchTerm);

    // Sport filter
    const matchesSport = !selectedSport || venue.sports.includes(selectedSport);

    // District filter
    const matchesDistrict =
      !selectedDistrict || venue.district === selectedDistrict;

    // Price filter
    const matchesPrice = !maxPrice || venue.pricePerHour <= parseInt(maxPrice);

    return matchesSearch && matchesSport && matchesDistrict && matchesPrice;
  });

  displayVenues(filteredVenues);
}

// Save filters to localStorage
function saveFilters(search, sport, district, price) {
  const filters = {
    search: search,
    sport: sport,
    district: district,
    price: price,
  };
  localStorage.setItem("savedFilters", JSON.stringify(filters));
}

// Load saved filters
function loadSavedFilters() {
  const savedFilters = localStorage.getItem("savedFilters");
  if (savedFilters) {
    const filters = JSON.parse(savedFilters);
    document.getElementById("searchInput").value = filters.search || "";
    document.getElementById("sportFilter").value = filters.sport || "";
    document.getElementById("districtFilter").value = filters.district || "";
    document.getElementById("priceFilter").value = filters.price || "";
    filterVenues();
  }
}


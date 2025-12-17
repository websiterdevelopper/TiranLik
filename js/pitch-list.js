// Pitch List Page Logic
document.addEventListener("DOMContentLoaded", () => {
  const pitchListContainer = document.getElementById("pitchList");
  const resultsCount = document.querySelector("#resultsCount span");
  const zoneFilter = document.getElementById("zoneFilter");
  const sportFilter = document.getElementById("sportFilter");
  const dateFilter = document.getElementById("dateFilter");
  const applyFiltersBtn = document.getElementById("applyFilters");
  const clearFiltersBtn = document.getElementById("clearFilters");

  // Get URL parameters and apply initial filters
  function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return {
      zone: params.get("zone") || "",
      sport: params.get("sport") || "",
      date: params.get("date") || "",
    };
  }

  // Set filter values from URL params
  function setFiltersFromUrl() {
    const params = getUrlParams();
    if (params.zone) zoneFilter.value = params.zone;
    if (params.sport) sportFilter.value = params.sport;
    if (params.date) dateFilter.value = params.date;
  }

  // Filter pitches based on current filter values
  function filterPitches() {
    const zone = zoneFilter.value.toLowerCase().trim();
    const sport = sportFilter.value;
    const date = dateFilter.value;

    return pitchesData.filter((pitch) => {
      // Zone filter (Casablanca zones only)
      const matchesZone =
        !zone || pitch.zone.toLowerCase().includes(zone);

      // Sport filter
      const matchesSport = !sport || pitch.sport === sport;

      // Date filter - for now, all pitches are available (could add availability logic)
      const matchesDate = true;

      return matchesZone && matchesSport && matchesDate;
    });
  }

  // Create pitch card HTML
  function createPitchCard(pitch) {
    const card = document.createElement("div");
    card.className = "pitch-card";
    card.setAttribute("data-pitch-id", pitch.id);

    card.innerHTML = `
      <div class="pitch-image">
        <img src="${pitch.image}" alt="${pitch.name}" />
        <span class="sport-badge">${pitch.sport}</span>
      </div>
      <div class="pitch-body">
        <h3 class="pitch-title">${pitch.name}</h3>
        <p class="pitch-location">${pitch.zone}, ${pitch.city}</p>
        <p class="pitch-description">${pitch.description}</p>
        <div class="pitch-footer">
          <div class="pitch-price">
            ${pitch.price} DH <span>/ hour</span>
          </div>
          <button class="view-btn">View Details</button>
        </div>
      </div>
    `;

    // Add click event to navigate to detail page
    card.addEventListener("click", () => {
      window.location.href = `pitch-detail.html?id=${pitch.id}`;
    });

    return card;
  }

  // Render pitch cards
  function renderPitches(pitches) {
    pitchListContainer.innerHTML = "";

    if (pitches.length === 0) {
      pitchListContainer.innerHTML = `
        <div class="no-results">
          <h3>No pitches found</h3>
          <p>Try adjusting your filters or search for a different location.</p>
        </div>
      `;
      resultsCount.textContent = "0";
      return;
    }

    pitches.forEach((pitch) => {
      const card = createPitchCard(pitch);
      pitchListContainer.appendChild(card);
    });

    resultsCount.textContent = pitches.length;
  }

  // Apply filters and re-render
  function applyFilters() {
    const filteredPitches = filterPitches();
    renderPitches(filteredPitches);

    // Update URL with current filters
    const params = new URLSearchParams();
    if (zoneFilter.value) params.set("zone", zoneFilter.value);
    if (sportFilter.value) params.set("sport", sportFilter.value);
    if (dateFilter.value) params.set("date", dateFilter.value);

    const newUrl = `${window.location.pathname}${
      params.toString() ? "?" + params.toString() : ""
    }`;
    window.history.replaceState({}, "", newUrl);
  }

  // Clear all filters
  function clearFilters() {
    zoneFilter.value = "";
    sportFilter.value = "";
    dateFilter.value = "";
    applyFilters();
  }

  // Event listeners
  applyFiltersBtn.addEventListener("click", applyFilters);
  clearFiltersBtn.addEventListener("click", clearFilters);

  // Also filter on Enter key in zone input
  zoneFilter.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      applyFilters();
    }
  });

  // Initialize
  setFiltersFromUrl();
  applyFilters();
});


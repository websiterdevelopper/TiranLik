// JavaScript for venue detail and booking page

let currentVenue = null;
let selectedDate = null;
let selectedTime = null;

// Initialize page
document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const venueId = urlParams.get("id");

  if (venueId) {
    loadVenueDetails(venueId);
    setupBookingForm();
    setupDatePicker();
  } else {
    document.getElementById("venueDetails").innerHTML =
      '<p>Terrain non trouvé. <a href="index.html">Retour à la liste</a></p>';
  }
});

// Load venue details
function loadVenueDetails(venueId) {
  currentVenue = getVenueById(venueId);

  if (!currentVenue) {
    document.getElementById("venueDetails").innerHTML =
      '<p>Terrain non trouvé. <a href="index.html">Retour à la liste</a></p>';
    return;
  }

  displayVenueDetails(currentVenue);
  displayReviews(currentVenue);
}

// Display venue details
function displayVenueDetails(venue) {
  const stars =
    "★".repeat(Math.floor(venue.rating)) +
    "☆".repeat(5 - Math.floor(venue.rating));
  const sportsBadges = venue.sports
    .map((sport) => `<span class="sport-badge">${sport}</span>`)
    .join("");
  const amenitiesBadges = venue.amenities
    .map((amenity) => `<span class="amenity-badge">${amenity}</span>`)
    .join("");

  const venueDetailsHTML = `
        <div class="venue-detail-header">
            <img src="" 
                 alt="${venue.name}" 
                 class="venue-detail-image"
                 >
            <div class="venue-detail-info">
                <h1>${venue.name}</h1>
                <p><strong>📍 Adresse:</strong> ${venue.address}, ${
    venue.district
  }</p>
                <p><strong>📞 Téléphone:</strong> ${venue.phone}</p>
                <p><strong>⏰ Horaires:</strong> ${
                  venue.availability.hours.start
                } - ${venue.availability.hours.end}</p>
                <div class="venue-detail-sports">
                    ${sportsBadges}
                </div>
                <div class="venue-detail-rating">
                    <span class="stars">${stars}</span>
                    <span>${venue.rating.toFixed(1)} (${
    venue.reviews.length
  } avis)</span>
                </div>
                <div class="venue-detail-amenities">
                    <h3>Équipements:</h3>
                    <div class="amenities-list">
                        ${amenitiesBadges}
                    </div>
                </div>
            </div>
        </div>
    `;

  document.getElementById("venueDetails").innerHTML = venueDetailsHTML;
}

// Display reviews
function displayReviews(venue) {
  const reviewsList = document.getElementById("reviewsList");

  if (venue.reviews.length === 0) {
    reviewsList.innerHTML = "<p>Aucun avis pour le moment.</p>";
    return;
  }

  reviewsList.innerHTML = venue.reviews
    .map((review) => {
      const stars = "★".repeat(review.rating) + "☆".repeat(5 - review.rating);
      return `
            <div class="review-item">
                <div class="review-header">
                    <span class="review-author">${review.author}</span>
                    <span class="stars">${stars}</span>
                </div>
                <p class="review-comment">${review.comment}</p>
            </div>
        `;
    })
    .join("");
}

// Setup date picker
function setupDatePicker() {
  const dateInput = document.getElementById("bookingDate");
  const today = new Date();
  const minDate = today.toISOString().split("T")[0];
  dateInput.setAttribute("min", minDate);

  dateInput.addEventListener("change", function () {
    selectedDate = this.value;
    document.getElementById("selectedDate").value = formatDate(selectedDate);
    generateTimeSlots();
    updatePrice();
  });
}

// Generate time slots
function generateTimeSlots() {
  if (!currentVenue || !selectedDate) return;

  const timeSlotsContainer = document.getElementById("timeSlots");
  const bookings = getBookings();
  const venueStart = parseInt(
    currentVenue.availability.hours.start.split(":")[0]
  );
  const venueEnd = parseInt(currentVenue.availability.hours.end.split(":")[0]);

  // Get existing bookings for this date
  const existingBookings = bookings.filter(
    (b) =>
      b.venueId === currentVenue.id &&
      b.date === selectedDate &&
      b.status !== "cancelled"
  );

  timeSlotsContainer.innerHTML = "";

  for (let hour = venueStart; hour < venueEnd; hour++) {
    const timeString = `${hour.toString().padStart(2, "0")}:00`;
    const isBooked = existingBookings.some((booking) => {
      const bookingHour = parseInt(booking.time.split(":")[0]);
      const bookingEnd = bookingHour + booking.duration;
      return hour >= bookingHour && hour < bookingEnd;
    });

    const timeSlot = document.createElement("div");
    timeSlot.className = `time-slot ${isBooked ? "booked" : ""} ${
      selectedTime === timeString ? "selected" : ""
    }`;
    timeSlot.textContent = timeString;

    if (!isBooked) {
      timeSlot.addEventListener("click", function () {
        // Remove previous selection
        document.querySelectorAll(".time-slot").forEach((slot) => {
          slot.classList.remove("selected");
        });

        // Add selection to clicked slot
        this.classList.add("selected");
        selectedTime = timeString;
        document.getElementById("selectedTime").value = timeString;
        updatePrice();
      });
    }

    timeSlotsContainer.appendChild(timeSlot);
  }
}

// Setup booking form
function setupBookingForm() {
  const durationSelect = document.getElementById("duration");
  durationSelect.addEventListener("change", updatePrice);

  const bookingForm = document.getElementById("bookingForm");
  bookingForm.addEventListener("submit", handleBookingSubmit);
}

// Update price calculation
function updatePrice() {
  if (!currentVenue || !selectedTime) {
    document.getElementById("totalPrice").textContent = "0";
    return;
  }

  const duration = parseInt(document.getElementById("duration").value);
  const totalPrice = currentVenue.pricePerHour * duration;
  document.getElementById("totalPrice").textContent = totalPrice;
}

// Handle booking form submission
function handleBookingSubmit(e) {
  e.preventDefault();

  if (!selectedDate || !selectedTime) {
    alert("Veuillez sélectionner une date et une heure");
    return;
  }

  const duration = parseInt(document.getElementById("duration").value);
  const customerName = document.getElementById("customerName").value;
  const customerPhone = document.getElementById("customerPhone").value;

  // Check availability
  if (
    !checkAvailability(currentVenue.id, selectedDate, selectedTime, duration)
  ) {
    alert("Ce créneau n'est plus disponible. Veuillez en choisir un autre.");
    generateTimeSlots();
    return;
  }

  // Create booking
  const booking = {
    venueId: currentVenue.id,
    venueName: currentVenue.name,
    date: selectedDate,
    time: selectedTime,
    duration: duration,
    customer: {
      name: customerName,
      phone: customerPhone,
    },
    price: currentVenue.pricePerHour * duration,
  };

  const bookingId = saveBooking(booking);

  // Redirect to confirmation page
  window.location.href = `booking-confirmation.html?id=${bookingId}`;
}

// Format date for display
function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("fr-FR", options);
}


// Pitch Detail Page Logic
document.addEventListener("DOMContentLoaded", () => {
  const pitchDetailContainer = document.getElementById("pitchDetail");

  // Get pitch ID from URL
  function getPitchId() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get("id"));
  }

  // Find pitch by ID
  function findPitch(id) {
    return pitchesData.find((pitch) => pitch.id === id);
  }

  // Generate time slots
  function generateTimeSlots() {
    const slots = [];
    for (let hour = 8; hour <= 22; hour++) {
      const time = `${hour.toString().padStart(2, "0")}:00`;
      slots.push(`<option value="${time}">${time}</option>`);
    }
    return slots.join("");
  }

  // Render pitch detail
  function renderPitchDetail(pitch) {
    if (!pitch) {
      pitchDetailContainer.innerHTML = `
        <div class="not-found">
          <h2>Pitch Not Found</h2>
          <p>Sorry, we couldn't find the pitch you're looking for.</p>
          <a href="pitch-list.html">Browse All Pitches</a>
        </div>
      `;
      return;
    }

    // Update page title
    document.title = `${pitch.name} - TiranLik`;

    // Render amenities
    const amenitiesHtml = pitch.amenities
      .map((amenity) => `<span>${amenity}</span>`)
      .join("");

    pitchDetailContainer.innerHTML = `
      <div class="pitch-detail-content">
        <div class="pitch-main">
          <div class="pitch-hero">
            <img src="${pitch.image}" alt="${pitch.name}" />
            <span class="sport-badge">${pitch.sport}</span>
          </div>
          
          <div class="pitch-info">
            <h1>${pitch.name}</h1>
            <p class="location">${pitch.zone}, ${pitch.city}</p>
            <p class="description">${pitch.description}</p>
            
            <div class="amenities">
              <h3>Amenities</h3>
              <div class="amenities-list">
                ${amenitiesHtml}
              </div>
            </div>
            
            <div class="details-grid">
              <div class="detail-item">
                <div class="label">Capacity</div>
                <div class="value">${pitch.capacity}</div>
              </div>
              <div class="detail-item">
                <div class="label">Open Hours</div>
                <div class="value">${pitch.openHours}</div>
              </div>
              <div class="detail-item">
                <div class="label">Sport Type</div>
                <div class="value">${pitch.sport}</div>
              </div>
              <div class="detail-item">
                <div class="label">Location</div>
                <div class="value">${pitch.city}</div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="booking-card">
          <div class="price">${pitch.price} DH <span>/ hour</span></div>
          
          <div class="divider"></div>
          
          <h3>Book This Pitch</h3>
          
          <form id="bookingForm">
            <div class="form-group">
              <label for="bookingDate">Select Date</label>
              <input type="date" id="bookingDate" required />
            </div>
            
            <div class="form-group">
              <label for="bookingTime">Select Time</label>
              <select id="bookingTime" required>
                <option value="">Choose a time slot</option>
                ${generateTimeSlots()}
              </select>
            </div>
            
            <div class="form-group">
              <label for="bookingDuration">Duration (hours)</label>
              <select id="bookingDuration" required>
                <option value="1">1 hour - ${pitch.price} DH</option>
                <option value="2">2 hours - ${pitch.price * 2} DH</option>
                <option value="3">3 hours - ${pitch.price * 3} DH</option>
              </select>
            </div>
            
            <button type="submit" class="book-btn">Reserve Now</button>
          </form>
          
          <div class="contact-info">
            <p>📞 ${pitch.phone}</p>
            <p>🕐 ${pitch.openHours}</p>
          </div>
        </div>
      </div>
    `;

    // Set minimum date to today
    const dateInput = document.getElementById("bookingDate");
    const today = new Date().toISOString().split("T")[0];
    dateInput.min = today;
    dateInput.value = today;

    // Handle booking form submission
    const bookingForm = document.getElementById("bookingForm");
    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const date = document.getElementById("bookingDate").value;
      const time = document.getElementById("bookingTime").value;
      const duration = document.getElementById("bookingDuration").value;
      const totalPrice = pitch.price * parseInt(duration);

      // Store booking data in sessionStorage
      const bookingData = {
        pitchId: pitch.id,
        pitchName: pitch.name,
        pitchImage: pitch.image,
        pitchLocation: `${pitch.zone}, ${pitch.city}`,
        sport: pitch.sport,
        date: date,
        time: time,
        duration: duration,
        pricePerHour: pitch.price,
        totalPrice: totalPrice,
        phone: pitch.phone,
        openHours: pitch.openHours,
      };

      sessionStorage.setItem("bookingData", JSON.stringify(bookingData));

      // Redirect to confirmation page
      window.location.href = "booking-confirm.html";
    });
  }

  // Initialize
  const pitchId = getPitchId();
  const pitch = findPitch(pitchId);
  renderPitchDetail(pitch);
});

// Booking Confirmation Page Logic
document.addEventListener("DOMContentLoaded", () => {
  const confirmContent = document.getElementById("confirmContent");

  // Get booking data from sessionStorage
  function getBookingData() {
    const bookingDataStr = sessionStorage.getItem("bookingData");
    if (!bookingDataStr) {
      return null;
    }
    return JSON.parse(bookingDataStr);
  }

  // Format date for display
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  // Calculate end time
  function calculateEndTime(startTime, duration) {
    const [hours, minutes] = startTime.split(":").map(Number);
    const endHours = hours + parseInt(duration);
    return `${endHours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
  }

  // Render confirmation page
  function renderConfirmation() {
    const bookingData = getBookingData();

    if (!bookingData) {
      confirmContent.innerHTML = `
        <div class="no-booking">
          <h2>No Reservation Found</h2>
          <p>It seems you don't have a pending reservation. Please start a new booking.</p>
          <a href="pitch-list.html">Browse Pitches</a>
        </div>
      `;
      return;
    }

    const endTime = calculateEndTime(bookingData.time, bookingData.duration);

    confirmContent.innerHTML = `
      <div class="confirmation-card">
        <div class="confirmation-header">
          <h1>Review Your Reservation</h1>
          <p>Please review the details below and confirm your booking</p>
        </div>
        
        <div class="confirmation-body">
          <div class="pitch-preview">
            <div class="pitch-preview-image">
              <img src="${bookingData.pitchImage}" alt="${bookingData.pitchName}" />
            </div>
            <div class="pitch-preview-info">
              <h3>${bookingData.pitchName}</h3>
              <p class="location">📍 ${bookingData.pitchLocation}</p>
              <span class="sport-badge">${bookingData.sport}</span>
            </div>
          </div>

          <div class="reservation-details">
            <h3>Reservation Details</h3>
            <div class="details-list">
              <div class="detail-row">
                <span class="label">Date</span>
                <span class="value">${formatDate(bookingData.date)}</span>
              </div>
              <div class="detail-row">
                <span class="label">Time</span>
                <span class="value">${bookingData.time} - ${endTime}</span>
              </div>
              <div class="detail-row">
                <span class="label">Duration</span>
                <span class="value">${bookingData.duration} hour(s)</span>
              </div>
              <div class="detail-row">
                <span class="label">Price per hour</span>
                <span class="value">${bookingData.pricePerHour} DH</span>
              </div>
              <div class="detail-row total">
                <span class="label">Total Amount</span>
                <span class="value">${bookingData.totalPrice} DH</span>
              </div>
            </div>
          </div>

          <div class="confirmation-actions">
            <button class="cancel-btn" id="cancelBtn">Cancel</button>
            <button class="confirm-btn" id="confirmBtn">Confirm Reservation</button>
          </div>
        </div>
      </div>
    `;

    // Event listeners
    const cancelBtn = document.getElementById("cancelBtn");
    const confirmBtn = document.getElementById("confirmBtn");

    cancelBtn.addEventListener("click", () => {
      // Go back to previous page
      window.history.back();
    });

    confirmBtn.addEventListener("click", () => {
      // Redirect to success page
      window.location.href = "booking-success.html";
    });
  }

  // Initialize
  renderConfirmation();
});


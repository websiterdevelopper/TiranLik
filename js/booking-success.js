// Booking Success Page Logic
document.addEventListener("DOMContentLoaded", () => {
  const successContent = document.getElementById("successContent");

  // Get booking data from sessionStorage
  function getBookingData() {
    const bookingDataStr = sessionStorage.getItem("bookingData");
    if (!bookingDataStr) {
      return null;
    }
    return JSON.parse(bookingDataStr);
  }

  // Generate reservation number
  function generateReservationNumber() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `TIR-${timestamp}-${random}`;
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

  // Generate PDF
  function generatePDF(bookingData, reservationNumber) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Colors
    const primaryColor = [34, 83, 24]; // var(--main-clr)
    const secondaryColor = [71, 111, 62]; // var(--secondary-clr)

    // Header
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, 210, 40, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text("TiranLik", 105, 20, { align: "center" });
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Reservation Confirmation", 105, 30, { align: "center" });

    // Reset text color
    doc.setTextColor(0, 0, 0);

    // Reservation Number
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Reservation Number:", 20, 55);
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.text(reservationNumber, 20, 65);

    // Pitch Information
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Pitch Information", 20, 80);
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Pitch Name: ${bookingData.pitchName}`, 20, 90);
    doc.text(`Location: ${bookingData.pitchLocation}`, 20, 98);
    doc.text(`Sport: ${bookingData.sport}`, 20, 106);

    // Reservation Details
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Reservation Details", 20, 125);
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    const endTime = calculateEndTime(bookingData.time, bookingData.duration);
    doc.text(`Date: ${formatDate(bookingData.date)}`, 20, 135);
    doc.text(`Time: ${bookingData.time} - ${endTime}`, 20, 143);
    doc.text(`Duration: ${bookingData.duration} hour(s)`, 20, 151);

    // Pricing
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Pricing", 20, 170);
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Price per hour: ${bookingData.pricePerHour} DH`, 20, 180);
    doc.text(`Duration: ${bookingData.duration} hour(s)`, 20, 188);

    // Total
    doc.setFillColor(...secondaryColor);
    doc.rect(20, 195, 170, 15, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(`Total Amount: ${bookingData.totalPrice} DH`, 20, 205);

    // Footer
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Thank you for using TiranLik!", 105, 250, { align: "center" });
    doc.text("For any inquiries, please contact us.", 105, 255, { align: "center" });
    doc.text(`Phone: ${bookingData.phone}`, 105, 260, { align: "center" });
    doc.text(`Open Hours: ${bookingData.openHours}`, 105, 265, { align: "center" });

    // Save PDF
    const fileName = `Reservation_${reservationNumber}.pdf`;
    doc.save(fileName);
  }

  // Render success page
  function renderSuccess() {
    const bookingData = getBookingData();

    if (!bookingData) {
      successContent.innerHTML = `
        <div class="no-booking">
          <h2>No Reservation Found</h2>
          <p>It seems you don't have a confirmed reservation. Please start a new booking.</p>
          <a href="pitch-list.html">Browse Pitches</a>
        </div>
      `;
      return;
    }

    const reservationNumber = generateReservationNumber();
    const endTime = calculateEndTime(bookingData.time, bookingData.duration);

    successContent.innerHTML = `
      <div class="success-card">
        <div class="success-header-section">
          <div class="success-icon">✓</div>
          <h1>Reservation Confirmed!</h1>
          <p>Your pitch reservation has been successfully confirmed</p>
        </div>
        
        <div class="success-body">
          <div class="reservation-number">
            <div class="label">Reservation Number</div>
            <div class="number">${reservationNumber}</div>
          </div>

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

          <div class="contact-info">
            <h4>Contact Information</h4>
            <p>📞 ${bookingData.phone}</p>
            <p>🕐 Open Hours: ${bookingData.openHours}</p>
          </div>

          <div class="success-actions">
            <button class="pdf-btn" id="pdfBtn">
              📄 Download PDF
            </button>
            <button class="home-btn" id="homeBtn">
              🏠 Back to Home
            </button>
          </div>
        </div>
      </div>
    `;

    // Event listeners
    const pdfBtn = document.getElementById("pdfBtn");
    const homeBtn = document.getElementById("homeBtn");

    pdfBtn.addEventListener("click", () => {
      generatePDF(bookingData, reservationNumber);
    });

    homeBtn.addEventListener("click", () => {
      window.location.href = "index.html";
    });
  }

  // Initialize
  renderSuccess();
});


// Booking Success Page Logic
document.addEventListener("DOMContentLoaded", () => {
  const bookingDetails = document.getElementById("bookingDetails");
  const downloadPdfBtn = document.getElementById("downloadPdfBtn");
  const printBtn = document.getElementById("printBtn");

  // Get booking data from sessionStorage
  function getBookingData() {
    const data = sessionStorage.getItem("bookingData");
    return data ? JSON.parse(data) : null;
  }

  // Generate booking reference number
  function generateReference() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `TL-${timestamp.toString().slice(-6)}${random.toString().padStart(3, "0")}`;
  }

  // Format date for display
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  // Format date and time for display
  function formatDateTime(dateString, timeString) {
    return `${formatDate(dateString)} at ${timeString}`;
  }

  // Render booking details
  function renderBookingDetails(booking) {
    if (!booking) {
      bookingDetails.innerHTML = `
        <div style="text-align: center; color: #666;">
          <p>No booking data found.</p>
          <a href="pitch-list.html" style="color: var(--main-clr); text-decoration: underline;">Browse Pitches</a>
        </div>
      `;
      downloadPdfBtn.disabled = true;
      printBtn.disabled = true;
      return;
    }

    const reference = generateReference();
    booking.reference = reference;
    sessionStorage.setItem("bookingData", JSON.stringify(booking));

    bookingDetails.innerHTML = `
      <div class="booking-reference">
        <div class="label">Booking Reference</div>
        <div class="value">${reference}</div>
      </div>

      <div class="pitch-info-box">
        <img src="${booking.pitchImage}" alt="${booking.pitchName}" />
        <div class="pitch-info-text">
          <h4>${booking.pitchName}</h4>
          <p>📍 ${booking.pitchLocation}</p>
          <p>⚽ ${booking.sport}</p>
        </div>
      </div>

      <div class="detail-section">
        <h3>Booking Details</h3>
        <div class="detail-grid">
          <div class="detail-item">
            <div class="label">Date</div>
            <div class="value">${formatDate(booking.date)}</div>
          </div>
          <div class="detail-item">
            <div class="label">Time</div>
            <div class="value">${booking.time}</div>
          </div>
          <div class="detail-item">
            <div class="label">Duration</div>
            <div class="value">${booking.duration} hour(s)</div>
          </div>
          <div class="detail-item">
            <div class="label">Contact</div>
            <div class="value">${booking.phone}</div>
          </div>
        </div>
      </div>

      <div class="total-section">
        <span class="label">Total Amount</span>
        <span class="value">${booking.totalPrice} DH</span>
      </div>
    `;
  }

  // Generate PDF
  function generatePDF() {
    const booking = getBookingData();
    if (!booking) return;

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Add logo text
    doc.setFontSize(24);
    doc.setTextColor(46, 125, 50);
    doc.text("TiranLik", 105, 20, { align: "center" });

    // Add title
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text("Booking Confirmation", 105, 35, { align: "center" });

    // Add reference number
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(`Reference: ${booking.reference}`, 105, 45, { align: "center" });

    // Add line separator
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 50, 190, 50);

    // Pitch information
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text("Pitch Information", 20, 60);

    doc.setFontSize(11);
    doc.setTextColor(60, 60, 60);
    doc.text(`Name: ${booking.pitchName}`, 20, 70);
    doc.text(`Location: ${booking.pitchLocation}`, 20, 77);
    doc.text(`Sport: ${booking.sport}`, 20, 84);

    // Booking details
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text("Booking Details", 20, 100);

    doc.setFontSize(11);
    doc.setTextColor(60, 60, 60);
    doc.text(`Date: ${formatDate(booking.date)}`, 20, 110);
    doc.text(`Time: ${booking.time}`, 20, 117);
    doc.text(`Duration: ${booking.duration} hour(s)`, 20, 124);
    doc.text(`Phone: ${booking.phone}`, 20, 131);

    // Payment information
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text("Payment Summary", 20, 147);

    doc.setFontSize(11);
    doc.setTextColor(60, 60, 60);
    doc.text(`Price per hour: ${booking.pricePerHour} DH`, 20, 157);
    doc.text(`Duration: ${booking.duration} hour(s)`, 20, 164);

    // Total with background
    doc.setFillColor(232, 245, 233);
    doc.rect(20, 172, 170, 12, "F");
    doc.setFontSize(13);
    doc.setTextColor(46, 125, 50);
    doc.text(`Total Amount: ${booking.totalPrice} DH`, 25, 180);

    // Footer
    doc.setFontSize(9);
    doc.setTextColor(150, 150, 150);
    doc.text("Thank you for choosing TiranLik!", 105, 270, { align: "center" });
    doc.text("For any inquiries, please contact the pitch directly.", 105, 276, { align: "center" });
    doc.text("Tiran lik. 9rib lik", 105, 285, { align: "center" });

    // Save PDF
    doc.save(`TiranLik-Booking-${booking.reference}.pdf`);
  }

  // Print receipt
  function printReceipt() {
    window.print();
  }

  // Event listeners
  downloadPdfBtn.addEventListener("click", generatePDF);
  printBtn.addEventListener("click", printReceipt);

  // Initialize
  const booking = getBookingData();
  renderBookingDetails(booking);

  // Redirect if no booking data
  if (!booking) {
    setTimeout(() => {
      window.location.href = "pitch-list.html";
    }, 3000);
  }
});
// JavaScript for booking confirmation page

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const bookingId = urlParams.get('id');
    
    if (bookingId) {
        loadBookingConfirmation(bookingId);
    } else {
        displayError('Aucune réservation trouvée.');
    }
});

// Load booking confirmation
function loadBookingConfirmation(bookingId) {
    const bookings = getBookings();
    const booking = bookings.find(b => b.id === bookingId);
    
    if (!booking) {
        displayError('Réservation non trouvée.');
        return;
    }
    
    const venue = getVenueById(booking.venueId);
    if (!venue) {
        displayError('Informations du terrain non disponibles.');
        return;
    }
    
    displayConfirmation(booking, venue);
}

// Display confirmation details
function displayConfirmation(booking, venue) {
    const confirmationContent = document.getElementById('confirmationContent');
    
    const bookingDate = new Date(booking.date);
    const formattedDate = bookingDate.toLocaleDateString('fr-FR', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    const endTime = calculateEndTime(booking.time, booking.duration);
    
    const confirmationHTML = `
        <div class="confirmation-icon">✓</div>
        <h1 class="confirmation-title">Réservation confirmée !</h1>
        <p style="color: #666; margin-bottom: 2rem;">Votre réservation a été enregistrée avec succès.</p>
        
        <div class="confirmation-details">
            <div class="confirmation-detail-row">
                <span class="confirmation-detail-label">Numéro de réservation:</span>
                <span class="confirmation-detail-value"><strong>#${booking.id.slice(-8)}</strong></span>
            </div>
            <div class="confirmation-detail-row">
                <span class="confirmation-detail-label">Terrain:</span>
                <span class="confirmation-detail-value">${venue.name}</span>
            </div>
            <div class="confirmation-detail-row">
                <span class="confirmation-detail-label">Adresse:</span>
                <span class="confirmation-detail-value">${venue.address}, ${venue.district}</span>
            </div>
            <div class="confirmation-detail-row">
                <span class="confirmation-detail-label">Date:</span>
                <span class="confirmation-detail-value">${formattedDate}</span>
            </div>
            <div class="confirmation-detail-row">
                <span class="confirmation-detail-label">Heure:</span>
                <span class="confirmation-detail-value">${booking.time} - ${endTime}</span>
            </div>
            <div class="confirmation-detail-row">
                <span class="confirmation-detail-label">Durée:</span>
                <span class="confirmation-detail-value">${booking.duration} heure(s)</span>
            </div>
            <div class="confirmation-detail-row">
                <span class="confirmation-detail-label">Client:</span>
                <span class="confirmation-detail-value">${booking.customer.name}</span>
            </div>
            <div class="confirmation-detail-row">
                <span class="confirmation-detail-label">Téléphone:</span>
                <span class="confirmation-detail-value">${booking.customer.phone}</span>
            </div>
            <div class="confirmation-detail-row">
                <span class="confirmation-detail-label">Prix total:</span>
                <span class="confirmation-detail-value"><strong>${booking.price} MAD</strong></span>
            </div>
            <div class="confirmation-detail-row">
                <span class="confirmation-detail-label">Statut:</span>
                <span class="confirmation-detail-value">
                    <span class="status-badge status-${booking.status}">${
                        booking.status === 'pending' ? 'En attente' : 
                        booking.status === 'confirmed' ? 'Confirmé' : 'Annulé'
                    }</span>
                </span>
            </div>
        </div>
        
        <div class="qr-placeholder">
            <p>Code QR</p>
            <p style="font-size: 0.8rem; margin-top: 0.5rem;">#${booking.id.slice(-8)}</p>
        </div>
        
        <div style="margin-top: 2rem;">
            <a href="index.html" class="btn-primary">Retour à l'accueil</a>
            <a href="owner-dashboard.html" class="btn-secondary" style="margin-left: 1rem;">Voir le tableau de bord</a>
        </div>
    `;
    
    confirmationContent.innerHTML = confirmationHTML;
}

// Calculate end time
function calculateEndTime(startTime, duration) {
    const [hours, minutes] = startTime.split(':').map(Number);
    const endHours = hours + duration;
    return `${endHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

// Display error message
function displayError(message) {
    const confirmationContent = document.getElementById('confirmationContent');
    confirmationContent.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
            <h2 style="color: #dc3545; margin-bottom: 1rem;">Erreur</h2>
            <p style="color: #666; margin-bottom: 2rem;">${message}</p>
            <a href="index.html" class="btn-primary">Retour à l'accueil</a>
        </div>
    `;
}



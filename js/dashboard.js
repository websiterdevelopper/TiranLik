// JavaScript for owner dashboard

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    loadStats();
    loadBookings();
    loadVenueSelector();
    setupEventListeners();
    renderCalendar();
});

// Load statistics
function loadStats() {
    const bookings = getBookings();
    const totalBookings = bookings.length;
    
    // Calculate revenue (only confirmed bookings)
    const confirmedBookings = bookings.filter(b => b.status === 'confirmed');
    const totalRevenue = confirmedBookings.reduce((sum, b) => sum + b.price, 0);
    
    // Calculate upcoming bookings
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const upcomingBookings = bookings.filter(b => {
        const bookingDate = new Date(b.date);
        bookingDate.setHours(0, 0, 0, 0);
        return bookingDate >= today && b.status !== 'cancelled';
    }).length;
    
    // Calculate occupancy rate (simplified)
    const occupancyRate = totalBookings > 0 ? 
        Math.round((confirmedBookings.length / totalBookings) * 100) : 0;
    
    document.getElementById('totalBookings').textContent = totalBookings;
    document.getElementById('totalRevenue').textContent = `${totalRevenue} MAD`;
    document.getElementById('upcomingBookings').textContent = upcomingBookings;
    document.getElementById('occupancyRate').textContent = `${occupancyRate}%`;
}

// Load bookings table
function loadBookings() {
    const bookings = getBookings();
    const statusFilter = document.getElementById('statusFilter').value;
    const dateFilter = document.getElementById('dateFilter').value;
    
    // Filter bookings
    let filteredBookings = bookings;
    
    if (statusFilter) {
        filteredBookings = filteredBookings.filter(b => b.status === statusFilter);
    }
    
    if (dateFilter) {
        filteredBookings = filteredBookings.filter(b => b.date === dateFilter);
    }
    
    // Sort by date (newest first)
    filteredBookings.sort((a, b) => {
        const dateA = new Date(a.date + ' ' + a.time);
        const dateB = new Date(b.date + ' ' + b.time);
        return dateB - dateA;
    });
    
    displayBookings(filteredBookings);
}

// Display bookings in table
function displayBookings(bookings) {
    const tableBody = document.getElementById('bookingsTableBody');
    
    if (bookings.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="9" style="text-align: center; padding: 2rem;">Aucune réservation trouvée.</td></tr>';
        return;
    }
    
    tableBody.innerHTML = bookings.map(booking => {
        const venue = getVenueById(booking.venueId);
        const venueName = venue ? venue.name : 'Terrain inconnu';
        const bookingDate = new Date(booking.date);
        const formattedDate = bookingDate.toLocaleDateString('fr-FR');
        const endTime = calculateEndTime(booking.time, booking.duration);
        
        const statusClass = `status-${booking.status}`;
        const statusText = {
            'pending': 'En attente',
            'confirmed': 'Confirmé',
            'cancelled': 'Annulé'
        }[booking.status] || booking.status;
        
        const actionButtons = booking.status === 'pending' ? `
            <button class="action-btn btn-confirm" onclick="confirmBooking('${booking.id}')">Confirmer</button>
            <button class="action-btn btn-cancel" onclick="cancelBooking('${booking.id}')">Annuler</button>
        ` : booking.status === 'confirmed' ? `
            <button class="action-btn btn-cancel" onclick="cancelBooking('${booking.id}')">Annuler</button>
        ` : '-';
        
        return `
            <tr>
                <td>#${booking.id.slice(-8)}</td>
                <td>${venueName}</td>
                <td>${booking.customer.name}</td>
                <td>${formattedDate}</td>
                <td>${booking.time} - ${endTime}</td>
                <td>${booking.duration}h</td>
                <td>${booking.price} MAD</td>
                <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                <td>${actionButtons}</td>
            </tr>
        `;
    }).join('');
}

// Confirm booking (global function for onclick handlers)
window.confirmBooking = function(bookingId) {
    const bookings = getBookings();
    const bookingIndex = bookings.findIndex(b => b.id === bookingId);
    
    if (bookingIndex !== -1) {
        bookings[bookingIndex].status = 'confirmed';
        localStorage.setItem('bookings', JSON.stringify(bookings));
        loadBookings();
        loadStats();
        renderCalendar();
    }
};

// Cancel booking (global function for onclick handlers)
window.cancelBooking = function(bookingId) {
    if (confirm('Êtes-vous sûr de vouloir annuler cette réservation ?')) {
        const bookings = getBookings();
        const bookingIndex = bookings.findIndex(b => b.id === bookingId);
        
        if (bookingIndex !== -1) {
            bookings[bookingIndex].status = 'cancelled';
            localStorage.setItem('bookings', JSON.stringify(bookings));
            loadBookings();
            loadStats();
            renderCalendar();
        }
    }
};

// Setup event listeners
function setupEventListeners() {
    document.getElementById('statusFilter').addEventListener('change', loadBookings);
    document.getElementById('dateFilter').addEventListener('change', loadBookings);
    
    document.getElementById('prevMonth').addEventListener('click', function() {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar();
    });
    
    document.getElementById('nextMonth').addEventListener('click', function() {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar();
    });
    
    document.getElementById('venueSelector').addEventListener('change', function() {
        const venueId = this.value;
        if (venueId) {
            loadVenueSettings(venueId);
        } else {
            document.getElementById('venueSettingsForm').style.display = 'none';
        }
    });
    
    document.getElementById('saveSettings').addEventListener('click', saveVenueSettings);
}

// Load venue selector
function loadVenueSelector() {
    const selector = document.getElementById('venueSelector');
    selector.innerHTML = '<option value="">Choisir un terrain...</option>' +
        venues.map(venue => `<option value="${venue.id}">${venue.name}</option>`).join('');
}

// Load venue settings
function loadVenueSettings(venueId) {
    const venue = getVenueById(venueId);
    if (!venue) return;
    
    const settings = JSON.parse(localStorage.getItem('ownerSettings') || '{}');
    const venueSettings = settings[venueId] || {};
    
    document.getElementById('venueName').value = venueSettings.name || venue.name;
    document.getElementById('venuePrice').value = venueSettings.price || venue.pricePerHour;
    document.getElementById('venueOpenTime').value = venueSettings.openTime || venue.availability.hours.start;
    document.getElementById('venueCloseTime').value = venueSettings.closeTime || venue.availability.hours.end;
    
    document.getElementById('venueSettingsForm').style.display = 'block';
}

// Save venue settings
function saveVenueSettings() {
    const venueId = document.getElementById('venueSelector').value;
    if (!venueId) return;
    
    const settings = JSON.parse(localStorage.getItem('ownerSettings') || '{}');
    settings[venueId] = {
        name: document.getElementById('venueName').value,
        price: parseInt(document.getElementById('venuePrice').value),
        openTime: document.getElementById('venueOpenTime').value,
        closeTime: document.getElementById('venueCloseTime').value
    };
    
    localStorage.setItem('ownerSettings', JSON.stringify(settings));
    alert('Paramètres enregistrés avec succès !');
}

// Render calendar
function renderCalendar() {
    const calendarView = document.getElementById('calendarView');
    const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
                       'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    
    document.getElementById('currentMonth').textContent = `${monthNames[currentMonth]} ${currentYear}`;
    
    // Get first day of month and number of days
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    // Get bookings for this month
    const bookings = getBookings();
    const monthBookings = bookings.filter(b => {
        const bookingDate = new Date(b.date);
        return bookingDate.getMonth() === currentMonth && 
               bookingDate.getFullYear() === currentYear &&
               b.status !== 'cancelled';
    });
    
    // Create calendar grid
    calendarView.innerHTML = '';
    
    // Day headers
    const dayHeaders = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
    dayHeaders.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'calendar-day calendar-day-header';
        dayHeader.textContent = day;
        calendarView.appendChild(dayHeader);
    });
    
    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day';
        calendarView.appendChild(emptyDay);
    }
    
    // Days of month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        const dayDate = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        
        const dayBookings = monthBookings.filter(b => b.date === dayDate);
        
        if (dayBookings.length > 0) {
            dayElement.className = 'calendar-day has-booking';
            dayElement.innerHTML = `
                <div class="calendar-day-number">${day}</div>
                <div class="calendar-day-bookings">${dayBookings.length} réservation(s)</div>
            `;
        } else {
            dayElement.className = 'calendar-day';
            dayElement.innerHTML = `<div class="calendar-day-number">${day}</div>`;
        }
        
        calendarView.appendChild(dayElement);
    }
}

// Calculate end time (helper function)
function calculateEndTime(startTime, duration) {
    const [hours, minutes] = startTime.split(':').map(Number);
    const endHours = hours + duration;
    return `${endHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}


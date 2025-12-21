// Owner Space - Pitch Management
document.addEventListener("DOMContentLoaded", () => {
  const pitchForm = document.getElementById("pitchForm");
  const pitchesGrid = document.getElementById("pitchesGrid");
  const noPitches = document.getElementById("noPitches");
  const pitchesCount = document.getElementById("pitchesCount");
  const formTitle = document.getElementById("formTitle");
  const submitBtn = document.getElementById("submitBtn");
  const cancelEditBtn = document.getElementById("cancelEdit");
  let editingPitchId = null;

  // Get all pitches from localStorage
  function getPitches() {
    const pitches = localStorage.getItem("ownerPitches");
    return pitches ? JSON.parse(pitches) : [];
  }

  // Save pitches to localStorage
  function savePitches(pitches) {
    localStorage.setItem("ownerPitches", JSON.stringify(pitches));
  }

  // Generate unique ID
  function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Update pitches count
  function updatePitchesCount() {
    const pitches = getPitches();
    pitchesCount.textContent = `${pitches.length} pitch${pitches.length !== 1 ? "es" : ""}`;
  }

  // Reset form
  function resetForm() {
    pitchForm.reset();
    editingPitchId = null;
    formTitle.textContent = "Add New Pitch";
    submitBtn.textContent = "Add Pitch";
    cancelEditBtn.style.display = "none";
  }

  // Create pitch card HTML
  function createPitchCard(pitch) {
    const amenities = pitch.amenities
      ? pitch.amenities.split(",").map((a) => a.trim())
      : [];

    const amenitiesHtml = amenities
      .map((amenity) => `<span class="amenity-tag">${amenity}</span>`)
      .join("");

    return `
      <div class="pitch-card-owner" data-pitch-id="${pitch.id}">
        <div class="pitch-card-header">
          <h3 class="pitch-card-title">${pitch.name}</h3>
          <div class="pitch-card-actions">
            <button class="btn-edit" onclick="editPitch('${pitch.id}')">Edit</button>
            <button class="btn-delete" onclick="deletePitch('${pitch.id}')">Delete</button>
          </div>
        </div>
        <div class="pitch-card-info">
          <div class="pitch-info-item">
            <strong>Zone:</strong> ${pitch.zone}
          </div>
          <div class="pitch-info-item">
            <strong>Sport:</strong> ${pitch.sport}
          </div>
          <div class="pitch-info-item">
            <strong>Price:</strong> ${pitch.price} DH/hour
          </div>
          <div class="pitch-info-item">
            <strong>Phone:</strong> ${pitch.phone}
          </div>
        </div>
        <p class="pitch-card-description">${pitch.description}</p>
        ${amenities.length > 0 ? `<div class="pitch-card-amenities">${amenitiesHtml}</div>` : ""}
      </div>
    `;
  }

  // Render all pitches
  function renderPitches() {
    const pitches = getPitches();
    pitchesGrid.innerHTML = "";

    if (pitches.length === 0) {
      noPitches.style.display = "block";
      pitchesGrid.style.display = "none";
    } else {
      noPitches.style.display = "none";
      pitchesGrid.style.display = "flex";
      pitches.forEach((pitch) => {
        pitchesGrid.innerHTML += createPitchCard(pitch);
      });
    }

    updatePitchesCount();
  }

  // Edit pitch
  window.editPitch = function (pitchId) {
    const pitches = getPitches();
    const pitch = pitches.find((p) => p.id === pitchId);

    if (!pitch) return;

    // Fill form with pitch data
    document.getElementById("pitchName").value = pitch.name || "";
    document.getElementById("pitchZone").value = pitch.zone || "";
    document.getElementById("pitchSport").value = pitch.sport || "";
    document.getElementById("pitchPrice").value = pitch.price || "";
    document.getElementById("pitchDescription").value = pitch.description || "";
    document.getElementById("pitchCapacity").value = pitch.capacity || "";
    document.getElementById("pitchOpenHours").value = pitch.openHours || "";
    document.getElementById("pitchPhone").value = pitch.phone || "";
    document.getElementById("pitchAmenities").value = pitch.amenities || "";
    document.getElementById("pitchImage").value = pitch.image || "";

    // Update form state
    editingPitchId = pitchId;
    formTitle.textContent = "Edit Pitch";
    submitBtn.textContent = "Update Pitch";
    cancelEditBtn.style.display = "block";

    // Scroll to form
    document.querySelector(".pitch-form-section").scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // Delete pitch
  window.deletePitch = function (pitchId) {
    if (!confirm("Are you sure you want to delete this pitch?")) {
      return;
    }

    const pitches = getPitches();
    const filteredPitches = pitches.filter((p) => p.id !== pitchId);
    savePitches(filteredPitches);
    renderPitches();

    // If we were editing this pitch, reset form
    if (editingPitchId === pitchId) {
      resetForm();
    }
  };

  // Handle form submission
  pitchForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(pitchForm);
    const pitchData = {
      id: editingPitchId || generateId(),
      name: formData.get("pitchName"),
      zone: formData.get("pitchZone"),
      city: "Casablanca", // All pitches are in Casablanca
      sport: formData.get("pitchSport"),
      price: parseInt(formData.get("pitchPrice")),
      description: formData.get("pitchDescription"),
      capacity: formData.get("pitchCapacity") || "Not specified",
      openHours: formData.get("pitchOpenHours") || "08:00 - 23:00",
      phone: formData.get("pitchPhone"),
      amenities: formData.get("pitchAmenities") || "",
      image: formData.get("pitchImage") || "images/pitch placeholder.jpg",
    };

    const pitches = getPitches();

    if (editingPitchId) {
      // Update existing pitch
      const index = pitches.findIndex((p) => p.id === editingPitchId);
      if (index !== -1) {
        pitches[index] = pitchData;
      }
    } else {
      // Add new pitch
      pitches.push(pitchData);
    }

    savePitches(pitches);
    renderPitches();
    resetForm();

    // Show success message
    alert(
      editingPitchId
        ? "Pitch updated successfully!"
        : "Pitch added successfully!"
    );
  });

  // Cancel edit
  cancelEditBtn.addEventListener("click", () => {
    resetForm();
  });

  // Initialize
  renderPitches();
});


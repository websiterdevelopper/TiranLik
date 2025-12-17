// Hero title switching animation
const heroTitles = document.querySelectorAll(".hero-main h2");

function switchHeroTitle() {
  // Find the currently shown and hidden titles
  const shownTitle = document.querySelector(".hero-main h2.shown");
  const hiddenTitle = document.querySelector(".hero-main h2.hidden");

  if (!shownTitle || !hiddenTitle) return;

  // Remove any existing animation classes
  shownTitle.classList.remove("slide-down");
  hiddenTitle.classList.remove("slide-in");

  // Trigger slide-down animation for the shown title
  shownTitle.classList.add("slide-down");

  // Simultaneously trigger slide-in animation for the hidden title
  hiddenTitle.classList.add("slide-in");

  // After animation completes, switch the classes
  setTimeout(() => {
    shownTitle.classList.remove("shown", "slide-down");
    hiddenTitle.classList.remove("hidden", "slide-in");

    shownTitle.classList.add("hidden");
    hiddenTitle.classList.add("shown");
  }, 300); // Match the animation duration (0.3s = 300ms)
}

// Switch titles every 3 seconds
setInterval(switchHeroTitle, 3000);

// Set data-sport attribute for card overlay text
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".sports-cards .card");
  cards.forEach((card) => {
    const sportName = card.querySelector(".card-title h4");
    if (sportName) {
      card.setAttribute("data-sport", sportName.textContent.trim());
    }
  });

  // Search button redirect with filter params
  const searchButton = document.querySelector("#filetPage");
  if (searchButton) {
    searchButton.addEventListener("click", () => {
      const zone = document.querySelector("#searchInput")?.value || "";
      const sport = document.querySelector("#sportFilter")?.value || "";
      const date = document.querySelector("#my-date-input")?.value || "";

      const params = new URLSearchParams();
      if (zone) params.set("zone", zone);
      if (sport) params.set("sport", sport);
      if (date) params.set("date", date);

      window.location.href = `pitch-list.html?${params.toString()}`;
    });
  }
});

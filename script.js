/* ===============================
   PAGE LOAD TRANSITION
=============================== */

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) {
    loader.style.opacity = "0";
    setTimeout(() => loader.style.display = "none", 400);
  }
});


/* ===============================
   THEME TOGGLE (LIGHT / DARK)
=============================== */

const themeToggle = document.getElementById("themeToggle");

// Load saved theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  document.documentElement.setAttribute("data-theme", savedTheme);
}

// Update toggle text/icon
function updateToggleLabel() {
  const current = document.documentElement.getAttribute("data-theme");
  if (current === "dark") {
    themeToggle.innerHTML = "☀️ Light Mode";
  } else {
    themeToggle.innerHTML = "🌙 Dark Mode";
  }
}

updateToggleLabel();

// Toggle theme
themeToggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  const newTheme = current === "dark" ? "light" : "dark";

  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);

  updateToggleLabel();
});


/* ===============================
   DROPDOWN MENU ("More")
=============================== */

const moreButton = document.querySelector(".nav-more-button");
const moreMenu = document.querySelector(".nav-more-menu");

if (moreButton && moreMenu) {
  moreButton.addEventListener("click", () => {
    const isOpen = moreMenu.style.display === "block";
    moreMenu.style.display = isOpen ? "none" : "block";
  });

  // Close when clicking outside
  document.addEventListener("click", (event) => {
    if (!moreButton.contains(event.target) && !moreMenu.contains(event.target)) {
      moreMenu.style.display = "none";
    }
  });
}


/* ===============================
   SOS BUTTON SIMULATION
=============================== */

const sosButton = document.getElementById("sosButton");
const sosOutput = document.getElementById("sosOutput");
const fakeLocation = document.getElementById("fakeLocation");

if (sosButton) {
  sosButton.addEventListener("click", () => {
    const lat = (39.9 + Math.random() * 0.2).toFixed(5);
    const lon = (-82.9 + Math.random() * 0.2).toFixed(5);

    fakeLocation.innerHTML = `
      <strong>Location Sent (Simulation):</strong><br>
      Latitude: ${lat}<br>
      Longitude: ${lon}
    `;

    updateMap(lat, lon);

    sosOutput.style.display = "block";

    alert("🚨 SOS Sent (Simulation)\nYour location has been shared with rescuers in this demo.");
  });
}


/* ===============================
   SMOOTH SCROLL FOR INTERNAL LINKS
=============================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

function updateMap(lat, lon) {
  const mapDiv = document.getElementById("map");
  if (!mapDiv) return;

  mapDiv.innerHTML = `
    <iframe
      width="100%"
      height="250"
      style="border:0; border-radius: 12px;"
      loading="lazy"
      allowfullscreen
      referrerpolicy="no-referrer-when-downgrade"
      src="https://www.google.com/maps?q=${lat},${lon}&z=15&output=embed">
    </iframe>
  `;
}




function toggleDropdown() {
  const dropdownMenu = document.getElementById('dropdownMenu');
  dropdownMenu.style.display = (dropdownMenu.style.display === 'block') ? 'none' : 'block';
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.nav-more-button')) {
    const dropdowns = document.getElementsByClassName('nav-more-menu');
    for (let i = 0; i < dropdowns.length; i++) {
      const openDropdown = dropdowns[i];
      if (openDropdown.style.display === 'block') {
        openDropdown.style.display = 'none';
      }
    }
  }
}
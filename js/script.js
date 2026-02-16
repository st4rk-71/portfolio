
const greeting = document.getElementById("greeting");
const now = new Date();
const hour = now.getHours();

if (greeting) {
  if (hour < 12) greeting.textContent = "Good Morning!";
  else if (hour < 18) greeting.textContent = "Good Afternoon!";
  else greeting.textContent = "Good Evening!";
}


const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-theme");
  if (themeToggle) themeToggle.textContent = "☀️";
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-theme");

    if (body.classList.contains("dark-theme")) {
      themeToggle.textContent = "☀️";
      localStorage.setItem("theme", "dark");
    } else {
      themeToggle.textContent = "🌙";
      localStorage.setItem("theme", "light");
    }
  });
}


const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

let savedFilter = localStorage.getItem("selectedFilter") || "all";
applyFilter(savedFilter);

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.getAttribute("data-filter");
    applyFilter(category);
    localStorage.setItem("selectedFilter", category);
  });
});

function applyFilter(category) {
  projectCards.forEach((card) => {
    const cardCategory = card.getAttribute("data-category");
    card.style.display =
      category === "all" || category === cardCategory ? "block" : "none";
    card.classList.add("fade");
  });
}


const sortSelect = document.getElementById("sort-projects");
const projectsGrid = document.querySelector(".projects-grid");

if (sortSelect && projectsGrid) {
  const savedSort = localStorage.getItem("projectSort") || "az";
  sortSelect.value = savedSort;
  applySort(savedSort);

  sortSelect.addEventListener("change", () => {
    const mode = sortSelect.value;
    localStorage.setItem("projectSort", mode);
    applySort(mode);
  });
}

function applySort(mode) {
  if (!projectsGrid) return;
  const cards = Array.from(projectsGrid.querySelectorAll(".project-card"));

  cards.sort((a, b) => {
    const ta = a.querySelector("h3")?.textContent?.trim().toLowerCase() || "";
    const tb = b.querySelector("h3")?.textContent?.trim().toLowerCase() || "";
    return mode === "az" ? ta.localeCompare(tb) : tb.localeCompare(ta);
  });

  cards.forEach((card) => projectsGrid.appendChild(card));
}

// ==========================
// GitHub API – Auto Fetch
// ==========================
const GITHUB_USERNAME = "st4rk-71";
const ghStatus = document.getElementById("github-status");
const ghList = document.getElementById("repo-list");
const ghRetry = document.getElementById("retry-fetch");

async function loadRepos() {
  if (!ghStatus || !ghList || !ghRetry) return;

  ghStatus.textContent = "Loading repositories...";
  ghRetry.hidden = true;
  ghList.innerHTML = "";

  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`
    );

    if (!response.ok) throw new Error("GitHub API error");

    const repos = await response.json();

    if (!repos || repos.length === 0) {
      ghStatus.textContent = "No public repositories found.";
      return;
    }

    repos.forEach((repo) => {
      const li = document.createElement("li");
      li.className = "repo-item fade";
      li.innerHTML = `
        <a href="${repo.html_url}" target="_blank" rel="noopener">${repo.name}</a>
        <div class="repo-meta">⭐ ${repo.stargazers_count}</div>
        <div class="repo-meta">Updated: ${new Date(repo.updated_at).toLocaleDateString()}</div>
        <p>${repo.description || "No description"}</p>
      `;
      ghList.appendChild(li);
    });

    ghStatus.textContent = "";
  } catch (err) {
    ghStatus.textContent = "Failed to load repositories.";
    ghRetry.hidden = false;
  }
}

if (ghRetry) ghRetry.addEventListener("click", loadRepos);
loadRepos();


const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    formStatus.textContent = "Sending...";

    try {
      const formData = new FormData(contactForm);
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        formStatus.textContent = "✅ Message sent! I’ll reply soon.";
        contactForm.reset();
      } else {
        formStatus.textContent = "❌ Something went wrong. Please try again.";
      }
    } catch {
      formStatus.textContent = "❌ Network error. Please try again.";
    }
  });
}

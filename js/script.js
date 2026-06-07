// ── Greeting ──────────────────────────
const greetingEl = document.getElementById('greeting');
if (greetingEl) {
  const h = new Date().getHours();
  if (h < 12)       greetingEl.textContent = 'Good morning 👋';
  else if (h < 18)  greetingEl.textContent = 'Good afternoon 👋';
  else              greetingEl.textContent = 'Good evening 👋';
}
 
// ── Theme ─────────────────────────────
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
 
const applyTheme = (dark) => {
  body.classList.toggle('dark-theme', dark);
};
 
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  applyTheme(savedTheme === 'dark');
} else {
  // Respect OS preference
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(prefersDark);
}
 
themeToggle?.addEventListener('click', () => {
  const isDark = body.classList.toggle('dark-theme');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});
 
// ── Hamburger / Mobile Menu ────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
 
hamburger?.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', mobileMenu.classList.contains('open'));
});
 
document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
  });
});
 
// Close mobile menu on outside click
document.addEventListener('click', (e) => {
  if (mobileMenu.classList.contains('open') &&
      !mobileMenu.contains(e.target) &&
      !hamburger.contains(e.target)) {
    mobileMenu.classList.remove('open');
  }
});
 
// ── Project Filter ─────────────────────
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
 
const savedFilter = localStorage.getItem('selectedFilter') || 'all';
applyFilter(savedFilter);
filterBtns.forEach(btn => {
  if (btn.dataset.filter === savedFilter) btn.classList.add('active');
});
 
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.filter;
    applyFilter(cat);
    localStorage.setItem('selectedFilter', cat);
  });
});
 
function applyFilter(category) {
  projectCards.forEach(card => {
    const show = category === 'all' || card.dataset.category === category;
    card.style.display = show ? '' : 'none';
  });
}
 
// ── Project Sort ───────────────────────
const sortSelect = document.getElementById('sort-projects');
const projectsGrid = document.getElementById('projects-grid');
 
if (sortSelect && projectsGrid) {
  const savedSort = localStorage.getItem('projectSort') || 'az';
  sortSelect.value = savedSort;
  applySort(savedSort);
 
  sortSelect.addEventListener('change', () => {
    const mode = sortSelect.value;
    localStorage.setItem('projectSort', mode);
    applySort(mode);
  });
}
 
function applySort(mode) {
  if (!projectsGrid) return;
  const cards = Array.from(projectsGrid.querySelectorAll('.project-card'));
  cards.sort((a, b) => {
    const ta = a.querySelector('h3')?.textContent?.trim().toLowerCase() || '';
    const tb = b.querySelector('h3')?.textContent?.trim().toLowerCase() || '';
    return mode === 'az' ? ta.localeCompare(tb) : tb.localeCompare(ta);
  });
  cards.forEach(card => projectsGrid.appendChild(card));
}
 
// ── Contact Form ───────────────────────
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
 
contactForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.textContent = 'Sending…';
  formStatus.textContent = '';
 
  try {
    const res = await fetch(contactForm.action, {
      method: 'POST',
      body: new FormData(contactForm),
      headers: { Accept: 'application/json' },
    });
 
    if (res.ok) {
      formStatus.style.color = 'var(--c-available)';
      formStatus.textContent = '✓ Message sent! I\'ll get back to you soon.';
      contactForm.reset();
    } else {
      throw new Error('Server error');
    }
  } catch {
    formStatus.style.color = '#ef4444';
    formStatus.textContent = '✕ Something went wrong. Please try again or email me directly.';
  } finally {
    btn.disabled = false;
    btn.textContent = 'Send Message';
  }
});
 
// ── Scroll-triggered fade-in (IntersectionObserver) ─────
const observeEls = document.querySelectorAll('.skills-grid, .project-card, .contact-inner, .github-card');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
 
observeEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.55s cubic-bezier(0.22,1,0.36,1), transform 0.55s cubic-bezier(0.22,1,0.36,1)';
  observer.observe(el);
});
 
// ── Highlight active nav link on scroll ───────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
 
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${entry.target.id}`) {
          link.style.color = 'var(--c-accent)';
        }
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
 
sections.forEach(s => sectionObserver.observe(s));
 
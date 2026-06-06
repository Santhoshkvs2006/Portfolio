/* ============================================================
   SANTHOSH K – PORTFOLIO  |  script.js
   ============================================================ */

// ---- Navbar scroll effect ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  updateActiveNav();
  toggleBackToTop();
  animateOnScroll();
  animateSkillBars();
  animateCounters();
}, { passive: true });

// ---- Hamburger menu ----
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ---- Typed text effect ----
const phrases = [
  'Computer Science Student',
  'Aspiring Software Developer',
  'Web Developer',
  'AI Enthusiast',
  'Problem Solver',
];
let phraseIndex = 0, charIndex = 0, isDeleting = false;
const typedEl = document.getElementById('typedText');

function type() {
  const current = phrases[phraseIndex];
  typedEl.textContent = isDeleting
    ? current.substring(0, charIndex--)
    : current.substring(0, charIndex++);

  let delay = isDeleting ? 55 : 95;
  if (!isDeleting && charIndex === current.length + 1) { delay = 1800; isDeleting = true; }
  else if (isDeleting && charIndex === 0) { isDeleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; delay = 400; }
  setTimeout(type, delay);
}
type();

// ---- AOS (Animate On Scroll) ----
function animateOnScroll() {
  document.querySelectorAll('[data-aos]').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) el.classList.add('aos-animate');
  });
}
// Run on load
animateOnScroll();

// ---- Skill bars ----
let skillsAnimated = false;
function animateSkillBars() {
  if (skillsAnimated) return;
  const skillsSection = document.getElementById('skills');
  if (!skillsSection) return;
  const rect = skillsSection.getBoundingClientRect();
  if (rect.top < window.innerHeight - 100) {
    skillsAnimated = true;
    document.querySelectorAll('.skill-bar-fill').forEach(bar => {
      const w = bar.getAttribute('data-width');
      bar.style.width = w + '%';
    });
  }
}

// ---- Stat counters ----
let countersStarted = false;
function animateCounters() {
  if (countersStarted) return;
  const aboutSection = document.getElementById('about');
  if (!aboutSection) return;
  const rect = aboutSection.getBoundingClientRect();
  if (rect.top < window.innerHeight - 100) {
    countersStarted = true;
    document.querySelectorAll('.stat-num').forEach(el => {
      const target = parseInt(el.getAttribute('data-count'), 10);
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 40));
      const interval = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = current;
        if (current >= target) clearInterval(interval);
      }, 40);
    });
  }
}

// ---- Active nav link on scroll ----
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}

// ---- Back to top ----
const backToTopBtn = document.getElementById('backToTop');
function toggleBackToTop() {
  backToTopBtn.classList.toggle('visible', window.scrollY > 400);
}
backToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ---- Contact form ----
const contactForm = document.getElementById('contactForm');
const formNote    = document.getElementById('formNote');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const name    = document.getElementById('name').value.trim();
    const email   = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      formNote.textContent = '⚠ Please fill in all required fields.';
      formNote.style.color = '#ff6b6b';
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      formNote.textContent = '⚠ Please enter a valid email address.';
      formNote.style.color = '#ff6b6b';
      return;
    }

    // Simulate sending (in production, connect to EmailJS, Formspree, etc.)
    const submitBtn = contactForm.querySelector('[type="submit"]');
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending…';
    submitBtn.disabled = true;
    setTimeout(() => {
      submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Message Sent!';
      formNote.textContent = '✓ Thank you! I\'ll get back to you soon.';
      formNote.style.color = 'var(--teal)';
      contactForm.reset();
      setTimeout(() => {
        submitBtn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>';
        submitBtn.disabled = false;
        formNote.textContent = '';
      }, 4000);
    }, 1400);
  });
}

// ---- Smooth scroll for anchor links ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 72;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// Initial run
animateSkillBars();
animateCounters();
updateActiveNav();
toggleBackToTop();

// ---- Certificate Modal ----
const certModal = document.getElementById('certModal');
document.querySelectorAll('.cert-preview').forEach(preview => {
  preview.addEventListener('click', () => {
    certModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});
function closeCertModal() {
  certModal.classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeCertModal();
});

// ---- Open cert modal (called from onclick) ----
function openCertModal() {
  const certModal = document.getElementById('certModal');
  if (certModal) {
    certModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

// ---- Universal Certificate Modal ----
function openModal(imgSrc, title) {
  const modal = document.getElementById('certModal');
  const img   = document.getElementById('modalCertImg');
  const ttl   = document.getElementById('modalCertTitle');
  if (!modal) return;
  img.src = imgSrc;
  if (ttl) ttl.textContent = title || '';
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

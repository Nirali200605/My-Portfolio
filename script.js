/* ============================================
   Nirali Chipad — Portfolio Scripts
   ============================================ */

emailjs.init("HATmYehTpisxX_F2L");

document.addEventListener('DOMContentLoaded', () => {
  initTypingAnimation();
  initScrollProgress();
  initStickyHeader();
  initMobileNav();
  initSmoothScroll();
  initActiveNav();
  initScrollReveal();
  initCounters();
  initBackToTop();
  initContactForm();
});

/* Typing Animation */
function initTypingAnimation() {
  const el = document.getElementById('typingText');
  if (!el) return;

  const phrases = [
    'Building scalable web applications and solving algorithmic problems.',
    'Passionate about full-stack development & DSA.',
    'Open to SDE internships & opportunities.'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 50;

  function type() {
    const current = phrases[phraseIndex];

    if (isDeleting) {
      el.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 30;
    } else {
      el.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 50;
    }

    if (!isDeleting && charIndex === current.length) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

/* Scroll Progress Indicator */
function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = progress + '%';
  }, { passive: true });
}

/* Sticky Header */
function initStickyHeader() {
  const header = document.getElementById('header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });
}

/* Mobile Navigation */
function initMobileNav() {
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    toggle.classList.toggle('active', isOpen);
    toggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  menu.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !toggle.contains(e.target) && menu.classList.contains('open')) {
      menu.classList.remove('open');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}

/* Smooth Scroll */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

/* Active Navigation Highlighting */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + id);
          });
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
  );

  sections.forEach(section => observer.observe(section));
}

/* Scroll Reveal */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  reveals.forEach(el => observer.observe(el));
}

/* Animated Counters */
function initCounters() {
  const counters = document.querySelectorAll('[data-count], .counter');
  if (!counters.length) return;

  const animateCounter = (el) => {
    const target = parseFloat(el.dataset.count || el.dataset.target);
    const decimal = el.dataset.decimal || '';
    const duration = 2000;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);

      if (decimal) {
        el.textContent = current + decimal;
      } else {
        el.textContent = current;
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target + decimal;
      }
    }

    requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(counter => observer.observe(counter));
}

/* Back to Top */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* Contact Form */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const fields = {
    name: {
      el: document.getElementById('name'),
      error: document.getElementById('nameError'),
      validate: (v) => v.trim().length >= 2 ? '' : 'Please enter your name (min 2 characters).'
    },
    email: {
      el: document.getElementById('email'),
      error: document.getElementById('emailError'),
      validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Please enter a valid email address.'
    },
    message: {
      el: document.getElementById('message'),
      error: document.getElementById('messageError'),
      validate: (v) => v.trim().length >= 10 ? '' : 'Message must be at least 10 characters.'
    }
  };

  Object.values(fields).forEach(({ el, error, validate }) => {
    el.addEventListener('input', () => {
      error.textContent = validate(el.value);
    });

    el.addEventListener('blur', () => {
      error.textContent = validate(el.value);
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    Object.values(fields).forEach(({ el, error, validate }) => {
      const msg = validate(el.value);
      error.textContent = msg;
      if (msg) isValid = false;
    });

    if (!isValid) return;

    const btn = form.querySelector('button[type="submit"]');
    const btnText = btn.querySelector('.btn__text');
    const btnLoader = btn.querySelector('.btn__loader');
    const success = document.getElementById('formSuccess');

    btnText.hidden = true;
    btnLoader.hidden = false;
    btn.disabled = true;

    emailjs.send(
  "service_a6xuqnf",
  "template_gq95q6u",
  {
    from_name: document.getElementById("name").value,
    from_email: document.getElementById("email").value,
    message: document.getElementById("message").value,
  }
)
.then(() => {
  btnText.hidden = false;
  btnLoader.hidden = true;
  btn.disabled = false;

  success.hidden = false;
  form.reset();

  setTimeout(() => {
    success.hidden = true;
  }, 5000);
})
.catch((error) => {
  btnText.hidden = false;
  btnLoader.hidden = true;
  btn.disabled = false;

  alert("Failed to send message.");
  console.error(error);
});

    // setTimeout(() => {
    //   btnText.hidden = false;
    //   btnLoader.hidden = true;
    //   btn.disabled = false;
    //   success.hidden = false;
    //   form.reset();

    //   setTimeout(() => {
    //     success.hidden = true;
    //   }, 5000);
    // }, 1500);
  });
}

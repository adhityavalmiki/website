async function loadPartial(url, elementId) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to load ${url}`);
    const html = await response.text();
    document.getElementById(elementId).innerHTML = html;
  } catch (error) {
    console.error('Error loading component:', error);
  }
}

async function initLayout() {
  await Promise.all([
    loadPartial('pages/about.html', 'about-slot'),
    loadPartial('pages/projects.html', 'projects-slot'),
    loadPartial('pages/project-detail.html', 'project-detail-slot'),
    loadPartial('pages/contact.html', 'contact-slot')
  ]);

  if (typeof initApp === 'function') {
    initApp();
  }
}

window.addEventListener('DOMContentLoaded', initLayout);

function triggerReveals() {
  const revs = document.querySelectorAll('#page-' + currentPage + ' .reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        e.target.style.transitionDelay = (i % 5 * 0.09) + 's';
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });
  revs.forEach(r => { r.classList.remove('visible'); observer.observe(r); });
}

function initApp() {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-home').classList.add('active');
  
  const homeNavLink = document.querySelector('[data-page="home"]');
  if (homeNavLink) homeNavLink.classList.add('active');
  
  triggerReveals();

  const navEl = document.getElementById('navbar');
  if (navEl) {
    window.addEventListener('scroll', () => {
      navEl.classList.toggle('scrolled', window.scrollY > 20);
    });
  }
}

function toggleMenu() {
  document.getElementById('nav-links').classList.toggle('open');
  document.getElementById('hamburger').classList.toggle('open');
}

function closeMenu() {
  document.getElementById('nav-links').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
}

function handleEmail(e) {
  e.preventDefault();
  const mailto = 'mailto:adithyavalmiki66655@gmail.com';
  const gmail = 'https://mail.google.com/mail/?view=cm&to=adithyavalmiki66655@gmail.com&su=Hey Adhitya - Lets Connect';
  window.open(mailto, '_self');
  setTimeout(() => {
    if (!document.hidden) window.open(gmail, '_blank');
  }, 1000);
}

function sendMsg() {
  const b = document.getElementById('send-btn');
  if (b) {
    b.textContent = '✓ Message Sent!';
    setTimeout(() => { b.textContent = 'Send Message ↗'; }, 3000);
  }
}
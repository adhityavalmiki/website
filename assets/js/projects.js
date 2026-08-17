const projects = {
  flixora: {
    title: 'FLIXORA',
    badge: '<span class="proj-badge-grp">Group Project · Diploma Final Year</span>',
    desc: 'FLIXORA is a cross-platform all-in-one streaming companion for movies, web series, TV shows, anime and manga. The idea was to eliminate the need to switch between multiple platforms — one hub for all entertainment formats, with clean UI and fast content discovery. Built collaboratively as our diploma capstone project with 2 GitHub forks.',
    how: 'The platform aggregates content metadata and presents it through a unified, responsive web interface. Users can browse by category — movies, anime, manga, shows — and get details, trailers and streaming info. TypeScript was used for type-safe development and cleaner team collaboration.',
    features: [
      'Unified browsing for movies, shows, anime & manga',
      'Category-based filtering and discovery',
      'Responsive streaming UI built for all screen sizes',
      'Team-built with clean component structure',
      'Deployed and live on Vercel'
    ],
    stack: ['TypeScript', 'HTML5', 'CSS3', 'Web Dev', 'Vercel', 'Team Collab'],
    type: 'Group Project',
    year: '2024',
    platform: 'Web',
    github: 'https://github.com/adhityavalmiki/Flixora',
    live: 'https://adhityavalmiki.eu.org'
  },
  habittracker: {
    title: 'HABIT TRACKER',
    badge: '<span class="proj-badge-grp" style="border-color:#00cfff;color:#00cfff;">Solo Project</span>',
    desc: 'A sleek Android habit tracking application designed to help users build, maintain and visualise daily routines. The core philosophy: make self-improvement measurable. Track what you do every day, watch your streaks grow, and stay accountable to your own goals.',
    how: 'Built with React Native for cross-platform mobile development targeting Android. The app stores habit data locally, tracks completion per day, and computes streaks automatically. The UI is designed to be minimal and distraction-free so the focus stays on the habits themselves.',
    features: [
      'Create and manage custom daily habits',
      'Streak tracking with visual progress indicators',
      'Daily check-in with one-tap completion',
      'Local data persistence — works offline',
      'Clean minimal UI designed for daily use'
    ],
    stack: ['JavaScript', 'React Native', 'Android', 'UI/UX', 'Local Storage'],
    type: 'Solo Project',
    year: '2024',
    platform: 'Android',
    github: 'https://github.com/adhityavalmiki/Habit-Tracker-Android',
    live: null
  },
  mymoneymap: {
    title: 'MYMONEYMAP',
    badge: '<span class="proj-badge-grp" style="border-color:#00cfff;color:#00cfff;">Solo Project</span>',
    desc: 'MyMoneyMap is a premium personal finance dashboard built to track income, expenses, subscriptions, stocks, EMI plans and savings goals — all from one elegant fintech workspace. Built entirely with vanilla HTML, CSS and JavaScript, it behaves like a real startup MVP with full LocalStorage persistence.',
    how: 'Users sign up, log in and set preferences like currency. They then add transactions — salary, rent, groceries, bills — and the dashboard recalculates balance, income, expenses and category charts instantly. Live stock prices are fetched via the Finnhub API, and an EMI calculator breaks down loan repayment and amortization schedules.',
    features: [
      'Expense Manager — add, edit, filter, sort, search and export transactions',
      'Portfolio Tracker — track holdings, gains, losses and allocation',
      'Subscription Monitor — track recurring payments and billing pressure',
      'Live stock prices via Finnhub API integration',
      'EMI Calculator — loan repayment, interest and amortization breakdown',
      'Responsive charts that update instantly as data is added',
      'LocalStorage persistence — works fully offline, no backend needed',
      'Authentication — register, login and user profile preferences'
    ],
    stack: ['HTML5', 'CSS3', 'JavaScript', 'LocalStorage', 'Finnhub API', 'Charts', 'Fintech UI'],
    type: 'Solo Project',
    year: '2025',
    platform: 'Web',
    github: 'https://github.com/adhityavalmiki/MyMoneyMap',
    live: 'https://my-moneymap.vercel.app'
  }
};

let currentPage = 'home';
let previousPage = 'projects';

function navigate(page) {
  if (page === currentPage) return;
  document.getElementById('page-' + currentPage).classList.remove('active');
  currentPage = page;
  document.getElementById('page-' + page).classList.add('active');
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.dataset.page === page);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
  setTimeout(triggerReveals, 80);
}

function openProject(id) {
  const p = projects[id];
  if (!p) return;

  document.getElementById('detail-title').innerHTML = p.title;
  document.getElementById('detail-badge-wrap').innerHTML = p.badge + '<br><br>' +
    '<span style="font-size:0.62rem;letter-spacing:0.15em;color:var(--muted);">TYPE: ' + p.type + '</span><br>' +
    '<span style="font-size:0.62rem;letter-spacing:0.15em;color:var(--muted);">YEAR: ' + p.year + '</span><br>' +
    '<span style="font-size:0.62rem;letter-spacing:0.15em;color:var(--muted);">PLATFORM: ' + p.platform + '</span>';

  document.getElementById('detail-desc').textContent = p.desc;
  document.getElementById('detail-how').textContent = p.how;

  const ul = document.getElementById('detail-features');
  ul.innerHTML = p.features.map(f => '<li>' + f + '</li>').join('');

  const stackEl = document.getElementById('detail-stack');
  stackEl.innerHTML = p.stack.map(s =>
    '<span style="font-size:0.65rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;padding:0.3rem 0.75rem;border:2px solid var(--orange);color:var(--orange);font-family:var(--mono);">' + s + '</span>'
  ).join('');

  const linksEl = document.getElementById('detail-links');
  linksEl.innerHTML = '';
  if (p.github) linksEl.innerHTML += '<a href="' + p.github + '" target="_blank" class="clink" style="margin-bottom:-3px;"><div class="clink-left"><span class="clink-ico">⌥</span> View on GitHub</div><span class="clink-arr">→</span></a>';
  if (p.live)   linksEl.innerHTML += '<a href="' + p.live + '" target="_blank" class="clink"><div class="clink-left"><span class="clink-ico">🌐</span> Live Demo</div><span class="clink-arr">→</span></a>';

  document.getElementById('page-' + currentPage).classList.remove('active');
  previousPage = currentPage;
  currentPage = 'project-detail';
  document.getElementById('page-project-detail').classList.add('active');
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function closeProject() {
  document.getElementById('page-project-detail').classList.remove('active');
  currentPage = previousPage || 'projects';
  document.getElementById('page-' + currentPage).classList.add('active');
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.dataset.page === currentPage);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
document.addEventListener('DOMContentLoaded', () => {

  /* --- MOBILE MENU TOGGLE --- */
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const navLinksItems = document.querySelectorAll('.nav-link');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
      const isActive = hamburger.classList.contains('active');
      hamburger.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    });
  }

  navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
      if (hamburger.classList.contains('active')) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  });

  /* --- INTERSECTION OBSERVER FOR ANIMATIONS --- */
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add visible class to fade-in elements
        entry.target.classList.add('visible');

        // If it's a skill card, animate the progress bar width
        if (entry.target.classList.contains('skill-card')) {
          const progressFill = entry.target.querySelector('.progress-fill');
          if (progressFill) {
            progressFill.style.width = progressFill.getAttribute('data-width');
          }
        }

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const fadeElements = document.querySelectorAll('.fade-in');
  fadeElements.forEach(el => observer.observe(el));

  /* --- GITHUB API DATA FETCHING --- */
  const githubUser = 'Pasquii4';
  const reposEl = document.getElementById('github-repos');
  const langsEl = document.getElementById('github-langs');

  const FALLBACK_REPOS = '22';
  const FALLBACK_LANGS = '8 lenguajes';

  const renderLiveBadge = () => {
    return `<span class="live-badge" title="Datos en vivo de GitHub API">EN VIVO</span>`;
  };

  //   const fetchGithubData = async () => {
  //     try {
  //       // Fetch User Data for total public repos
  //       const userResponse = await fetch(`https://api.github.com/users/${githubUser}`);
  //       if (!userResponse.ok) throw new Error('API Rate limit o Error en red');
  //       const userData = await userResponse.json();
  // 
  //       // Set repositories count with live badge
  //       if (userData.public_repos !== undefined) {
  //         if (reposEl) reposEl.innerHTML = `${userData.public_repos} ${renderLiveBadge()}`;
  //       } else {
  //         throw new Error('No public_repos data');
  //       }
  // 
  //       // Fetch Repositories to count unique languages
  //       const reposResponse = await fetch(`https://api.github.com/users/${githubUser}/repos?per_page=100`);
  //       if (!reposResponse.ok) throw new Error('API Rate limit o Error en red');
  //       const reposData = await reposResponse.json();
  // 
  //       // Extract unique languages excluding null
  //       const languages = new Set();
  //       reposData.forEach(repo => {
  //         if (repo.language) {
  //           languages.add(repo.language);
  //         }
  //       });
  // 
  //       // Set languages count with live badge
  //       if (languages.size > 0) {
  //         if (langsEl) langsEl.innerHTML = `${languages.size} ${renderLiveBadge()}`;
  //       } else {
  //         throw new Error('No languages found');
  //       }
  // 
  //     } catch (error) {
  //       console.warn('Usando fallback stats de GitHub. Razón:', error.message);
  //       // On failure, display fallback data without the live badge
  //       if (reposEl) reposEl.innerHTML = FALLBACK_REPOS;
  //       if (langsEl) langsEl.innerHTML = FALLBACK_LANGS;
  //     }
  //   };
  // 
  //   fetchGithubData();

  // --- SCROLL PROGRESS BAR ---
  const progressBar = document.createElement('div');
  progressBar.id = 'scroll-progress';
  document.body.prepend(progressBar);

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = progress + '%';
  });

  // --- ACTIVE NAV HIGHLIGHT ---
  const sections = document.querySelectorAll('section[id]');

  const sectionObserverOptions = {
    root: null,
    rootMargin: '-40% 0px -55% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinksItems.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  }, sectionObserverOptions);

  sections.forEach(section => sectionObserver.observe(section));

  // --- TYPEWRITER EFFECT ---
  function typeWriter(element, text, speed, callback) {
    element.textContent = '';
    let i = 0;
    const timer = setInterval(() => {
      element.textContent += text[i];
      i++;
      if (i >= text.length) {
        clearInterval(timer);
        if (callback) callback();
      }
    }, speed);
  }

  const heroTitle = document.querySelector('.hero-title');
  const heroSubtitle = document.querySelector('.hero-subtitle');
  if (heroTitle && heroSubtitle) {
    const titleText = heroTitle.textContent.trim();
    const subtitleText = heroSubtitle.textContent.trim();
    heroTitle.textContent = '';
    heroSubtitle.textContent = '';
    // Esperar a que la página esté visible
    setTimeout(() => {
      typeWriter(heroTitle, titleText, 60, () => {
        // Añadir cursor parpadeante
        const cursor = document.createElement('span');
        cursor.classList.add('cursor-blink');
        cursor.textContent = '_';
        heroTitle.appendChild(cursor);
        typeWriter(heroSubtitle, subtitleText, 40, null);
      });
    }, 400);
  }

});

// ========================================
// BLOOMBERG TERMINAL PORTFOLIO - MAIN.JS
// ========================================

// === CONFIGURATION ===
const CONFIG = {
  GITHUB_USERNAME: 'Pasquii4',
  UPDATE_INTERVAL: 60000, // 60 seconds
  API_KEYS: {
    ALPHA_VANTAGE: 'demo', // Replace with real key
    FINNHUB: 'demo'        // Replace with real key
  }
};

// === MARKET DATA MANAGER ===
class MarketDataManager {
  constructor() {
    this.data = {
      SPY: { price: 584.72, change: 1.2, history: [] },
      QQQ: { price: 492.35, change: 0.8, history: [] },
      DIA: { price: 421.57, change: -0.3, history: [] }
    };
    this.initializeHistory();
  }

  initializeHistory() {
    // Generate realistic mock history data
    ['SPY', 'QQQ', 'DIA'].forEach(symbol => {
      const basePrice = this.data[symbol].price;
      for (let i = 24; i >= 0; i--) {
        const variation = (Math.random() - 0.5) * 5;
        this.data[symbol].history.push(basePrice + variation);
      }
    });
  }

  async updateData() {
    // Simulate real-time price updates
    Object.keys(this.data).forEach(symbol => {
      const data = this.data[symbol];
      const variation = (Math.random() - 0.5) * 0.5;
      data.price += variation;
      data.change = parseFloat((variation / data.price * 100).toFixed(2));

      // Update history
      data.history.shift();
      data.history.push(data.price);
    });

    this.updateUI();
  }

  updateUI() {
    // Update SPY
    document.getElementById('spy-price').textContent = this.data.SPY.price.toFixed(2);
    this.updateChangeElement('spy-change', this.data.SPY.change);
    this.drawMiniChart('chart-spy', this.data.SPY.history, this.data.SPY.change > 0);

    // Update NASDAQ
    document.getElementById('nasdaq-price').textContent = this.data.QQQ.price.toFixed(2);
    this.updateChangeElement('nasdaq-change', this.data.QQQ.change);
    this.drawMiniChart('chart-nasdaq', this.data.QQQ.history, this.data.QQQ.change > 0);

    // Update DOW
    document.getElementById('dow-price').textContent = this.data.DIA.price.toFixed(2);
    this.updateChangeElement('dow-change', this.data.DIA.change);
    this.drawMiniChart('chart-dow', this.data.DIA.history, this.data.DIA.change > 0);

    // Update timestamp
    document.getElementById('lastUpdate').textContent = 'just now';
  }

  updateChangeElement(elementId, change) {
    const element = document.getElementById(elementId);
    const isPositive = change > 0;

    element.className = `index-change ${isPositive ? 'positive' : 'negative'}`;
    element.innerHTML = `
            <span class="change-arrow">${isPositive ? '▲' : '▼'}</span>
            <span>${isPositive ? '+' : ''}${change.toFixed(1)}%</span>
        `;
  }

  drawMiniChart(canvasId, data, isPositive) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Calculate scale
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const xStep = width / (data.length - 1);

    // Draw line
    ctx.beginPath();
    ctx.strokeStyle = isPositive ? '#00ff88' : '#ff4757';
    ctx.lineWidth = 2;

    data.forEach((value, i) => {
      const x = i * xStep;
      const y = height - ((value - min) / range) * height;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.stroke();

    // Draw glow effect
    ctx.shadowBlur = 10;
    ctx.shadowColor = isPositive ? 'rgba(0, 255, 136, 0.5)' : 'rgba(255, 71, 87, 0.5)';
    ctx.stroke();
  }
}

// === TECH CHARTS RENDERER ===
class TechChartsRenderer {
  constructor() {
    this.techData = {
      python: [65, 68, 70, 72, 73, 75],
      javascript: [25, 26, 28, 29, 29, 30],
      'html-css': [75, 78, 80, 82, 84, 85],
      java: [55, 56, 58, 59, 60, 60],
      sql: [38, 40, 42, 43, 44, 45],
      docker: [20, 25, 30, 35, 38, 40]
    };
  }

  render() {
    document.querySelectorAll('.tech-card').forEach(card => {
      const tech = card.dataset.tech;
      const canvas = card.querySelector('.tech-chart');
      if (!canvas || !this.techData[tech]) return;

      this.drawTechChart(canvas, this.techData[tech]);
    });
  }

  drawTechChart(canvas, data) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const xStep = width / (data.length - 1);

    // Draw line
    ctx.beginPath();
    ctx.strokeStyle = '#00ff88';
    ctx.lineWidth = 2;

    data.forEach((value, i) => {
      const x = i * xStep;
      const y = height - ((value - min) / range) * (height - 10) - 5;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.stroke();

    // Fill area under line
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fillStyle = 'rgba(0, 255, 136, 0.1)';
    ctx.fill();
  }
}

// === GITHUB INTEGRATION ===
class GitHubIntegration {
  constructor(username) {
    this.username = username;
    this.cache = null;
    this.cacheTime = 0;
    this.CACHE_DURATION = 300000; // 5 minutes
  }

  async fetchData() {
    // Check cache
    if (this.cache && (Date.now() - this.cacheTime < this.CACHE_DURATION)) {
      return this.cache;
    }

    try {
      const response = await fetch(`https://api.github.com/users/${this.username}/repos`);
      if (!response.ok) throw new Error('GitHub API request failed');

      const repos = await response.json();
      this.cache = this.processRepos(repos);
      this.cacheTime = Date.now();
      return this.cache;
    } catch (error) {
      console.error('GitHub API Error:', error);
      return this.getMockData();
    }
  }

  processRepos(repos) {
    const languages = {};
    let totalSize = 0;

    repos.forEach(repo => {
      if (repo.language) {
        languages[repo.language] = (languages[repo.language] || 0) + 1;
        totalSize += repo.size || 0;
      }
    });

    const sortedLanguages = Object.entries(languages)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4);

    const total = sortedLanguages.reduce((sum, [, count]) => sum + count, 0);
    const percentages = sortedLanguages.map(([lang, count]) => ({
      name: lang,
      percent: Math.round((count / total) * 100)
    }));

    return {
      repos: repos.length,
      languages: percentages
    };
  }

  getMockData() {
    return {
      repos: 18,
      languages: [
        { name: 'Python', percent: 67 },
        { name: 'JavaScript', percent: 18 },
        { name: 'HTML', percent: 10 },
        { name: 'Java', percent: 5 }
      ]
    };
  }

  async updateUI() {
    const data = await this.fetchData();

    // Update repos count
    const reposElement = document.getElementById('github-repos');
    if (reposElement) {
      reposElement.textContent = data.repos;
    }

    // Update languages count
    const languagesElement = document.getElementById('github-languages');
    if (languagesElement) {
      languagesElement.textContent = data.languages.length;
    }
  }
}

// === SCROLL ANIMATIONS ===
class ScrollAnimations {
  constructor() {
    this.observer = new IntersectionObserver(
      (entries) => this.handleIntersection(entries),
      { threshold: 0.1, rootMargin: '50px' }
    );
    this.init();
  }

  init() {
    // Observe all cards and sections
    document.querySelectorAll('.tech-card, .trade-card, .metric-card, .contact-card').forEach(el => {
      el.classList.add('reveal');
      this.observer.observe(el);
    });
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }
}

// === NAVIGATION HANDLER ===
class NavigationHandler {
  constructor() {
    this.navbar = document.getElementById('navbar');
    this.mobileToggle = document.getElementById('mobileToggle');
    this.navMenu = document.getElementById('navMenu');
    this.init();
  }

  init() {
    // Smooth scroll for nav links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', (e) => this.handleNavClick(e));
    });

    // Mobile toggle
    if (this.mobileToggle) {
      this.mobileToggle.addEventListener('click', () => this.toggleMobileMenu());
    }

    // Scroll effect on navbar
    window.addEventListener('scroll', () => this.handleScroll());
  }

  handleNavClick(e) {
    e.preventDefault();
    const targetId = e.target.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }

    // Close mobile menu if open
    if (window.innerWidth <= 768) {
      this.navMenu.classList.remove('active');
    }
  }

  toggleMobileMenu() {
    this.navMenu.classList.toggle('active');
  }

  handleScroll() {
    if (window.scrollY > 100) {
      this.navbar.style.background = 'rgba(26, 31, 58, 0.98)';
    } else {
      this.navbar.style.background = 'rgba(26, 31, 58, 0.95)';
    }
  }
}

// === TIME UPDATES ===
class TimeUpdates {
  updateTimestamps() {
    const now = new Date();

    // Update deployment time
    const deploymentElement = document.getElementById('deploymentTime');
    if (deploymentElement) {
      deploymentElement.textContent = now.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    }

    // Update sentiment timestamp
    const sentimentElement = document.getElementById('sentimentUpdate');
    if (sentimentElement) {
      const minutes = Math.floor(Math.random() * 5) + 1;
      sentimentElement.textContent = `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    }
  }
}

// === INITIALIZATION ===
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Bloomberg Terminal Portfolio Initialized');

  // Initialize all managers
  const marketData = new MarketDataManager();
  const techCharts = new TechChartsRenderer();
  const github = new GitHubIntegration(CONFIG.GITHUB_USERNAME);
  const scrollAnimations = new ScrollAnimations();
  const navigation = new NavigationHandler();
  const timeUpdates = new TimeUpdates();

  // Initial renders
  marketData.updateUI();
  techCharts.render();
  github.updateUI();
  timeUpdates.updateTimestamps();

  // Set up auto-updates
  setInterval(() => {
    marketData.updateData();
  }, CONFIG.UPDATE_INTERVAL);

  // Update timestamps every minute
  setInterval(() => {
    timeUpdates.updateTimestamps();
  }, 60000);

  // Performance optimization: Defer heavy operations
  setTimeout(() => {
    github.updateUI();
  }, 1000);

  console.log('✅ All systems operational');
});

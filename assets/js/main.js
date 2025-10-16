// main.js - funciones básicas: modo oscuro persistente y reveal on scroll
(function(){
  // Theme toggle
  const btn = document.getElementById('theme-toggle');
  const root = document.documentElement;
  const stored = localStorage.getItem('theme');
if(stored === 'light'){
  root.style.setProperty('--bg','#f7f9fb');
  root.style.setProperty('--card','#ffffff');
  root.style.setProperty('--text','#0b1220');
  root.style.setProperty('--muted','#55606a');
  root.style.setProperty('--header-bg', 'rgba(225,232,237,0.85)');
  root.style.setProperty('--btn-bg','#e1e8ed');
  root.style.setProperty('--btn-text','#0b1220');
  root.style.setProperty('--btn-hover-bg','#d1d8de');
  root.style.setProperty('--btn-ghost-bg', 'rgba(0,0,0,0.03)'); // <-- Añade esto
  root.style.setProperty('--btn-ghost-border', '1px solid rgba(0,0,0,0.08)'); // <-- Y esto
  btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moon-fill" viewBox="0 0 16 16"><path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.647 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"/></svg>';
  btn.setAttribute('aria-label','Cambiar a modo oscuro');
  root.style.setProperty('--logo-filter','invert(1)');
  root.style.setProperty('div.container','background-color: var(--bg)');
  root.style.setProperty('--project-card-bg', 'linear-gradient(180deg, rgba(0,0,0,0.01), transparent)');
  root.style.setProperty('--project-card-border', '1px solid rgba(0,0,0,0.08)');
  root.style.setProperty('--project-card-shadow', '0 2px 12px 0 rgba(0,0,0,0.04)');
}

  btn.addEventListener('click', ()=>{
    const current = localStorage.getItem('theme');
    if(current === 'light'){
      localStorage.removeItem('theme');
      location.reload();
      return;
    }
    localStorage.setItem('theme','light');
    location.reload();
  });

  // Reveal on scroll
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('in-view');
        e.target.style.opacity = 1;
        e.target.style.transform = 'none';
      }
    })
  }, {threshold:0.15});

  document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));



  // year
  const y = new Date().getFullYear();
  document.getElementById('year').textContent = y;
})();
document.querySelectorAll('.accordion-toggle').forEach(btn => {
  btn.addEventListener('click', function() {
    const item = this.closest('.accordion-item');
    item.classList.toggle('open');
    // Cierra otros acordeones en la misma lista
    item.parentElement.querySelectorAll('.accordion-item').forEach(other => {
      if (other !== item) other.classList.remove('open');
    });
  });
});

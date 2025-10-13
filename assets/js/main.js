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

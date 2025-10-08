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

  // Contact form basic handler (client-side)
  const form = document.getElementById('contact-form');
  if(form){
    form.addEventListener('submit', (e)=>{
      // Prevent default for now; user must configure action attribute
      e.preventDefault();
      alert('El formulario está preparado pero la acción (endpoint) está por completar.\\nPuedes configurar Formspree o un backend y actualizar el atributo "action" en index.html');
    });
  }

  // year
  const y = new Date().getFullYear();
  document.getElementById('year').textContent = y;
})();

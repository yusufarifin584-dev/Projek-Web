// ========================
// CUSTOM CURSOR
// ========================
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', (e) => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
});

function animateRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top = ry + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

// Cursor hover effect pada elemen interaktif
document.querySelectorAll('a, button, .project-card, .skill-card, .tag').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(2.5)';
    ring.style.opacity = '0';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    ring.style.opacity = '1';
  });
});

// ========================
// CLICK PARTICLES
// ========================
document.addEventListener('click', (e) => {
  for (let i = 0; i < 6; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 6 + 3;
    const duration = 0.8 + Math.random() * 0.6;
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.left = e.clientX + 'px';
    p.style.top = e.clientY + 'px';
    p.style.animationDuration = duration + 's';
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 1500);
  }
});

// ========================
// SCROLL REVEAL
// ========================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');

      // Animasi counter angka
      entry.target.querySelectorAll('[data-target]').forEach(num => {
        const target = parseInt(num.dataset.target);
        let count = 0;
        const step = target / 60;
        const timer = setInterval(() => {
          count += step;
          if (count >= target) {
            count = target;
            clearInterval(timer);
          }
          num.textContent = Math.floor(count) + (target >= 10 ? '+' : '');
        }, 25);
      });

      // Animasi progress bar
      entry.target.querySelectorAll('.progress-fill').forEach(bar => {
        setTimeout(() => {
          bar.style.width = bar.dataset.width + '%';
        }, 200);
      });
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal, .skill-card').forEach(el => {
  revealObserver.observe(el);
});

// ========================
// PARALLAX ORBS
// ========================
document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;

  document.querySelector('.orb1').style.transform = `translate(${x}px, ${y}px)`;
  document.querySelector('.orb2').style.transform = `translate(${-x * 0.7}px, ${-y * 0.7}px)`;
  document.querySelector('.orb3').style.transform = `translate(${x * 0.5}px, ${y * 0.5}px)`;
});

// ========================
// NAVBAR SCROLL EFFECT
// ========================
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (window.scrollY > 50) {
    nav.style.background = 'rgba(10, 10, 15, 0.85)';
  } else {
    nav.style.background = 'transparent';
  }
});
// Reveal on scroll
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
// Animated counters — run once when the stats scroll into view
const counters = document.querySelectorAll('[data-count]');
if (counters.length) {
  const runCounter = el => {
    const target = parseFloat(el.dataset.count); const dec = el.dataset.count.includes('.') ? 1 : 0;
    const t0 = performance.now(), dur = 900;
    const tick = t => { const p = Math.min(1, (t - t0) / dur); el.textContent = (target * p).toFixed(dec); if (p < 1) requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  };
  const cio = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { runCounter(e.target); cio.unobserve(e.target); } }), { threshold: .4 });
  counters.forEach(el => cio.observe(el));
}
// Copy code blocks
document.querySelectorAll('pre').forEach(pre => {
  const b = document.createElement('button'); b.className = 'copy'; b.textContent = '复制';
  b.onclick = () => { navigator.clipboard.writeText(pre.innerText.replace(/^复制\n/, '')).then(() => { b.textContent = '已复制'; setTimeout(() => b.textContent = '复制', 1200); }); };
  pre.appendChild(b);
});
// Nav shadow on scroll
const nav = document.querySelector('.topnav');
addEventListener('scroll', () => nav && nav.classList.toggle('scrolled', scrollY > 8), { passive: true });
// Hero glow follows the mouse
document.querySelectorAll('.hero').forEach(hero => {
  const glow = document.createElement('div'); glow.className = 'glow'; hero.appendChild(glow);
  hero.addEventListener('mousemove', e => {
    const r = hero.getBoundingClientRect();
    glow.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
    glow.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
  });
});
// FAQ accordion
document.querySelectorAll('.faq button').forEach(btn => btn.onclick = () => btn.parentElement.classList.toggle('open'));

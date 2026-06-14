// year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// nav background on scroll
const nav = document.getElementById('nav');
if (nav) {
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

// reveal on scroll
const io = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }
}, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// pause off-screen section videos
const vio = new IntersectionObserver((entries) => {
  for (const e of entries) {
    const v = e.target;
    if (!e.isIntersecting && !v.paused && !v.hasAttribute('autoplay')) v.pause();
  }
}, { threshold: 0.0 });
document.querySelectorAll('.media-card video').forEach((v) => vio.observe(v));

// toast helper
let toastTimer;
function toast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 3200);
}

// buy buttons → require login, then record a demo order
document.querySelectorAll('[data-buy]').forEach((b) => {
  b.addEventListener('click', () => {
    if (!GP.currentUser()) { sessionStorage.setItem('gp_after', 'order'); location.href = 'account.html'; return; }
    GP.addOrder({ item: b.dataset.buy, price: Number(b.dataset.price), type: 'device' });
    toast('Захиалга баталгаажлаа — Профайл хэсгээс хянана уу.');
  });
});

// plan buttons → require login, then set plan
document.querySelectorAll('[data-plan]').forEach((b) => {
  b.addEventListener('click', () => {
    if (!GP.currentUser()) { sessionStorage.setItem('gp_after', 'plan:' + b.dataset.plan); location.href = 'account.html'; return; }
    GP.setPlan(b.dataset.plan);
    toast(b.dataset.plan + ' багц идэвхжлээ.');
  });
});

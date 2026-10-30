(() => {
  const root = document.documentElement;

  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();

  /* Close the phone menu after choosing a link. */
  const menu = document.querySelector('.menu');
  if (menu) menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.removeAttribute('open')));

  /* Highlight the current section in the main navigation (home page only). */
  const links = [...document.querySelectorAll('.nav-links a[href^="#"]')];
  const targets = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window && targets.length) {
    const spy = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        links.forEach(l => {
          if (l.hash === `#${entry.target.id}`) l.setAttribute('aria-current', 'true');
          else l.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-20% 0px -65% 0px', threshold: 0 });
    targets.forEach(t => spy.observe(t));
  }

  /* Diagram steps: hovering or focusing a step number or walkthrough line highlights its pair. */
  const setStep = (n, on) => {
    document.querySelectorAll(`[data-step="${n}"]`).forEach(el => el.classList.toggle('is-on', on));
  };
  document.querySelectorAll('[data-step]').forEach(el => {
    const n = el.getAttribute('data-step');
    el.addEventListener('mouseenter', () => setStep(n, true));
    el.addEventListener('mouseleave', () => setStep(n, false));
    el.addEventListener('focus', () => setStep(n, true));
    el.addEventListener('blur', () => setStep(n, false));
  });
  document.querySelectorAll('.walk li').forEach(li => li.setAttribute('tabindex', '0'));

  /* One-time reveal on scroll. Content stays visible without JavaScript or with reduced motion. */
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.04 });
    items.forEach(el => io.observe(el));
  } else {
    items.forEach(el => el.classList.add('in'));
  }
})();

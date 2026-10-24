(() => {
  const root = document.documentElement;
  const email = 'ramprasad.mnit@gmail.com';

  /* Theme toggle: follows the system setting until the visitor picks one. */
  const toggle = document.querySelector('#theme-toggle');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)');
  const isDark = () => {
    const chosen = root.getAttribute('data-theme');
    return chosen ? chosen === 'dark' : systemDark.matches;
  };
  const syncToggle = () => {
    if (!toggle) return;
    toggle.setAttribute('aria-pressed', String(isDark()));
    toggle.setAttribute('aria-label', isDark() ? 'Switch to light theme' : 'Switch to dark theme');
  };
  if (toggle) {
    toggle.addEventListener('click', () => {
      const next = isDark() ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) { /* storage unavailable: keep the choice for this visit */ }
      syncToggle();
    });
    systemDark.addEventListener('change', syncToggle);
    syncToggle();
  }

  /* Copy email. */
  const copyButton = document.querySelector('#copy-email');
  const status = document.querySelector('#copy-status');
  if (copyButton && status) {
    copyButton.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(email);
        status.textContent = 'Email copied.';
        copyButton.textContent = 'Copied';
        setTimeout(() => { copyButton.textContent = 'Copy email'; }, 2500);
      } catch (e) {
        status.textContent = `Copy is unavailable here. The address is ${email}.`;
      }
    });
  }

  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();

  /* Current section in the nav. */
  const links = [...document.querySelectorAll('.site-header nav a')];
  const sections = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window && sections.length) {
    const spy = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        links.forEach(link => {
          const on = link.hash === `#${entry.target.id}`;
          if (on) link.setAttribute('aria-current', 'true'); else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-20% 0px -65% 0px', threshold: 0 });
    sections.forEach(s => spy.observe(s));
    const top = document.querySelector('#top');
    if (top) spy.observe(top); /* clears the highlight when back at the hero */
  }

  /* Gentle reveal on scroll. Content stays visible if JS or IntersectionObserver is missing. */
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && !reduce) {
    root.classList.add('js');
    const targets = document.querySelectorAll('.case, .proof-grid li, .timeline > li, .cards3 > li, .cards2 > li');
    targets.forEach(el => el.classList.add('reveal'));
    const reveal = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('in'); obs.unobserve(entry.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    targets.forEach(el => reveal.observe(el));
  }
})();

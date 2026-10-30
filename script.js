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
  /* Diagram flow: arrows draw in once, normal path first, then the failure path. */
  if ('IntersectionObserver' in window && !reduce) {
    const flows = document.querySelectorAll('[data-flow]');
    flows.forEach(box => {
      /* Each diagram variant (wide or narrow) gets its own timeline. */
      const groups = [...box.querySelectorAll('svg')].map(svg => [...svg.querySelectorAll('.arrow, .arrow-fail, path[marker-end]')]).filter(g => g.length);
      if (!groups.length) return;
      const isFail = p => p.classList.contains('arrow-fail') || p.hasAttribute('stroke-dasharray');
      let longest = 0;
      groups.forEach(paths => {
        const ok = paths.filter(p => !isFail(p)), bad = paths.filter(isFail);
        [...ok, ...bad].forEach((p, i) => {
          p.classList.add('flow-p');
          if (!isFail(p)) { p.setAttribute('pathLength', '1'); p.classList.add('flow-solid'); }
          const delay = i < ok.length ? i * 0.35 : ok.length * 0.35 + 0.5 + (i - ok.length) * 0.35;
          p.style.setProperty('--d', delay.toFixed(2) + 's');
          longest = Math.max(longest, delay + 0.7);
        });
      });
      box.classList.add('is-armed');
      const fio = new IntersectionObserver((es, o) => {
        es.forEach(e => {
          if (!e.isIntersecting) return;
          box.classList.add('is-playing');
          o.unobserve(box);
          /* Then play the event story once: packets on the normal path, then one through the buffer. */
          const go = box.querySelector('#heroGo');
          if (go && go.beginElement) setTimeout(() => go.beginElement(), longest * 1000);
        });
      }, { threshold: 0.35 });
      fio.observe(box);
    });
  }
})();

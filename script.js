(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasIO = 'IntersectionObserver' in window;

  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();

  /* Navigation: hairline under the sticky bar once the page scrolls. */
  const bar = document.querySelector('.site-nav');
  if (bar) {
    const onScroll = () => bar.classList.toggle('is-stuck', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* Compact menu: close after choosing a link, on Escape, or on a click outside. */
  const menu = document.querySelector('.menu');
  if (menu) {
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.removeAttribute('open')));
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && menu.open) { menu.removeAttribute('open'); menu.querySelector('summary').focus(); } });
    document.addEventListener('click', e => { if (menu.open && !menu.contains(e.target)) menu.removeAttribute('open'); });
  }

  /* Scroll spy: mark the link for the section in view (main nav on the home page, contents list on case pages). */
  const spy = (selector, margin) => {
    const links = [...document.querySelectorAll(selector)];
    const targets = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
    if (!hasIO || !targets.length) return;
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        links.forEach(l => {
          if (l.hash === `#${entry.target.id}`) l.setAttribute('aria-current', 'true');
          else l.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: margin, threshold: 0 });
    targets.forEach(t => io.observe(t));
  };
  spy('.nav-links a[href^="#"]', '-30% 0px -60% 0px');
  spy('.cs-toc a[href^="#"]', '-20% 0px -70% 0px');

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
  document.querySelectorAll('.walk li, .excerpt-steps li').forEach(li => li.setAttribute('tabindex', '0'));

  /* One-time reveal on scroll. Content stays visible without JavaScript or with reduced motion. */
  const items = document.querySelectorAll('.reveal');
  if (hasIO && !reduce) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.04 });
    items.forEach(el => io.observe(el));
  } else {
    items.forEach(el => el.classList.add('in'));
  }

  /* Diagram flow: arrows draw in once, normal path first, then the failure path,
     then the diagram plays its story (event packets in the hero, numbered steps elsewhere). */
  if (hasIO && !reduce) {
    document.querySelectorAll('[data-flow]').forEach(box => {
      const groups = [...box.querySelectorAll('svg')].map(svg => [...svg.querySelectorAll('.arrow, .arrow-fail, path[marker-end]')]).filter(g => g.length);
      if (!groups.length) return;
      const isFail = p => p.classList.contains('arrow-fail') || p.hasAttribute('stroke-dasharray');
      let longest = 0;
      groups.forEach(paths => {
        const ok = paths.filter(p => !isFail(p)), bad = paths.filter(isFail);
        [...ok, ...bad].forEach((p, i) => {
          p.classList.add('flow-p');
          if (!isFail(p)) { p.setAttribute('pathLength', '1'); p.classList.add('flow-solid'); }
          const delay = i < ok.length ? i * 0.3 : ok.length * 0.3 + 0.4 + (i - ok.length) * 0.3;
          p.style.setProperty('--d', delay.toFixed(2) + 's');
          longest = Math.max(longest, delay + 0.7);
        });
      });
      box.classList.add('is-armed');
      const io = new IntersectionObserver((entries, obs) => {
        entries.forEach(e => {
          if (!e.isIntersecting) return;
          box.classList.add('is-playing');
          obs.unobserve(box);
          setTimeout(() => {
            box.querySelectorAll('animate[data-go]').forEach(a => a.beginElement && a.beginElement());
            const steps = [...new Set([...box.querySelectorAll('[data-step]')].map(el => el.getAttribute('data-step')))].sort((a, b) => a - b);
            steps.forEach((n, i) => {
              setTimeout(() => setStep(n, true), i * 700);
              setTimeout(() => setStep(n, false), i * 700 + 650);
            });
          }, longest * 1000);
        });
      }, { threshold: 0.3 });
      io.observe(box);
    });
  }
})();

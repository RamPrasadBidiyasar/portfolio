const email = 'ramprasad.mnit@gmail.com';
const copyButton = document.querySelector('#copy-email');
const status = document.querySelector('#copy-status');
copyButton.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(email);
    status.textContent = 'Email copied. Let’s connect!';
    copyButton.textContent = 'Copied ✓';
    setTimeout(() => { copyButton.textContent = 'Copy email ⧉'; }, 2500);
  } catch {
    status.textContent = `Copy unavailable. You can select ${email} or use the email link.`;
  }
});
document.querySelector('#year').textContent = new Date().getFullYear();
if ('IntersectionObserver' in window) {
  const links = [...document.querySelectorAll('nav a')];
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(link => {
          const active = link.hash === `#${entry.target.id}`;
          link.classList.toggle('active', active);
          if (active) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      }
    });
  }, { rootMargin: '-10% 0px -55% 0px', threshold: 0 });
  document.querySelectorAll('#work, #experience, #about, #contact, .hero').forEach(section => observer.observe(section));
}

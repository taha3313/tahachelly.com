const toggle = document.querySelector('.theme-toggle');
const systemTheme = matchMedia('(prefers-color-scheme: dark)');
function updateToggle() {
  const dark = document.documentElement.dataset.theme === 'dark';
  toggle.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} mode`);
  toggle.title = toggle.getAttribute('aria-label');
  document.querySelector('meta[name="theme-color"]').content = dark ? '#0c111d' : '#f8fafc';
}
toggle.addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = theme;
  try { localStorage.setItem('theme', theme); } catch {}
  updateToggle();
});
systemTheme.addEventListener('change', event => {
  let saved;
  try { saved = localStorage.getItem('theme'); } catch {}
  if (saved !== 'light' && saved !== 'dark') {
    document.documentElement.dataset.theme = event.matches ? 'dark' : 'light';
    updateToggle();
  }
});
updateToggle();

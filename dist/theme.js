const toggle = document.querySelector('.theme-toggle');
let activeCopy;
const systemTheme = matchMedia('(prefers-color-scheme: dark)');
function updateToggle() {
  const dark = document.documentElement.dataset.theme === 'dark';
  toggle.setAttribute('aria-label', activeCopy?.[dark ? 'switchLight' : 'switchDark'] || `Switch to ${dark ? 'light' : 'dark'} mode`);
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

const translations = window.portfolioTranslations;

// Isolate English technical terms and numeric units inside Arabic prose.
function renderTranslatedText(element, value, rtl) {
  if (!rtl) { element.textContent = value; return; }
  const fragment = document.createDocumentFragment();
  const pattern = /[A-Za-z][A-Za-z0-9.+-]*(?:[ ]+[A-Za-z0-9][A-Za-z0-9.+%/-]*)*|[0-9]+(?:[.,/][0-9]+)*(?:[ ]*(?:MiB|MB|CPU|%))?/g;
  let offset = 0;
  for (const match of value.matchAll(pattern)) {
    fragment.append(value.slice(offset, match.index));
    const isolated = document.createElement('bdi');
    isolated.dir = 'ltr';
    isolated.textContent = match[0];
    fragment.append(isolated);
    offset = match.index + match[0].length;
  }
  fragment.append(value.slice(offset));
  element.replaceChildren(fragment);
}

const languageSelect = document.querySelector('.language-select');
const languageNames = {en:'English',ar:'العربية',es:'Español',de:'Deutsch',fr:'Français',it:'Italiano',zh:'中文',ja:'日本語'};
function setLanguage(language) {
  const locale = translations[language] ? language : 'en';
  const rtl = locale === 'ar';
  const dictionary = translations[locale];
  document.documentElement.lang = locale === 'zh' ? 'zh-CN' : locale;
  document.documentElement.dir = rtl ? 'rtl' : 'ltr';
  document.documentElement.dataset.language = locale;
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.dataset.i18n;
    const value = dictionary[key];
    if (translations.en[key] !== undefined) {
      element.lang = dictionary[key] !== undefined ? (locale === 'zh' ? 'zh-CN' : locale) : 'en';
      element.dir = element.lang === 'ar' ? 'rtl' : 'ltr';
    }
    if (value !== undefined) renderTranslatedText(element, value, rtl);
  });
  document.querySelectorAll('[data-i18n-html]').forEach(element => {
    const value = dictionary[element.dataset.i18nHtml];
    if (value !== undefined) element.innerHTML = value;
  });
  document.querySelectorAll('[data-i18n-aria]').forEach(element => {
    element.setAttribute('aria-label', dictionary[element.dataset.i18nAria]);
  });
  const article = document.querySelector('[data-story-index]');
  if (article) {
    const prefix = `story${article.dataset.storyIndex}`;
    document.title = `${dictionary[prefix + 'Title']} | Taha Chelly`;
    for (const selector of ['meta[name="description"]', 'meta[property="og:description"]', 'meta[name="twitter:description"]']) {
      document.querySelector(selector)?.setAttribute('content', dictionary[prefix + 'Summary']);
    }
    for (const selector of ['meta[property="og:title"]', 'meta[name="twitter:title"]']) document.querySelector(selector)?.setAttribute('content', document.title);
    const schema = document.querySelector('script[type="application/ld+json"]');
    const data = JSON.parse(schema.textContent);
    Object.assign(data, { headline: dictionary[prefix + 'Title'], description: dictionary[prefix + 'Summary'], inLanguage: document.documentElement.lang });
    schema.textContent = JSON.stringify(data);
  }
  if (document.querySelector('[data-notebook-index]')) {
    document.title = `${dictionary.notebookTitle} | Taha Chelly`;
    for (const selector of ['meta[name="description"]', 'meta[property="og:description"]', 'meta[name="twitter:description"]']) document.querySelector(selector)?.setAttribute('content', dictionary.writingTitle);
    for (const selector of ['meta[property="og:title"]', 'meta[name="twitter:title"]']) document.querySelector(selector)?.setAttribute('content', document.title);
    const schema = document.querySelector('script[type="application/ld+json"]');
    const data = JSON.parse(schema.textContent);
    Object.assign(data, { name: dictionary.notebookTitle, description: dictionary.writingTitle, inLanguage: document.documentElement.lang });
    schema.textContent = JSON.stringify(data);
  }
  activeCopy = dictionary;
  updateToggle();
  document.querySelectorAll('a[target="_blank"][aria-label]').forEach(link => {
    link.setAttribute('aria-label', `${link.textContent.replace(/↗/g, '').trim()} (${dictionary.opensNewTab})`);
  });
  languageSelect.value = locale;
  languageSelect.setAttribute('aria-label', dictionary.languageLabel);
  document.querySelector('nav').setAttribute('aria-label', dictionary.navAbout + ' / ' + dictionary.navWork + ' / ' + dictionary.navProjects + ' / ' + dictionary.navContact);
  document.querySelector('.skip-link').textContent = locale === 'en' ? 'Skip to main content' : ({ar:'انتقل إلى المحتوى الرئيسي',es:'Saltar al contenido principal',de:'Zum Hauptinhalt springen',fr:'Aller au contenu principal',it:'Vai al contenuto principale',zh:'跳转到主要内容',ja:'メインコンテンツへ移動'})[locale];
  try { localStorage.setItem('language', locale); } catch {}
}
let savedLanguage = 'en';
try { savedLanguage = localStorage.getItem('language') || 'en'; } catch {}
setLanguage(savedLanguage);
languageSelect.addEventListener('change', event => setLanguage(event.target.value));

// A quiet reading-position indicator; no continuous animation or tracking.
const progress = document.querySelector('.reading-progress span');
if (progress) {
  const updateReadingProgress = () => {
    const article = document.querySelector('.engineering-article');
    const start = article.offsetTop;
    const distance = Math.max(1, article.offsetHeight - innerHeight);
    progress.style.transform = `scaleX(${Math.max(0, Math.min(1, (scrollY - start) / distance))})`;
  };
  addEventListener('scroll', updateReadingProgress, { passive: true });
  addEventListener('resize', updateReadingProgress);
  updateReadingProgress();
}

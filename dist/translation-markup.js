// A deliberately small translation grammar, shared by the browser and local tools.
// Never pass translations to an HTML parser or HTML insertion sink.
export const htmlTranslationKeys = new Set(['heroTitle', 'currentlyAt', 'workHeading', 'contactTitle']);
export function parseTranslationMarkup(value) {
  if (typeof value !== 'string') throw new Error('Translation must be text.');
  const root = { children: [] };
  const stack = [root];
  for (const part of value.match(/<[^>]*>|[^<]+|</g) || []) {
    const parent = stack.at(-1);
    if (!part.startsWith('<')) { parent.children.push(part); continue; }
    if (/^<br\s*\/?\s*>$/.test(part)) { parent.children.push({tag: 'br', children: []}); continue; }
    const opening = part === '<span>' ? {tag: 'span', children: []}
      : part === '<a href="#work">' ? {tag: 'a', href: '#work', children: []} : null;
    if (opening) { parent.children.push(opening); stack.push(opening); continue; }
    if ((part === '</span>' && parent.tag === 'span') || (part === '</a>' && parent.tag === 'a')) { stack.pop(); continue; }
    throw new Error('Only br, span, and the original #work link are allowed in translated markup.');
  }
  if (stack.length !== 1) throw new Error('Translated markup must have balanced tags.');
  return root.children;
}
export function validateTranslationMarkup(key, value) {
  if (htmlTranslationKeys.has(key)) return parseTranslationMarkup(value);
  if (typeof value !== 'string' || value.includes('<')) throw new Error('HTML is not allowed in this translation.');
  return [];
}
export function renderTranslationMarkup(element, value) {
  const nodes = parseTranslationMarkup(value);
  const build = node => {
    if (typeof node === 'string') return document.createTextNode(node);
    const child = document.createElement(node.tag);
    if (node.href) child.setAttribute('href', node.href);
    child.append(...node.children.map(build));
    return child;
  };
  element.replaceChildren(...nodes.map(build));
}

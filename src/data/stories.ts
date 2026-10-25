import en from './i18n/en.json';
const copy: Record<string, string> = en;
const metadata = [
  { slug: 'recognition-with-uncertainty', project: 'Quranic Shazam', preview: '/projects/quranic-shazam-home.png', projectUrl: '/projects/quranic-shazam/', source: 'https://github.com/taha3313/quranic-shazam#how-recognition-works', evidence: 'https://github.com/taha3313/quranic-shazam/blob/main/backend/data/eval_reports/eval_20260905T233619Z.md' },
  { slug: 'arabic-prosody-on-a-small-server', project: 'Qafiya', preview: '/projects/qafiya-desktop.png', projectUrl: '/projects/qafiya/', source: 'https://github.com/taha3313/arabic-poetry#stack-and-architecture', evidence: 'https://github.com/taha3313/arabic-poetry/blob/main/docs/TASHKEEL.md' },
];
export const stories = metadata.map((story, i) => ({
  ...story,
  title: copy[`story${i}Title`],
  summary: copy[`story${i}Summary`],
  sections: Array.from({ length: 4 }, (_, j) => ({ title: copy[`story${i}Section${j}Title`], text: copy[`story${i}Section${j}Text`] })),
}));

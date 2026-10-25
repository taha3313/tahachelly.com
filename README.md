# Taha Chelly

Personal website of Taha Chelly, a software engineer based in Sfax, Tunisia.

The site shares a short introduction, selected work and interests, and ways to get in touch. It is available in English, Arabic, Spanish, German, French, Italian, Chinese, and Japanese.

Visit [tahachelly.com](https://tahachelly.com).

## Translation review

All eight locales live in `src/data/i18n/{en,ar,es,de,fr,it,zh,ja}.json`. These are the editable source of truth, including article copy. `portfolio-i18n.js` is generated at build time; do not edit it directly.

Run `npm run translations:edit`, then open the printed `http://127.0.0.1:4180` URL. The local editor shows the English source and an editable target translation, with search and a protected-term hint. Save writes only the selected source JSON file. It never builds, commits, or deploys. Keep the editor running while editing; stop it with Ctrl+C. Preview your edits with `npm run build` and `npm run preview`. Review `git diff` before the normal publishing workflow.

`npm run check:i18n` checks complete locale coverage, protected technology names, and links inside translated HTML. The production build runs it automatically. Terminology and translation context live in `src/data/i18n/glossary.json`. Automated checks catch missing text and terminology errors; they cannot certify natural phrasing or linguistic accuracy.

For an open-source platform with machine-generated suggestions and an editing/review interface, **Weblate** is the recommended next integration. Its [JSON support](https://github.com/WeblateOrg/weblate/blob/main/docs/formats/json.rst), [Git integration](https://docs.weblate.org/en/latest/vcs.html), and [untranslatable glossary terms](https://github.com/WeblateOrg/weblate/blob/main/docs/user/glossary.rst) match this repository. Configure JSON format, `src/data/i18n/*.json` as the file mask, `src/data/i18n/en.json` as the monolingual base file, and a language filter for the eight supported languages (so `glossary.json` is excluded). Machine output should remain reviewable before publishing. Weblate is not installed or connected by this change; the local editor works without an external account or translation service.

[Inlang CLI](https://github.com/opral/inlang/blob/main/packages/cli/README.md) is a lighter repository-based option for machine translation and checks. [LibreTranslate](https://docs.libretranslate.com/guides/supported_languages/) is an open-source translation engine with English pairs for the seven target languages, but an engine alone does not provide the full editorial workflow.

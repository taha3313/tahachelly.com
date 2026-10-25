# Taha Chelly

Personal website of Taha Chelly, a software engineer based in Sfax, Tunisia.

The site shares a short introduction, selected work and interests, and ways to get in touch. It is available in English, Arabic, Spanish, German, French, Italian, Chinese, and Japanese.

Visit [tahachelly.com](https://tahachelly.com).

## Translation review

All eight locales live in `src/data/i18n/{en,ar,es,de,fr,it,zh,ja}.json`. These are the editable source of truth, including article copy. `portfolio-i18n.js` is generated at build time; do not edit it directly.

Run `npm run translations:edit`, then open the printed `http://127.0.0.1:4180` URL. The local editor shows the English source and an editable target translation, with search and a protected-term hint. Save writes only the selected source JSON file. It never builds, commits, or deploys. Keep the editor running while editing; stop it with Ctrl+C. Preview your edits with `npm run build` and `npm run preview`. Review `git diff` before the normal publishing workflow.

`npm run check:i18n` checks complete locale coverage, protected technical terms, reported benchmark values, and links inside translated HTML. The production build runs it automatically. Terminology and translation context live in `src/data/i18n/glossary.json`. Automated checks catch missing text and terminology errors; they cannot certify natural phrasing or linguistic accuracy.

For an open-source platform with machine-generated suggestions and an editing/review interface, **Weblate** is the connected local review platform. Its [JSON support](https://github.com/WeblateOrg/weblate/blob/main/docs/formats/json.rst), [Git integration](https://docs.weblate.org/en/latest/vcs.html), and [untranslatable glossary terms](https://github.com/WeblateOrg/weblate/blob/main/docs/user/glossary.rst) match this repository. Configure JSON format, `src/data/i18n/*.json` as the file mask, `src/data/i18n/en.json` as the monolingual base file, and a language filter for the eight supported languages (so `glossary.json` is excluded). Machine output should remain reviewable before publishing. The local Weblate setup is described below; the lightweight editor remains available as an alternative.

[Inlang CLI](https://github.com/opral/inlang/blob/main/packages/cli/README.md) is a lighter repository-based option for machine translation and checks. [LibreTranslate](https://docs.libretranslate.com/guides/supported_languages/) is an open-source translation engine with English pairs for the seven target languages, but an engine alone does not provide the full editorial workflow.

## Local Weblate

Weblate runs locally with PostgreSQL and Valkey, with persistent Docker volumes:

```sh
npm run weblate:start
npm run weblate:connect
npm run weblate:credentials
```

Open `http://127.0.0.1:8090/projects/tahachelly/website/`. The credentials command writes a private `login.txt` under `~/.local/share/tahachelly-weblate/`; passwords and API tokens never enter this repository. First startup includes database initialization and can take a few minutes. `npm run weblate:status` shows the services; `npm run weblate:stop` stops them while preserving translations. Use `TAHA_WEBLATE_STATE_DIR` to change the private configuration directory.

The website component imports the eight locale files directly from this checkout. Git cloning from inside the container was unreliable, so the connection uses Weblate’s supported local-repository mode and explicit API synchronization. Registration and automatic Git pushes are disabled. The project has translation review and suggestions enabled, with no automatic acceptance of suggestions. The glossary keeps technology names in English. Existing generated translations are editable directly in the Weblate translation editor; suggestions can be reviewed and accepted there before becoming translation text.

After editing and saving in Weblate:

```sh
npm run translations:pull
npm run build
npm run preview
```

The importer leaves English source strings under code control, detects conflicting local edits, rejects missing/fuzzy translations, and runs the locale/terminology checks before changing any source file. It backs up imported files outside the repository. It does not commit, push, or publish. Review `git diff` and use the normal publishing workflow when ready.

Use `npm run translations:push` to send changed local source/translation strings into Weblate. It checks for conflicts first, uploads only changed keys, and never publishes the website. English source changes can mark existing translations as needing editing, so review them before importing again. Source synchronization uses the complete monolingual JSON file, briefly unlocks it for the upload, and restores its previous read-only setting afterward. Conflicting source edits are checked before replacement. Source-key deletion is intentionally explicit: remove the corresponding source entries in Weblate rather than silently discarding translation history. Do not use repository **Reset**, which discards Weblate edits. Runtime state remains in the `tahachelly-weblate` Docker volumes and the private configuration directory; stopping containers does not remove it.

Machine-translation engines are separate from Weblate. This setup does not transmit strings to a third-party translation service or consume a paid provider key. Weblate's suggestions/editing workflow is ready for an engine to be configured under its automatic-suggestion settings; machine output should remain suggestions until reviewed.

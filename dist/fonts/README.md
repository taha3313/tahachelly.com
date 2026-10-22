# Arabic greeting font

`amiri-greeting.woff2` is a subset of `amiri-arabic.woff2` for the shared hero greeting `أهلًا وسهلًا`. It retains Arabic layout features, contextual forms, and vowel marks. Both files use the adjacent `OFL-Amiri.txt` license.

Regenerate with FontTools and Brotli installed:

```sh
pyftsubset fonts/amiri-arabic.woff2 --text='أهلًا وسهلًا' --layout-features='*' --flavor=woff2 --output-file=fonts/amiri-greeting.woff2
```

Keep the greeting font's CSS Unicode range in sync with the greeting text. No preload is needed: pages download the subset only when the greeting is visible.

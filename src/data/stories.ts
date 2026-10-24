export const stories = [
  {
    slug: 'recognition-with-uncertainty',
    title: 'When an audio match needs more context',
    summary: 'Separating speaker recognition from verse discovery, and making uncertainty part of the listening flow.',
    project: 'Quranic Shazam',
    projectUrl: '/projects/quranic-shazam/',
    source: 'https://github.com/taha3313/quranic-shazam#how-recognition-works',
    sections: [
      { title: 'Two questions, two pipelines', text: 'Recognizing a voice and recognizing words are different problems. Quranic Shazam uses ECAPA-TDNN speaker embeddings with ONNX Runtime to rank 20 reciter profiles. Verse discovery instead uses a Quran-tuned Whisper model, normalizes the Arabic transcript, and matches it against 6,236 verses. The speaker model is pretrained; it is not fine-tuned on Qur’an recordings.' },
      { title: 'Ask for context before claiming certainty', text: 'A short recitation can fit more than one verse. Progressive listening adds audio context up to a 60-second limit, while ambiguous results remain marked as uncertain. This trades a longer listening window for more context instead of forcing an early answer.' },
      { title: 'Keep inference away from the event loop', text: 'Model inference runs off the asynchronous API event loop. Uploads are capped at 25 MB, with separate audio-duration limits for recognition modes. These bounds make expensive requests finite while the API supports uploads and live microphone sessions.' },
      { title: 'Measure a defined task', text: 'The September 5, 2026 offline evaluation reports 97.31% top-1 and 99.10% top-3 reciter recognition across 781 held-out clips, using disjoint profile and evaluation surahs. Those results describe that reciter benchmark; they do not measure verse recognition or guarantee performance on arbitrary microphones, noise, or recordings.' },
    ],
    evidence: 'https://github.com/taha3313/quranic-shazam/blob/main/backend/data/eval_reports/eval_20260905T233619Z.md',
  },
  {
    slug: 'arabic-prosody-on-a-small-server',
    title: 'Arabic prosody on a small CPU server',
    summary: 'A 4.8 MB vocalization model, preserved vowel marks, and explicit limits on what automated analysis can claim.',
    project: 'Qafiya',
    projectUrl: '/projects/qafiya/',
    source: 'https://github.com/taha3313/arabic-poetry#stack-and-architecture',
    sections: [
      { title: 'Fit the model to the hosting budget', text: 'Qafiya pairs PyArud’s classical prosody analysis with a bundled approximately 4.8 MB libtashkeel ONNX model. Vocalization runs locally on the CPU without PyTorch, Transformers, a GPU, or an external model server. A single Uvicorn worker shares a bounded, serialized inference session, keeping model copies and simultaneous inference under control.' },
      { title: 'Preserve the author’s text', text: 'Existing vowel marks remain authoritative. Automatic vocalization fills missing marks and discloses changes; the interface shows the analyzed text while retaining the original input. The distinction matters because scansion depends on pronunciation, and a predicted vowel can change the result.' },
      { title: 'Test the container, then state the limits', text: 'The documented local whole-ASGI workload ran the production image under a 512 MiB RAM and 0.1 CPU cap, peaking at 142.55 MiB process RSS without an out-of-memory failure. This is evidence for a bounded workload, not a guarantee under arbitrary public traffic. In a separate 12-verse vocalization sample, partial-source meter matches improved from 2/12 to 10/12; fully unvocalized input reached only 2/12.' },
      { title: 'Keep repair bounded and sound text intact', text: 'The experimental drafting flow checks meter and the requested rawi, then revises failed verses with a bounded loop. The backend preserves accepted verses and sound hemistichs. Rawi equality is narrower than full classical rhyme validation, and machine acceptance does not certify literary quality. AI generation remains disabled in the public demo.' },
    ],
    evidence: 'https://github.com/taha3313/arabic-poetry/blob/main/docs/TASHKEEL.md',
  },
];

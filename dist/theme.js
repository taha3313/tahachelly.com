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

const translations = {
  en: {languageLabel:'Language',navAbout:'About',navWork:'Work',navContact:'Contact',intro:'HELLO, I’M TAHA',heroTitle:'Taha Chelly.<br><span>Software engineer.</span><br>Builder at heart.',heroDescription:'I build thoughtful AI-powered products, connecting reliable systems with intuitive user experiences.',connect:'Let’s connect',github:'GitHub',currentlyAt:'Currently at <a href="#work">SpeakDuo</a>',role:'Software Engineer',portraitNote:'Turning ideas into real-world experiences',aboutKicker:'A LITTLE CONTEXT',aboutTitle:'The person behind the code.',aboutText:'I’m Taha Chelly, a software engineer based in Sfax, Tunisia. I enjoy the whole journey of building a product: connecting a clear interface, a reliable backend, and the intelligence that makes it useful.',aboutDetail:'My experience spans web applications, ERP systems, and AI-powered language learning. I’m especially interested in where practical engineering meets human interaction.',tagFullStack:'Full-stack development',tagAI:'AI applications',tagRealtime:'Real-time experiences',workKicker:'WHAT I’M WORKING ON',workTitle:'Building with purpose.',current:'Current',workHeading:'Helping people learn languages.<br>One conversation at a time.',workDescription:'I work across SpeakDuo’s backend, web app, and voice agents—building live translation, speech feedback, interactive activities, and personalized practice.',remote:'Remote',toolkitTitle:'Some tools I work with',contactKicker:'GOOD THINGS START WITH A CONVERSATION',contactTitle:'Let’s build something<br><span>worth talking about.</span>',footerLine:'Built with care. Always evolving.',backToTop:'Back to top ↑'},
  ar: {languageLabel:'اللغة',navAbout:'نبذة',navWork:'العمل',navContact:'تواصل',intro:'أهلًا، أنا طه',heroTitle:'طه الشلي.<br><span>مهندس برمجيات.</span><br>وأحبّ أن أصنع.',heroDescription:'أصمّم وأطوّر منتجات ذكية بالذكاء الاصطناعي، تجمع بين أنظمة موثوقة وتجربة استخدام سهلة.',connect:'تواصل معي',github:'GitHub',currentlyAt:'أعمل حاليًا في <a href="#work">SpeakDuo</a>',role:'مهندس برمجيات',portraitNote:'أحوّل الأفكار إلى تجارب واقعية',aboutKicker:'نبذة عنّي',aboutTitle:'من يقف وراء الكود.',aboutText:'أنا طه الشلي، مهندس برمجيات من صفاقس في تونس. أحبّ رحلة بناء المنتج من بدايتها إلى نهايتها: واجهة واضحة، وbackend موثوق، وذكاء يجعل المنتج مفيدًا.',aboutDetail:'عملت على تطبيقات الويب وأنظمة ERP ومنتجات لتعلّم اللغات بالذكاء الاصطناعي. ويهمّني بشكل خاص كيف يمكن للهندسة العملية أن تجعل التفاعل بين الناس أفضل.',tagFullStack:'تطوير Full-stack',tagAI:'تطبيقات الذكاء الاصطناعي',tagRealtime:'تجارب آنية',workKicker:'ما أعمل عليه',workTitle:'أبني منتجات لها معنى.',current:'حاليًا',workHeading:'أساعد الناس على تعلّم اللغات،<br>محادثةً بعد محادثة.',workDescription:'أعمل على backend منصة SpeakDuo وتطبيقها ووكلائها الصوتيين، وأطوّر الترجمة المباشرة وملاحظات النطق والأنشطة التفاعلية والتدريب المخصّص.',remote:'عن بُعد',toolkitTitle:'بعض الأدوات التي أستخدمها',contactKicker:'كل شيء جميل يبدأ بمحادثة',contactTitle:'لنصنع شيئًا<br><span>يستحق الحديث عنه.</span>',footerLine:'بُني بعناية. ويتطور دائمًا.',backToTop:'العودة إلى الأعلى ↑'},
  es: {languageLabel:'Idioma',navAbout:'Sobre mí',navWork:'Trabajo',navContact:'Contacto',intro:'HOLA, SOY TAHA',heroTitle:'Taha Chelly.<br><span>Ingeniero de software.</span><br>Me mueve crear.',heroDescription:'Diseño productos de IA útiles que combinan sistemas fiables con experiencias sencillas e intuitivas.',connect:'Hablemos',github:'GitHub',currentlyAt:'Actualmente en <a href="#work">SpeakDuo</a>',role:'Ingeniero de software',portraitNote:'Convierto ideas en experiencias reales',aboutKicker:'UN POCO DE CONTEXTO',aboutTitle:'La persona detrás del código.',aboutText:'Soy Taha Chelly, ingeniero de software en Sfax, Túnez. Me gusta acompañar cada etapa de un producto: desde una interfaz clara y un backend fiable hasta la inteligencia que lo hace realmente útil.',aboutDetail:'He trabajado en aplicaciones web, sistemas ERP y aprendizaje de idiomas con IA. Me interesa especialmente cómo la ingeniería puede mejorar la forma en que las personas interactúan.',tagFullStack:'Desarrollo full-stack',tagAI:'Aplicaciones de IA',tagRealtime:'Experiencias en tiempo real',workKicker:'EN QUÉ ESTOY TRABAJANDO',workTitle:'Crear con propósito.',current:'Actual',workHeading:'Ayudo a las personas a aprender idiomas.<br>Una conversación cada vez.',workDescription:'Trabajo en el backend, la aplicación web y los agentes de voz de SpeakDuo: traducción en directo, comentarios sobre el habla, actividades interactivas y práctica personalizada.',remote:'Remoto',toolkitTitle:'Algunas herramientas que uso',contactKicker:'LAS BUENAS IDEAS EMPIEZAN CON UNA CONVERSACIÓN',contactTitle:'Creemos algo<br><span>que merezca la pena compartir.</span>',footerLine:'Hecho con cuidado. En constante evolución.',backToTop:'Volver arriba ↑'},
  de: {languageLabel:'Sprache',navAbout:'Über mich',navWork:'Arbeit',navContact:'Kontakt',intro:'HALLO, ICH BIN TAHA',heroTitle:'Taha Chelly.<br><span>Softwareentwickler.</span><br>Mit Freude am Gestalten.',heroDescription:'Ich entwickle durchdachte KI-Produkte, die zuverlässige Systeme mit einer intuitiven Nutzung verbinden.',connect:'Lass uns sprechen',github:'GitHub',currentlyAt:'Derzeit bei <a href="#work">SpeakDuo</a>',role:'Softwareentwickler',portraitNote:'Ich mache aus Ideen echte Erlebnisse',aboutKicker:'KURZ ZU MIR',aboutTitle:'Der Mensch hinter dem Code.',aboutText:'Ich bin Taha Chelly, Softwareentwickler aus Sfax in Tunesien. Mir gefällt der gesamte Weg von der ersten Idee bis zum fertigen Produkt: eine klare Oberfläche, ein zuverlässiges Backend und die passende Intelligenz, die es nützlich macht.',aboutDetail:'Ich habe an Webanwendungen, ERP-Systemen und KI-gestütztem Sprachenlernen gearbeitet. Besonders interessiert mich, wie gute Technik den Austausch zwischen Menschen verbessern kann.',tagFullStack:'Full-Stack-Entwicklung',tagAI:'KI-Anwendungen',tagRealtime:'Echtzeiterlebnisse',workKicker:'WORAN ICH ARBEITE',workTitle:'Mit Sinn und Zweck bauen.',current:'Aktuell',workHeading:'Ich helfe Menschen, Sprachen zu lernen.<br>Gespräch für Gespräch.',workDescription:'Ich arbeite am Backend, an der Web-App und an Sprachagenten von SpeakDuo: Live-Übersetzung, Sprachfeedback, interaktive Aktivitäten und individuelles Üben.',remote:'Remote',toolkitTitle:'Einige Tools, mit denen ich arbeite',contactKicker:'GUTE IDEEN BEGINNEN MIT EINEM GESPRÄCH',contactTitle:'Lass uns etwas schaffen,<br><span>über das man gern spricht.</span>',footerLine:'Mit Sorgfalt entwickelt. Immer im Wandel.',backToTop:'Nach oben ↑'},
  fr: {languageLabel:'Langue',navAbout:'À propos',navWork:'Projets',navContact:'Contact',intro:'BONJOUR, JE SUIS TAHA',heroTitle:'Taha Chelly.<br><span>Ingénieur logiciel.</span><br>J’aime créer.',heroDescription:'Je conçois des produits d’IA utiles qui associent des systèmes fiables à une expérience simple et intuitive.',connect:'Parlons-en',github:'GitHub',currentlyAt:'Actuellement chez <a href="#work">SpeakDuo</a>',role:'Ingénieur logiciel',portraitNote:'Je transforme les idées en expériences concrètes',aboutKicker:'QUELQUES MOTS',aboutTitle:'La personne derrière le code.',aboutText:'Je suis Taha Chelly, ingénieur logiciel à Sfax, en Tunisie. J’aime accompagner un produit de l’idée à sa réalisation : une interface claire, un backend fiable et l’intelligence qui le rend vraiment utile.',aboutDetail:'J’ai travaillé sur des applications web, des systèmes ERP et des outils d’apprentissage des langues fondés sur l’IA. Je m’intéresse surtout à la façon dont la technologie peut enrichir les échanges humains.',tagFullStack:'Développement full-stack',tagAI:'Applications d’IA',tagRealtime:'Expériences en temps réel',workKicker:'MES PROJETS ACTUELS',workTitle:'Créer avec du sens.',current:'En cours',workHeading:'J’aide chacun à apprendre des langues.<br>Une conversation à la fois.',workDescription:'Je travaille sur le backend, l’application web et les agents vocaux de SpeakDuo : traduction en direct, retours sur la parole, activités interactives et pratique personnalisée.',remote:'À distance',toolkitTitle:'Quelques outils que j’utilise',contactKicker:'LES BELLES IDÉES COMMENCENT PAR UNE CONVERSATION',contactTitle:'Créons quelque chose<br><span>qui mérite qu’on en parle.</span>',footerLine:'Créé avec soin. Toujours en évolution.',backToTop:'Retour en haut ↑'},
  it: {languageLabel:'Lingua',navAbout:'Chi sono',navWork:'Lavoro',navContact:'Contatti',intro:'CIAO, SONO TAHA',heroTitle:'Taha Chelly.<br><span>Ingegnere del software.</span><br>Mi piace creare.',heroDescription:'Progetto prodotti di IA utili, unendo sistemi affidabili a esperienze semplici e intuitive.',connect:'Parliamone',github:'GitHub',currentlyAt:'Attualmente in <a href="#work">SpeakDuo</a>',role:'Ingegnere del software',portraitNote:'Trasformo le idee in esperienze concrete',aboutKicker:'QUALCHE INFORMAZIONE',aboutTitle:'La persona dietro il codice.',aboutText:'Sono Taha Chelly, ingegnere del software a Sfax, in Tunisia. Mi piace seguire un prodotto dall’idea alla realizzazione: un’interfaccia chiara, un backend affidabile e l’intelligenza che lo rende davvero utile.',aboutDetail:'Ho lavorato su applicazioni web, sistemi ERP e apprendimento delle lingue con l’IA. Mi interessa soprattutto come la tecnologia possa migliorare il modo in cui le persone interagiscono.',tagFullStack:'Sviluppo full-stack',tagAI:'Applicazioni IA',tagRealtime:'Esperienze in tempo reale',workKicker:'A COSA STO LAVORANDO',workTitle:'Costruire con uno scopo.',current:'Attuale',workHeading:'Aiuto le persone a imparare le lingue.<br>Una conversazione alla volta.',workDescription:'Lavoro sul backend, sull’app web e sugli agenti vocali di SpeakDuo: traduzione dal vivo, feedback sul parlato, attività interattive ed esercizi personalizzati.',remote:'Da remoto',toolkitTitle:'Alcuni strumenti che uso',contactKicker:'LE BELLE IDEE INIZIANO CON UNA CONVERSAZIONE',contactTitle:'Creiamo qualcosa<br><span>di cui valga la pena parlare.</span>',footerLine:'Creato con cura. In continua evoluzione.',backToTop:'Torna all’inizio ↑'},
  zh: {languageLabel:'语言',navAbout:'关于',navWork:'工作',navContact:'联系',intro:'你好，我是 TAHA',heroTitle:'Taha Chelly。<br><span>软件工程师。</span><br>热爱创造。',heroDescription:'我打造精心设计的 AI 产品，将可靠的系统与直观的用户体验连接起来。',connect:'联系我',github:'GitHub',currentlyAt:'目前就职于 <a href="#work">SpeakDuo</a>',role:'软件工程师',portraitNote:'将想法转化为真实体验',aboutKicker:'关于我',aboutTitle:'代码背后的人。',aboutText:'我叫 Taha Chelly，是一名常驻突尼斯斯法克斯的软件工程师。我喜欢参与产品从构想到落地的全过程：打造清晰的界面、可靠的 backend，以及真正能解决问题的智能功能。',aboutDetail:'我做过 Web 应用、ERP 系统和 AI 语言学习产品。我尤其关注如何用扎实的技术改善人与人之间的交流。',tagFullStack:'全栈开发',tagAI:'AI 应用',tagRealtime:'实时体验',workKicker:'我正在做的事',workTitle:'有目标地创造。',current:'目前',workHeading:'帮助人们学好语言，<br>从一次次对话开始。',workDescription:'我负责 SpeakDuo 的 backend、Web 应用和语音代理，开发实时翻译、口语反馈、互动练习和个性化学习功能。',remote:'远程',toolkitTitle:'我使用的一些工具',contactKicker:'美好的想法始于一次交流',contactTitle:'一起做出<br><span>值得分享的作品。</span>',footerLine:'用心打造，不断进步。',backToTop:'返回顶部 ↑'},
  ja: {languageLabel:'言語',navAbout:'プロフィール',navWork:'仕事',navContact:'連絡先',intro:'こんにちは、タハです',heroTitle:'Taha Chelly。<br><span>ソフトウェアエンジニア。</span><br>ものづくりが好きです。',heroDescription:'信頼できるシステムと直感的な体験をつなぐ、丁寧に設計されたAI製品を作っています。',connect:'連絡する',github:'GitHub',currentlyAt:'現在 <a href="#work">SpeakDuo</a> に在籍',role:'ソフトウェアエンジニア',portraitNote:'アイデアを現実の体験に変える',aboutKicker:'少しだけ自己紹介',aboutTitle:'コードを書く人。',aboutText:'チュニジアのスファックスを拠点に活動するソフトウェアエンジニア、Taha Chellyです。わかりやすい画面、信頼できるbackend、そして本当に役立つ機能を形にするまで、製品づくりの全工程に携わるのが好きです。',aboutDetail:'WebアプリやERPシステム、AIを活用した語学学習に携わってきました。技術を通じて、人と人とのやり取りをより良くすることに関心があります。',tagFullStack:'フルスタック開発',tagAI:'AIアプリケーション',tagRealtime:'リアルタイム体験',workKicker:'取り組んでいること',workTitle:'目的を持って作る。',current:'在籍中',workHeading:'会話を重ねながら、<br>言語学習をサポートします。',workDescription:'SpeakDuoのbackend、Webアプリ、音声エージェントを担当し、リアルタイム翻訳や発話へのフィードバック、対話型アクティビティ、個別練習を開発しています。',remote:'リモート',toolkitTitle:'使用しているツール',contactKicker:'良いアイデアは会話から',contactTitle:'誰かに話したくなるものを<br><span>一緒に作りましょう。</span>',footerLine:'丁寧に作り、進化を続けています。',backToTop:'ページ上部へ ↑'}
};
const projectTranslations = {
  "en": {
    "navProjects": "Projects",
    "projectsKicker": "SELECTED PROJECTS",
    "projectsTitle": "Ideas brought to life.",
    "viewProject": "Explore project ↗",
    "projectCategory": "AUDIO · AI · WEB",
    "projectSummary": "Discover who is reciting and which verse you’re hearing. An audio recognition app for Qur’an recitation, with live listening and file uploads.",
    "backProjects": "← All projects",
    "liveDemo": "Try the live demo",
    "sourceCode": "View on GitHub",
    "screenshotsKicker": "A LOOK INSIDE",
    "screenshotsTitle": "Two ways to explore a recitation.",
    "reciterCaption": "Reciter recognition — upload audio or listen live.",
    "verseCaption": "Verse discovery — find the surah and ayah from a recitation.",
    "approachKicker": "BEHIND THE EXPERIENCE",
    "approachTitle": "From sound to a meaningful match.",
    "reciterTitle": "Recognize the reciter",
    "reciterDetail": "An ECAPA-TDNN model creates a voice embedding. ONNX Runtime runs inference, then cosine similarity ranks matches against profiles for 20 reciters.",
    "verseTitle": "Find the verse",
    "verseDetail": "A Quran-tuned Whisper model transcribes the Arabic audio. Normalized text is matched against 6,236 verses to find likely surah and ayah matches.",
    "contextTitle": "Listen for more context",
    "contextDetail": "When a verse match is ambiguous, progressive listening gathers more audio context. Uncertain results stay marked as uncertain.",
    "stackKicker": "BUILT WITH",
    "stackTitle": "The technology behind it.",
    "frontendDetail": "Frontend: React 19 and TypeScript, built with Vite and Tailwind CSS 4. Browser microphone capture and file uploads connect to the API.",
    "backendDetail": "Backend: Python and FastAPI, with WebSockets for live reciter recognition. ONNX Runtime handles speaker embeddings; faster-whisper and CTranslate2 handle verse transcription.",
    "deployDetail": "Delivery: Docker containers on Render, with Nginx serving the frontend. GitHub Actions checks the backend and frontend before deploying affected services.",
    "tryTitle": "Hear it. Discover it."
  },
  "fr": {
    "navProjects": "Projets",
    "projectsKicker": "PROJETS PERSONNELS",
    "projectsTitle": "Des idées qui prennent vie.",
    "viewProject": "Découvrir le projet ↗",
    "projectCategory": "AUDIO · IA · WEB",
    "projectSummary": "Identifiez le récitateur et retrouvez le verset que vous écoutez. Une application de reconnaissance de récitations du Coran, en direct ou à partir d’un fichier audio.",
    "backProjects": "← Tous les projets",
    "liveDemo": "Essayer la démo",
    "sourceCode": "Voir sur GitHub",
    "screenshotsKicker": "EN IMAGES",
    "screenshotsTitle": "Deux façons d’explorer une récitation.",
    "reciterCaption": "Reconnaissance du récitateur : importez un fichier ou écoutez en direct.",
    "verseCaption": "Recherche de versets : retrouvez la sourate et le verset récités.",
    "approachKicker": "COMMENT ÇA MARCHE",
    "approachTitle": "Du son à la reconnaissance.",
    "reciterTitle": "Identifier le récitateur",
    "reciterDetail": "ECAPA-TDNN produit une empreinte vocale avec ONNX Runtime. La similarité cosinus classe les correspondances parmi les profils de 20 récitateurs.",
    "verseTitle": "Retrouver le verset",
    "verseDetail": "Un modèle Whisper adapté au Coran transcrit l’audio arabe. Le texte normalisé est comparé à 6 236 versets pour retrouver la sourate et les versets probables.",
    "contextTitle": "Écouter davantage",
    "contextDetail": "Si plusieurs versets restent possibles, l’écoute progressive recueille plus de contexte. Les résultats incertains sont signalés comme tels.",
    "stackKicker": "TECHNOLOGIES",
    "stackTitle": "Les outils derrière le projet.",
    "frontendDetail": "Interface : React 19, TypeScript, Vite et Tailwind CSS 4. Le microphone du navigateur et les fichiers audio sont reliés à l’API.",
    "backendDetail": "Backend : Python et FastAPI, avec WebSockets pour la reconnaissance en direct. ONNX Runtime traite les empreintes vocales ; faster-whisper et CTranslate2 transcrivent les versets.",
    "deployDetail": "Déploiement : conteneurs Docker sur Render et interface servie par Nginx. GitHub Actions vérifie les deux applications avant de déployer les services modifiés.",
    "tryTitle": "Écoutez. Découvrez."
  },
  "ar": {
    "navProjects": "المشاريع",
    "projectsKicker": "مشاريع مختارة",
    "projectsTitle": "أفكار أصبحت واقعًا.",
    "viewProject": "اكتشف المشروع ↗",
    "projectCategory": "صوت · ذكاء اصطناعي · ويب",
    "projectSummary": "تعرّف على القارئ واكتشف الآية التي تسمعها. تطبيق للتعرّف على تلاوات القرآن الكريم، بالاستماع المباشر أو رفع ملف صوتي.",
    "backProjects": "→ جميع المشاريع",
    "liveDemo": "جرّب التطبيق",
    "sourceCode": "الكود على GitHub",
    "screenshotsKicker": "صور من التطبيق",
    "screenshotsTitle": "طريقتان لاستكشاف التلاوة.",
    "reciterCaption": "التعرّف على القارئ: ارفع تسجيلًا أو استمع مباشرةً.",
    "verseCaption": "اكتشاف الآيات: اعثر على السورة والآية من التلاوة.",
    "approachKicker": "كيف يعمل",
    "approachTitle": "من الصوت إلى التعرّف على التلاوة.",
    "reciterTitle": "التعرّف على القارئ",
    "reciterDetail": "ينشئ نموذج ECAPA-TDNN بصمة صوتية باستخدام ONNX Runtime، ثم يرتّب التشابه الجيبي النتائج بمقارنتها ببصمات 20 قارئًا.",
    "verseTitle": "العثور على الآية",
    "verseDetail": "يحوّل نموذج Whisper المخصّص للقرآن الصوت العربي إلى نص، ثم يُقارَن النص بعد توحيده مع 6236 آية لتحديد السورة والآيات المحتملة.",
    "contextTitle": "الاستماع إلى سياق أوسع",
    "contextDetail": "عند التباس الآية، يجمع الاستماع التدريجي مزيدًا من الصوت لفهم السياق. وتظلّ النتائج غير المؤكّدة موسومة بوضوح.",
    "stackKicker": "التقنيات",
    "stackTitle": "التقنيات وراء التطبيق.",
    "frontendDetail": "الواجهة: React 19 وTypeScript مع Vite وTailwind CSS 4. تتصل تسجيلات ميكروفون المتصفح والملفات الصوتية بالـ API.",
    "backendDetail": "الخادم: Python وFastAPI مع WebSockets للتعرّف المباشر على القارئ. يعالج ONNX Runtime البصمات الصوتية، ويتولى faster-whisper وCTranslate2 تحويل التلاوة إلى نص.",
    "deployDetail": "النشر: حاويات Docker على Render مع Nginx لتقديم الواجهة. يفحص GitHub Actions الواجهة والخادم قبل نشر الخدمات المعدّلة.",
    "tryTitle": "استمع. واكتشف."
  },
  "es": {
    "navProjects": "Proyectos",
    "projectsKicker": "PROYECTOS SELECCIONADOS",
    "projectsTitle": "Ideas que cobran vida.",
    "viewProject": "Explorar el proyecto ↗",
    "projectCategory": "AUDIO · IA · WEB",
    "projectSummary": "Descubre quién recita y qué aleya estás escuchando. Reconocimiento de recitaciones del Corán, en directo o mediante archivos de audio.",
    "backProjects": "← Todos los proyectos",
    "liveDemo": "Probar la demo",
    "sourceCode": "Ver en GitHub",
    "screenshotsKicker": "EN IMÁGENES",
    "screenshotsTitle": "Dos formas de explorar una recitación.",
    "reciterCaption": "Reconocimiento del recitador: sube audio o escucha en directo.",
    "verseCaption": "Búsqueda de aleyas: encuentra la sura y la aleya recitadas.",
    "approachKicker": "CÓMO FUNCIONA",
    "approachTitle": "Del sonido a la identificación.",
    "reciterTitle": "Identificar al recitador",
    "reciterDetail": "ECAPA-TDNN genera una huella vocal con ONNX Runtime. La similitud coseno ordena las coincidencias entre perfiles de 20 recitadores.",
    "verseTitle": "Encontrar la aleya",
    "verseDetail": "Un modelo Whisper adaptado al Corán transcribe el audio árabe. El texto normalizado se compara con 6236 aleyas para encontrar las coincidencias probables.",
    "contextTitle": "Escuchar más contexto",
    "contextDetail": "Si la coincidencia es ambigua, la escucha progresiva añade más audio. Los resultados inciertos se indican como tales.",
    "stackKicker": "TECNOLOGÍAS",
    "stackTitle": "La tecnología del proyecto.",
    "frontendDetail": "Interfaz: React 19, TypeScript, Vite y Tailwind CSS 4. El micrófono del navegador y los archivos de audio se conectan a la API.",
    "backendDetail": "Backend: Python y FastAPI con WebSockets para el reconocimiento en directo. ONNX Runtime procesa las huellas vocales; faster-whisper y CTranslate2 transcriben las aleyas.",
    "deployDetail": "Despliegue: contenedores Docker en Render y Nginx para la interfaz. GitHub Actions comprueba ambas aplicaciones antes de desplegar los servicios modificados.",
    "tryTitle": "Escucha. Descubre."
  },
  "de": {
    "navProjects": "Projekte",
    "projectsKicker": "AUSGEWÄHLTE PROJEKTE",
    "projectsTitle": "Ideen werden Wirklichkeit.",
    "viewProject": "Projekt entdecken ↗",
    "projectCategory": "AUDIO · KI · WEB",
    "projectSummary": "Erkenne den Rezitator und finde den Vers, den du hörst. Eine App zur Erkennung von Koranrezitationen mit Live-Aufnahme und Audio-Upload.",
    "backProjects": "← Alle Projekte",
    "liveDemo": "Live-Demo ausprobieren",
    "sourceCode": "Auf GitHub ansehen",
    "screenshotsKicker": "EINBLICKE",
    "screenshotsTitle": "Zwei Wege, eine Rezitation zu entdecken.",
    "reciterCaption": "Rezitator erkennen: Audiodatei hochladen oder live zuhören.",
    "verseCaption": "Verse finden: Sure und Vers einer Rezitation bestimmen.",
    "approachKicker": "SO FUNKTIONIERT ES",
    "approachTitle": "Vom Klang zum passenden Treffer.",
    "reciterTitle": "Rezitator erkennen",
    "reciterDetail": "ECAPA-TDNN erstellt mit ONNX Runtime einen Stimmabdruck. Die Kosinusähnlichkeit ordnet Treffer unter den Profilen von 20 Rezitatoren.",
    "verseTitle": "Vers finden",
    "verseDetail": "Ein auf den Koran abgestimmtes Whisper-Modell transkribiert arabische Aufnahmen. Der normalisierte Text wird mit 6.236 Versen verglichen.",
    "contextTitle": "Mehr Kontext hören",
    "contextDetail": "Bei mehrdeutigen Versen sammelt die schrittweise Aufnahme mehr Kontext. Unsichere Ergebnisse bleiben entsprechend gekennzeichnet.",
    "stackKicker": "TECHNOLOGIEN",
    "stackTitle": "Die Technik dahinter.",
    "frontendDetail": "Frontend: React 19, TypeScript, Vite und Tailwind CSS 4. Browsermikrofon und Audio-Uploads sind mit der API verbunden.",
    "backendDetail": "Backend: Python und FastAPI mit WebSockets für Live-Erkennung. ONNX Runtime verarbeitet Stimmabdrücke; faster-whisper und CTranslate2 transkribieren Verse.",
    "deployDetail": "Bereitstellung: Docker-Container auf Render, Nginx für das Frontend. GitHub Actions prüft beide Anwendungen vor der Bereitstellung geänderter Dienste.",
    "tryTitle": "Hören. Entdecken."
  },
  "it": {
    "navProjects": "Progetti",
    "projectsKicker": "PROGETTI SELEZIONATI",
    "projectsTitle": "Idee che prendono vita.",
    "viewProject": "Esplora il progetto ↗",
    "projectCategory": "AUDIO · IA · WEB",
    "projectSummary": "Scopri chi recita e quale versetto stai ascoltando. Un’app per riconoscere le recitazioni del Corano, dal vivo o caricando un file audio.",
    "backProjects": "← Tutti i progetti",
    "liveDemo": "Prova la demo",
    "sourceCode": "Vedi su GitHub",
    "screenshotsKicker": "UNO SGUARDO ALL’APP",
    "screenshotsTitle": "Due modi per esplorare una recitazione.",
    "reciterCaption": "Riconoscimento del recitatore: carica un audio o ascolta dal vivo.",
    "verseCaption": "Ricerca dei versetti: trova la sura e il versetto recitati.",
    "approachKicker": "COME FUNZIONA",
    "approachTitle": "Dal suono al riconoscimento.",
    "reciterTitle": "Riconoscere il recitatore",
    "reciterDetail": "ECAPA-TDNN crea un’impronta vocale con ONNX Runtime. La similarità coseno ordina le corrispondenze tra i profili di 20 recitatori.",
    "verseTitle": "Trovare il versetto",
    "verseDetail": "Un modello Whisper adattato al Corano trascrive l’audio arabo. Il testo normalizzato viene confrontato con 6236 versetti.",
    "contextTitle": "Ascoltare più contesto",
    "contextDetail": "Se il versetto è ambiguo, l’ascolto progressivo raccoglie più audio. I risultati incerti rimangono segnalati come tali.",
    "stackKicker": "TECNOLOGIE",
    "stackTitle": "La tecnologia del progetto.",
    "frontendDetail": "Frontend: React 19, TypeScript, Vite e Tailwind CSS 4. Microfono del browser e file audio si collegano all’API.",
    "backendDetail": "Backend: Python e FastAPI con WebSockets per il riconoscimento dal vivo. ONNX Runtime gestisce le impronte vocali; faster-whisper e CTranslate2 trascrivono i versetti.",
    "deployDetail": "Distribuzione: container Docker su Render e Nginx per il frontend. GitHub Actions verifica entrambe le applicazioni prima di distribuire i servizi modificati.",
    "tryTitle": "Ascolta. Scopri."
  },
  "zh": {
    "navProjects": "项目",
    "projectsKicker": "精选项目",
    "projectsTitle": "让想法成为现实。",
    "viewProject": "探索项目 ↗",
    "projectCategory": "音频 · AI · WEB",
    "projectSummary": "识别诵读者，查找正在聆听的经文。支持实时聆听和音频上传的《古兰经》诵读识别应用。",
    "backProjects": "← 所有项目",
    "liveDemo": "体验在线演示",
    "sourceCode": "在 GitHub 上查看",
    "screenshotsKicker": "应用截图",
    "screenshotsTitle": "两种方式探索诵读。",
    "reciterCaption": "诵读者识别：上传音频或实时聆听。",
    "verseCaption": "经文查找：从诵读中找到章名和节号。",
    "approachKicker": "工作原理",
    "approachTitle": "从声音到识别结果。",
    "reciterTitle": "识别诵读者",
    "reciterDetail": "ECAPA-TDNN 通过 ONNX Runtime 生成声纹，再用余弦相似度与 20 位诵读者的声纹进行匹配和排序。",
    "verseTitle": "查找经文",
    "verseDetail": "针对《古兰经》优化的 Whisper 模型将阿拉伯语音频转为文字。规范化后的文本与 6,236 节经文进行比对。",
    "contextTitle": "聆听更多上下文",
    "contextDetail": "匹配不明确时，渐进式聆听会收集更多音频。不确定的结果会明确标注。",
    "stackKicker": "技术栈",
    "stackTitle": "项目背后的技术。",
    "frontendDetail": "前端：React 19、TypeScript、Vite 和 Tailwind CSS 4。浏览器麦克风与音频上传连接至 API。",
    "backendDetail": "后端：Python 和 FastAPI，通过 WebSockets 实时识别诵读者。ONNX Runtime 处理声纹；faster-whisper 和 CTranslate2 转录经文。",
    "deployDetail": "部署：Render 上的 Docker 容器，Nginx 提供前端服务。GitHub Actions 检查前后端后，部署有变更的服务。",
    "tryTitle": "聆听，发现。"
  },
  "ja": {
    "navProjects": "プロジェクト",
    "projectsKicker": "制作したプロジェクト",
    "projectsTitle": "アイデアを形に。",
    "viewProject": "プロジェクトを見る ↗",
    "projectCategory": "音声 · AI · WEB",
    "projectSummary": "朗誦者と、今聞いている節を見つける。リアルタイムの音声入力とファイルアップロードに対応したクルアーン朗誦認識アプリ。",
    "backProjects": "← プロジェクト一覧",
    "liveDemo": "デモを試す",
    "sourceCode": "GitHub で見る",
    "screenshotsKicker": "アプリの画面",
    "screenshotsTitle": "朗誦を探る、2つの方法。",
    "reciterCaption": "朗誦者の認識：音声をアップロード、またはリアルタイムで入力。",
    "verseCaption": "節の検索：朗誦から章と節を見つける。",
    "approachKicker": "仕組み",
    "approachTitle": "音声から、一致する朗誦へ。",
    "reciterTitle": "朗誦者を識別",
    "reciterDetail": "ECAPA-TDNN が ONNX Runtime で声紋を生成。コサイン類似度で20人の朗誦者の声紋と比較し、候補を順位付けします。",
    "verseTitle": "節を見つける",
    "verseDetail": "クルアーン向けに調整した Whisper がアラビア語音声を文字に変換。正規化したテキストを6,236節と照合します。",
    "contextTitle": "さらに聞いて判断",
    "contextDetail": "候補が曖昧な場合は、段階的に音声を追加して文脈を集めます。不確かな結果はその旨を表示します。",
    "stackKicker": "技術スタック",
    "stackTitle": "アプリを支える技術。",
    "frontendDetail": "フロントエンド：React 19、TypeScript、Vite、Tailwind CSS 4。ブラウザーのマイク入力と音声ファイルを API に接続します。",
    "backendDetail": "バックエンド：Python と FastAPI。WebSockets でリアルタイム認識に対応。ONNX Runtime が声紋処理、faster-whisper と CTranslate2 が文字起こしを担当します。",
    "deployDetail": "デプロイ：Render 上の Docker コンテナーと Nginx。GitHub Actions で両アプリを検証し、変更されたサービスをデプロイします。",
    "tryTitle": "聞いて、見つける。"
  }
};
const qafiyaTranslations = {
  en: { qafiyaCategory:'LANGUAGE · POETRY · AI', qafiyaSummary:'An Arabic poetry workshop for classical meter, rhyme, readable scansion, and local vocalization.', qafiyaCaptionDesk:'Writing desk — choose a classical meter and rhyme letter, then inspect the verse.', qafiyaCaptionMobile:'Responsive Arabic-first poetry analysis on mobile.', qafiyaApproachTitle:'From a written verse to its rhythm.', qafiyaAnalysisTitle:'Analyze classical meter', qafiyaAnalysisDetail:'Check Arabic verses against 16 classical meters with PyArud. Explore the صدر and عجز, binary scansion, feet, and the requested rawi.', qafiyaTashkeelTitle:'Complete vocalization locally', qafiyaTashkeelDetail:'A bundled 4.8 MB libtashkeel ONNX model fills missing vowel marks on the CPU. Supplied vowels remain authoritative; analysis does not call an LLM.', qafiyaDraftTitle:'Drafting is experimental', qafiyaDraftDetail:'An optional provider adapter drafts poems and targets revisions at failed verses while preserving accepted text. Generation is currently disabled on the public demo.', qafiyaFrontend:'Frontend: React 19, TypeScript, and Vite, with a responsive Arabic RTL interface.', qafiyaBackend:'Backend: Python 3.12, FastAPI, PyArud, NumPy, and CPU ONNX Runtime. A single worker shares a bounded inference session.', qafiyaDeploy:'Hosting: Cloudflare Pages frontend and Render Docker API. GitHub Actions checks the frontend, backend, and production container.', qafiyaTryTitle:'Explore meter and rhyme.', generationPaused:'Analysis is available in the live demo. AI generation is currently disabled.' },
  fr: { qafiyaCategory:'LANGUE · POÉSIE · IA', qafiyaSummary:'Un atelier de poésie arabe pour explorer le mètre classique, la rime, la scansion et la vocalisation locale.', qafiyaCaptionDesk:'Espace d’écriture — choisissez un mètre classique et une rime, puis examinez le vers.', qafiyaCaptionMobile:'Analyse de poésie arabe adaptée au mobile.', qafiyaApproachTitle:'Du vers écrit à son rythme.', qafiyaAnalysisTitle:'Analyser le mètre classique', qafiyaAnalysisDetail:'Compare les vers arabes à 16 mètres classiques avec PyArud. Explorez les deux hémistiches, la scansion binaire, les pieds et la lettre de rime.', qafiyaTashkeelTitle:'Compléter les voyelles localement', qafiyaTashkeelDetail:'Un modèle ONNX libtashkeel de 4,8 Mo complète les signes vocaliques manquants sur CPU. Les voyelles fournies restent prioritaires ; l’analyse n’appelle pas de LLM.', qafiyaDraftTitle:'La génération reste expérimentale', qafiyaDraftDetail:'Un adaptateur optionnel rédige des poèmes et corrige les vers en échec tout en préservant le texte accepté. La génération est désactivée sur la démo publique.', qafiyaFrontend:'Frontend : React 19, TypeScript et Vite, avec une interface arabe RTL adaptative.', qafiyaBackend:'Backend : Python 3.12, FastAPI, PyArud, NumPy et ONNX Runtime CPU. Un seul worker partage une session d’inférence limitée.', qafiyaDeploy:'Hébergement : frontend Cloudflare Pages et API Docker sur Render. GitHub Actions vérifie le frontend, le backend et le conteneur.', qafiyaTryTitle:'Explorez le mètre et la rime.', generationPaused:'L’analyse est disponible sur la démo. La génération IA est désactivée.' },
  ar: { qafiyaCategory:'اللغة · الشعر · الذكاء الاصطناعي', qafiyaSummary:'ورشة للشعر العربي تستكشف الوزن الخليلي والقافية والتقطيع وإكمال التشكيل محليًا.', qafiyaCaptionDesk:'مساحة الكتابة — اختر بحرًا ورويًا، ثم استكشف إيقاع البيت.', qafiyaCaptionMobile:'تحليل للشعر العربي بواجهة ملائمة للهاتف.', qafiyaApproachTitle:'من البيت المكتوب إلى إيقاعه.', qafiyaAnalysisTitle:'تحليل البحور الشعرية', qafiyaAnalysisDetail:'يفحص الأبيات وفق 16 بحرًا باستخدام PyArud. استكشف الصدر والعجز والتقطيع والتفعيلات والروي المطلوب.', qafiyaTashkeelTitle:'إكمال التشكيل محليًا', qafiyaTashkeelDetail:'يُكمل نموذج libtashkeel ONNX المضمّن، بحجم 4.8 ميغابايت، الحركات على المعالج. يبقى التشكيل المزوّد معتمدًا، ولا يستدعي التحليل نموذجًا لغويًا.', qafiyaDraftTitle:'التوليد ما يزال تجريبيًا', qafiyaDraftDetail:'يمكن لمزوّد اختياري صياغة القصائد ومراجعة الأبيات غير المطابقة مع الحفاظ على النص السليم. التوليد معطّل حاليًا في النسخة العامة.', qafiyaFrontend:'الواجهة: React 19 وTypeScript وVite بتصميم عربي متجاوب من اليمين إلى اليسار.', qafiyaBackend:'الخلفية: Python 3.12 وFastAPI وPyArud وNumPy وONNX Runtime للمعالج. تستخدم عملية واحدة جلسة استدلال محدودة.', qafiyaDeploy:'الاستضافة: الواجهة على Cloudflare Pages والواجهة البرمجية على Render. يتحقق GitHub Actions من التطبيق والحاوية.', qafiyaTryTitle:'استكشف الوزن والقافية.', generationPaused:'التحليل متاح على النسخة المباشرة. التوليد بالذكاء الاصطناعي معطّل حاليًا.' },
  es: { qafiyaCategory:'IDIOMA · POESÍA · IA', qafiyaSummary:'Un taller de poesía árabe para explorar métrica clásica, rima, escansión y vocalización local.', qafiyaCaptionDesk:'Espacio de escritura — elige una métrica y una rima, y explora el verso.', qafiyaCaptionMobile:'Análisis de poesía árabe adaptado al móvil.', qafiyaApproachTitle:'Del verso escrito a su ritmo.', qafiyaAnalysisTitle:'Analiza la métrica clásica', qafiyaAnalysisDetail:'Comprueba versos árabes con 16 métricas clásicas mediante PyArud. Explora los hemistiquios, la escansión binaria, los pies y la rima.', qafiyaTashkeelTitle:'Completa la vocalización localmente', qafiyaTashkeelDetail:'Un modelo ONNX libtashkeel de 4,8 MB completa las vocales en la CPU. Respeta las vocales proporcionadas y analiza sin llamar a un LLM.', qafiyaDraftTitle:'La generación es experimental', qafiyaDraftDetail:'Un proveedor opcional redacta poemas y revisa los versos que fallan sin cambiar el texto aceptado. La generación está desactivada en la demo pública.', qafiyaFrontend:'Frontend: React 19, TypeScript y Vite, con una interfaz árabe adaptable de derecha a izquierda.', qafiyaBackend:'Backend: Python 3.12, FastAPI, PyArud, NumPy y ONNX Runtime para CPU. Un proceso comparte la sesión de inferencia limitada.', qafiyaDeploy:'Alojamiento: frontend en Cloudflare Pages y API Docker en Render. GitHub Actions comprueba el proyecto y el contenedor.', qafiyaTryTitle:'Explora la métrica y la rima.', generationPaused:'El análisis está disponible en la demo. La generación con IA está desactivada.' },
  de: { qafiyaCategory:'SPRACHE · POESIE · KI', qafiyaSummary:'Eine Werkstatt für arabische Poesie mit klassischem Versmaß, Reim, Skansion und lokaler Vokalisierung.', qafiyaCaptionDesk:'Schreibplatz — klassisches Versmaß und Reim wählen und den Vers untersuchen.', qafiyaCaptionMobile:'Arabische Versanalyse im mobilfreundlichen Layout.', qafiyaApproachTitle:'Vom geschriebenen Vers zu seinem Rhythmus.', qafiyaAnalysisTitle:'Klassisches Versmaß analysieren', qafiyaAnalysisDetail:'Prüft arabische Verse mit PyArud anhand von 16 klassischen Metren. Untersuche Halbverse, binäre Skansion, Versfüße und den gewünschten Reim.', qafiyaTashkeelTitle:'Vokalisierung lokal ergänzen', qafiyaTashkeelDetail:'Ein integriertes 4,8-MB-libTashkeel-ONNX-Modell ergänzt fehlende Vokalzeichen auf der CPU. Vorhandene Vokale bleiben maßgeblich; die Analyse nutzt kein LLM.', qafiyaDraftTitle:'Gedichtentwürfe sind experimentell', qafiyaDraftDetail:'Ein optionaler Anbieter entwirft Gedichte und überarbeitet fehlerhafte Verse, ohne akzeptierten Text zu ändern. In der öffentlichen Demo ist die Generierung deaktiviert.', qafiyaFrontend:'Frontend: React 19, TypeScript und Vite mit responsivem arabischem RTL-Layout.', qafiyaBackend:'Backend: Python 3.12, FastAPI, PyArud, NumPy und CPU-ONNX-Runtime. Ein Prozess nutzt eine begrenzte Inferenzsitzung.', qafiyaDeploy:'Hosting: Cloudflare Pages für das Frontend und Render für die Docker-API. GitHub Actions prüft Anwendung und Container.', qafiyaTryTitle:'Versmaß und Reim entdecken.', generationPaused:'Die Analyse ist in der Demo verfügbar. KI-Generierung ist deaktiviert.' },
  it: { qafiyaCategory:'LINGUA · POESIA · IA', qafiyaSummary:'Un laboratorio di poesia araba con metro classico, rima, scansione e vocalizzazione locale.', qafiyaCaptionDesk:'Spazio di scrittura — scegli metro e rima, poi esplora il verso.', qafiyaCaptionMobile:'Analisi di poesia araba in un layout adatto al telefono.', qafiyaApproachTitle:'Dal verso scritto al suo ritmo.', qafiyaAnalysisTitle:'Analizza il metro classico', qafiyaAnalysisDetail:'Verifica i versi arabi su 16 metri classici con PyArud. Esplora emistichi, scansione binaria, piedi e lettera di rima.', qafiyaTashkeelTitle:'Completa la vocalizzazione in locale', qafiyaTashkeelDetail:'Un modello ONNX libtashkeel da 4,8 MB completa le vocali mancanti sulla CPU. Rispetta i segni forniti e non usa un LLM per l’analisi.', qafiyaDraftTitle:'La generazione è sperimentale', qafiyaDraftDetail:'Un provider opzionale crea bozze e rivede i versi non validi preservando il testo accettato. La generazione è disattivata nella demo pubblica.', qafiyaFrontend:'Frontend: React 19, TypeScript e Vite con interfaccia araba responsive da destra a sinistra.', qafiyaBackend:'Backend: Python 3.12, FastAPI, PyArud, NumPy e ONNX Runtime CPU. Un processo condivide una sessione di inferenza limitata.', qafiyaDeploy:'Hosting: frontend su Cloudflare Pages e API Docker su Render. GitHub Actions verifica app e container.', qafiyaTryTitle:'Esplora metro e rima.', generationPaused:'L’analisi è disponibile nella demo. La generazione IA è disattivata.' },
  zh: { qafiyaCategory:'语言 · 诗歌 · AI', qafiyaSummary:'阿拉伯诗歌工作坊：探索古典格律、押韵、韵律切分和本地音标补全。', qafiyaCaptionDesk:'写作空间：选择古典格律和韵脚，查看诗句韵律。', qafiyaCaptionMobile:'适配手机的阿拉伯诗歌分析界面。', qafiyaApproachTitle:'从诗句到韵律。', qafiyaAnalysisTitle:'分析古典格律', qafiyaAnalysisDetail:'使用 PyArud 按照 16 种古典格律检查阿拉伯诗句。查看上下半句、二进制韵律、音步和指定韵脚。', qafiyaTashkeelTitle:'在本地补全音标', qafiyaTashkeelDetail:'内置的 4.8 MB libtashkeel ONNX 模型在 CPU 上补全缺失元音。保留已有音标；分析不会调用 LLM。', qafiyaDraftTitle:'诗歌生成仍处于实验阶段', qafiyaDraftDetail:'可选模型可生成诗句，并针对未通过的诗句进行修改，同时保留已通过内容。公开演示暂未启用生成。', qafiyaFrontend:'前端：React 19、TypeScript 和 Vite，提供响应式阿拉伯语 RTL 界面。', qafiyaBackend:'后端：Python 3.12、FastAPI、PyArud、NumPy 和 CPU ONNX Runtime。单进程共享受限的推理会话。', qafiyaDeploy:'托管：Cloudflare Pages 前端与 Render Docker API。GitHub Actions 检查应用和容器。', qafiyaTryTitle:'探索格律与押韵。', generationPaused:'演示版可进行诗歌分析。AI 生成目前已关闭。' },
  ja: { qafiyaCategory:'言語 · 詩 · AI', qafiyaSummary:'アラビア詩の工房。古典韻律、脚韻、韻律分析、ローカルでの母音記号補完を試せます。', qafiyaCaptionDesk:'執筆画面 — 古典韻律と脚韻を選び、詩句を分析します。', qafiyaCaptionMobile:'スマートフォンに対応したアラビア詩分析画面。', qafiyaApproachTitle:'書かれた詩句からリズムへ。', qafiyaAnalysisTitle:'古典韻律を分析', qafiyaAnalysisDetail:'PyArudで16種類の古典韻律に照らしてアラビア詩を確認します。各半句、二進韻律、韻脚、指定した脚韻を調べられます。', qafiyaTashkeelTitle:'母音記号をローカルで補完', qafiyaTashkeelDetail:'内蔵の4.8 MB libtashkeel ONNXモデルがCPUで母音記号を補います。入力済みの記号を尊重し、分析ではLLMを呼び出しません。', qafiyaDraftTitle:'詩の生成は実験段階', qafiyaDraftDetail:'任意のプロバイダーが詩を作成し、合格した箇所を保ちながら不合格の句を修正します。公開デモでは生成を無効にしています。', qafiyaFrontend:'Frontend: React 19、TypeScript、Vite。レスポンシブなアラビア語RTL画面です。', qafiyaBackend:'Backend: Python 3.12、FastAPI、PyArud、NumPy、CPU版ONNX Runtime。単一プロセスで推論セッションを共有します。', qafiyaDeploy:'ホスティング: Cloudflare PagesとRender Docker API。GitHub Actionsでアプリとコンテナを検証します。', qafiyaTryTitle:'韻律と脚韻を探る。', generationPaused:'ライブデモでは分析を利用できます。AI生成は現在無効です。' }
};
for (const [locale, copy] of Object.entries(projectTranslations)) Object.assign(translations[locale], copy);
for (const [locale, copy] of Object.entries(qafiyaTranslations)) Object.assign(translations[locale], copy);
translations.fr.navWork = "Travail";

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
    const value = dictionary[element.dataset.i18n];
    if (value !== undefined) element.textContent = value;
  });
  document.querySelectorAll('[data-i18n-html]').forEach(element => {
    const value = dictionary[element.dataset.i18nHtml];
    if (value !== undefined) element.innerHTML = value;
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

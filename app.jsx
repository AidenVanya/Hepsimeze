const { useEffect: useEffectApp } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accentGold": "#d4a853",
  "accentGreen": "#5cb85c",
  "background": "#0a0a0a",
  "headlineFont": "Cormorant Garamond",
  "heroHeadline": "%100 Doğal Meze",
  "showBackToTop": true
}/*EDITMODE-END*/;

const FONT_OPTIONS = ['Cormorant Garamond', 'Playfair Display', 'DM Serif Display', 'Fraunces'];

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  useReveal();

  useEffectApp(() => {
    const r = document.documentElement;
    r.style.setProperty('--gold', t.accentGold);
    r.style.setProperty('--green', t.accentGreen);
    r.style.setProperty('--bg-0', t.background);
    r.style.setProperty('--serif', `"${t.headlineFont}", Georgia, serif`);
  }, [t.accentGold, t.accentGreen, t.background, t.headlineFont]);

  return (
    <>
      <Loader />
      <Nav />
      <main>
        <Hero />
        <About />
        <Specials />
        <Reviews />
        <Menu />
      </main>
      <Footer />
      {t.showBackToTop && <BackToTop />}

      <TweaksPanel title="Tweaks">
        <TweakSection label="Renk Paleti" />
        <TweakColor
          label="Altın Vurgu"
          value={t.accentGold}
          options={['#d4a853', '#e8c170', '#c0392b', '#b48a3c', '#f0a868']}
          onChange={(v) => setTweak('accentGold', v)}
        />
        <TweakColor
          label="Yeşil Vurgu"
          value={t.accentGreen}
          options={['#5cb85c', '#3a8c3a', '#7cc97c', '#84a259', '#1f8a5b']}
          onChange={(v) => setTweak('accentGreen', v)}
        />
        <TweakColor
          label="Arka Plan"
          value={t.background}
          options={['#0a0a0a', '#111111', '#1a1410', '#0e1410', '#0c0a14']}
          onChange={(v) => setTweak('background', v)}
        />
        <TweakSection label="Tipografi" />
        <TweakSelect
          label="Başlık Fontu"
          value={t.headlineFont}
          options={FONT_OPTIONS}
          onChange={(v) => setTweak('headlineFont', v)}
        />
        <TweakSection label="UI" />
        <TweakToggle
          label="Yukarı çık butonu"
          value={t.showBackToTop}
          onChange={(v) => setTweak('showBackToTop', v)}
        />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

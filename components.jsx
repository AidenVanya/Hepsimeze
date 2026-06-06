const { useState, useEffect, useRef, useMemo } = React;

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal-l, .reveal-r');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const delay = e.target.dataset.delay || 0;
          setTimeout(() => e.target.classList.add('in'), delay);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Counter({ to, suffix = '', duration = 1800 }) {
  const [n, setN] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const tick = (t) => {
          const p = Math.min((t - start) / duration, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          setN(Math.round(to * ease));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{n}{suffix}</span>;
}

function FoodImg({ src, alt, fallback }) {
  const [err, setErr] = useState(false);
  if (err || !src) {
    return <div className="ph" aria-hidden="true">{fallback || (alt ? alt[0] : '·')}</div>;
  }
  return <img src={src} alt={alt} onError={() => setErr(true)} />;
}

function Stars({ count = 5 }) {
  return (
    <div className="stars">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.9 7.5.6-5.7 4.9 1.7 7.3L12 17.8 5.6 21.7l1.7-7.3L1.6 9.5l7.5-.6L12 2z"/></svg>
      ))}
    </div>
  );
}

function Logo() {
  return (
    <a href="#top" className="logo" aria-label="Hepsi Meze">
      <span className="mark" aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <path d="M7 3v8a2 2 0 0 0 2 2v8"/><path d="M11 3v6"/><path d="M9 3v6"/>
          <path d="M17 3c-1.5 1.5-2 3-2 5s.5 3.5 2 5v8"/>
        </svg>
      </span>
      hepsi <span className="x">×</span> <em>meze</em>
    </a>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 30);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (y / total) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);
  const links = [
    ['index.html', 'Anasayfa'],
    ['hakkimizda.html', 'Hakkımızda'],
    ['urunlerimiz.html', 'Ürünlerimiz'],
    ['iletisim.html', 'İletişim']
  ];
  const activeIdx = (() => {
    const href = window.location.href;
    const idx = links.findIndex(([h]) => {
      const file = h.split('#')[0];
      return file && href.includes(file);
    });
    return idx >= 0 ? idx : 0;
  })();
  return (
    <>
      <div className="scroll-progress" style={{ width: progress + '%' }} />
      <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-inner">
          <Logo />
          <nav>
            <ul className="nav-menu">
              {links.map(([h, l], i) => (
                <li key={h}><a href={h} className={i === activeIdx ? 'active' : ''}>{l}</a></li>
              ))}
            </ul>
          </nav>
          <a className="nav-cta" href="urunlerimiz.html">Sipariş Ver
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </a>
          <button className="hamburger" aria-label="menu" onClick={() => setMobileOpen(true)}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
          </button>
        </div>
      </header>
      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        <button className="mobile-close" onClick={() => setMobileOpen(false)} aria-label="close">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M6 6l12 12M18 6L6 18"/></svg>
        </button>
        <ul>
          {links.map(([h, l]) => (
            <li key={h}><a href={h} onClick={() => setMobileOpen(false)}>{l}</a></li>
          ))}
        </ul>
        <a className="btn btn-primary mobile-cta" href="#urunler" onClick={() => setMobileOpen(false)}>
          <span>Sipariş Ver</span><span className="arrow"></span>
        </a>
      </div>
    </>
  );
}

const HERO_SLIDES = [
  {
    eyebrow: '01 — Mutfağımız',
    title: ['%100 ', { type: 'gold', text: 'Doğal' }, ' Meze'],
    sub: 'Siz istediğiniz malzemeleri seçin, mezeyi biz hazırlayalım. Her gün taze, her gün katkısız.',
    image: 'https://images.unsplash.com/photo-1540914124281-342587941389?auto=format&fit=crop&w=2000&q=80',
    chapter: 'Bölüm 01'
  },
  {
    eyebrow: '02 — Şefin İmzası',
    title: ['Her Zaman ', { type: 'green', text: 'Taze' }, ' Meze'],
    sub: 'Hepsi Meze mutfak ekibi, sizi özel hissettirecek lezzetlerin peşinde koşuyor.',
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=2000&q=80',
    chapter: 'Bölüm 02'
  },
  {
    eyebrow: '03 — Sandviç & Dürüm',
    title: ['Taze Mezelerle ', { type: 'gold', text: 'Sandviç' }],
    sub: 'Lezzetli sandviçlerimiz tüm şubelerimizde sizleri bekliyor — el yapımı, taze fırınlanmış.',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=2000&q=80',
    chapter: 'Bölüm 03'
  }
];

function Hero() {
  const [idx, setIdx] = useState(0);
  const stage = useRef(null);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % HERO_SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    const onScroll = () => {
      if (!stage.current) return;
      const y = window.scrollY;
      const bgs = stage.current.querySelectorAll('.hero-bg');
      bgs.forEach(b => { b.style.transform = `translate3d(0, ${y * 0.18}px, 0) scale(${1.06 + y * 0.0001})`; });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <section className="hero" id="top" ref={stage}>
      {HERO_SLIDES.map((s, i) => (
        <div key={i} className={`hero-slide ${i === idx ? 'active' : ''}`}>
          <div className="hero-bg" style={{ backgroundImage: `url(${s.image})` }} />
          <div className="hero-grain" />
        </div>
      ))}
      <div className="hero-content">
        <div className="hero-text-stack">
          {HERO_SLIDES.map((s, i) => (
            <div key={i} className={`hero-text ${i === idx ? 'active' : ''}`}>
              <div className="hero-eyebrow"><span className="bar"></span>{s.eyebrow}</div>
              <h1>
                {s.title.map((part, j) =>
                  typeof part === 'string'
                    ? <React.Fragment key={j}>{part}</React.Fragment>
                    : <span key={j} className={part.type}>{part.text}</span>
                )}
              </h1>
              <p className="hero-sub">{s.sub}</p>
            </div>
          ))}
        </div>
        <div className="hero-actions">
          <a className="btn btn-primary" href="urunlerimiz.html"><span>Şimdi Sipariş Ver</span><span className="arrow"></span></a>
          <a className="btn btn-ghost" href="hakkimizda.html"><span>Hikayemiz</span><span className="arrow"></span></a>
        </div>
      </div>
      <button className="hero-arrow prev" onClick={() => setIdx((idx - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)} aria-label="prev">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M15 6l-6 6 6 6"/></svg>
      </button>
      <button className="hero-arrow next" onClick={() => setIdx((idx + 1) % HERO_SLIDES.length)} aria-label="next">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M9 6l6 6-6 6"/></svg>
      </button>
      <div className="hero-foot">
        <div className="hero-dots">
          {HERO_SLIDES.map((_, i) => (
            <button key={i} className={i === idx ? 'active' : ''} onClick={() => setIdx(i)} aria-label={`slide ${i+1}`}>
              <span className="pip" key={i === idx ? 'a' : 'b'}></span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="about container" id="hakkimizda">
      <div className="about-grid">
        <div className="about-copy reveal-l">
          <div className="eyebrow"><span className="bar"></span>Biz Kimiz?</div>
          <h2>Bir <em>meze hikayesi</em>, dört ayda on şube.</h2>
          <p>
            Hepsi Meze konsepti, kapsamlı bir AR-GE sürecinin ardından 2021 yılı Eylül ayında Büyükçekmece'de ilk şubesi ile hizmet vermeye başladı. Hızlı büyümesine olanak sağlayan dinamik alt yapısı sayesinde 4 ayda 10 şubeye ulaştı.
          </p>
          <p>
            Açıldığı günden itibaren müşteriler tarafından çok sevilen Hepsi Meze, müşterilerini şubelerinde günlük %100 doğal katkısız taze mezeyle buluşturmaktadır. Kendine has sandviç lezzetleri, mezeli dürümler ve kahvaltı servisleriyle hizmetinizdeyiz.
          </p>
          <div className="about-stats">
            <div className="stat">
              <div className="num"><Counter to={10} suffix="+" /></div>
              <div className="lbl">Şube Sayısı</div>
            </div>
            <div className="stat">
              <div className="num"><Counter to={2021} duration={1400} /></div>
              <div className="lbl">Kuruluş Yılı</div>
            </div>
            <div className="stat">
              <div className="num"><Counter to={100} suffix="%" /></div>
              <div className="lbl">Doğal & Katkısız</div>
            </div>
          </div>
          <a className="btn btn-ghost" href="hakkimizda.html"><span>Daha Fazla</span><span className="arrow"></span></a>
          <div className="signature">— Hepsi Meze Mutfak Ekibi</div>
        </div>
        <div className="about-visual-wrap reveal-r" style={{ position: 'relative' }}>
          <div className="about-decor"></div>
          <div className="about-visual">
            <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1400&q=80" alt="Sandviç" />
            <div className="about-badge">
              <div className="est">Est. since</div>
              <div className="yr">'21</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const SPECIALS = [
  {
    name: 'Avakadolu Amerikan Salatası',
    desc: 'Ülkemizde en popüler tropikal meyvelerden biri olan avokado, yüksek besin değerleri ve sağlıklı içeriğiyle özellikle zayıflamak isteyenlere hitap eden bir besin.',
    img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80',
    tag: 'Şefin Seçimi'
  },
  {
    name: 'Yoğurtlu Patlıcan',
    desc: 'Meze tariflerinde sıkça kullanılan tahin ve közlenmiş patlıcan bir araya gelince ortaya nefis mütebbel tarifi çıkıyor, mutlaka denemelisiniz.',
    img: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=1200&q=80',
    tag: 'Klasik'
  },
  {
    name: 'Arnavut Ciğeri',
    desc: 'Geleneksel olarak soğan ve maydanoz ile servis edilen, acı biber ve baharatlanmış yağda kızartılmış kuzu veya dana karaciğer küplerinden yapılmış bir Türk yemeğidir.',
    img: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    tag: 'Sıcak Meze'
  }
];

function Specials() {
  return (
    <section className="section specials" id="bayilik">
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow"><span className="bar"></span>Şefin Spesiyali<span className="bar"></span></div>
          <h2>Bu hafta mutfaktan <em>seçtiklerimiz</em></h2>
          <p className="lede">Her hafta şefimiz, mevsimin en iyi malzemeleriyle hazırladığı üç imza tarifi sizler için özenle seçiyor.</p>
        </div>
        <div className="special-cards">
          {SPECIALS.map((s, i) => (
            <article key={i} className="special reveal" data-delay={i * 120}>
              <div className="img">
                <FoodImg src={s.img} alt={s.name} />
                <div className="badge"><span>★</span>{s.tag}</div>
              </div>
              <div className="body">
                <h3>{s.name}</h3>
                <p>{s.desc}</p>
                <a className="more" href="urunlerimiz.html">İncele <svg width="14" height="10" viewBox="0 0 24 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M0 8h22M16 2l6 6-6 6"/></svg></a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const REVIEWS = [
  { name: 'Hasan Şahin', date: 'Şubat 28', text: 'Soğuk sandviç sevenler için mutlaka öneriyorum. Ciğeri çok severim, buranın ciğeri mükemmel. Personeli güleryüzlü, mekan tertemiz.' },
  { name: 'Mustafa Demirhan', date: 'Eylül 1', text: 'Mezeleri enfes, çalışanları güler yüzlü daha ne olsun. Bundan sonraki tercihimiz kesinlikle burası olacak. Tavsiye ederim.' },
  { name: 'Ali Rıza', date: 'Haziran 12', text: 'Mezeleri harika gerçekten, özellikle Haydari ve atomuna bayıldım. Sipariş çok hızlı geliyor, personeli çok ince — siparişimin yanında jest yapıp ekstra hediye meze gönderdiler.' },
  { name: 'Selcen Coşkun Yücel', date: 'Kasım 22', text: 'Meze severler için vazgeçilmez lezzette çeşitleri var. Girit ezmesi, kabak şayan, atom, humus — hepsi birbirinden lezzetli. Kesinlikle tavsiye.' },
  { name: 'Ekrem Yılmaz', date: 'Ocak 14', text: 'Kahvaltı için gittik, beklentimin üzerinde çıktı. Reçellerden peynirlere kadar her şey ev yapımı. Servis hızlı, ortam huzurlu.' },
  { name: 'Zeynep Kaya', date: 'Mart 7', text: 'Avokadolu salata ve mütebbel kombinasyonu favorim oldu. Porsiyonlar doyurucu, fiyatlar makul. Düzenli müşterileri olduk.' }
];

function Reviews() {
  const [idx, setIdx] = useState(0);
  const [perPage, setPerPage] = useState(3);
  useEffect(() => {
    const recompute = () => {
      const w = window.innerWidth;
      if (w < 720) setPerPage(1);
      else if (w < 1100) setPerPage(2);
      else setPerPage(3);
    };
    recompute();
    window.addEventListener('resize', recompute);
    return () => window.removeEventListener('resize', recompute);
  }, []);
  const pages = Math.max(1, REVIEWS.length - perPage + 1);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % pages), 6000);
    return () => clearInterval(t);
  }, [pages]);
  const initials = (n) => n.split(' ').map(s => s[0]).slice(0,2).join('');
  return (
    <section className="reviews container">
      <div className="section-head reveal">
        <div className="eyebrow"><span className="bar"></span>Müşteri Yorumları<span className="bar"></span></div>
        <h2>Bizi <em>onlardan</em> dinleyin</h2>
        <p className="lede">Google ve sosyal medya üzerinden binlerce müşterimizin paylaşımlarından bir seçki — ortalama puan <strong style={{ color: 'var(--gold)' }}>4.9 / 5</strong>.</p>
      </div>
      <div className="reviews-track-wrap reveal">
        <div className="reviews-track" style={{ transform: `translateX(calc(${-idx} * (100% / ${perPage} + 0px)))` }}>
          {REVIEWS.map((r, i) => (
            <article key={i} className="review">
              <div className="quote">"</div>
              <Stars />
              <p>{r.text}</p>
              <div className="who">
                <div className="av">{initials(r.name)}</div>
                <div className="meta">
                  <div className="name">{r.name}</div>
                  <div className="date">Ziyaret: {r.date}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="reviews-controls">
        <div className="reviews-pips">
          {Array.from({ length: pages }).map((_, i) => (
            <button key={i} className={i === idx ? 'active' : ''} onClick={() => setIdx(i)} aria-label={`page ${i+1}`} />
          ))}
        </div>
        <div className="reviews-arrows">
          <button onClick={() => setIdx((idx - 1 + pages) % pages)} aria-label="prev">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M15 6l-6 6 6 6"/></svg>
          </button>
          <button onClick={() => setIdx((idx + 1) % pages)} aria-label="next">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M9 6l6 6-6 6"/></svg>
          </button>
        </div>
      </div>
    </section>
  );
}

const MENU = [
  { name: 'Barbunya Pilaki', price: '25.50', desc: 'Sebzelerle birlikte zeytinyağı kullanılarak pişirilen ve soğuk olarak yenebilen bir yemek türüdür.', img: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=400&q=80' },
  { name: 'Acı Ezmeli Çiğ Köfte', price: '75.50', desc: 'Et yemeklerinin, lahmacun ve çiğ köftenin yanına çok yakışan bir meze türü.', img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=400&q=80' },
  { name: 'Çiroz Meze', price: '45.50', desc: 'Uskumru ve mersinbalığı balığının tuzlanarak güneşte kurutulmasıyla yapılan bir yiyecektir.', img: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=400&q=80' },
  { name: 'Şakşuka Meze', price: '35.50', desc: 'Sebzelerin kavrulduktan sonra, üzerine domates sosu dökülmesiyle hazırlanan Türk mutfağından meze.', img: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=400&q=80' },
  { name: 'Kısır Meze', price: '55.50', desc: 'Türk ve Kürt mutfağında bir soğuk yemek veya meze türü; bulgur, salça, baharatlar.', img: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=400&q=80' },
  { name: 'Acılı Ezme', price: '35.50', desc: 'Domates, soğan, biber salçası, zeytinyağı, tuzun karıştırılması ile elde edilen bir Türk mezesi.', img: 'https://images.unsplash.com/photo-1604917877934-07d8d248d396?auto=format&fit=crop&w=400&q=80' }
];

function Menu() {
  return (
    <section className="section menu" id="urunler">
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow"><span className="bar"></span>Önerilen Lezzetlerimiz<span className="bar"></span></div>
          <h2>Sofranızın <em>kahramanları</em></h2>
          <p className="lede">Müşterilerimizin en çok tercih ettiği altı klasik. Hepsi günlük taze hazırlanır, %100 doğal malzemelerle.</p>
        </div>
        <div className="menu-grid">
          {MENU.map((m, i) => (
            <div key={i} className="menu-item reveal" data-delay={(i % 2) * 80}>
              <div className="img"><FoodImg src={m.img} alt={m.name} /></div>
              <div className="meta">
                <h4>{m.name}</h4>
                <p>{m.desc}</p>
              </div>
              <div className="price">{m.price}<span className="sup">₺</span></div>
            </div>
          ))}
        </div>
        <div className="menu-foot reveal">
          <a className="btn btn-primary" href="urunlerimiz.html"><span>Tüm Menüyü Gör</span><span className="arrow"></span></a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer" id="iletisim">
      <div className="container">
        <div className="footer-grid">
          <div className="brand-block">
            <Logo />
            <p>Türkiye'nin en çok tercih edilen meze markası. 2021'den bu yana her gün taze, her gün katkısız.</p>
            <div className="map" aria-label="Konum">
              <div className="pin"><span>📍</span></div>
            </div>
            <div className="socials">
              {[
                ['Facebook', <path key="fb" d="M14 8h3V5h-3a4 4 0 0 0-4 4v2H7v3h3v7h3v-7h3l1-3h-4V9a1 1 0 0 1 1-1z"/>],
                ['Twitter', <path key="tw" d="M22 5.8a8.5 8.5 0 0 1-2.4.7 4.2 4.2 0 0 0 1.8-2.3 8.4 8.4 0 0 1-2.6 1A4.2 4.2 0 0 0 11.5 9a11.8 11.8 0 0 1-8.6-4.4 4.2 4.2 0 0 0 1.3 5.6A4.1 4.1 0 0 1 2.3 9.6v.1a4.2 4.2 0 0 0 3.4 4.1 4.2 4.2 0 0 1-1.9.1 4.2 4.2 0 0 0 3.9 2.9A8.5 8.5 0 0 1 2 18.4 12 12 0 0 0 8.5 20.3c7.8 0 12-6.4 12-12v-.5A8.6 8.6 0 0 0 22 5.8z"/>],
                ['Instagram', <g key="ig"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></g>],
                ['YouTube', <path key="yt" d="M22 8s-.2-1.4-.8-2c-.7-.8-1.5-.8-1.9-.9C16.6 5 12 5 12 5s-4.6 0-7.3.2c-.4.1-1.2.1-1.9.9-.6.6-.8 2-.8 2S2 9.7 2 11.4v1.3C2 14.3 2 16 2 16s.2 1.4.8 2c.7.8 1.7.8 2.1.9 1.5.1 6.6.2 6.6.2s4.6 0 7.3-.2c.4-.1 1.2-.1 1.9-.9.6-.6.8-2 .8-2s.2-1.7.2-3.3v-1.3C22 9.7 22 8 22 8zM10 14.5v-5l4.5 2.5L10 14.5z"/>]
              ].map(([label, path]) => (
                <a key={label} href="#" aria-label={label}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{path}</svg>
                </a>
              ))}
            </div>
          </div>
          <div>
            <h5>Adres</h5>
            <p>İstanbul / Sarıyer<br/>Pınar Mah. Fikri Sokak No 33/A</p>
            <p style={{ marginTop: 14 }}><a href="#">Yol Tarifi Al →</a></p>
          </div>
          <div>
            <h5>İletişim</h5>
            <p><a href="mailto:iletisim@hepsimeze.com">iletisim@hepsimeze.com</a></p>
            <p>Çağrı: <span style={{ color: 'var(--text-1)' }}>0850 888 20 87</span></p>
            <p>Bayilik: <span style={{ color: 'var(--text-1)' }}>0541 364 41 64</span></p>
          </div>
          <div>
            <h5>Çalışma Saatleri</h5>
            <p>Pazartesi – Cumartesi<br/><span style={{ color: 'var(--gold)', fontFamily: 'var(--serif)', fontSize: 22 }}>09:00 — 18:00</span></p>
            <p style={{ marginTop: 14 }}>Pazar günü kapalıyız</p>
          </div>
        </div>
        <div className="footer-bottom">
          <div>©2026 Hepsi Meze. All rights reserved.</div>
          <div className="legal">
            <a href="#">Gizlilik</a>
            <a href="#">KVKK</a>
            <a href="#">Çerezler</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <button className={`b2t ${show ? 'show' : ''}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="back to top">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
    </button>
  );
}

function Loader() {
  const [hide, setHide] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHide(true), 1100);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className={`loader ${hide ? 'hide' : ''}`}>
      <div className="loader-mark">
        <span className="dot"></span>
        <span className="label">hepsi <em>×</em> meze</span>
        <span className="dot"></span>
      </div>
      <div className="loader-line"></div>
    </div>
  );
}

function PageHero({ eyebrow, title, sub, image }) {
  useEffect(() => {
    const onScroll = () => {
      const el = document.querySelector('.page-hero-bg');
      if (el) el.style.transform = `translate3d(0, ${window.scrollY * 0.3}px, 0) scale(1.06)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <section className="page-hero">
      <div className="page-hero-bg" style={{ backgroundImage: `url(${image})` }} />
      <div className="hero-grain" />
      <div className="container page-hero-content">
        <div className="hero-eyebrow"><span className="bar"></span>{eyebrow}</div>
        <h1>{title}</h1>
        <p className="page-hero-sub">{sub}</p>
        <div className="page-hero-scroll"><span className="line"></span></div>
      </div>
    </section>
  );
}

Object.assign(window, { Nav, Hero, About, Specials, Reviews, Menu, Footer, BackToTop, Loader, useReveal, Counter, FoodImg, PageHero });

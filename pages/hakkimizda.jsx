const { useState: usAbout, useRef: urAbout } = React;

const TIMELINE = [
  { year: '2020', title: 'AR-GE Süreci', text: 'Bir mutfak ekibi, dört duvar arasında. Türkiye\'nin dört bir yanından gelen meze tarifleri, modern damağa uyarlanıyor.' },
  { year: 'Eylül 2021', title: 'İlk Şube — Büyükçekmece', text: 'İlk Hepsi Meze noktası açıldı. İlk gün: 47 müşteri. İlk hafta: 312. İlk ay: 1.800.' },
  { year: 'Aralık 2021', title: '4 Ay, 10 Şube', text: 'Konsept hızla büyüdü. Sarıyer, Bakırköy, Kadıköy, Beşiktaş — şehrin her köşesinde aynı taze tadı.' },
  { year: '2023', title: 'Bayilik Modeli', text: 'Türkiye genelinde bayilik sistemine geçtik. Her şubede aynı kalite, aynı standart.' },
  { year: '2026', title: 'Yeni Mutfak', text: 'Sarıyer\'de açılan merkez mutfak ile günlük üretim kapasitesi 3 katına çıktı.' }
];

const VALUES = [
  { ico: '🌿', t: '%100 Doğal', d: 'Hiçbir ürünümüzde koruyucu, renklendirici veya yapay tat kullanılmaz. Ne varsa, mutfakta vardır.' },
  { ico: '🌅', t: 'Günlük Taze', d: 'Mezelerimiz her sabah saat 04:00\'da hazırlanmaya başlanır. Akşama kalan, çöpe gider.' },
  { ico: '🤝', t: 'Yerel Üretici', d: 'Domatesimiz Aydın\'dan, zeytinyağımız Ayvalık\'tan, balımız Muğla\'dan. Komşumuzdan alıyoruz.' },
  { ico: '✋', t: 'El Yapımı', d: 'Hiçbir mezemiz makinede ezilmez, doğranmaz. Ustalarımızın elinden çıkar.' }
];

const TEAM = [
  { name: 'Mehmet Demir', role: 'Mutfak Şefi', img: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=600&q=80' },
  { name: 'Ayşe Yılmaz', role: 'AR-GE Şefi', img: 'https://images.unsplash.com/photo-1607631568010-a87245c0daf8?auto=format&fit=crop&w=600&q=80' },
  { name: 'Can Özkan', role: 'İşletme Müdürü', img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80' },
  { name: 'Selin Aksoy', role: 'Lezzet Tasarımı', img: 'https://images.unsplash.com/photo-1611432579402-7037e3e2c1e4?auto=format&fit=crop&w=600&q=80' }
];

const GALLERY = [
  'https://images.unsplash.com/photo-1540914124281-342587941389?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=1000&q=80'
];

function StoryBlock() {
  return (
    <section className="section about" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="story-grid">
          <div className="reveal-l">
            <div className="eyebrow"><span className="bar"></span>Hikayemiz</div>
            <h2>Bir <em>tabağın</em> peşinde dört yıl.</h2>
            <p style={{ color: 'var(--text-1)', fontSize: 17 }}>
              Hikayemiz aslında bir merakla başladı. "Annemizin yaptığı haydariyi neden hiçbir yerde bulamıyoruz?" sorusu, bizi Anadolu'nun dört bir yanına gönderdi.
            </p>
            <p>
              Her şehirde, her teyzeden, her mutfaktan bir şey öğrendik. Sonra hepsini bir araya getirdik. Modern damağa uyarladık ama özünden taviz vermedik. Bugün <strong style={{ color: 'var(--gold)' }}>27 farklı meze</strong>, <strong style={{ color: 'var(--gold)' }}>14 sandviç</strong> ve <strong style={{ color: 'var(--gold)' }}>9 kahvaltı tabağı</strong> ile hizmetinizdeyiz.
            </p>
            <p>
              Her gün saat 04:00'da mutfağımız uyanır. 06:30'da ilk teslimat çıkar. Akşam 18:00'da kapanırız çünkü ertesi sabah taptaze başlamak isteriz. Bu, bizim ritmimiz.
            </p>
          </div>
          <div className="story-visual reveal-r">
            <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80" alt="" />
            <div className="story-tag">
              <div className="num"><Counter to={27} suffix="+" /></div>
              <div className="lbl">Meze Çeşidi</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Timeline() {
  return (
    <section className="section timeline-section">
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow"><span className="bar"></span>Yolculuğumuz<span className="bar"></span></div>
          <h2>Beş yılda <em>on şubeden</em> bugüne.</h2>
        </div>
        <div className="timeline">
          <div className="timeline-line"></div>
          {TIMELINE.map((item, i) => (
            <div key={i} className={`tl-item ${i % 2 === 0 ? 'left' : 'right'} reveal`} data-delay={i * 100}>
              <div className="tl-dot"></div>
              <div className="tl-card">
                <div className="tl-year">{item.year}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Values() {
  return (
    <section className="section values-section">
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow"><span className="bar"></span>Değerlerimiz<span className="bar"></span></div>
          <h2>Tabağa koyduğumuz <em>her şey</em>, bir vaat.</h2>
        </div>
        <div className="values-grid">
          {VALUES.map((v, i) => (
            <article key={i} className="value-card reveal" data-delay={i * 100}>
              <div className="value-ico">{v.ico}</div>
              <h3>{v.t}</h3>
              <p>{v.d}</p>
              <div className="value-num">0{i + 1}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Team() {
  return (
    <section className="section team-section">
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow"><span className="bar"></span>Mutfak Ekibi<span className="bar"></span></div>
          <h2>Her tabağın arkasında <em>bir el</em>.</h2>
          <p className="lede">Hepsi Meze, ekibinin elinden çıkar. İşte size onların yüzlerini tanıtmak istedik.</p>
        </div>
        <div className="team-grid">
          {TEAM.map((m, i) => (
            <article key={i} className="team-card reveal" data-delay={i * 80}>
              <div className="team-img"><FoodImg src={m.img} alt={m.name} /></div>
              <div className="team-info">
                <h3>{m.name}</h3>
                <div className="team-role">{m.role}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section className="section gallery-section">
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow"><span className="bar"></span>Mutfaktan<span className="bar"></span></div>
          <h2>Bir bakış, <em>bin lezzet</em>.</h2>
        </div>
        <div className="gallery-grid">
          {GALLERY.map((src, i) => (
            <div key={i} className={`gallery-tile g-${i} reveal`} data-delay={i * 60}>
              <FoodImg src={src} alt="" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaBanner() {
  return (
    <section className="cta-banner">
      <div className="container reveal">
        <div className="cta-inner">
          <div>
            <div className="eyebrow"><span className="bar"></span>Şimdi Sipariş Ver</div>
            <h2>Bugün <em>hangi mezeyi</em> deneyeceksin?</h2>
          </div>
          <a className="btn btn-primary" href="urunlerimiz.html"><span>Menüyü İncele</span><span className="arrow"></span></a>
        </div>
      </div>
    </section>
  );
}

function HakkimizdaPage() {
  useReveal();
  return (
    <>
      <Loader />
      <Nav />
      <main>
        <PageHero
          eyebrow="Hakkımızda"
          title={<>Bir <span className="accent">mezenin</span><br/>dört yıllık <span className="green">hikayesi</span>.</>}
          sub="Türkiye'nin meze geleneğini modern bir damak tadıyla yeniden yorumladığımız beş yıllık yolculuğumuz."
          image="https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=2400&q=80"
        />
        <StoryBlock />
        <Timeline />
        <Values />
        <Team />
        <Gallery />
        <CtaBanner />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<HakkimizdaPage />);

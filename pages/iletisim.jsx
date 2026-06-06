const { useState: usI, useRef: urI } = React;

const BRANCHES = [
  { name: 'Sarıyer (Merkez)', addr: 'Pınar Mah. Fikri Sokak No 33/A', tel: '0212 555 11 22', hrs: '09:00 — 22:00' },
  { name: 'Büyükçekmece', addr: 'Atatürk Cad. No 45/B', tel: '0212 555 11 23', hrs: '09:00 — 22:00' },
  { name: 'Bakırköy', addr: 'İncirli Cad. No 78', tel: '0212 555 11 24', hrs: '09:00 — 22:00' },
  { name: 'Kadıköy', addr: 'Bahariye Cad. No 156', tel: '0216 555 11 25', hrs: '09:00 — 22:00' },
  { name: 'Beşiktaş', addr: 'Çırağan Cad. No 22', tel: '0212 555 11 26', hrs: '09:00 — 23:00' },
  { name: 'Nişantaşı', addr: 'Teşvikiye Cad. No 89', tel: '0212 555 11 27', hrs: '09:00 — 22:00' },
  { name: 'Üsküdar', addr: 'Mimar Sinan Cad. No 12', tel: '0216 555 11 28', hrs: '09:00 — 22:00' },
  { name: 'Şişli', addr: 'Halaskargazi Cad. No 244', tel: '0212 555 11 29', hrs: '09:00 — 22:00' },
  { name: 'Maltepe', addr: 'Bağdat Cad. No 412', tel: '0216 555 11 30', hrs: '09:00 — 22:00' },
  { name: 'Ataşehir', addr: 'Barbaros Mah. Ardıçlı Cad. No 5', tel: '0216 555 11 31', hrs: '09:00 — 22:00' }
];

const FAQ = [
  { q: 'Mezeleriniz katkı maddesi içeriyor mu?', a: 'Hayır. Hepsi Meze\'nin tüm ürünleri %100 doğal malzemelerle, hiçbir koruyucu, renklendirici ya da yapay tat eklenmeden hazırlanır. Mezelerimizin raf ömrü 24 saattir.' },
  { q: 'Sipariş ne kadar sürede gelir?', a: 'İstanbul içi siparişlerinizde ortalama teslimat süresi 35-50 dakikadır. Şubelerimize 5km mesafedeki adreslerde bu süre 25 dakikaya kadar düşer.' },
  { q: 'Vegan/vejetaryen seçenekleriniz var mı?', a: 'Tabii ki. Menümüzdeki 27 mezenin 18\'i vegan, 22\'si vejetaryen uyumludur. Vegan etiketli ürünleri ürünlerimiz sayfasında filtreleyebilirsiniz.' },
  { q: 'Kahvaltı servisi her gün var mı?', a: 'Hafta içi 09:00-12:00, hafta sonu 09:00-14:00 saatleri arasında köy kahvaltısı, menemen, sucuklu yumurta gibi sıcak servislerimizden faydalanabilirsiniz.' },
  { q: 'Bayilik şartları nelerdir?', a: 'Bayilik için 0541 364 41 64 numarayı arayabilir veya iletişim formunu kullanabilirsiniz. 60 m² ve üzeri, vitrinli, ana cadde üzeri lokasyonları değerlendirmeye alıyoruz.' },
  { q: 'Toplu sipariş veriyor musunuz?', a: '8 kişiden fazla siparişler için en az 24 saat öncesinden bildirim alıyoruz. Şirket etkinlikleri, kurumsal kahvaltılar ve özel kutlamalar için özel menü hazırlanabilir.' }
];

function QuickStrip() {
  const items = [
    { ico: '📞', label: 'Çağrı Merkezi', val: '0850 888 20 87', sub: '7/24 Müşteri Hizmetleri' },
    { ico: '✉️', label: 'E-posta', val: 'iletisim@hepsimeze.com', sub: 'Genel sorular için' },
    { ico: '🤝', label: 'Bayilik', val: '0541 364 41 64', sub: 'Yatırım & ortaklık' },
    { ico: '🕐', label: 'Çalışma Saatleri', val: '09:00 — 22:00', sub: 'Pazartesi — Pazar' }
  ];
  return (
    <section className="quick-strip">
      <div className="container">
        <div className="quick-grid">
          {items.map((it, i) => (
            <div key={i} className="quick-card reveal" data-delay={i * 80}>
              <div className="quick-ico">{it.ico}</div>
              <div className="quick-label">{it.label}</div>
              <div className="quick-val">{it.val}</div>
              <div className="quick-sub">{it.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactForm() {
  const [form, setForm] = usI({ name: '', email: '', phone: '', subject: 'Genel', msg: '' });
  const [sent, setSent] = usI(false);
  const [touched, setTouched] = usI({});
  const set = (k, v) => setForm(f => ({...f, [k]: v}));
  const touch = (k) => setTouched(t => ({...t, [k]: true}));
  const errs = {
    name: !form.name && touched.name ? 'Ad gerekli' : '',
    email: !form.email && touched.email ? 'E-posta gerekli' : (touched.email && !/.+@.+\..+/.test(form.email) ? 'Geçerli bir e-posta girin' : ''),
    msg: !form.msg && touched.msg ? 'Mesaj gerekli' : ''
  };
  const valid = form.name && form.email && form.msg && /.+@.+\..+/.test(form.email);
  const submit = (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, msg: true });
    if (!valid) return;
    setSent(true);
  };
  return (
    <section className="section contact-form-section">
      <div className="container">
        <div className="contact-form-grid">
          <div className="cf-side reveal-l">
            <div className="eyebrow"><span className="bar"></span>Bize Yazın</div>
            <h2>Aklınıza takılan <em>her şey</em> için.</h2>
            <p>Form aracılığıyla ya da doğrudan e-posta ile bize ulaşabilirsiniz. Genelde aynı gün içinde yanıt veriyoruz.</p>
            <div className="cf-stats">
              <div><div className="num"><Counter to={2} /> sa.</div><div className="lbl">Ortalama yanıt süresi</div></div>
              <div><div className="num"><Counter to={98} suffix="%" /></div><div className="lbl">Müşteri memnuniyeti</div></div>
            </div>
          </div>
          <form className={`cf-form reveal-r ${sent ? 'sent' : ''}`} onSubmit={submit} noValidate>
            {sent ? (
              <div className="cf-thanks">
                <div className="cf-thanks-ico">
                  <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M8 12l3 3 5-6"/></svg>
                </div>
                <h3>Mesajınız bize ulaştı!</h3>
                <p>En kısa sürede {form.email || 'e-postanıza'} adresine yanıt vereceğiz.</p>
                <button type="button" className="btn btn-ghost" onClick={() => { setSent(false); setForm({ name:'', email:'', phone:'', subject:'Genel', msg:'' }); setTouched({}); }}><span>Yeni Mesaj</span><span className="arrow"></span></button>
              </div>
            ) : (
              <>
                <div className="cf-row">
                  <label className={`cf-field ${errs.name ? 'err' : ''}`}>
                    <span>Ad Soyad</span>
                    <input type="text" value={form.name} onChange={e => set('name', e.target.value)} onBlur={() => touch('name')} placeholder="Adınız" />
                    {errs.name && <em>{errs.name}</em>}
                  </label>
                  <label className={`cf-field ${errs.email ? 'err' : ''}`}>
                    <span>E-posta</span>
                    <input type="email" value={form.email} onChange={e => set('email', e.target.value)} onBlur={() => touch('email')} placeholder="ornek@mail.com" />
                    {errs.email && <em>{errs.email}</em>}
                  </label>
                </div>
                <div className="cf-row">
                  <label className="cf-field">
                    <span>Telefon</span>
                    <input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="0 (___) ___ __ __" />
                  </label>
                  <label className="cf-field">
                    <span>Konu</span>
                    <select value={form.subject} onChange={e => set('subject', e.target.value)}>
                      <option>Genel</option>
                      <option>Sipariş</option>
                      <option>Bayilik</option>
                      <option>Kurumsal</option>
                      <option>Geri Bildirim</option>
                    </select>
                  </label>
                </div>
                <label className={`cf-field ${errs.msg ? 'err' : ''}`}>
                  <span>Mesajınız</span>
                  <textarea rows="5" value={form.msg} onChange={e => set('msg', e.target.value)} onBlur={() => touch('msg')} placeholder="Bize yazmak istediğiniz her şey..."></textarea>
                  {errs.msg && <em>{errs.msg}</em>}
                </label>
                <button type="submit" className="btn btn-primary cf-submit"><span>Mesajı Gönder</span><span className="arrow"></span></button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

function Branches() {
  const [active, setActive] = usI(0);
  return (
    <section className="section branches-section">
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow"><span className="bar"></span>Şubelerimiz<span className="bar"></span></div>
          <h2>İstanbul'da <em>10 nokta</em>, her gün taze.</h2>
        </div>
        <div className="branches-grid reveal">
          <div className="branches-list">
            {BRANCHES.map((b, i) => (
              <button key={i} className={`branch-row ${active === i ? 'on' : ''}`} onClick={() => setActive(i)}>
                <div className="branch-num">0{i + 1 < 10 ? i + 1 : i + 1}</div>
                <div className="branch-meta">
                  <div className="branch-name">{b.name}</div>
                  <div className="branch-addr">{b.addr}</div>
                </div>
                <svg className="branch-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M9 6l6 6-6 6"/></svg>
              </button>
            ))}
          </div>
          <div className="branch-detail">
            <div className="branch-map" key={active}>
              {/* stylized map with pin */}
              <div className="branch-map-grid"></div>
              <div className="branch-pin">
                <span>📍</span>
              </div>
              <div className="branch-pin-ring"></div>
            </div>
            <div className="branch-info" key={active + '_i'}>
              <div className="eyebrow"><span className="bar"></span>0{active + 1 < 10 ? active + 1 : active + 1}</div>
              <h3>{BRANCHES[active].name}</h3>
              <p className="branch-addr-big">{BRANCHES[active].addr}</p>
              <div className="branch-info-row">
                <div><div className="lbl">Telefon</div><div className="val">{BRANCHES[active].tel}</div></div>
                <div><div className="lbl">Çalışma</div><div className="val">{BRANCHES[active].hrs}</div></div>
              </div>
              <a className="btn btn-ghost" href="#"><span>Yol Tarifi Al</span><span className="arrow"></span></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = usI(0);
  return (
    <section className="section faq-section">
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow"><span className="bar"></span>Sıkça Sorulan<span className="bar"></span></div>
          <h2>Aklınıza ilk gelen <em>soruların</em> yanıtı.</h2>
        </div>
        <div className="faq-list reveal">
          {FAQ.map((f, i) => (
            <div key={i} className={`faq-item ${open === i ? 'on' : ''}`}>
              <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
                <span className="faq-num">0{i + 1}</span>
                <span className="faq-text">{f.q}</span>
                <span className="faq-toggle"></span>
              </button>
              <div className="faq-a"><div className="faq-a-inner"><p>{f.a}</p></div></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function IletisimPage() {
  useReveal();
  return (
    <>
      <Loader />
      <Nav />
      <main>
        <PageHero
          eyebrow="İletişim"
          title={<>Bizimle <span className="accent">tanışmak</span><br/>ister misiniz?</>}
          sub="Sipariş, bayilik, kurumsal işbirliği veya bir lezzet önerisi — kapımız her zaman açık."
          image="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=2400&q=80"
        />
        <QuickStrip />
        <ContactForm />
        <Branches />
        <Faq />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<IletisimPage />);

const { useState: usU, useEffect: ueU, useMemo: umU } = React;

const CATEGORIES = [
  { id: 'all', label: 'Tümü' },
  { id: 'meze', label: 'Meze' },
  { id: 'sandvic', label: 'Sandviç' },
  { id: 'durum', label: 'Dürüm' },
  { id: 'kahvalti', label: 'Kahvaltı' }
];

const PRODUCTS = [
  { id: 1, cat: 'meze', name: 'Haydari', price: '32.50', tag: 'Klasik', spicy: 0, vegan: false, desc: 'Süzme yoğurt, dereotu, sarımsak. Bizim imzamız, en çok sevileniniz.', img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80' },
  { id: 2, cat: 'meze', name: 'Atom', price: '38.50', tag: 'Acılı', spicy: 2, vegan: false, desc: 'Yoğurt, közlenmiş kırmızı biber, sarımsak ve nar ekşisinin buluşması.', img: 'https://images.unsplash.com/photo-1604917877934-07d8d248d396?auto=format&fit=crop&w=800&q=80' },
  { id: 3, cat: 'meze', name: 'Acılı Ezme', price: '35.50', tag: 'Acılı', spicy: 3, vegan: true, desc: 'Domates, soğan, biber salçası, zeytinyağı, tuzun karıştırılması ile elde edilen klasik.', img: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=800&q=80' },
  { id: 4, cat: 'meze', name: 'Kısır', price: '55.50', tag: 'Geleneksel', spicy: 1, vegan: true, desc: 'İnce bulgur, salça, baharatlar, taze maydanoz. Ev yapımı tarif.', img: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80' },
  { id: 5, cat: 'meze', name: 'Mütebbel', price: '42.00', tag: 'Vegan', spicy: 0, vegan: true, desc: 'Közlenmiş patlıcan, tahin, sarımsak, limon. Tütsü kokulu, kremsi doku.', img: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80' },
  { id: 6, cat: 'meze', name: 'Çiroz', price: '45.50', tag: 'Balık', spicy: 0, vegan: false, desc: 'Uskumru ve mersinbalığı tuzlanarak güneşte kurutulur. Rakı sofrasının kralı.', img: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=800&q=80' },
  { id: 7, cat: 'sandvic', name: 'Pastırmalı Sandviç', price: '85.00', tag: 'Şefin Seçimi', spicy: 1, vegan: false, desc: 'Kayseri pastırması, kaşar, közlenmiş biber, taze ekşi mayalı ekmek.', img: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80' },
  { id: 8, cat: 'sandvic', name: 'Hepsi Special', price: '95.00', tag: 'İmza', spicy: 2, vegan: false, desc: 'Acılı sucuk, mütebbel, közlenmiş biber, mayonez. Ev yapımı turşulu yanında.', img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80' },
  { id: 9, cat: 'sandvic', name: 'Tavuklu Mütebbel', price: '78.00', tag: 'Yeni', spicy: 0, vegan: false, desc: 'Izgara tavuk, mütebbel, marul, salatalık, taze ekmek.', img: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=800&q=80' },
  { id: 10, cat: 'durum', name: 'Atomlu Dürüm', price: '72.00', tag: 'Acılı', spicy: 2, vegan: false, desc: 'Atom mezesi, ızgara tavuk, marul, közlenmiş biber. Ev yapımı yufka.', img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80' },
  { id: 11, cat: 'durum', name: 'Mezeli Dürüm', price: '68.00', tag: 'Vegan', spicy: 1, vegan: true, desc: 'Haydari, mütebbel, kısır, közlenmiş sebze. Et yok, lezzet bol.', img: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80' },
  { id: 12, cat: 'kahvalti', name: 'Köy Kahvaltısı', price: '185.00', tag: '2 Kişilik', spicy: 0, vegan: false, desc: '14 çeşit: peynir, zeytin, bal-kaymak, reçeller, sucuklu yumurta, ev yapımı poğaça.', img: 'https://images.unsplash.com/photo-1540914124281-342587941389?auto=format&fit=crop&w=800&q=80' },
  { id: 13, cat: 'kahvalti', name: 'Menemen', price: '85.00', tag: 'Sıcak', spicy: 1, vegan: false, desc: 'Domates, biber, soğan, yumurta. Bakır tavada servis.', img: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=800&q=80' }
];

function Filters({ active, onChange, count }) {
  return (
    <div className="filters reveal">
      <div className="filters-tabs">
        {CATEGORIES.map(c => (
          <button key={c.id} className={active === c.id ? 'on' : ''} onClick={() => onChange(c.id)}>
            {c.label}
            {active === c.id && <span className="tab-line"></span>}
          </button>
        ))}
      </div>
      <div className="filters-meta">
        <span className="count">{count}</span> ürün listeleniyor
      </div>
    </div>
  );
}

function ProductCard({ p, i, onAdd }) {
  return (
    <article className="prod-card reveal" data-delay={(i % 3) * 80}>
      <div className="prod-img">
        <FoodImg src={p.img} alt={p.name} />
        <div className="prod-tags">
          {p.tag && <span className="tag tag-gold">{p.tag}</span>}
          {p.vegan && <span className="tag tag-green">Vegan</span>}
          {p.spicy > 0 && <span className="tag tag-red">{'🌶️'.repeat(p.spicy)}</span>}
        </div>
        <button className="prod-add" onClick={() => onAdd(p)} aria-label="Sepete ekle">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
        </button>
      </div>
      <div className="prod-body">
        <div className="prod-head">
          <h3>{p.name}</h3>
          <div className="prod-price">{p.price}<span className="sup">₺</span></div>
        </div>
        <p>{p.desc}</p>
      </div>
    </article>
  );
}

function CartDrawer({ open, items, onClose, onRemove }) {
  const total = items.reduce((s, i) => s + parseFloat(i.price) * i.qty, 0).toFixed(2);
  return (
    <>
      <div className={`cart-veil ${open ? 'on' : ''}`} onClick={onClose}></div>
      <aside className={`cart ${open ? 'on' : ''}`}>
        <header className="cart-head">
          <h3>Sepetim</h3>
          <button onClick={onClose} aria-label="kapat">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M6 6l12 12M18 6L6 18"/></svg>
          </button>
        </header>
        <div className="cart-body">
          {items.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-ico">🍽️</div>
              <p>Sepetiniz şu an boş</p>
              <span>Beğendiğiniz mezeyi ekleyin, hemen yola çıksın.</span>
            </div>
          ) : items.map((i, k) => (
            <div key={k} className="cart-row">
              <FoodImg src={i.img} alt={i.name} />
              <div className="cart-info">
                <div className="cart-name">{i.name}</div>
                <div className="cart-meta">{i.qty}× · {(i.price * i.qty).toFixed(2)}₺</div>
              </div>
              <button onClick={() => onRemove(i.id)} aria-label="kaldır">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14"/></svg>
              </button>
            </div>
          ))}
        </div>
        <footer className="cart-foot">
          <div className="cart-total"><span>Toplam</span><span className="cart-total-num">{total}₺</span></div>
          <button className="btn btn-primary" disabled={items.length === 0}><span>Siparişi Tamamla</span><span className="arrow"></span></button>
        </footer>
      </aside>
    </>
  );
}

function ProductsGrid() {
  const [active, setActive] = usU('all');
  const [items, setItems] = usU([]);
  const [cartOpen, setCartOpen] = usU(false);
  const [pulse, setPulse] = usU(false);
  const filtered = umU(() => active === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.cat === active), [active]);
  const onAdd = (p) => {
    setItems(prev => {
      const ex = prev.find(i => i.id === p.id);
      if (ex) return prev.map(i => i.id === p.id ? {...i, qty: i.qty + 1} : i);
      return [...prev, {...p, qty: 1, price: parseFloat(p.price)}];
    });
    setPulse(true);
    setTimeout(() => setPulse(false), 600);
  };
  const onRemove = (id) => setItems(prev => prev.filter(i => i.id !== id));
  const cartCount = items.reduce((s, i) => s + i.qty, 0);
  return (
    <section className="section" style={{ paddingTop: 80 }}>
      <div className="container">
        <Filters active={active} onChange={setActive} count={filtered.length} />
        <div className="prod-grid" key={active}>
          {filtered.map((p, i) => <ProductCard key={p.id} p={p} i={i} onAdd={onAdd} />)}
        </div>
      </div>
      <button className={`cart-fab ${pulse ? 'pulse' : ''}`} onClick={() => setCartOpen(true)}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M5 6h14l-1.5 10.5a2 2 0 0 1-2 1.5H8.5a2 2 0 0 1-2-1.5L5 6zM8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
      </button>
      <CartDrawer open={cartOpen} items={items} onClose={() => setCartOpen(false)} onRemove={onRemove} />
    </section>
  );
}

function IngredientStory() {
  const items = [
    { region: 'Ayvalık', what: 'Zeytinyağı', desc: 'Soğuk sıkım, asit oranı %0.4. Her şişe, 28 yıllık ağaçtan.' },
    { region: 'Aydın', what: 'Domates', desc: 'Kuyu suyuyla yetişmiş, sabah 06:00\'da toplanıp aynı gün İstanbul\'da.' },
    { region: 'Muğla', what: 'Bal', desc: 'Çam balı, bölge arıcılarından doğrudan. Hiçbir işlem görmez.' },
    { region: 'Gaziantep', what: 'Baharat', desc: 'Pul biber, sumak, isot — 50 yıllık baharatçı dükkanından.' }
  ];
  return (
    <section className="section ingredient-section">
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow"><span className="bar"></span>Malzemelerimiz<span className="bar"></span></div>
          <h2>Türkiye'nin <em>haritasından</em> bir tabağa.</h2>
          <p className="lede">Hepsi Meze'nin lezzeti, Anadolu'nun farklı köşelerinden gelen küçük üreticilerin emeğinde gizli.</p>
        </div>
        <div className="ingredients">
          {items.map((it, i) => (
            <div key={i} className="ingredient reveal" data-delay={i * 100}>
              <div className="ingredient-region">{it.region}</div>
              <div className="ingredient-what">{it.what}</div>
              <p>{it.desc}</p>
              <div className="ingredient-line"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function UrunlerPage() {
  useReveal();
  return (
    <>
      <Loader />
      <Nav />
      <main>
        <PageHero
          eyebrow="Ürünlerimiz"
          title={<>Sofranızın <span className="accent">kahramanları</span><br/>her gün <span className="green">taze</span>.</>}
          sub="Mezeden sandviçe, dürümden kahvaltıya — 27 farklı çeşit, %100 doğal malzemelerle, her sabah yeniden hazırlanır."
          image="https://images.unsplash.com/photo-1540914124281-342587941389?auto=format&fit=crop&w=2400&q=80"
        />
        <ProductsGrid />
        <IngredientStory />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<UrunlerPage />);

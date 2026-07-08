"use client";
import { useEffect, useRef } from "react";

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useCounters() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-count]");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting || e.target.dataset.done) return;
        e.target.dataset.done = "1";
        const target = parseFloat(e.target.dataset.count);
        const suffix = e.target.dataset.suffix || "";
        const dur = 1800;
        const t0 = performance.now();
        const tick = (t) => {
          const p = Math.min((t - t0) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          const val = target * eased;
          e.target.textContent =
            (target >= 100 ? Math.round(val).toLocaleString() : val.toFixed(target % 1 ? 1 : 0)) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.5 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Stars() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let raf, w, h;
    const N = 90;
    const pts = [];
    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    resize();
    for (let i = 0; i < N; i++) {
      pts.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.6 + 0.3,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        gold: Math.random() < 0.35,
      });
    }
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.gold ? "rgba(212,175,55,0.5)" : "rgba(52,211,153,0.4)";
        ctx.fill();
      }
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d = dx * dx + dy * dy;
          if (d < 130 * 130) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(16,185,129,${0.09 * (1 - d / (130 * 130))})`;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className="stars" aria-hidden="true" />;
}

export default function Home() {
  useReveal();
  useCounters();
  return (
    <>
      <Stars />
      <div className="geo-pattern" aria-hidden="true" />
      <div className="aurora a1" aria-hidden="true" />
      <div className="aurora a2" aria-hidden="true" />

      <nav className="nav">
        <a className="logo" href="#top">
          <span className="logo-mark"><span>ﻭ</span></span>
          Waqf<em>Chain</em>
        </a>
        <div className="nav-links">
          <a href="#what">What is Waqf</a>
          <a href="#problem">The Problem</a>
          <a href="#how">How It Works</a>
          <a href="#features">Features</a>
          <a href="#join" className="btn-nav">Join the Movement</a>
        </div>
      </nav>

      <main id="top">
        {/* HERO */}
        <header className="hero">
          <div className="hero-badge"><span className="dot" /> World's First · Waqf × Blockchain</div>
          <div className="hero-arabic">صَدَقَةٌ جَارِيَةٌ عَلَى سِلْسِلَةِ الْكُتَلِ</div>
          <h1>
            Eternal Charity.<br />
            <span className="grad-gold">Immutable Trust.</span><br />
            <span className="grad-em">Waqf on Blockchain.</span>
          </h1>
          <p className="sub">
            For 1,400 years, Waqf endowments built hospitals, schools, and wells across the Muslim world.
            Today, we carve them into the blockchain — transparent forever, tamper-proof forever,
            giving forever. A sadaqah jariyah that literally cannot be erased.
          </p>
          <div className="hero-ctas">
            <a className="btn-primary" href="#how">See How It Works ↓</a>
            <a className="btn-ghost" href="#what">Learn About Waqf</a>
          </div>
          <div className="hero-stats">
            <div className="stat"><div className="num" data-count="1400" data-suffix="+">0</div><div className="lbl">Years of Waqf Legacy</div></div>
            <div className="stat"><div className="num" data-count="1" data-suffix="T+">0</div><div className="lbl">USD Est. Global Waqf Assets</div></div>
            <div className="stat"><div className="num" data-count="100" data-suffix="%">0</div><div className="lbl">On-Chain Transparency</div></div>
            <div className="stat"><div className="num" data-count="0">0</div><div className="lbl">Intermediaries Needed</div></div>
          </div>
          <div className="scroll-hint">▾</div>
        </header>

        {/* WHAT IS WAQF */}
        <section id="what">
          <div className="reveal">
            <div className="section-tag">The Foundation</div>
            <h2 className="section-title">What is <span className="gold">Waqf</span>?</h2>
            <p className="section-sub">
              A Waqf (وقف, plural: awqāf) is an Islamic endowment — an asset donated permanently for the
              sake of Allah. The principal is locked forever; only its fruits flow to the needy.
              It is charity designed to outlive its giver.
            </p>
          </div>
          <div className="split">
            <div className="def-card reveal">
              <div className="arabic-line">حَبِّسِ الأَصْلَ وَسَبِّلِ الثَّمَرَةَ</div>
              <p>
                “Retain the principal, and dedicate its fruits to charity.” — the Prophet Muhammad ﷺ advising
                Umar ibn al-Khattab (RA) on the orchard of Khaybar, establishing the first great Waqf.
                The asset can never be sold, gifted, or inherited. Its benefit flows perpetually.
              </p>
              <span className="src">— Sahih al-Bukhari & Sahih Muslim</span>
            </div>
            <div className="def-points">
              <div className="def-point reveal"><div className="ico">🕌</div><div><h4>Perpetual by Design</h4><p>A Waqf never expires. The Ottoman Empire ran hospitals for 500+ years on single endowments.</p></div></div>
              <div className="def-point reveal"><div className="ico">🔒</div><div><h4>The Principal is Sacred</h4><p>The corpus is immobilized — "waqf" literally means "to stop, to hold." Sound familiar? So is a blockchain record.</p></div></div>
              <div className="def-point reveal"><div className="ico">🌊</div><div><h4>Only the Yield Flows</h4><p>Rent, profit, and produce from the asset fund schools, wells, orphans, and mosques — generation after generation.</p></div></div>
            </div>
          </div>
        </section>

        {/* PROBLEM */}
        <section id="problem">
          <div className="reveal">
            <div className="section-tag">The Crisis</div>
            <h2 className="section-title">A <span className="gold">$1 trillion</span> trust, managed with paper and padlocks</h2>
            <p className="section-sub">
              Global Waqf assets are estimated at up to $1 trillion — yet vast portions lie idle,
              undocumented, or lost to mismanagement. The world's oldest endowment system runs on
              its oldest infrastructure.
            </p>
          </div>
          <div className="cards3">
            <div className="p-card reveal"><div className="big">📜</div><h3>Lost & Disputed Records</h3><p>Centuries-old deeds vanish, get forged, or rot in archives. Countless awqāf have been swallowed by land grabs simply because no one could prove they existed.</p></div>
            <div className="p-card reveal"><div className="big">🕳️</div><h3>Zero Transparency</h3><p>Donors rarely see where yields go. Opaque intermediaries erode the very trust that Waqf was built upon — and giving shrinks with it.</p></div>
            <div className="p-card reveal"><div className="big">🧊</div><h3>Frozen, Idle Capital</h3><p>Prime Waqf real estate sits underutilized for decades because governance is slow, fragmented, and unaccountable. The ummah's endowment sleeps.</p></div>
          </div>
        </section>

        {/* SOLUTION / CHAIN */}
        <section id="how">
          <div className="reveal">
            <div className="section-tag">The Breakthrough</div>
            <h2 className="section-title">The chain that <span className="em">cannot forget</span></h2>
            <p className="section-sub">
              A Waqf must be held forever. A blockchain ledger *is* forever. It is the most natural pairing in
              the history of finance: an immutable endowment, on an immutable ledger. Every deed, every
              donation, every disbursement — carved into cryptographic stone, visible to all.
            </p>
          </div>

          <div className="chain-wrap reveal">
            <div className="chain">
              <div className="block"><div className="hash mono">0x8f3a…waqf</div><h4>Deed Block</h4><p>The waqfiyyah (endowment deed) is hashed and registered on-chain. Provable forever.</p></div>
              <div className="chain-link">⛓</div>
              <div className="block"><div className="hash mono">0x2c91…niyt</div><h4>Donation Block</h4><p>Every contribution is time-stamped and publicly auditable — from anyone, anywhere on Earth.</p></div>
              <div className="chain-link">⛓</div>
              <div className="block"><div className="hash mono">0xa774…amanah</div><h4>Yield Block</h4><p>Returns generated by the Waqf asset are recorded transparently as they accrue.</p></div>
              <div className="chain-link">⛓</div>
              <div className="block"><div className="hash mono">0xe10b…khayr</div><h4>Impact Block</h4><p>Smart contracts disburse yields to verified beneficiaries. Donors watch their sadaqah flow, live.</p></div>
            </div>
          </div>

          <div className="steps">
            <div className="step reveal"><div className="n">01</div><h3>Endow</h3><p>A donor dedicates an asset — property, cash, or crypto — as Waqf. The deed is notarized on-chain under Shariah supervision.</p></div>
            <div className="step reveal"><div className="n">02</div><h3>Tokenize</h3><p>The endowment is represented digitally, so a single person — or a million people together — can build a Waqf with any amount.</p></div>
            <div className="step reveal"><div className="n">03</div><h3>Grow</h3><p>Shariah-compliant managers invest the corpus. The principal stays locked, exactly as the fiqh of Waqf demands.</p></div>
            <div className="step reveal"><div className="n">04</div><h3>Give — Forever</h3><p>Smart contracts stream the yield to schools, clinics, wells, and orphans. Automatically. Transparently. Perpetually.</p></div>
          </div>
        </section>

        {/* FEATURES */}
        <section id="features">
          <div className="reveal">
            <div className="section-tag">Why Blockchain</div>
            <h2 className="section-title">Built like an <span className="gold">amanah</span> should be</h2>
          </div>
          <div className="features">
            <div className="feat reveal"><div className="ico">🛡️</div><h3>Immutable Deeds</h3><p>Once a Waqf is registered, no court dispute, lost archive, or bad actor can erase it. The chain remembers.</p></div>
            <div className="feat reveal"><div className="ico">👁️</div><h3>Radical Transparency</h3><p>Every rupee, riyal, and ringgit of yield is traceable from asset to beneficiary in real time.</p></div>
            <div className="feat reveal"><div className="ico">🕋</div><h3>Shariah-First</h3><p>Governance modeled on classical fiqh of awqāf, overseen by scholars — technology serves the deen, never the reverse.</p></div>
            <div className="feat reveal"><div className="ico">🤝</div><h3>Micro-Waqf for All</h3><p>Fractional endowment means a student with $5 joins the same eternal ledger as a founder endowing a building.</p></div>
            <div className="feat reveal"><div className="ico">⚙️</div><h3>Smart Disbursement</h3><p>Self-executing contracts route yields by pre-agreed rules — no leakage, no middlemen, no delays.</p></div>
            <div className="feat reveal"><div className="ico">🌍</div><h3>Borderless Ummah</h3><p>A diaspora donor in Toronto can endow a well in Kashmir and watch it give — for the rest of history.</p></div>
          </div>
        </section>

        {/* QUOTE */}
        <section className="quote-sec">
          <div className="reveal">
            <div className="quote-mark">“</div>
            <blockquote className="hadith">
              When a person dies, their deeds come to an end except three: <span className="hl">a continuing charity</span>,
              beneficial knowledge, or a righteous child who prays for them.
            </blockquote>
            <div className="hadith-src">— PROPHET MUHAMMAD ﷺ · SAHIH MUSLIM 1631</div>
            <div className="hadith-arabic">إِذَا مَاتَ الإِنْسَانُ انْقَطَعَ عَمَلُهُ إِلاَّ مِنْ ثَلاَثَةٍ: صَدَقَةٍ جَارِيَةٍ...</div>
          </div>
        </section>

        {/* CTA */}
        <section id="join">
          <div className="cta-panel reveal">
            <h2>Be part of the <span style={{ color: "var(--gold-bright)" }}>first Waqf</span> written in stone that computes</h2>
            <p>
              WaqfChain is a pioneering vision — the first-ever platform concept dedicated to bringing the
              1,400-year institution of Waqf onto the blockchain. Scholars, builders, and donors:
              the eternal ledger has room for your name.
            </p>
            <div className="hero-ctas">
              <a className="btn-primary" href="mailto:hello@waqfchain.example?subject=Joining%20WaqfChain">Get Early Access</a>
              <a className="btn-ghost" href="#what">Read the Vision</a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div>© 2026 WaqfChain — the first Waqf-on-Blockchain initiative. Built with ihsan.</div>
        <div className="arabic">وَمَا تُقَدِّمُوا لِأَنفُسِكُم مِّنْ خَيْرٍ تَجِدُوهُ عِندَ اللَّهِ</div>
      </footer>
    </>
  );
}

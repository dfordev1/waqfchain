"use client";
import { useEffect, useRef, useState } from "react";

/* ---------------- hooks ---------------- */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useScrollFx() {
  useEffect(() => {
    const bar = document.querySelector(".progress");
    const nav = document.querySelector("nav.top");
    const onScroll = () => {
      const h = document.documentElement;
      const p = h.scrollTop / (h.scrollHeight - h.clientHeight);
      if (bar) bar.style.width = `${p * 100}%`;
      if (nav) nav.classList.toggle("scrolled", h.scrollTop > 30);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
}

/* ---------------- live ledger simulation ---------------- */
const TX_POOL = [
  { ic: "🕌", gold: true, l1: "Waqf deed registered — Srinagar orchard", amt: "DEED", g: true },
  { ic: "💧", l1: "Yield disbursed — water well, Kashmir", amt: "+412 USDT" },
  { ic: "📚", l1: "Yield disbursed — madrasa scholarship ×12", amt: "+1,860 USDT" },
  { ic: "🤲", l1: "Micro-waqf joined — donor #4,182", amt: "+25 USDT" },
  { ic: "🏥", l1: "Yield disbursed — clinic meds, Gaza", amt: "+978 USDT" },
  { ic: "🌾", gold: true, l1: "Corpus reinvested — sukuk (AAOIFI)", amt: "LOCKED", g: true },
  { ic: "🤲", l1: "Micro-waqf joined — donor #4,183", amt: "+5 USDT" },
  { ic: "🫒", l1: "Harvest yield recorded — olive waqf", amt: "+2,340 USDT" },
  { ic: "🕌", gold: true, l1: "Waqf deed registered — Istanbul dükkân", amt: "DEED", g: true },
  { ic: "👶", l1: "Yield disbursed — orphan sponsorship ×8", amt: "+640 USDT" },
];
function hash() {
  const c = "0123456789abcdef";
  let s = "0x";
  for (let i = 0; i < 4; i++) s += c[Math.floor(Math.random() * 16)];
  return s + "…" + c[Math.floor(Math.random() * 16)] + c[Math.floor(Math.random() * 16)] + c[Math.floor(Math.random() * 16)];
}

let txSeq = 0;
function LedgerCard() {
  const [rows, setRows] = useState([]);
  const [sealed, setSealed] = useState(18204);
  useEffect(() => {
    const push = () => {
      txSeq += 1;
      const t = TX_POOL[txSeq % TX_POOL.length];
      const k = txSeq;
      setRows((r) => [{ ...t, h: hash(), k }, ...r].slice(0, 6));
      setSealed((s) => s + 1);
    };
    push(); push(); push(); push(); push();
    const iv = setInterval(push, 2600);
    return () => clearInterval(iv);
  }, []);
  return (
    <div className="ledger-card">
      <div className="lc-head">
        <div className="t"><span className="dot" /> Eternal Ledger — Live</div>
        <div className="net">waqf-mainnet · block #4,821,907</div>
      </div>
      <div className="lc-body">
        {rows.map((r) => (
          <div className="tx" key={r.k}>
            <div className={`ic${r.gold ? " gold" : ""}`}>{r.ic}</div>
            <div className="meta">
              <div className="l1">{r.l1}</div>
              <div className="l2">{r.h} · sealed forever</div>
            </div>
            <div className={`amt${r.g ? " g" : ""}`}>{r.amt}</div>
          </div>
        ))}
      </div>
      <div className="lc-foot">
        <span>{sealed.toLocaleString()} entries sealed</span>
        <span className="ok">✓ immutable</span>
      </div>
    </div>
  );
}

/* ---------------- islamic star svg ---------------- */
function Star() {
  const ring = (r, n, rot = 0) => {
    const pts = [];
    for (let i = 0; i < n; i++) {
      const a = (Math.PI * 2 * i) / n + rot;
      pts.push(`${250 + r * Math.cos(a)},${250 + r * Math.sin(a)}`);
    }
    return pts.join(" ");
  };
  return (
    <svg className="star" viewBox="0 0 500 500" fill="none" aria-hidden="true">
      <g className="spin-slow">
        <circle cx="250" cy="250" r="235" stroke="rgba(201,162,39,0.16)" />
        <polygon points={ring(225, 8)} stroke="rgba(201,162,39,0.22)" fill="none" />
        <polygon points={ring(225, 8, Math.PI / 8)} stroke="rgba(201,162,39,0.22)" fill="none" />
      </g>
      <g className="spin-rev">
        <polygon points={ring(168, 8)} stroke="rgba(230,196,99,0.3)" fill="none" />
        <polygon points={ring(168, 8, Math.PI / 8)} stroke="rgba(230,196,99,0.3)" fill="none" />
        <circle cx="250" cy="250" r="138" stroke="rgba(18,185,129,0.18)" />
      </g>
      <g className="spin-slow">
        <polygon points={ring(108, 8)} stroke="rgba(201,162,39,0.35)" fill="none" />
        <polygon points={ring(108, 8, Math.PI / 8)} stroke="rgba(201,162,39,0.35)" fill="none" />
      </g>
    </svg>
  );
}

/* ---------------- FAQ ---------------- */
const FAQS = [
  {
    q: "Is putting a Waqf on blockchain shariah-compliant?",
    a: "The blockchain does not change the fiqh of Waqf — it enforces it. The classical conditions (perpetuity, irrevocability, the locked corpus) map one-to-one onto an immutable ledger. Every deployment would be reviewed and certified by a shariah supervisory board, following AAOIFI standards for awqāf.",
  },
  {
    q: "What happens to the principal (corpus)?",
    a: "Exactly what classical fiqh demands: nothing. The corpus is locked — represented on-chain and prevented by contract from being sold, gifted, or inherited. Only the yield it generates flows out, routed to beneficiaries by rules fixed in the endowment deed.",
  },
  {
    q: "Can I create a Waqf with a small amount?",
    a: "Yes — that is the point of micro-waqf. Fractional endowment lets thousands of donors pool into a single perpetual asset. A student's $5 and a founder's building enter the same eternal ledger, and both earn the reward of sadaqah jariyah.",
  },
  {
    q: "Who controls the funds?",
    a: "No single party. Deeds, yields, and disbursements execute by smart contract under multi-signature governance: shariah scholars, independent trustees, and audited nazir (manager) institutions. Every action is publicly verifiable — trust is replaced by proof.",
  },
  {
    q: "Is this a real product I can use today?",
    a: "WaqfChain is a pioneering vision — the first-ever platform concept dedicated entirely to Waqf on blockchain. We are assembling scholars, engineers, and awqāf institutions. Joining the early-access list is how the first cohort forms.",
  },
];

function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <div className="faq-list">
      {FAQS.map((f, i) => (
        <div className={`faq-item${open === i ? " open" : ""}`} key={i}>
          <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
            {f.q}
            <span className="pm">+</span>
          </button>
          <div className="faq-a"><p>{f.a}</p></div>
        </div>
      ))}
    </div>
  );
}

/* ---------------- page ---------------- */
export default function Home() {
  useReveal();
  useScrollFx();
  return (
    <>
      <div className="progress" />
      <div className="bg-fixed" aria-hidden="true">
        <div className="glow-a" /><div className="glow-b" /><div className="grain" />
      </div>

      <nav className="top">
        <div className="wrap nav-in">
          <a href="#top" className="brand">
            <svg width="34" height="34" viewBox="0 0 40 40" aria-hidden="true">
              <rect x="6" y="6" width="28" height="28" rx="9" transform="rotate(45 20 20)" fill="none" stroke="#c9a227" strokeWidth="1.6" />
              <rect x="12" y="12" width="16" height="16" rx="5" transform="rotate(45 20 20)" fill="rgba(201,162,39,0.12)" stroke="#e6c463" strokeWidth="1.2" />
              <text x="20" y="25" textAnchor="middle" fontFamily="serif" fontSize="13" fill="#f6e2a8">ﻭ</text>
            </svg>
            <span><b>Waqf</b><span className="tld">Chain</span></span>
          </a>
          <div className="nav-links">
            <a href="#heritage">Heritage</a>
            <a href="#problem">The Problem</a>
            <a href="#how">Protocol</a>
            <a href="#pillars">Pillars</a>
            <a href="#faq">FAQ</a>
            <a href="#join" className="btn-gold">Join the founding cohort <span className="arr">→</span></a>
          </div>
        </div>
      </nav>

      <main id="top">
        {/* ================= HERO ================= */}
        <header className="hero">
          <div className="wrap hero-grid">
            <div>
              <div className="hero-eyebrow"><span className="pulse" /> The world&apos;s first · Waqf on Blockchain</div>
              <h1>
                The <span className="it gtext">eternal ledger</span> for eternal charity
              </h1>
              <p className="sub">
                A Waqf must be held <b>forever</b>. A blockchain record lasts <b>forever</b>.
                WaqfChain unites the 1,400-year Islamic endowment with cryptographic permanence —
                immutable deeds, transparent yields, charity that outlives every one of us.
              </p>
              <div className="hero-ctas">
                <a href="#join" className="btn-gold">Endow the future <span className="arr">→</span></a>
                <a href="#heritage" className="btn-line">Explore the heritage</a>
              </div>
              <div className="hero-proof">
                <div className="proof"><div className="v serif">1,400+</div><div className="k">years of legacy</div></div>
                <div className="proof"><div className="v serif">$1T+</div><div className="k">global waqf assets</div></div>
                <div className="proof"><div className="v serif">∞</div><div className="k">intended lifespan</div></div>
              </div>
            </div>
            <div className="hero-visual" aria-hidden="true">
              <div className="star-wrap"><Star /></div>
              <LedgerCard />
            </div>
          </div>
          <div className="scroll-cue" aria-hidden="true" />
        </header>

        {/* ================= MARQUEE ================= */}
        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {[0, 1].map((k) => (
              <span key={k} style={{ display: "inline-flex", gap: 56, alignItems: "center" }}>
                <span className="ar">صدقة جارية</span><i>✦</i>
                <span>Immutable</span><i>✦</i>
                <span className="ar">وقف</span><i>✦</i>
                <span>Perpetual</span><i>✦</i>
                <span className="ar">أمانة</span><i>✦</i>
                <span>Transparent</span><i>✦</i>
                <span className="ar">إحسان</span><i>✦</i>
                <span>Shariah-first</span><i>✦</i>
              </span>
            ))}
          </div>
        </div>

        {/* ================= HERITAGE ================= */}
        <section id="heritage">
          <div className="wrap">
            <div className="reveal">
              <div className="eyebrow">Chapter 01 — Heritage</div>
              <h2 className="h">Fourteen centuries of charity <span className="it gtext">engineered to last</span></h2>
            </div>
            <div className="heritage-grid">
              <div className="dropcap-block reveal d1">
                <p>
                  When the Prophet Muhammad ﷺ told Umar ibn al-Khattab to &quot;retain the principal and
                  dedicate its fruits,&quot; he defined an institution the modern world would take
                  thirteen centuries to rediscover: the perpetual endowment.
                </p>
                <p>
                  The asset — an orchard, a building, a well — is stopped (<em>waqf</em> literally means
                  &quot;to halt&quot;). It can never again be sold, gifted, or inherited. Only its yield moves,
                  flowing to the poor, to students, to travelers, forever. On this single idea the Muslim
                  world ran hospitals, universities, and water systems for over a millennium.
                </p>
                <div className="hadith-card">
                  <div className="ar">حَبِّسِ الأَصْلَ وَسَبِّلِ الثَّمَرَةَ</div>
                  <div className="en">&quot;Retain the principal, and dedicate its fruits to charity.&quot;</div>
                  <div className="src">Sahih al-Bukhari · Sahih Muslim</div>
                </div>
              </div>
              <div className="timeline reveal d2">
                <div className="tl-item">
                  <div className="yr">7th century</div>
                  <h4>Khaybar — the first great Waqf</h4>
                  <p>Umar (RA) endows his most beloved orchard on the Prophet&apos;s ﷺ instruction. The template is set: locked corpus, flowing fruits.</p>
                </div>
                <div className="tl-item">
                  <div className="yr">8th–16th century</div>
                  <h4>The Waqf civilization</h4>
                  <p>Al-Qarawiyyin and al-Azhar universities, Ottoman imarets feeding tens of thousands daily, water networks of Istanbul — all Waqf-funded, some for 500+ unbroken years.</p>
                </div>
                <div className="tl-item">
                  <div className="yr">19th–20th century</div>
                  <h4>The great unraveling</h4>
                  <p>Colonization, nationalization, and lost paper records dismantle the system. Deeds vanish; endowments are absorbed or frozen.</p>
                </div>
                <div className="tl-item">
                  <div className="yr">Today</div>
                  <h4>The eternal ledger arrives</h4>
                  <p>For the first time in history, an instrument exists whose records — like the Waqf itself — cannot be altered or destroyed. WaqfChain is the reunion.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= PROBLEM ================= */}
        <section className="problem" id="problem">
          <div className="wrap">
            <div className="reveal">
              <div className="eyebrow">Chapter 02 — The Problem</div>
              <h2 className="h">A trillion-dollar amanah, running on <span className="it gtext">paper and padlocks</span></h2>
              <p className="lede">
                The ummah&apos;s single largest pool of charitable capital is also its least accountable.
                Not for lack of generosity — for lack of infrastructure.
              </p>
            </div>
            <div className="stat-wall reveal d1">
              <div className="swall">
                <div className="big gtext">$1T+</div>
                <h3>Assets, mostly asleep</h3>
                <p>Estimated global Waqf holdings. Vast tracts of prime real estate sit idle or underutilized because governance is fragmented and opaque.</p>
                <span className="tag">idle capital</span>
              </div>
              <div className="swall">
                <div className="big gtext">100s</div>
                <h3>of years of lost deeds</h3>
                <p>Waqfiyyahs rot in archives, burn, or vanish — and with them, legal proof. Endowments meant for eternity have been erased by a missing page.</p>
                <span className="tag">lost records</span>
              </div>
              <div className="swall">
                <div className="big gtext">~0%</div>
                <h3>donor-visible flow</h3>
                <p>Once given, funds disappear behind intermediaries. Donors cannot trace a single riyal from asset to beneficiary — so trust, and giving, erode.</p>
                <span className="tag">zero transparency</span>
              </div>
            </div>
          </div>
        </section>

        {/* ================= PROTOCOL ================= */}
        <section id="how">
          <div className="wrap">
            <div className="reveal">
              <div className="eyebrow">Chapter 03 — The Protocol</div>
              <h2 className="h">Four movements of an <span className="it gtext">unbreakable covenant</span></h2>
              <p className="lede">
                Classical fiqh defines the rules. Smart contracts enforce them — without discretion,
                without leakage, without end.
              </p>
            </div>
            <div className="steps-rail reveal d1">
              <div className="srail">
                <div className="orb">١</div>
                <h3>Endow</h3>
                <p>A donor dedicates property, cash, or digital assets. The waqfiyyah (deed) is hashed and sealed on-chain under shariah supervision — provable for as long as the chain exists.</p>
                <div className="fine">→ deed_hash sealed · irrevocable</div>
              </div>
              <div className="srail">
                <div className="orb">٢</div>
                <h3>Tokenize</h3>
                <p>The endowment is represented as fractional units, so one founder — or a hundred thousand micro-donors — can raise a single perpetual asset together.</p>
                <div className="fine">→ corpus locked · non-transferable</div>
              </div>
              <div className="srail">
                <div className="orb">٣</div>
                <h3>Grow</h3>
                <p>Certified nazirs deploy the corpus into shariah-compliant instruments — sukuk, ijara, productive real assets. The principal never moves. Only its fruits do.</p>
                <div className="fine">→ AAOIFI-aligned · audited on-chain</div>
              </div>
              <div className="srail">
                <div className="orb">٤</div>
                <h3>Give, forever</h3>
                <p>Yields stream automatically to verified beneficiaries — wells, scholarships, clinics, orphans — exactly as the deed prescribes. Donors watch it happen, live.</p>
                <div className="fine">→ disbursement visible to all</div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= PILLARS / BENTO ================= */}
        <section id="pillars">
          <div className="wrap">
            <div className="reveal">
              <div className="eyebrow">Chapter 04 — The Pillars</div>
              <h2 className="h">Built the way an <span className="it gtext">amanah deserves</span></h2>
            </div>
            <div className="bento">
              <div className="b-card span4 reveal">
                <div className="ic">🛡️</div>
                <h3>Deeds that outlive empires</h3>
                <p>
                  The Ottoman archives lost thousands of waqfiyyahs to fire, flood, and politics. A deed
                  sealed on a public blockchain is replicated across thousands of independent nodes on
                  every continent — no single fire, court, or regime can erase it. For the first time,
                  the legal instrument is as permanent as the intention behind it.
                </p>
                <div className="watermark">وقف</div>
              </div>
              <div className="b-card span2 reveal d1">
                <div className="ic">👁️</div>
                <h3>Glass, not vaults</h3>
                <p>Every yield and disbursement is publicly auditable in real time. Trust is replaced by proof.</p>
              </div>
              <div className="b-card span2 reveal">
                <div className="ic">🕋</div>
                <h3>Scholars govern</h3>
                <p>A shariah supervisory board certifies every deed and instrument. Technology serves the deen — never the reverse.</p>
              </div>
              <div className="b-card span2 reveal d1">
                <div className="ic">🤝</div>
                <h3>Micro-waqf</h3>
                <p>From $5 to a building — every donor enters the same eternal ledger and earns the same perpetual reward.</p>
              </div>
              <div className="b-card span2 reveal d2">
                <div className="ic">🌍</div>
                <h3>Borderless</h3>
                <p>Endow a well in Kashmir from Toronto. Fund a madrasa in Jakarta from London. Watch both give, forever.</p>
              </div>
              <div className="b-card span3 reveal">
                <div className="ic">⚙️</div>
                <h3>Disbursement without discretion</h3>
                <p>Smart contracts route yields by rules fixed in the deed — no intermediaries to skim, delay, or divert. The nazir manages; the contract enforces; the ummah verifies.</p>
              </div>
              <div className="b-card span3 reveal d1">
                <div className="ic">📖</div>
                <h3>Fiqh-native by construction</h3>
                <p>Perpetuity, irrevocability, inalienability — the three classical conditions of Waqf are not policies we promise. They are properties the ledger enforces by mathematics.</p>
                <div className="watermark">أمانة</div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= QUOTE ================= */}
        <section className="grand-quote">
          <div className="wrap reveal">
            <div className="orn">✦ ✦ ✦</div>
            <blockquote>
              &quot;When a person dies, their deeds end — except three: <span className="it gtext">a charity
              that continues</span>, knowledge that benefits, or a righteous child who prays for them.&quot;
            </blockquote>
            <div className="who">Prophet Muhammad ﷺ — Sahih Muslim 1631</div>
            <div className="ar">إِذَا مَاتَ الإِنْسَانُ انْقَطَعَ عَمَلُهُ إِلاَّ مِنْ ثَلاَثَةٍ: صَدَقَةٍ جَارِيَةٍ، أَوْ عِلْمٍ يُنْتَفَعُ بِهِ، أَوْ وَلَدٍ صَالِحٍ يَدْعُو لَهُ</div>
          </div>
        </section>

        {/* ================= FAQ ================= */}
        <section id="faq">
          <div className="wrap faq-grid">
            <div className="reveal">
              <div className="eyebrow">Chapter 05 — Questions</div>
              <h2 className="h">Asked with rigor, answered with <span className="it gtext">rigor</span></h2>
              <p className="lede">The fiqh of awqāf is a thousand-year discipline. We treat it that way.</p>
            </div>
            <div className="reveal d1"><Faq /></div>
          </div>
        </section>

        {/* ================= FINALE ================= */}
        <section id="join" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="finale reveal">
              <div className="ar-top">وَمَا تُقَدِّمُوا لِأَنفُسِكُم مِّنْ خَيْرٍ تَجِدُوهُ عِندَ اللَّهِ</div>
              <h2>Write your name into a ledger that <span className="it gtext">never stops giving</span></h2>
              <p>
                WaqfChain is assembling its founding cohort — scholars of fiqh, protocol engineers,
                awqāf institutions, and donors who think in centuries. The first entry is yours to make.
              </p>
              <div className="ctas">
                <a className="btn-gold" href="mailto:hello@waqfchain.example?subject=Founding%20Cohort">Request early access <span className="arr">→</span></a>
                <a className="btn-line" href="#heritage">Re-read the vision</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}
      <footer>
        <div className="wrap f-grid">
          <div className="f-brand">
            <a href="#top" className="brand">
              <svg width="30" height="30" viewBox="0 0 40 40" aria-hidden="true">
                <rect x="6" y="6" width="28" height="28" rx="9" transform="rotate(45 20 20)" fill="none" stroke="#c9a227" strokeWidth="1.6" />
                <text x="20" y="25" textAnchor="middle" fontFamily="serif" fontSize="13" fill="#f6e2a8">ﻭ</text>
              </svg>
              <span><b>Waqf</b><span className="tld">Chain</span></span>
            </a>
            <p>The first-ever initiative dedicated to bringing the Islamic Waqf onto the blockchain. Charity that outlives its giver, on a ledger that outlives us all.</p>
          </div>
          <div className="f-col">
            <div className="t">Explore</div>
            <a href="#heritage">Heritage</a>
            <a href="#problem">The Problem</a>
            <a href="#how">The Protocol</a>
            <a href="#pillars">The Pillars</a>
          </div>
          <div className="f-col">
            <div className="t">Learn</div>
            <a href="#faq">FAQ</a>
            <a href="#heritage">Fiqh of Waqf</a>
            <a href="#how">Smart contracts</a>
            <a href="#join">Founding cohort</a>
          </div>
          <div className="f-col">
            <div className="t">Connect</div>
            <a href="mailto:hello@waqfchain.example">hello@waqfchain.example</a>
            <a href="https://github.com/dfordev1/waqfchain" target="_blank" rel="noreferrer">GitHub</a>
            <a href="#join">Newsletter</a>
          </div>
        </div>
        <div className="wrap f-bottom">
          <span>© 2026 WaqfChain — built with ihsan. This is a vision document, not investment advice.</span>
          <span className="ar">إِنَّ اللَّهَ يُحِبُّ الْمُحْسِنِينَ</span>
        </div>
      </footer>
    </>
  );
}

"use client";
import { useEffect, useState } from "react";

/* ---------------- hooks ---------------- */
function useReveal() {
  useEffect(() => {
    const check = () => {
      const vh = Math.max(window.innerHeight, document.documentElement.clientHeight, 700);
      document.querySelectorAll(".reveal:not(.in)").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < vh * 0.92 && r.bottom > 0) el.classList.add("in");
      });
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);
}
function useNavScroll() {
  useEffect(() => {
    const nav = document.querySelector("nav.top");
    const f = () => nav && nav.classList.toggle("scrolled", window.scrollY > 40);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
}

/* ---------------- live ledger ---------------- */
const TX_POOL = [
  { l1: "Waqf deed registered — Srinagar orchard", amt: "DEED SEALED", g: true },
  { l1: "Yield disbursed — water well, Kashmir", amt: "+412 USDT" },
  { l1: "Yield disbursed — madrasa scholarship ×12", amt: "+1,860 USDT" },
  { l1: "Micro-waqf joined — donor #4,182", amt: "+25 USDT" },
  { l1: "Yield disbursed — clinic medicine, Gaza", amt: "+978 USDT" },
  { l1: "Corpus reinvested — sukuk (AAOIFI)", amt: "LOCKED", g: true },
  { l1: "Micro-waqf joined — donor #4,183", amt: "+5 USDT" },
  { l1: "Harvest yield recorded — olive waqf", amt: "+2,340 USDT" },
  { l1: "Waqf deed registered — Istanbul dükkân", amt: "DEED SEALED", g: true },
  { l1: "Yield disbursed — orphan sponsorship ×8", amt: "+640 USDT" },
];
function hash() {
  const c = "0123456789abcdef";
  let s = "0x";
  for (let i = 0; i < 4; i++) s += c[Math.floor(Math.random() * 16)];
  return s + "…" + c[Math.floor(Math.random() * 16)] + c[Math.floor(Math.random() * 16)];
}
let txSeq = 0;
function Ledger() {
  const [rows, setRows] = useState([]);
  const [sealed, setSealed] = useState(18204);
  useEffect(() => {
    const push = () => {
      txSeq += 1;
      const t = TX_POOL[txSeq % TX_POOL.length];
      const k = txSeq;
      setRows((r) => [{ ...t, h: hash(), k }, ...r].slice(0, 5));
      setSealed((s) => s + 1);
    };
    for (let i = 0; i < 5; i++) push();
    const iv = setInterval(push, 2800);
    return () => clearInterval(iv);
  }, []);
  return (
    <div className="ledger" aria-label="Live endowment ledger (simulated)">
      <div className="lg-head">
        <div className="t"><span className="dot" /> Eternal Ledger — Live</div>
        <div className="net">waqf-mainnet</div>
      </div>
      <div className="lg-body">
        {rows.map((r) => (
          <div className="tx" key={r.k}>
            <div className="meta">
              <div className="l1">{r.l1}</div>
              <div className="l2">{r.h} · sealed forever</div>
            </div>
            <div className={`amt${r.g ? " g" : ""}`}>{r.amt}</div>
          </div>
        ))}
      </div>
      <div className="lg-foot">
        <span>{sealed.toLocaleString()} entries sealed</span>
        <span className="ok">✓ Immutable</span>
      </div>
    </div>
  );
}

/* ---------------- FAQ ---------------- */
const FAQS = [
  {
    q: "Is a blockchain Waqf shariah-compliant?",
    a: "The blockchain does not change the fiqh of Waqf — it enforces it. Perpetuity, irrevocability, and the locked corpus map one-to-one onto an immutable ledger. Every deployment is reviewed by a shariah supervisory board following AAOIFI standards for awqāf.",
  },
  {
    q: "What happens to the principal?",
    a: "Exactly what classical fiqh demands: nothing. The corpus is locked on-chain — prevented by contract from being sold, gifted, or inherited. Only its yield flows to beneficiaries, by rules fixed in the endowment deed.",
  },
  {
    q: "Can I start with a small amount?",
    a: "Yes. Micro-waqf lets thousands of donors pool into a single perpetual asset. A student's $5 and a founder's building enter the same eternal ledger — and both earn the reward of sadaqah jariyah.",
  },
  {
    q: "Who controls the funds?",
    a: "No single party. Deeds, yields, and disbursements execute by smart contract under multi-signature governance: shariah scholars, independent trustees, and audited nazir institutions. Every action is publicly verifiable.",
  },
  {
    q: "Is this live today?",
    a: "WaqfChain is a pioneering vision — the first platform concept dedicated entirely to Waqf on blockchain. We are assembling scholars, engineers, and awqāf institutions. The founding cohort forms from the early-access list.",
  },
];
function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <div className="faq">
      {FAQS.map((f, i) => (
        <div className={`faq-item${open === i ? " open" : ""}`} key={i}>
          <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
            {f.q}<span className="pm">+</span>
          </button>
          <div className="faq-a"><p>{f.a}</p></div>
        </div>
      ))}
    </div>
  );
}

/* ---------------- diagrams ---------------- */
function ArrowDefs({ id }) {
  return (
    <defs>
      <marker id={id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 z" fill="#0a0a0a" />
      </marker>
      <marker id={`${id}g`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 z" fill="#b8912f" />
      </marker>
    </defs>
  );
}

function DiagramLifecycle() {
  return (
    <svg className="diagram" viewBox="0 0 1180 430" role="img" aria-label="Lifecycle of an on-chain waqf">
      <ArrowDefs id="a1" />
      {/* waqif */}
      <rect x="20" y="90" width="150" height="84" className="dg-box" />
      <text x="95" y="126" textAnchor="middle" className="dg-t">WAQIF</text>
      <text x="95" y="146" textAnchor="middle" className="dg-s">the donor · any amount</text>
      <line x1="170" y1="132" x2="222" y2="132" className="dg-ln" markerEnd="url(#a1)" />
      {/* deed */}
      <rect x="228" y="80" width="196" height="104" className="dg-box" />
      <text x="326" y="112" textAnchor="middle" className="dg-t">WAQFIYYAH</text>
      <text x="326" y="131" textAnchor="middle" className="dg-s">the deed · hashed &amp; signed</text>
      <text x="326" y="152" textAnchor="middle" className="dg-m">sha256: 0x8f3a…c2 · ed25519 ✓</text>
      <line x1="424" y1="132" x2="476" y2="132" className="dg-ln" markerEnd="url(#a1)" />
      {/* corpus */}
      <rect x="482" y="80" width="170" height="104" className="dg-box-gold" />
      <text x="567" y="114" textAnchor="middle" className="dg-t">CORPUS ∞</text>
      <text x="567" y="133" textAnchor="middle" className="dg-s">locked forever</text>
      <text x="567" y="152" textAnchor="middle" className="dg-s">never sold · never inherited</text>
      <line x1="652" y1="132" x2="704" y2="132" className="dg-ln" markerEnd="url(#a1)" />
      {/* nazir */}
      <rect x="710" y="90" width="170" height="84" className="dg-box" />
      <text x="795" y="124" textAnchor="middle" className="dg-t">NAZIR</text>
      <text x="795" y="144" textAnchor="middle" className="dg-s">certified manager</text>
      {/* shariah board */}
      <rect x="690" y="10" width="210" height="46" className="dg-box-dash" />
      <text x="795" y="30" textAnchor="middle" className="dg-g">SHARIAH BOARD</text>
      <text x="795" y="46" textAnchor="middle" className="dg-s">AAOIFI review · multi-sig</text>
      <line x1="795" y1="56" x2="795" y2="84" className="dg-ln-gold" markerEnd="url(#a1g)" />
      <line x1="880" y1="132" x2="932" y2="132" className="dg-ln" markerEnd="url(#a1)" />
      {/* yield */}
      <rect x="938" y="80" width="222" height="104" className="dg-box" />
      <text x="1049" y="112" textAnchor="middle" className="dg-t">YIELD</text>
      <text x="1049" y="131" textAnchor="middle" className="dg-s">rent · profit · harvest</text>
      <text x="1049" y="152" textAnchor="middle" className="dg-s">streamed by smart contract</text>
      {/* beneficiaries */}
      <line x1="1000" y1="184" x2="820" y2="248" className="dg-ln" markerEnd="url(#a1)" />
      <line x1="1049" y1="184" x2="1049" y2="248" className="dg-ln" markerEnd="url(#a1)" />
      <rect x="716" y="254" width="180" height="60" className="dg-box" />
      <text x="806" y="280" textAnchor="middle" className="dg-t">WELL 💧</text>
      <text x="806" y="299" textAnchor="middle" className="dg-s">clean water, perpetually</text>
      <rect x="959" y="254" width="180" height="60" className="dg-box" />
      <text x="1049" y="280" textAnchor="middle" className="dg-t">MADRASA 📚</text>
      <text x="1049" y="299" textAnchor="middle" className="dg-s">scholarships ×12 / term</text>
      <rect x="473" y="254" width="180" height="60" className="dg-box" />
      <text x="563" y="280" textAnchor="middle" className="dg-t">CLINIC 🏥</text>
      <text x="563" y="299" textAnchor="middle" className="dg-s">medicine &amp; care</text>
      <line x1="1000" y1="184" x2="586" y2="248" className="dg-ln" markerEnd="url(#a1)" />
      {/* ledger bar */}
      <rect x="20" y="356" width="1140" height="54" className="dg-box-ink" />
      <text x="590" y="380" textAnchor="middle" className="dg-t dg-w" fill="#fff">IMMUTABLE LEDGER</text>
      <text x="590" y="398" textAnchor="middle" className="dg-s" fill="#9a9aa0">every event above is sealed as a hash-chained, publicly auditable record</text>
      {[95, 326, 567, 795, 1049].map((x) => (
        <line key={x} x1={x} y1="188" x2={x} y2="352" className="dg-ln-soft" />
      ))}
    </svg>
  );
}

function DiagramAnchor() {
  const leaf = (x, label) => (
    <g key={x}>
      <rect x={x} y="150" width="120" height="44" className="dg-box" />
      <text x={x + 60} y="169" textAnchor="middle" className="dg-s">hash</text>
      <text x={x + 60} y="185" textAnchor="middle" className="dg-m">{label}</text>
    </g>
  );
  return (
    <svg className="diagram" viewBox="0 0 1180 430" role="img" aria-label="Anchoring waqf records to Bitcoin">
      <ArrowDefs id="a2" />
      {/* records chain */}
      {[
        { x: 20, t: "RECORD 01", s: "deed created" },
        { x: 190, t: "RECORD 02", s: "donation" },
        { x: 360, t: "RECORD 03", s: "yield accrued" },
        { x: 530, t: "RECORD 04", s: "disbursement" },
      ].map((r, i) => (
        <g key={r.x}>
          <rect x={r.x} y="24" width="140" height="66" className="dg-box" />
          <text x={r.x + 70} y="50" textAnchor="middle" className="dg-t" fontSize="12">{r.t}</text>
          <text x={r.x + 70} y="70" textAnchor="middle" className="dg-s">{r.s}</text>
          {i < 3 && (
            <>
              <line x1={r.x + 140} y1="57" x2={r.x + 164} y2="57" className="dg-ln" markerEnd="url(#a2)" />
              <text x={r.x + 152} y="46" textAnchor="middle" className="dg-s" fontSize="9">prev</text>
            </>
          )}
        </g>
      ))}
      <text x="20" y="12" className="dg-g">HASH-CHAINED RECORDS — each record commits to the one before it</text>
      {/* leaves */}
      {leaf(60, "0x2c…91")}
      {leaf(230, "0x7f…0d")}
      {leaf(400, "0xa7…74")}
      {leaf(570, "0xe1…0b")}
      {[90, 260, 430, 600].map((x) => (
        <line key={x} x1={x} y1="90" x2={x + 30} y2="144" className="dg-ln-soft" markerEnd="url(#a2)" />
      ))}
      {/* merkle nodes */}
      <rect x="145" y="240" width="120" height="42" className="dg-box" />
      <text x="205" y="266" textAnchor="middle" className="dg-m">h(0x2c + 0x7f)</text>
      <rect x="485" y="240" width="120" height="42" className="dg-box" />
      <text x="545" y="266" textAnchor="middle" className="dg-m">h(0xa7 + 0xe1)</text>
      <line x1="120" y1="194" x2="185" y2="234" className="dg-ln" markerEnd="url(#a2)" />
      <line x1="290" y1="194" x2="225" y2="234" className="dg-ln" markerEnd="url(#a2)" />
      <line x1="460" y1="194" x2="525" y2="234" className="dg-ln" markerEnd="url(#a2)" />
      <line x1="630" y1="194" x2="565" y2="234" className="dg-ln" markerEnd="url(#a2)" />
      {/* root */}
      <rect x="285" y="330" width="180" height="56" className="dg-box-gold" />
      <text x="375" y="353" textAnchor="middle" className="dg-t" fontSize="12.5">MERKLE ROOT</text>
      <text x="375" y="372" textAnchor="middle" className="dg-m">db66…1a0</text>
      <line x1="230" y1="282" x2="330" y2="324" className="dg-ln-gold" markerEnd="url(#a2g)" />
      <line x1="520" y1="282" x2="420" y2="324" className="dg-ln-gold" markerEnd="url(#a2g)" />
      {/* OTS + Bitcoin */}
      <line x1="465" y1="358" x2="700" y2="358" className="dg-ln-gold" markerEnd="url(#a2g)" />
      <rect x="706" y="322" width="216" height="72" className="dg-box" />
      <text x="814" y="350" textAnchor="middle" className="dg-t" fontSize="12.5">OPENTIMESTAMPS</text>
      <text x="814" y="369" textAnchor="middle" className="dg-s">independent calendar servers</text>
      <line x1="922" y1="358" x2="954" y2="358" className="dg-ln" markerEnd="url(#a2)" />
      <rect x="960" y="314" width="200" height="88" className="dg-box-ink" />
      <text x="1060" y="346" textAnchor="middle" className="dg-t" fill="#fff" fontSize="12.5">BITCOIN BLOCK</text>
      <text x="1060" y="366" textAnchor="middle" className="dg-m" fill="#e6c463">#855,201</text>
      <text x="1060" y="386" textAnchor="middle" className="dg-s" fill="#9a9aa0">proof of existence, forever</text>
      <text x="706" y="308" className="dg-g">ANCHORING — the root is timestamped into Bitcoin</text>
    </svg>
  );
}

/* ---------------- page ---------------- */
export default function Home() {
  useReveal();
  useNavScroll();
  return (
    <>
      <nav className="top">
        <div className="wrap nav-in">
          <a href="#top" className="brand">Waqf <span className="ar">وقف</span></a>
          <div className="nav-links">
            <a href="#heritage">Heritage</a>
            <a href="#problem">Mission</a>
            <a href="#protocol">Protocol</a>
            <a href="#pillars">Pillars</a>
            <a href="#faq">FAQ</a>
            <a href="/papers">Papers</a>
            <a href="/chain" className="keep">Launch App ↗</a>
          </div>
        </div>
      </nav>

      <main id="top">
        {/* ============ PANEL 1 — HERO ============ */}
        <section className="panel">
          <div className="tint a" />
          <div className="wm hero arabic" aria-hidden="true">وقف</div>
          <div className="wrap">
            <div className="eyebrow reveal">The world&apos;s first · Est. 7th century, redeployed 2026</div>
            <h1 className="reveal d1">
              Waqf on<br />Blockchain
            </h1>
            <p className="sub reveal d2">
              A Waqf must be held <b>forever</b>. A blockchain record lasts <b>forever</b>.
              The 1,400-year Islamic endowment, rebuilt on cryptographic permanence.
            </p>
            <div className="btn-row reveal d2">
              <a href="/chain" className="btn solid">Launch Waqf-M</a>
              <a href="#heritage" className="btn">Learn more</a>
            </div>
          </div>
        </section>

        {/* ============ PANEL 2 — HERITAGE ============ */}
        <section className="panel" id="heritage">
          <div className="tint b" />
          <div className="wrap">
            <div className="eyebrow reveal">01 — Heritage</div>
            <h2 className="big reveal d1">
              1,400 years<br /><span className="thin">engineered to</span> <span className="gold-it">last</span>
            </h2>
            <p className="sub reveal d2">
              &quot;Retain the principal, and dedicate its fruits to charity.&quot; On this single
              instruction — the Prophet ﷺ to Umar (RA) at Khaybar — the Muslim world ran hospitals,
              universities, and water systems for over a millennium.
            </p>
            <div className="strip reveal d2">
              <div className="strip-item">
                <div className="yr">7th century</div>
                <h3>Khaybar</h3>
                <p>Umar (RA) endows his most beloved orchard. The template is set: locked corpus, flowing fruits.</p>
              </div>
              <div className="strip-item">
                <div className="yr">8th–16th century</div>
                <h3>The Waqf civilization</h3>
                <p>Al-Qarawiyyin, al-Azhar, Ottoman imarets feeding tens of thousands daily — some for 500 unbroken years.</p>
              </div>
              <div className="strip-item">
                <div className="yr">19th–20th century</div>
                <h3>The unraveling</h3>
                <p>Colonization and lost paper records dismantle the system. Deeds vanish; endowments freeze.</p>
              </div>
              <div className="strip-item">
                <div className="yr">Today</div>
                <h3>The eternal ledger</h3>
                <p>For the first time, a record exists that — like the Waqf itself — cannot be altered or destroyed.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ============ PANEL 3 — MISSION / PROBLEM ============ */}
        <section className="panel" id="problem">
          <div className="wm mid arabic" aria-hidden="true">أمانة</div>
          <div className="wrap">
            <div className="eyebrow reveal">02 — The Mission</div>
            <h2 className="big reveal d1">
              A trillion-dollar<br /><span className="thin">trust, running on</span><br /><span className="gold-it">paper and padlocks</span>
            </h2>
            <p className="sub reveal d2">
              The ummah&apos;s largest pool of charitable capital is also its least accountable —
              not for lack of generosity, but for lack of infrastructure. Our mission is to make
              the world&apos;s oldest endowment system its most transparent.
            </p>
            <div className="stat-row reveal d2">
              <div className="stat"><div className="v">$1T<span>+</span></div><div className="k">Est. global waqf assets</div></div>
              <div className="stat"><div className="v">100s</div><div className="k">Years of deeds lost</div></div>
              <div className="stat"><div className="v">~0<span>%</span></div><div className="k">Donor-visible flow today</div></div>
              <div className="stat"><div className="v">100<span>%</span></div><div className="k">On-chain, with waqf</div></div>
            </div>
          </div>
        </section>

        {/* ============ PANEL 4 — PROTOCOL ============ */}
        <section className="panel" id="protocol">
          <div className="tint b" />
          <div className="wrap proto-grid">
            <div>
              <div className="eyebrow reveal">03 — The Protocol</div>
              <h2 className="big reveal d1" style={{ fontSize: "clamp(38px,4.8vw,68px)" }}>
                Four movements,<br /><span className="gold-it">one covenant</span>
              </h2>
              <div className="steps reveal d2">
                <div className="step">
                  <div className="n">STEP 01</div>
                  <div>
                    <h3>Endow</h3>
                    <p>Property, cash, or digital assets dedicated as Waqf. The deed is hashed and sealed on-chain under shariah supervision.</p>
                    <div className="fine">→ DEED HASH SEALED · IRREVOCABLE</div>
                  </div>
                </div>
                <div className="step">
                  <div className="n">STEP 02</div>
                  <div>
                    <h3>Tokenize</h3>
                    <p>Fractional units let one founder — or a hundred thousand micro-donors — raise a single perpetual asset together.</p>
                    <div className="fine">→ CORPUS LOCKED · NON-TRANSFERABLE</div>
                  </div>
                </div>
                <div className="step">
                  <div className="n">STEP 03</div>
                  <div>
                    <h3>Grow</h3>
                    <p>Certified nazirs deploy the corpus into shariah-compliant instruments. The principal never moves — only its fruits.</p>
                    <div className="fine">→ AAOIFI-ALIGNED · AUDITED ON-CHAIN</div>
                  </div>
                </div>
                <div className="step">
                  <div className="n">STEP 04</div>
                  <div>
                    <h3>Give, forever</h3>
                    <p>Yields stream automatically to verified beneficiaries — exactly as the deed prescribes, visible to everyone.</p>
                    <div className="fine">→ DISBURSEMENT PUBLIC · PERPETUAL</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="reveal d2"><Ledger /></div>
          </div>
        </section>

        {/* ============ PANEL 5 — PILLARS ============ */}
        <section className="panel" id="pillars">
          <div className="wrap">
            <div className="eyebrow reveal">04 — The Pillars</div>
            <h2 className="big reveal d1" style={{ fontSize: "clamp(38px,4.8vw,68px)" }}>
              Built like an <span className="gold-it">amanah</span>
            </h2>
            <div className="pillars reveal d2">
              <div className="pillar">
                <div className="n">01</div>
                <h3>Deeds that outlive empires</h3>
                <p>A deed sealed on a public blockchain is replicated across thousands of nodes on every continent. No fire, court, or regime can erase it — the legal instrument becomes as permanent as the intention behind it.</p>
              </div>
              <div className="pillar">
                <div className="n">02</div>
                <h3>Glass, not vaults</h3>
                <p>Every yield and disbursement is publicly auditable in real time, from asset to beneficiary. Trust is replaced by proof.</p>
              </div>
              <div className="pillar">
                <div className="n">03</div>
                <h3>Scholars govern</h3>
                <p>A shariah supervisory board certifies every deed and instrument. Technology serves the deen — never the reverse.</p>
              </div>
              <div className="pillar">
                <div className="n">04</div>
                <h3>Micro-waqf for all</h3>
                <p>From $5 to a building — every donor enters the same eternal ledger and earns the same perpetual reward.</p>
              </div>
              <div className="pillar">
                <div className="n">05</div>
                <h3>Disbursement without discretion</h3>
                <p>Smart contracts route yields by rules fixed in the deed. No intermediaries to skim, delay, or divert. The nazir manages; the contract enforces; the ummah verifies.</p>
              </div>
              <div className="pillar">
                <div className="n">06</div>
                <h3>Fiqh-native by construction</h3>
                <p>Perpetuity, irrevocability, inalienability — the three classical conditions of Waqf are not policies we promise. They are properties the ledger enforces by mathematics.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ============ PANEL 5b — ARCHITECTURE ============ */}
        <section className="panel" id="architecture" style={{ alignItems: "center" }}>
          <div className="wrap">
            <div className="eyebrow reveal">05 — Architecture</div>
            <h2 className="big reveal d1" style={{ fontSize: "clamp(38px,4.8vw,68px)" }}>
              How the covenant<br />is <span className="gold-it">sealed</span>
            </h2>
            <div className="dg-card reveal d2">
              <div className="dg-cap">
                <span className="t">Fig. 1 — Lifecycle of an on-chain Waqf</span>
                <span className="s">donor → deed → locked corpus → managed yield → beneficiaries, every step ledgered</span>
              </div>
              <DiagramLifecycle />
            </div>
            <div className="dg-card reveal">
              <div className="dg-cap">
                <span className="t">Fig. 2 — Sealing records into Bitcoin</span>
                <span className="s">hash chain → merkle batch → OpenTimestamps → Bitcoin block confirmation</span>
              </div>
              <DiagramAnchor />
            </div>
          </div>
        </section>

        {/* ============ PANEL 5c — THE PRODUCT ============ */}
        <section className="panel" id="product">
          <div className="wrap">
            <div className="eyebrow reveal">06 — The Product</div>
            <h2 className="big reveal d1" style={{ fontSize: "clamp(38px,4.8vw,68px)" }}>
              THE REGISTRY IS <span className="gold-it">live</span>
            </h2>
            <p className="sub reveal d2">
              Waqf-M is a working registry today — hash-chained records, Ed25519 signatures,
              and Bitcoin anchoring, not a whitepaper promise.
            </p>
            <div className="btn-row reveal d2">
              <a href="/chain" className="btn solid">Open the app</a>
              <a href="/chain/explorer" className="btn">Public explorer</a>
              <a href="/chain/setup" className="btn">Setup wizard</a>
            </div>
            <div className="stat-row reveal d2">
              <div className="stat"><div className="v">100<span>%</span></div><div className="k">on-chain verifiable</div></div>
              <div className="stat"><div className="v">3</div><div className="k">OTS calendars</div></div>
              <div className="stat"><div className="v">#956,893</div><div className="k">first Bitcoin block anchor</div></div>
              <div className="stat"><div className="v">1</div><div className="k">command to verify</div></div>
            </div>
          </div>
        </section>

        {/* ============ PANEL 6 — QUOTE ============ */}
        <section className="panel center quote-panel short">
          <div className="wrap reveal">
            <div className="ar-line arabic">إِذَا مَاتَ الإِنْسَانُ انْقَطَعَ عَمَلُهُ إِلاَّ مِنْ ثَلاَثَةٍ: صَدَقَةٍ جَارِيَةٍ...</div>
            <blockquote>
              &quot;When a person dies, their deeds end — except three: <i>a charity that continues</i>,
              knowledge that benefits, or a righteous child who prays for them.&quot;
            </blockquote>
            <div className="who">Prophet Muhammad ﷺ — Sahih Muslim 1631</div>
          </div>
        </section>

        {/* ============ PANEL 7 — FAQ + JOIN ============ */}
        <section className="panel" id="faq" style={{ alignItems: "center" }}>
          <div className="wrap">
            <div className="eyebrow reveal">07 — Questions</div>
            <h2 className="big reveal d1" style={{ fontSize: "clamp(34px,4.4vw,60px)" }}>
              Asked with rigor,<br /><span className="gold-it">answered with rigor</span>
            </h2>
            <div className="reveal d2"><Faq /></div>
            <div className="btn-row reveal d2" id="join" style={{ marginTop: 56 }}>
              <a className="btn solid" href="mailto:hello@waqfchain.example?subject=Founding%20Cohort">Request early access</a>
              <a className="btn" href="https://github.com/dfordev1/waqfchain" target="_blank" rel="noreferrer">View source</a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap f-in">
          <div className="f-links">
            <a href="#heritage">Heritage</a>
            <a href="#problem">Mission</a>
            <a href="#protocol">Protocol</a>
            <a href="#pillars">Pillars</a>
            <a href="#faq">FAQ</a>
            <a href="/papers">Papers</a>
            <a href="/chain">Waqf-M App</a>
            <a href="/chain/setup">Setup</a>
            <a href="mailto:hello@waqfchain.example">Contact</a>
          </div>
          <div className="f-note">
            © 2026 WaqfChain — built with ihsan. Not investment advice.
            <span className="ar arabic">إِنَّ اللَّهَ يُحِبُّ الْمُحْسِنِينَ</span>
          </div>
        </div>
      </footer>
    </>
  );
}

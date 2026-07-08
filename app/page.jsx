"use client";
import { useEffect } from "react";

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

const TICKER_ITEMS = (
  <>
    <span><b>EXCLUSIVE:</b> World&apos;s first Waqf-on-Blockchain platform unveiled</span>
    <span><b>$1 TRILLION</b> in global Waqf assets — most of it idle, experts warn</span>
    <span><b>1,400 YEARS</b> of Islamic endowments meet the immutable ledger</span>
    <span><b>SMART CONTRACTS</b> to stream charity yields to orphans, schools &amp; wells — forever</span>
    <span><b>SCHOLARS:</b> &quot;A Waqf must never be altered. Neither can a blockchain.&quot;</span>
  </>
);

export default function Home() {
  useReveal();
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  return (
    <>
      {/* BREAKING TICKER */}
      <div className="ticker">
        <div className="flag">🔴 Breaking</div>
        <div className="ticker-track">
          {TICKER_ITEMS}
          {TICKER_ITEMS}
        </div>
      </div>

      {/* TOP BAR */}
      <div className="topbar">
        <div className="container topbar-in">
          <div className="date">{today}</div>
          <div className="links">
            <a href="#how">Today&apos;s Paper</a>
            <a href="#features">Tips</a>
            <a href="#join">Newsletters</a>
            <a href="#join">Subscribe — It&apos;s Eternal</a>
          </div>
        </div>
      </div>

      {/* MASTHEAD */}
      <header className="masthead">
        <div className="masthead-in">
          <div className="ear left">First Ever<b>WAQF × CHAIN</b>Edition No. 1</div>
          <a href="#top" className="wordmark">
            Waqf Post
            <span className="thin">WAQF ON BLOCKCHAIN</span>
          </a>
          <div className="ear right">Immutable<b>FOREVER</b>Tamper-Proof</div>
        </div>
      </header>

      {/* NAV */}
      <nav className="mainnav">
        <div className="container mainnav-in">
          <a href="#top" className="live"><span className="reddot" />Front Page</a>
          <a href="#what">What Is Waqf</a>
          <a href="#problem">The Crisis</a>
          <a href="#how">How It Works</a>
          <a href="#features">Why Blockchain</a>
          <a href="#opinion">Opinion</a>
          <a href="#join">Join</a>
        </div>
      </nav>

      <main id="top">
        {/* FRONT PAGE */}
        <div className="container front">
          <div className="front-grid">
            <article className="lead-story">
              <span className="kicker">Exclusive · First in History</span>
              <h1 className="headline">
                Eternal charity<br />
                meets the chain<br />
                that <span className="red">can&apos;t forget</span>
              </h1>
              <p className="deck">
                For 1,400 years, Waqf endowments built the hospitals, schools and wells of the Muslim
                world. Now, in a historic first, the sacred institution of <b>sadaqah jariyah</b> is being
                carved into the blockchain — <b>transparent forever, tamper-proof forever, giving forever.</b>
              </p>
              <div className="byline">
                <span>By <b>The Waqf Post Desk</b></span>
                <span className="sep">|</span>
                <span>Published Today</span>
                <span className="sep">|</span>
                <span style={{ color: "var(--nyp-red)", fontWeight: 700 }}>Front Page</span>
              </div>
              <figure className="lead-art">
                <div className="art-inner">
                  <div className="art-arabic arabic">وقف</div>
                  <div className="art-chain">⛓️🕌⛓️</div>
                </div>
                <div className="caption-flag">The 1,400-year-old endowment, reborn on-chain</div>
              </figure>
              <div className="caption">Waqf — &quot;to stop, to hold&quot; — the principal locked forever, only its fruits flow to the needy.</div>
            </article>

            {/* RAIL */}
            <aside className="rail">
              <div className="rail-item reveal">
                <span className="tag">Developing</span>
                <h3>Prophetic blueprint: &quot;Retain the principal, dedicate its fruits&quot;</h3>
                <p>The Prophet ﷺ advised Umar (RA) on the orchard of Khaybar — establishing the first great Waqf. (Bukhari &amp; Muslim)</p>
              </div>
              <div className="rail-item reveal">
                <span className="tag">Money</span>
                <h3>Ottoman endowments ran hospitals for 500 years — on paper</h3>
                <p>Imagine what one could do on an immutable public ledger, auditable by the entire ummah.</p>
              </div>
              <div className="rail-item reveal">
                <span className="tag">Tech</span>
                <h3>Micro-Waqf: a $5 student joins the same eternal ledger as a founder</h3>
                <p>Fractional endowment tears down the wealth barrier to perpetual charity.</p>
              </div>
              <div className="rail-stats reveal">
                <div className="rs-title">By the Numbers</div>
                <div className="rs-row"><span>Years of Waqf legacy</span><span className="v">1,400+</span></div>
                <div className="rs-row"><span>Est. global Waqf assets</span><span className="v">$1T+</span></div>
                <div className="rs-row"><span>On-chain transparency</span><span className="v">100%</span></div>
                <div className="rs-row"><span>Intermediaries needed</span><span className="v">0</span></div>
              </div>
            </aside>
          </div>
        </div>

        {/* WHAT IS WAQF */}
        <section className="news-sec" id="what">
          <div className="container">
            <div className="section-head">
              <h2>What Is Waqf?</h2>
              <span className="bar" />
              <span className="more">The Foundation ➤</span>
            </div>
            <div className="grid3">
              <div className="story-card reveal">
                <div className="art">🕌</div>
                <span className="tag">Perpetual by Design</span>
                <h3>The charity that never expires</h3>
                <p>A Waqf (وقف) is an Islamic endowment donated permanently for the sake of Allah. The asset can never be sold, gifted or inherited — its benefit flows generation after generation.</p>
              </div>
              <div className="story-card reveal">
                <div className="art">🔒</div>
                <span className="tag">The Principal Is Sacred</span>
                <h3>&quot;Waqf&quot; literally means &quot;to stop, to hold&quot;</h3>
                <p>The corpus is immobilized forever. Sound familiar? So is a blockchain record. It is the most natural pairing in the history of finance.</p>
              </div>
              <div className="story-card reveal">
                <div className="art">🌊</div>
                <span className="tag">Only the Yield Flows</span>
                <h3>Rent &amp; profit fund schools, wells and orphans</h3>
                <p>The fruits of the endowment — never the tree — feed the needy, exactly as classical fiqh demands. On-chain, every fruit is traceable.</p>
              </div>
            </div>
          </div>
        </section>

        {/* THE CRISIS */}
        <section className="news-sec" id="problem">
          <div className="container">
            <div className="section-head">
              <h2>The Crisis</h2>
              <span className="bar" />
              <span className="more">Special Report ➤</span>
            </div>
            <div className="grid3">
              <div className="story-card reveal">
                <div className="art">📜</div>
                <span className="tag">Scandal</span>
                <h3>Lost &amp; disputed deeds swallow centuries of charity</h3>
                <p>Centuries-old waqfiyyahs vanish, get forged, or rot in archives. Countless awqāf have been lost to land grabs simply because no one could prove they existed.</p>
              </div>
              <div className="story-card reveal">
                <div className="art">🕳️</div>
                <span className="tag">Investigation</span>
                <h3>Zero transparency: donors never see where yields go</h3>
                <p>Opaque intermediaries erode the very trust Waqf was built upon — and giving shrinks with it. A $1 trillion trust, managed with paper and padlocks.</p>
              </div>
              <div className="story-card reveal">
                <div className="art">🧊</div>
                <span className="tag">Economy</span>
                <h3>The ummah&apos;s endowment sleeps: prime assets frozen for decades</h3>
                <p>Waqf real estate sits idle because governance is slow, fragmented and unaccountable. The world&apos;s oldest endowment system runs on its oldest infrastructure.</p>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="news-sec" id="how">
          <div className="container">
            <div className="section-head">
              <h2>How It Works</h2>
              <span className="bar" />
              <span className="more">The Breakthrough ➤</span>
            </div>
            <div className="grid4">
              <div className="step-card reveal">
                <div className="n">01</div>
                <h3>Endow</h3>
                <p>A donor dedicates property, cash or crypto as Waqf. The deed is notarized on-chain under Shariah supervision — provable forever.</p>
              </div>
              <div className="step-card reveal">
                <div className="n">02</div>
                <h3>Tokenize</h3>
                <p>The endowment is represented digitally, so one person — or a million together — can build a Waqf with any amount.</p>
              </div>
              <div className="step-card reveal">
                <div className="n">03</div>
                <h3>Grow</h3>
                <p>Shariah-compliant managers invest the corpus. The principal stays locked, exactly as the fiqh of Waqf demands.</p>
              </div>
              <div className="step-card reveal">
                <div className="n">04</div>
                <h3>Give — Forever</h3>
                <p>Smart contracts stream the yield to schools, clinics, wells and orphans. Automatically. Transparently. Perpetually.</p>
              </div>
            </div>
          </div>
        </section>

        {/* WHY BLOCKCHAIN */}
        <section className="news-sec" id="features">
          <div className="container">
            <div className="section-head">
              <h2>Why Blockchain</h2>
              <span className="bar" />
              <span className="more">Built Like an Amanah ➤</span>
            </div>
            <div className="grid3">
              <div className="story-card reveal">
                <div className="art">🛡️</div>
                <span className="tag">Security</span>
                <h3>Immutable deeds: the chain remembers</h3>
                <p>Once registered, no court dispute, lost archive or bad actor can erase a Waqf. Ever.</p>
              </div>
              <div className="story-card reveal">
                <div className="art">👁️</div>
                <span className="tag">Transparency</span>
                <h3>Every rupee, riyal &amp; ringgit — traceable live</h3>
                <p>From asset to beneficiary in real time. Radical transparency restores radical trust.</p>
              </div>
              <div className="story-card reveal">
                <div className="art">🕋</div>
                <span className="tag">Shariah-First</span>
                <h3>Scholars govern; technology serves the deen</h3>
                <p>Governance modeled on the classical fiqh of awqāf, overseen by scholars — never the reverse.</p>
              </div>
              <div className="story-card reveal">
                <div className="art">🤝</div>
                <span className="tag">Access</span>
                <h3>Micro-Waqf for all: $5 or a building — same ledger</h3>
                <p>Fractional endowment means everyone can write their name into perpetual charity.</p>
              </div>
              <div className="story-card reveal">
                <div className="art">⚙️</div>
                <span className="tag">Automation</span>
                <h3>Smart disbursement: no leakage, no middlemen</h3>
                <p>Self-executing contracts route yields by pre-agreed rules — no delays, no diversion.</p>
              </div>
              <div className="story-card reveal">
                <div className="art">🌍</div>
                <span className="tag">Global</span>
                <h3>Borderless ummah: endow a well from anywhere</h3>
                <p>A donor in Toronto endows a well in Kashmir — and watches it give for the rest of history.</p>
              </div>
            </div>
          </div>
        </section>

        {/* OPINION / HADITH */}
        <section className="opinion" id="opinion">
          <div className="container reveal">
            <span className="kicker black">Opinion · The Eternal Word</span>
            <blockquote>
              &quot;When a person dies, their deeds come to an end except three:
              <span className="hl"> a continuing charity</span>, beneficial knowledge,
              or a righteous child who prays for them.&quot;
            </blockquote>
            <div className="src">— Prophet Muhammad ﷺ · Sahih Muslim 1631</div>
            <div className="arabic-q arabic">إِذَا مَاتَ الإِنْسَانُ انْقَطَعَ عَمَلُهُ إِلاَّ مِنْ ثَلاَثَةٍ: صَدَقَةٍ جَارِيَةٍ...</div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta-strip" id="join">
          <div className="container in">
            <div>
              <h2>Get in on the first Waqf written in stone that computes</h2>
              <p>Scholars, builders and donors: the eternal ledger has room for your name. Subscribe for early access to the WaqfChain vision.</p>
            </div>
            <a className="btn-cta" href="mailto:hello@waqfchain.example?subject=Joining%20WaqfChain">Get Early Access ➤</a>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="nyp-footer">
        <div className="container f-in">
          <div className="f-logo">Waqf<span>Post</span></div>
          <div>© 2026 WaqfChain — the first Waqf-on-Blockchain initiative. Built with ihsan.</div>
          <div className="arabic">وَمَا تُقَدِّمُوا لِأَنفُسِكُم مِّنْ خَيْرٍ تَجِدُوهُ عِندَ اللَّهِ</div>
        </div>
      </footer>
    </>
  );
}

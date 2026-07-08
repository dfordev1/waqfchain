"use client";
import { useEffect } from "react";

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

export default function Home() {
  useReveal();
  return (
    <>
      <nav className="nav">
        <div className="container nav-in">
          <a href="#top" className="logo">
            <span className="logo-dot">ﻭ</span> Waqf on Blockchain
          </a>
          <div className="nav-links">
            <a href="#what">What is Waqf</a>
            <a href="#problem">The problem</a>
            <a href="#how">How it works</a>
            <a href="#why">Why blockchain</a>
            <a href="#join" className="btn-nav">Get early access</a>
          </div>
        </div>
      </nav>

      <main id="top">
        {/* HERO */}
        <header className="hero">
          <div className="container">
            <div className="hero-eyebrow"><span className="spark">✦</span> The first Waqf-on-Blockchain initiative</div>
            <h1>
              Charity that outlives you, on a ledger that <em>cannot forget</em>
            </h1>
            <div className="arabic-line arabic">صَدَقَةٌ جَارِيَةٌ — سِلْسِلَةٌ خَالِدَةٌ</div>
            <p className="sub">
              For 1,400 years, Waqf endowments built the hospitals, schools, and wells of the
              Muslim world. We&apos;re bringing them onto the blockchain — transparent, tamper-proof,
              and giving in perpetuity.
            </p>
            <div className="hero-ctas">
              <a className="btn-primary" href="#how">See how it works</a>
              <a className="btn-secondary" href="#what">Learn about Waqf</a>
            </div>
            <div className="hero-stats">
              <div className="stat"><div className="num">1,400<span>+</span></div><div className="lbl">years of Waqf legacy</div></div>
              <div className="stat"><div className="num">$1T<span>+</span></div><div className="lbl">est. global Waqf assets</div></div>
              <div className="stat"><div className="num">100<span>%</span></div><div className="lbl">on-chain transparency</div></div>
              <div className="stat"><div className="num">0</div><div className="lbl">intermediaries needed</div></div>
            </div>
          </div>
        </header>

        {/* WHAT IS WAQF */}
        <section id="what">
          <div className="container">
            <div className="reveal">
              <div className="eyebrow">The foundation</div>
              <h2 className="title">What is a <em>Waqf</em>?</h2>
              <p className="lede">
                A Waqf (وقف) is an Islamic endowment — an asset dedicated permanently for the sake
                of Allah. The principal is locked forever; only its fruits flow to the needy. It is
                charity designed to outlive its giver.
              </p>
            </div>
            <div className="split">
              <div className="def-card reveal">
                <div className="arabic-line arabic">حَبِّسِ الأَصْلَ وَسَبِّلِ الثَّمَرَةَ</div>
                <p>
                  &quot;Retain the principal, and dedicate its fruits to charity.&quot; — the Prophet
                  Muhammad ﷺ advising Umar ibn al-Khattab on the orchard of Khaybar, establishing
                  the first great Waqf. The asset can never be sold, gifted, or inherited. Its
                  benefit flows perpetually.
                </p>
                <span className="src">— Sahih al-Bukhari &amp; Sahih Muslim</span>
              </div>
              <div className="def-points">
                <div className="def-point reveal">
                  <div className="ico">🕌</div>
                  <div><h4>Perpetual by design</h4><p>A Waqf never expires. Ottoman endowments ran hospitals for five centuries on a single deed.</p></div>
                </div>
                <div className="def-point reveal">
                  <div className="ico">🔒</div>
                  <div><h4>The principal is sacred</h4><p>&quot;Waqf&quot; literally means &quot;to stop, to hold.&quot; The corpus is immobilized — just like a blockchain record.</p></div>
                </div>
                <div className="def-point reveal">
                  <div className="ico">🌊</div>
                  <div><h4>Only the yield flows</h4><p>Rent, profit, and produce fund schools, wells, and orphans — generation after generation.</p></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROBLEM */}
        <section className="alt" id="problem">
          <div className="container">
            <div className="reveal">
              <div className="eyebrow">The problem</div>
              <h2 className="title">A $1 trillion trust, managed with <em>paper and padlocks</em></h2>
              <p className="lede">
                Global Waqf assets are estimated at up to $1 trillion — yet vast portions lie idle,
                undocumented, or lost. The world&apos;s oldest endowment system runs on its oldest
                infrastructure.
              </p>
            </div>
            <div className="grid3">
              <div className="card reveal">
                <div className="ico">📜</div>
                <h3>Lost and disputed records</h3>
                <p>Centuries-old deeds vanish, get forged, or rot in archives. Countless awqāf have been swallowed by land grabs simply because no one could prove they existed.</p>
              </div>
              <div className="card reveal">
                <div className="ico">🕳️</div>
                <h3>Zero transparency</h3>
                <p>Donors rarely see where yields go. Opaque intermediaries erode the very trust Waqf was built upon — and giving shrinks with it.</p>
              </div>
              <div className="card reveal">
                <div className="ico">🧊</div>
                <h3>Frozen, idle capital</h3>
                <p>Prime Waqf real estate sits underutilized for decades because governance is slow, fragmented, and unaccountable.</p>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how">
          <div className="container">
            <div className="reveal">
              <div className="eyebrow">How it works</div>
              <h2 className="title">An immutable endowment, on an <em>immutable ledger</em></h2>
              <p className="lede">
                A Waqf must be held forever. A blockchain ledger is forever. Every deed, donation,
                and disbursement — recorded permanently, visible to all.
              </p>
            </div>
            <div className="steps">
              <div className="step reveal">
                <div className="n">1</div>
                <h3>Endow</h3>
                <p>A donor dedicates property, cash, or crypto as Waqf. The deed is notarized on-chain under Shariah supervision.</p>
              </div>
              <div className="step reveal">
                <div className="n">2</div>
                <h3>Tokenize</h3>
                <p>The endowment is represented digitally, so one person — or a million together — can build a Waqf with any amount.</p>
              </div>
              <div className="step reveal">
                <div className="n">3</div>
                <h3>Grow</h3>
                <p>Shariah-compliant managers invest the corpus. The principal stays locked, exactly as the fiqh of Waqf demands.</p>
              </div>
              <div className="step reveal">
                <div className="n">4</div>
                <h3>Give, forever</h3>
                <p>Smart contracts stream the yield to schools, clinics, wells, and orphans. Automatically. Perpetually.</p>
              </div>
            </div>
            <div className="ledger reveal" aria-label="Example on-chain ledger">
              <div className="ledger-block">
                <div className="hash">0x8f3a…waqf</div>
                <h4>Deed block</h4>
                <p>The waqfiyyah is hashed and registered on-chain. Provable forever.</p>
              </div>
              <div className="ledger-tie">→</div>
              <div className="ledger-block">
                <div className="hash">0x2c91…niyt</div>
                <h4>Donation block</h4>
                <p>Every contribution time-stamped and publicly auditable.</p>
              </div>
              <div className="ledger-tie">→</div>
              <div className="ledger-block">
                <div className="hash">0xa774…amanah</div>
                <h4>Yield block</h4>
                <p>Returns recorded transparently as they accrue.</p>
              </div>
              <div className="ledger-tie">→</div>
              <div className="ledger-block">
                <div className="hash">0xe10b…khayr</div>
                <h4>Impact block</h4>
                <p>Yields disbursed to verified beneficiaries, watched live.</p>
              </div>
            </div>
          </div>
        </section>

        {/* WHY BLOCKCHAIN */}
        <section className="alt" id="why">
          <div className="container">
            <div className="reveal">
              <div className="eyebrow">Why blockchain</div>
              <h2 className="title">Built the way an <em>amanah</em> should be</h2>
            </div>
            <div className="grid3">
              <div className="card reveal"><div className="ico">🛡️</div><h3>Immutable deeds</h3><p>Once registered, no court dispute, lost archive, or bad actor can erase a Waqf. The chain remembers.</p></div>
              <div className="card reveal"><div className="ico">👁️</div><h3>Radical transparency</h3><p>Every rupee, riyal, and ringgit of yield is traceable from asset to beneficiary in real time.</p></div>
              <div className="card reveal"><div className="ico">🕋</div><h3>Shariah-first</h3><p>Governance modeled on the classical fiqh of awqāf, overseen by scholars — technology serves the deen.</p></div>
              <div className="card reveal"><div className="ico">🤝</div><h3>Micro-Waqf for all</h3><p>Fractional endowment means a student with $5 joins the same eternal ledger as a founder endowing a building.</p></div>
              <div className="card reveal"><div className="ico">⚙️</div><h3>Smart disbursement</h3><p>Self-executing contracts route yields by pre-agreed rules — no leakage, no middlemen, no delays.</p></div>
              <div className="card reveal"><div className="ico">🌍</div><h3>Borderless ummah</h3><p>A donor in Toronto can endow a well in Kashmir and watch it give — for the rest of history.</p></div>
            </div>
          </div>
        </section>

        {/* QUOTE */}
        <section className="quote">
          <div className="container reveal">
            <blockquote>
              &quot;When a person dies, their deeds come to an end except three:
              <em> a continuing charity</em>, beneficial knowledge, or a righteous
              child who prays for them.&quot;
            </blockquote>
            <div className="src">Prophet Muhammad ﷺ — Sahih Muslim 1631</div>
            <div className="arabic-q arabic">إِذَا مَاتَ الإِنْسَانُ انْقَطَعَ عَمَلُهُ إِلاَّ مِنْ ثَلاَثَةٍ: صَدَقَةٍ جَارِيَةٍ...</div>
          </div>
        </section>

        {/* CTA */}
        <section id="join" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="cta reveal">
              <h2>Write your name into a ledger that <em>gives forever</em></h2>
              <p>
                WaqfChain is a pioneering vision — the first platform concept dedicated to bringing
                the 1,400-year institution of Waqf onto the blockchain. Scholars, builders, and
                donors: there is room for you.
              </p>
              <div className="hero-ctas">
                <a className="btn-primary" href="mailto:hello@waqfchain.example?subject=Joining%20WaqfChain">Get early access</a>
                <a className="btn-secondary" href="#what">Read the vision</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container f-in">
          <div>© 2026 WaqfChain — the first Waqf-on-Blockchain initiative. Built with ihsan.</div>
          <div className="arabic">وَمَا تُقَدِّمُوا لِأَنفُسِكُم مِّنْ خَيْرٍ تَجِدُوهُ عِندَ اللَّهِ</div>
        </div>
      </footer>
    </>
  );
}

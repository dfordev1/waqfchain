export const metadata = {
  title: "Scholars Circle — WAQF on Blockchain",
  description:
    "An invitation to the researchers of waqf and Islamic finance: audit the registry, hold signing keys, shape the open protocol — together.",
};

const ROLES = [
  {
    n: "01",
    t: "Auditor",
    d: "Hold an Ed25519 key. Countersign annual reports and audits on live waqfs — your signature becomes part of the permanent, Bitcoin-anchored record.",
  },
  {
    n: "02",
    t: "Reviewer of the protocol",
    d: "The Waqf Core spec (v0.1) is open. Challenge the fiqh mapping, the crypto, the governance model — revisions credit their contributors.",
  },
  {
    n: "03",
    t: "Pilot lead",
    d: "Bring a waqf from your institution or region onto a registry — yours or ours — as a documented case study you can publish.",
  },
  {
    n: "04",
    t: "Co-author",
    d: "The first paper on a deployed, independently verifiable waqf registry is yet to be written. The data and the system are here.",
  },
];

export default function Scholars() {
  return (
    <>
      <nav className="top scrolled">
        <div className="wrap nav-in">
          <a href="/" className="brand">Waqf <span className="ar arabic">وقف</span></a>
          <div className="nav-links">
            <a href="/papers">Papers</a>
            <a href="/spec">Spec</a>
            <a href="/scholars" style={{ color: "var(--gold)" }}>Scholars</a>
            <a href="/chain" className="keep">Launch App ↗</a>
          </div>
        </div>
      </nav>

      <main style={{ paddingTop: 140, paddingBottom: 100 }}>
        <div className="wrap" style={{ maxWidth: 900 }}>
          <div className="eyebrow">An invitation to the researchers of this field</div>
          <h1 style={{ fontWeight: 700, textTransform: "uppercase", fontSize: "clamp(34px,5.2vw,68px)", lineHeight: 1.02 }}>
            The Scholars{" "}
            <span style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontWeight: 500, textTransform: "none", color: "var(--gold)" }}>
              Circle
            </span>
          </h1>
          <p className="sub" style={{ marginTop: 22, maxWidth: 640, color: "var(--gray)", fontSize: 16.5, lineHeight: 1.8 }}>
            For a decade, researchers across Malaysia, Indonesia, Saudi Arabia, Türkiye, and beyond
            have written the frameworks for waqf on blockchain — often without knowing each other.
            The system now exists. This is the place where the authors of that literature meet it,
            test it, govern it, and shape what it becomes — together.
          </p>

          <div className="pillars" style={{ marginTop: 48 }}>
            {ROLES.map((r) => (
              <div className="pillar" key={r.n}>
                <div className="n">{r.n}</div>
                <h3>{r.t}</h3>
                <p>{r.d}</p>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: 56, border: "1px solid var(--hairline)", padding: "clamp(24px,4vw,40px)",
            background: "var(--off)",
          }}>
            <div className="eyebrow noline">How to join</div>
            <p style={{ color: "var(--gray)", fontSize: 15.5, lineHeight: 1.85, maxWidth: "68ch", marginTop: 8 }}>
              Create an account on the registry — it takes a minute, no approval needed. Your account
              is your identity in the circle; signing keys are generated on your own device and never
              leave it. Then write to us with your name and paper so we can connect you with the
              other researchers already in correspondence.
            </p>
            <div className="btn-row" style={{ marginTop: 24 }}>
              <a className="btn solid" href="/chain/login">Create your account</a>
              <a className="btn" href="/chain/explorer">Audit the registry first</a>
              <a className="btn" href="/spec">Read the protocol</a>
            </div>
          </div>

          <p style={{ marginTop: 40, color: "var(--faint)", fontSize: 13.5, lineHeight: 1.8, maxWidth: "70ch" }}>
            The circle is deliberately small at the start: authors of the field&apos;s literature and the
            institutions they advise. No fees, no tokens, no obligations — scholarship and stewardship
            only. <span className="arabic" style={{ color: "var(--gold)" }}>وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَىٰ</span>
          </p>
        </div>
      </main>

      <footer>
        <div className="wrap f-in">
          <div className="f-links">
            <a href="/">Home</a>
            <a href="/papers">Papers</a>
            <a href="/spec">Spec</a>
            <a href="/scholars">Scholars</a>
            <a href="/chain">Waqf-M App</a>
          </div>
          <div className="f-note">
            © 2026 WaqfChain — built with ihsan.
            <span className="ar arabic">إِنَّ اللَّهَ يُحِبُّ الْمُحْسِنِينَ</span>
          </div>
        </div>
      </footer>
    </>
  );
}

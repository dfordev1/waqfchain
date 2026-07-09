export const metadata = {
  title: "Waqf Core Protocol — Specification v0.1",
  description:
    "The open protocol for verifiable waqf registries: record format, hash chain, Ed25519 signatures, Merkle batching, and Bitcoin anchoring. Run your own registry; verify anyone's.",
};

const S = {
  h2: {
    fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em",
    fontSize: 15, margin: "56px 0 14px", color: "var(--ink)",
    display: "flex", alignItems: "center", gap: 12,
  },
  num: { color: "var(--gold)", fontFamily: "var(--serif)", fontStyle: "italic", textTransform: "none", fontSize: 18 },
  p: { color: "var(--gray)", fontSize: 15.5, lineHeight: 1.8, maxWidth: "70ch", marginTop: 10 },
  code: {
    display: "block", background: "#0a0a0a", color: "#e6e6e2", borderRadius: 4,
    padding: "16px 18px", fontSize: 13, lineHeight: 1.7, overflowX: "auto",
    fontFamily: "ui-monospace, Consolas, monospace", marginTop: 14, border: "1px solid var(--hairline)",
  },
  table: { width: "100%", borderCollapse: "collapse", marginTop: 14, fontSize: 14 },
  th: {
    textAlign: "left", padding: "10px 12px", borderBottom: "2px solid var(--ink)",
    fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--gray)",
  },
  td: { padding: "10px 12px", borderBottom: "1px solid var(--hairline)", color: "var(--ink)", verticalAlign: "top" },
  mono: { fontFamily: "ui-monospace, Consolas, monospace", fontSize: 13 },
  li: { color: "var(--gray)", fontSize: 15, lineHeight: 1.8, margin: "6px 0" },
};

export default function Spec() {
  return (
    <>
      <nav className="top scrolled">
        <div className="wrap nav-in">
          <a href="/" className="brand">Waqf <span className="ar arabic">وقف</span></a>
          <div className="nav-links">
            <a href="/#heritage">Heritage</a>
            <a href="/#protocol">Protocol</a>
            <a href="/papers">Papers</a>
            <a href="/spec" style={{ color: "var(--gold)" }}>Spec</a>
            <a href="/chain" className="keep">Launch App ↗</a>
          </div>
        </div>
      </nav>

      <main style={{ paddingTop: 140, paddingBottom: 100 }}>
        <div className="wrap" style={{ maxWidth: 900 }}>
          <div className="eyebrow">Open standard · Draft v0.1 · July 2026</div>
          <h1 style={{ fontWeight: 700, textTransform: "uppercase", fontSize: "clamp(36px,5.5vw,72px)", lineHeight: 1 }}>
            Waqf Core{" "}
            <span style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontWeight: 500, textTransform: "none", color: "var(--gold)" }}>
              protocol
            </span>
          </h1>
          <p style={{ ...S.p, fontSize: 17, marginTop: 20 }}>
            An open protocol for verifiable waqf registries. Any institution — a nazir organization,
            a SIRC, a national awqāf board — runs <em>their own</em> registry on their own
            infrastructure. Every registry anchors into the same neutral spine: <b style={{ color: "var(--ink)" }}>Bitcoin</b>,
            which none of them control. Records verify anywhere, trusting only mathematics.
            <br /><br />
            <b style={{ color: "var(--ink)" }}>Operators operate; mathematics audits.</b> This matches the fiqh of awqāf —
            an accountable nazir is required — while making silent tampering detectable by the world.
            Not a token. Not a coin. A record format and four rules.
          </p>

          <h2 style={S.h2}><span style={S.num}>§1</span> The record</h2>
          <p style={S.p}>A waqf&apos;s history is an append-only sequence. Records are never updated or deleted — corrections are new records.</p>
          <table style={S.table}><thead><tr><th style={S.th}>Field</th><th style={S.th}>Meaning</th></tr></thead><tbody>
            <tr><td style={{ ...S.td, ...S.mono }}>waqf_id</td><td style={S.td}>UUID of the waqf</td></tr>
            <tr><td style={{ ...S.td, ...S.mono }}>seq</td><td style={S.td}>Position in the chain (1 = genesis <span style={S.mono}>creation</span>)</td></tr>
            <tr><td style={{ ...S.td, ...S.mono }}>event_type</td><td style={S.td}>One of 22 standardized events — deed_registered, trustee_appointed, lease_signed, distribution_made, court_ruling, annual_report…</td></tr>
            <tr><td style={{ ...S.td, ...S.mono }}>payload</td><td style={S.td}>JSON event data</td></tr>
            <tr><td style={{ ...S.td, ...S.mono }}>prev_hash</td><td style={S.td}>Hash of the previous record (&quot;&quot; at genesis)</td></tr>
            <tr><td style={{ ...S.td, ...S.mono }}>recorded_at</td><td style={S.td}>UTC timestamp, microseconds</td></tr>
            <tr><td style={{ ...S.td, ...S.mono }}>hash</td><td style={S.td}>The chain hash (§2)</td></tr>
          </tbody></table>

          <h2 style={S.h2}><span style={S.num}>§2</span> Chain hash — tamper evidence</h2>
          <code style={S.code}>{`hash = SHA-256_hex(
  waqf_id | seq | event_type | payload_text | prev_hash |
  recorded_at as 'YYYY-MM-DDTHH:MI:SS.USZ' (UTC)
)`}</code>
          <p style={S.p}>
            A chain is valid iff every recomputed hash matches and every <span style={S.mono}>prev_hash</span> links
            to the previous record. Editing any historical record breaks every hash after it.
          </p>

          <h2 style={S.h2}><span style={S.num}>§3</span> Signatures — attestation</h2>
          <code style={S.code}>{`signed_hash = SHA-256( canonical_JSON(payload) )   // sorted keys, no whitespace
signature   = Ed25519.sign(signed_hash, secret_key)`}</code>
          <p style={S.p}>
            Roles: founder · witness · trustee · court · auditor · regulator. Keys are generated and
            held by the signers — never by the operator. Signatures cover the payload alone, so they
            are portable: a signature made by one implementation verifies in every other (the TypeScript
            and Python reference implementations are byte-for-byte compatible).
          </p>

          <h2 style={S.h2}><span style={S.num}>§4</span> Merkle batching</h2>
          <p style={S.p}>
            Unbatched records&apos; chain hashes become leaves (ordered by time), paired with SHA-256 up to a
            single root; odd levels duplicate their last node. Any single record gets an inclusion proof —
            a sibling path a verifier recomputes locally, leaf to root.
          </p>

          <h2 style={S.h2}><span style={S.num}>§5</span> Bitcoin anchoring</h2>
          <p style={S.p}>
            The root is submitted to independent OpenTimestamps calendar servers, which commit it into a
            Bitcoin transaction. Within hours the proof upgrades to a Bitcoin block attestation, verifiable
            with the official OTS tooling. From that moment every batched record is timestamped in world
            history, outside any operator&apos;s control. Cost: pennies per batch, regardless of how many
            records it contains — this is how one protocol can carry a trillion dollars of assets for
            ~$50 a year of anchoring.
          </p>
          <p style={S.p}>
            Live example: the reference registry&apos;s current root is committed in{" "}
            <a href="https://mempool.space/block-height/957269" target="_blank" rel="noreferrer" style={{ borderBottom: "1px solid var(--gold)" }}>
              Bitcoin block 957,269
            </a>.
          </p>

          <h2 style={S.h2}><span style={S.num}>§6</span> Verification — trust nothing</h2>
          <code style={S.code}>{`# audit any waqf on your own machine
npx waqf-verify <waqf-id>

✓ chain linkage    ✓ merkle inclusion
✓ bitcoin anchor   ✓ ed25519 signatures`}</code>
          <p style={S.p}>
            Four tiers, each independently checkable: chain → signatures → Merkle inclusion → Bitcoin.
            Private waqfs expose only hashes; anchoring publicly commits their existence and timing
            without revealing content.
          </p>

          <h2 style={S.h2}><span style={S.num}>§7</span> Federation — how this decentralizes</h2>
          <p style={S.p}>
            Nobody runs <em>the</em> server; every institution runs <em>a</em> server — like email.
            Multiple conforming registries, operated by different awqāf bodies in different countries,
            all anchor into the same Bitcoin. The protocol is the standard; Bitcoin is the neutral spine;
            the reference implementation is open source. Adoption means running it yourself, not
            trusting us.
          </p>

          <div className="btn-row" style={{ marginTop: 56 }}>
            <a className="btn solid" href="https://github.com/dfordev1/Waqf-m/blob/main/SPEC.md" target="_blank" rel="noreferrer">Full spec (SPEC.md) ↗</a>
            <a className="btn" href="/chain/explorer">Live reference registry</a>
            <a className="btn" href="/papers">The literature</a>
          </div>
        </div>
      </main>

      <footer>
        <div className="wrap f-in">
          <div className="f-links">
            <a href="/">Home</a>
            <a href="/papers">Papers</a>
            <a href="/spec">Spec</a>
            <a href="/chain">Waqf-M App</a>
          </div>
          <div className="f-note">
            © 2026 WaqfChain — an open protocol, built with ihsan.
            <span className="ar arabic">إِنَّ اللَّهَ يُحِبُّ الْمُحْسِنِينَ</span>
          </div>
        </div>
      </footer>
    </>
  );
}

export const metadata = {
  title: "Research Papers — WAQF on Blockchain",
  description:
    "The academic literature on Waqf and blockchain: governance, smart contracts, cash waqf, tokenization, and digital-age frameworks.",
};

const SECTIONS = [
  {
    title: "Foundations & Governance",
    papers: [
      {
        n: "01",
        t: "Blockchain for Waqf Management",
        meta: "Zulaikha & Rusmita · KnE Social Sciences · 2018",
        note: "One of the earliest peer-reviewed treatments — frames blockchain as the missing accountability layer for waqf institutions.",
        url: "https://www.researchgate.net/publication/328977987_Blockchain_for_Waqf_Management",
      },
      {
        n: "02",
        t: "Using Blockchain and Smart Contracts for Waqf Institutions",
        meta: "2019 · Literature on waqf revival & institutional efficacy",
        note: "Argues distributed ledgers can revive idle waqf assets, cut transaction costs, and improve governance of cash waqf.",
        url: "https://www.researchgate.net/publication/333809091_Using_Blockchain_and_Smart_Contracts_for_Waqf_Institutions",
      },
      {
        n: "03",
        t: "Addressing Accountability and Transparency Challenges in Waqf Management Using Blockchain Technology",
        meta: "Journal of Islamic Monetary Economics and Finance (Bank Indonesia)",
        note: "Qualitative case studies of Malaysian university waqf administrators, through institutional theory and Islamic institutional logic.",
        url: "https://jimf-bi.org/index.php/JIMF/article/view/1413",
      },
      {
        n: "04",
        t: "Integrating Blockchain Technology into Waqf Governance: Enhancing Transparency and Accountability in Sharia Finance for Achieving SDGs",
        meta: "2025",
        note: "Connects on-chain waqf governance to the UN Sustainable Development Goals agenda.",
        url: "https://www.researchgate.net/publication/393530765_Integrating_blockchain_technology_into_waqf_governance_Enhancing_transparency_and_accountability_in_Sharia_finance_for_achieving_SDGs",
      },
      {
        n: "05",
        t: "What Blockchain Technology Can Do to Contribute to Waqf",
        meta: "al-Afkar, Journal for Islamic Studies",
        note: "A fiqh-grounded primer urging governments to adopt blockchain for awqāf administration.",
        url: "https://al-afkar.com/index.php/Afkar_Journal/article/view/158",
      },
    ],
  },
  {
    title: "Smart Contracts & Cash Waqf",
    papers: [
      {
        n: "06",
        t: "The Potential of Using Smart Contracts in Cash Waqf on Blockchain",
        meta: "al-Qanatir: International Journal of Islamic Studies · 2023",
        note: "How self-executing contracts can mobilize cash waqf collection at scale under structured, supervised management.",
        url: "http://al-qanatir.com/aq/article/view/741",
      },
      {
        n: "07",
        t: "The Sustainability of Cash Waqf Using Blockchain Technology: A Conceptual Study",
        meta: "International Journal of Trends in Accounting Research",
        note: "Targets the opacity, accountability gaps, and inefficiency of traditional cash waqf systems.",
        url: "https://jurnal.adai.or.id/index.php/ijtar/article/view/664",
      },
      {
        n: "08",
        t: "Application of Blockchain and Smart-Contract on Waqf Asset Management: Is It Necessary?",
        meta: "2022",
        note: "Concludes blockchain aids management of movable and immovable waqf assets while minimizing data manipulation.",
        url: "https://www.researchgate.net/publication/364973194_APPLICATION_OF_BLOCKCHAIN_AND_SMART-CONTRACT_ON_WAQF_ASSET_MANAGEMENT_IS_IT_NECESSARY",
      },
      {
        n: "09",
        t: "Blockchain Model to Support Waqf Management",
        meta: "2022",
        note: "Proposes a reference architecture for registering deeds and tracking disbursements on-chain.",
        url: "https://www.researchgate.net/publication/362715087_Blockchain_Model_to_Support_Waqf_Management",
      },
    ],
  },
  {
    title: "Platforms & WaqfTech",
    papers: [
      {
        n: "10",
        t: "Using Blockchain Technology to Revolutionize Waqf: The Finterra Waqf Chain Model",
        meta: "2022",
        note: "Case study of the first commercial attempt at a dedicated waqf chain — its design and its lessons.",
        url: "https://www.researchgate.net/publication/359118561_Using_Blockchain_Technology_to_Revolutionize_Waqf_The_Finterra_Waqf_Chain_Model",
      },
      {
        n: "11",
        t: "Waqfintech and Sustainable Socio-Economic Development",
        meta: "Mohsin · International Journal of Management and Applied Research · Vol 6, No 3",
        note: "Positions waqf-fintech convergence as an engine for inclusive socio-economic development.",
        url: "https://www.ijmar.org/v6n3/19-009.html",
      },
    ],
  },
  {
    title: "Digital-Age Frameworks & Bibliometrics",
    papers: [
      {
        n: "12",
        t: "The Development of the Usage of Blockchain for Waqf and Zakat Globally: A Bibliometric Study",
        meta: "2024",
        note: "Maps the entire research field — who is publishing, where, and which themes are accelerating.",
        url: "https://www.researchgate.net/publication/378537675_The_Development_of_the_Usage_of_Blockchain_for_Waqf_and_Zakat_Globally_A_Bibliometric_Study",
      },
      {
        n: "13",
        t: "Reimagining Waqf in the Digital Age: A Framework for Smart Waqf Governance Through Emerging Technologies",
        meta: "International Journal of Research and Innovation in Social Science",
        note: "A governance framework spanning blockchain, AI, and IoT for next-generation awqāf.",
        url: "https://rsisinternational.org/journals/ijriss/articles/reimagining-waqf-in-the-digital-age-a-framework-for-smart-waqf-governance-through-emerging-technologies/",
      },
      {
        n: "14",
        t: "Optimizing Blockchain Waqf as an Instrument for the Sustainability of Pesantren Education",
        meta: "Islamiconomic: Jurnal Ekonomi Islam",
        note: "Applied study: blockchain waqf as sustainable funding for Islamic boarding-school education.",
        url: "https://journal.islamiconomic.or.id/index.php/ijei/article/view/1027",
      },
    ],
  },
];

export default function Papers() {
  return (
    <>
      <nav className="top scrolled">
        <div className="wrap nav-in">
          <a href="/" className="brand">Waqf <span className="ar arabic">وقف</span></a>
          <div className="nav-links">
            <a href="/#heritage">Heritage</a>
            <a href="/#problem">Mission</a>
            <a href="/#protocol">Protocol</a>
            <a href="/papers" style={{ color: "var(--gold)" }}>Papers</a>
            <a href="/chain" className="keep">Launch App ↗</a>
          </div>
        </div>
      </nav>

      <main style={{ paddingTop: 140 }}>
        <div className="wrap">
          <div className="eyebrow">07 — Research</div>
          <h1
            style={{
              fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.005em",
              fontSize: "clamp(40px, 6vw, 84px)", lineHeight: 0.98,
            }}
          >
            The <span className="gold-it" style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontWeight: 500, textTransform: "none", color: "var(--gold)" }}>literature</span>
          </h1>
          <p className="sub" style={{ marginTop: 22, maxWidth: 620, color: "var(--gray)", fontSize: 16.5, lineHeight: 1.7 }}>
            Waqf on blockchain is not a slogan — it is an active research field spanning Islamic
            finance journals, computer science, and governance studies. A curated reading list,
            from the first 2018 papers to the current SDG-era frameworks.
          </p>

          {SECTIONS.map((s) => (
            <section key={s.title} style={{ padding: "56px 0 0" }}>
              <div className="eyebrow noline" style={{ marginBottom: 6 }}>{s.title}</div>
              <div className="pillars" style={{ marginTop: 18 }}>
                {s.papers.map((p) => (
                  <a
                    key={p.n}
                    className="pillar"
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                    style={{ display: "grid" }}
                  >
                    <div className="n">{p.n}</div>
                    <div>
                      <h3 style={{ fontSize: "clamp(17px,1.9vw,22px)" }}>{p.t} ↗</h3>
                      <div style={{
                        fontSize: 11.5, fontWeight: 600, letterSpacing: "0.18em",
                        textTransform: "uppercase", color: "var(--gold)", marginTop: 8,
                      }}>
                        {p.meta}
                      </div>
                    </div>
                    <p>{p.note}</p>
                  </a>
                ))}
              </div>
            </section>
          ))}

          <section style={{ padding: "88px 0 0" }}>
            <div className="eyebrow">The gap in the literature</div>
            <h2
              style={{
                fontWeight: 700, textTransform: "uppercase",
                fontSize: "clamp(30px, 4.4vw, 56px)", lineHeight: 1.02, maxWidth: "20ch",
              }}
            >
              The papers propose.{" "}
              <span style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontWeight: 500, textTransform: "none", color: "var(--gold)" }}>
                Waqf-M implements.
              </span>
            </h2>
            <p className="sub" style={{ marginTop: 22, maxWidth: 640, color: "var(--gray)", fontSize: 16.5, lineHeight: 1.7 }}>
              Nearly every study above is conceptual — frameworks, models, and calls for adoption.
              Waqf-M is the working system they describe: hash-chained waqf records, Ed25519-signed
              deeds, and a ledger anchored to Bitcoin through OpenTimestamps. Not a proposal —
              a public registry you can audit right now.
            </p>
            <div className="btn-row" style={{ margin: "40px 0 100px" }}>
              <a className="btn solid" href="/chain/explorer">Audit the public registry</a>
              <a className="btn" href="/#join">Join the founding cohort</a>
              <a className="btn" href="/">Back to home</a>
            </div>
          </section>
        </div>
      </main>

      <footer>
        <div className="wrap f-in">
          <div className="f-links">
            <a href="/">Home</a>
            <a href="/papers">Papers</a>
            <a href="/chain">Waqf-M App</a>
            <a href="mailto:hello@waqfchain.example">Contact</a>
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

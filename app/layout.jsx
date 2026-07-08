import "./globals.css";
import { Amiri, Sora, Space_Grotesk } from "next/font/google";

const sora = Sora({ subsets: ["latin"], variable: "--font-sora" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk" });
const amiri = Amiri({ subsets: ["arabic"], weight: ["400", "700"], variable: "--font-amiri" });

export const metadata = {
  title: "WaqfChain — Waqf on Blockchain | Eternal Charity, Immutable Trust",
  description:
    "The world's first platform concept bringing Islamic Waqf endowments onto the blockchain. Transparent, immutable, perpetual charity — sadaqah jariyah, secured by cryptography.",
  keywords: ["Waqf", "Blockchain", "Islamic Finance", "Endowment", "Sadaqah Jariyah", "Smart Contracts", "Halal Crypto"],
  openGraph: {
    title: "WaqfChain — Waqf on Blockchain",
    description: "Eternal charity, immutable trust. The first ever Waqf-on-Blockchain platform.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${sora.variable} ${grotesk.variable} ${amiri.variable}`}>{children}</body>
    </html>
  );
}

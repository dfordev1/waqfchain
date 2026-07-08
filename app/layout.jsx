import "./globals.css";
import { Anton, Oswald, Roboto, Amiri } from "next/font/google";

const anton = Anton({ subsets: ["latin"], weight: "400", variable: "--font-anton" });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });
const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700", "900"], variable: "--font-roboto" });
const amiri = Amiri({ subsets: ["arabic"], weight: ["400", "700"], variable: "--font-amiri" });

export const metadata = {
  title: "WAQF POST — Waqf on Blockchain | Eternal Charity, Immutable Trust",
  description:
    "EXCLUSIVE: The world's first platform concept bringing Islamic Waqf endowments onto the blockchain. Transparent, immutable, perpetual charity — sadaqah jariyah, secured by cryptography.",
  keywords: ["Waqf", "Blockchain", "Islamic Finance", "Endowment", "Sadaqah Jariyah", "Smart Contracts", "Halal Crypto"],
  openGraph: {
    title: "WAQF POST — Waqf on Blockchain",
    description: "EXCLUSIVE: The first ever Waqf-on-Blockchain platform. Eternal charity, immutable trust.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${anton.variable} ${oswald.variable} ${roboto.variable} ${amiri.variable}`}>{children}</body>
    </html>
  );
}

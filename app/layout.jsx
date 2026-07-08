import "./globals.css";
import { Fraunces, Inter, Amiri } from "next/font/google";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-serif", axes: ["opsz"] });
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const amiri = Amiri({ subsets: ["arabic"], weight: ["400", "700"], variable: "--font-amiri" });

export const metadata = {
  title: "Waqf on Blockchain — Eternal charity, immutable trust",
  description:
    "The first platform concept bringing Islamic Waqf endowments onto the blockchain. Transparent, immutable, perpetual charity — sadaqah jariyah, secured by cryptography.",
  keywords: ["Waqf", "Blockchain", "Islamic Finance", "Endowment", "Sadaqah Jariyah", "Smart Contracts", "Halal Crypto"],
  openGraph: {
    title: "Waqf on Blockchain",
    description: "Eternal charity, immutable trust. The first ever Waqf-on-Blockchain platform.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${inter.variable} ${amiri.variable}`}>{children}</body>
    </html>
  );
}

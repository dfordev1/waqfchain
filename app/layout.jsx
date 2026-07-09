import "./globals.css";
import { Fraunces, Inter, Amiri, Space_Grotesk } from "next/font/google";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-serif", axes: ["opsz"] });
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-mono" });
const amiri = Amiri({ subsets: ["arabic"], weight: ["400", "700"], variable: "--font-amiri" });

export const metadata = {
  metadataBase: new URL("https://waqfx.vercel.app"),
  title: "WaqfChain — The Eternal Ledger | Waqf on Blockchain",
  description:
    "The world's first Waqf-on-Blockchain platform. 1,400 years of Islamic endowment, secured by cryptography. Immutable deeds, transparent yields, perpetual charity.",
  keywords: ["Waqf", "Blockchain", "Islamic Finance", "Endowment", "Sadaqah Jariyah", "Smart Contracts", "Halal", "Awqaf"],
  openGraph: {
    title: "WaqfChain — The Eternal Ledger",
    description: "1,400 years of Waqf. Secured by cryptography. Giving forever.",
    type: "website",
    url: "https://waqfx.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "WaqfChain — The Eternal Ledger",
    description: "The first ever Waqf-on-Blockchain platform.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${inter.variable} ${grotesk.variable} ${amiri.variable}`}>
        {children}
      </body>
    </html>
  );
}

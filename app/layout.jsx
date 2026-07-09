import "./globals.css";
import { Barlow, Fraunces, Amiri } from "next/font/google";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-din",
});
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-serif", axes: ["opsz"] });
const amiri = Amiri({ subsets: ["arabic"], weight: ["400"], variable: "--font-amiri" });

export const metadata = {
  metadataBase: new URL("https://waqfx.vercel.app"),
  title: "WAQF — Waqf on Blockchain",
  description:
    "The first Waqf-on-Blockchain platform. Immutable endowments, transparent yields, perpetual charity.",
  openGraph: {
    title: "WAQF — Waqf on Blockchain",
    description: "Immutable endowments. Transparent yields. Perpetual charity.",
    type: "website",
    url: "https://waqfx.vercel.app",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${barlow.variable} ${fraunces.variable} ${amiri.variable}`}>
        {/* If a Supabase auth email link falls back to the site root (hash-based
            token or error), route it into the /chain app instead of dead-ending. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){var h=location.hash;if(h&&(h.indexOf('access_token')>-1||h.indexOf('error')>-1||h.indexOf('type=recovery')>-1)){var t=h.replace(/^#/,'');if(h.indexOf('error')>-1){location.replace('/chain/login?error='+encodeURIComponent(decodeURIComponent((t.match(/error_description=([^&]*)/)||[])[1]||'Reset link is invalid or has expired. Request a new one.').replace(/\\+/g,' ')));}else{location.replace('/chain/reset-password#'+t);}}})();",
          }}
        />
        {children}
      </body>
    </html>
  );
}

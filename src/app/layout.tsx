import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Unde Parchez? - Găsește locuri de parcare în timp real",
  description: "Monitorizează în timp real locurile de parcare disponibile în centrele orașelor din România. Rezolvă problema găsirii unui loc de parcare în zonele aglomerate.",
  keywords: "parcare, locuri parcare, timp real, România, oraș, parking, monitorizare",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

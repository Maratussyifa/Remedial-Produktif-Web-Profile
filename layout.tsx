import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mar'atussyifa Ussakinah — Personal Profile",
  description: "Website pribadi Mar'atussyifa Ussakinah, siswa XI RPL 6",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Nunito:wght@400;500;600;700;800&family=Dancing+Script:wght@700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
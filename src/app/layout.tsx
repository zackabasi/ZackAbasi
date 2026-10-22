import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { AudioProvider } from "@/context/AudioContext";
import Navbar from "@/components/Navbar";
import AudioPlayer from "@/components/AudioPlayer";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const description = "Zack Abasi, Syrian-Irish composer, guitarist and oud player. Listen to his debut EP Sunrosa and music featured on NBC, RTL 4, NPO, VOX and RTÉ Radio 1.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.zackabasi.com"),
  title: {
    default: "Zack Abasi | Official Website",
    template: "%s | Zack Abasi",
  },
  description,
  openGraph: {
    type: "website",
    siteName: "Zack Abasi",
    locale: "en_IE",
    url: "/",
    title: "Zack Abasi | Official Website",
    description,
  },
  twitter: {
    card: "summary_large_image",
    creator: "@zackabasi",
    title: "Zack Abasi | Official Website",
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={outfit.variable}>
      <body>
        <AudioProvider>
          <Navbar />
          <main style={{ minHeight: '100vh', paddingBottom: '100px' }}>
            {children}
          </main>
          <AudioPlayer />
        </AudioProvider>
      </body>
    </html>
  );
}

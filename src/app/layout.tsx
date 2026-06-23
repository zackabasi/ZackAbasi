import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import { AudioProvider } from "@/context/AudioContext";
import Navbar from "@/components/Navbar";
import AudioPlayer from "@/components/AudioPlayer";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Zack Abasi | Premium Artist",
  description: "Official website of Zack Abasi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable}`}>
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

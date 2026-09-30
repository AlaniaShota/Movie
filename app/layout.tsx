import type { Metadata } from "next";
import { Barlow_Condensed, Jost, Montserrat } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
import SmoothScroll from "./components/smooth-scroll";
import ScrollTopButton from "./components/ScrollTopButton";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const barlow = Barlow_Condensed({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "MovieDB",
  description:
    "A simple movie database app built with Next.js 13 and the TMDB API.",
  icons: {
    icon: [{ url: "/image/icon.png", type: "image/png" }],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${jost.variable} ${montserrat.variable} ${barlow.variable}  antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScroll />
        <Header />
        {children}
        <ScrollTopButton/>
      </body>
    </html>
  );
}

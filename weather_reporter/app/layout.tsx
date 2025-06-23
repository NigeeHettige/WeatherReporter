import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://weather-reporter-ten.vercel.app"),
  keywords: [
    "weather",
    "weather tomorrow",
    "weather today",
    "weather forecast",
    "forecast",
  ],
  title: "Weather Report",
  description:
    "Weather Reporter is a real-time weather forecasting app that provides accurate current conditions, hourly updates, and 5-day forecasts using modern web technologies.",
  openGraph: {
    title: "Weather Reporter",
    description:
      "Weather Reporter is a real-time weather forecasting app that provides accurate current conditions, hourly updates, and 5-day forecasts using modern web technologies.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Weather Reporter Open Graph Image",
      },
    ],
    type: "website",
    locale: "en_US",
    siteName: "Weather Reporter",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden bg-bg_blue `}
        suppressHydrationWarning
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

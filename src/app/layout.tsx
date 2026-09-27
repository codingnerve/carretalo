import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { site } from "@/lib/site";
import { GA_ID } from "@/lib/analytics";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Find Your Ride. Start Your Journey.`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    siteName: site.name,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 400,
        alt: site.name,
      },
    ],
  },
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-brand focus:px-4 focus:py-2 focus:text-on-brand"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1 pb-20 md:pb-0">
          {children}
        </main>
        <Footer />
        <StickyMobileCTA />
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}

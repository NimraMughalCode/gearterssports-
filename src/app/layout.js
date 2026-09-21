import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/WhatsAppFloating";
import { Toaster } from 'react-hot-toast';
import ReduxProvider from "@/ReduxToolkit/Provider";
import { ThemeProvider } from "@/context/ThemeContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  metadataBase: new URL("https://www.gearterssports.com"),
  title: {
    default: "Gearters Sports | Best Manufacturer of Gloves & Sports Gear",
    template: "%s | Gearters Sports - Best Manufacturer of Gloves",
  },
  description: "Gearters Sports is recognized among the best manufacturers of gloves, custom combat gear, and high-quality sports accessories. Delivering world-class boxing equipment worldwide.",
  keywords: [
    "best manufacturers of gloves",
    "best manufacturer of sports",
    "Gearters Sports",
    "boxing gloves manufacturers",
    "custom sports accessories",
    "combat sports equipment",
    "mma gloves supplier",
    "boxing gear exporters"
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Gearters Sports | Best Manufacturer of Gloves & Sports Gear",
    description: "Gearters Sports is recognized among the best manufacturers of gloves, custom combat gear, and high-quality sports accessories.",
    url: "https://www.gearterssports.com",
    siteName: "Gearters Sports",
    locale: "en_US",
    type: "website",
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var savedTheme = localStorage.getItem('gearters-theme');
                  if (savedTheme === 'light') {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.classList.add('light');
                  } else {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('light');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} antialiased`}
      >
      <ReduxProvider>
        <ThemeProvider>
          <Toaster position="top-right" />
          <Header />
          <main className="mt-[90px] w-full overflow-x-hidden">{children}</main>
          <Footer />
          <FloatingWhatsApp />
        </ThemeProvider>
      </ReduxProvider>
      </body>
    </html>
  );
}

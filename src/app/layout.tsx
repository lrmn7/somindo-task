import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import AuthProvider from "@/components/providers/AuthProvider";
import { Toaster } from "react-hot-toast";
import MarqueeAlert from "@/components/layout/MarqueeAlert";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import somindo from "@/public/somindo.png";
const inter = Inter({ subsets: ["latin"] });
import Loader from "@/components/loader";
export const metadata: Metadata = {
  title: "Somnia Indonesia Community",
  description: "The official community of Somnia Indonesia.",
  icons: {
    icon: somindo.src,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-primary text-white`}>
        <AuthProvider>
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                background: 'hsl(var(--secondary))',
                color: 'hsl(var(--secondary-foreground))',
                border: '1px solid hsl(var(--border))',
              },
            }}
          />
          <Loader>Somnia Indonesia</Loader>
          <MarqueeAlert />
          <Navbar />
          <main className="min-h-screen container mx-auto px-4 py-8">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
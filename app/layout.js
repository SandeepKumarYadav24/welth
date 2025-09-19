import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
const inter = Inter ({ subsets: ["latin"]});
import { Geist, Geist_Mono } from 'next/font/google';
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata = {
  title: "Welth",
  description: "One Stop Finance Platform ",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        {/* apply custom fonts globally (sans + mono) */}
        {/* make text smoother with antialiased. */}
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>

          {/* header */}
          <Header/>
          <main className="min-h-screen">{children}</main>
          <Toaster richColors />

          {/*footer  */}
          <footer className="bg-blue-50 py-12">
            <div className="container mx-auto px-4 text-center text-gray-600">
              <p>Made with 💗 by Saandeep Yadav</p>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
} 

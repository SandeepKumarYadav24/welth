import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
const inter = Inter ({ subsets: ["latin"]});
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import {
  SignedOut,
  SignedIn,
  UserButton,
  SignInButton,
  SignUpButton
} from "@clerk/nextjs";


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
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <Header/>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
} 

import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter ({ subsets: ["latin"]});

export const metadata = {
  title: "Welth",
  description: "One Stop Finance Platform ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        {/* header */}
        {children}
        {/* footer*/}
        <footer className="bg-blue-100 py-12">
          <div className="container mx-auto px-4 text-center">
            <p>Made by Sandeep</p>
          </div>
        </footer>
        </body>
    </html>
  );
} 

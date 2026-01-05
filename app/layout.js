import { Poppins, Great_Vibes } from "next/font/google";
import "./globals.css";

// 1. Configure the Poppins font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-great-vibes",
});

export const metadata = {
  title: "Kwik-stayz",
  description: "Your journey begins here",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* 2. Apply the variable AND the 'font-sans' class */}
      <body
        className={`${poppins.variable} ${greatVibes.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar"; // This grabs it from your new root folder

export const metadata: Metadata = {
  title: "Hoursdev | Digital Future",
  description: "Premium digital agency for Engineering, Migration, and Mobile experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-black text-white selection:bg-white selection:text-black">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
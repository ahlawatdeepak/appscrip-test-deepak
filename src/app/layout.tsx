import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Inria_Sans } from "next/font/google";


const InriaSans = Inria_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  title: "Discover Amazing Products | Your Store Name",
  description: "Explore our wide range of products and find the best deals on your favorite items. Shop now!",
};

// Add schema settings placeholder
// <script type="application/ld+json">
// {
//   "@context": "https://schema.org",
//   "@type": "Organization",
//   "name": "Your Store Name",
//   "url": "https://www.yourstore.com",
//   "logo": "https://www.yourstore.com/logo.png"
// }
// </script>

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={InriaSans.className}>
        <Navbar  />
        {children}
        <Footer />
      </body>
    </html>
  );
}




import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import {Topbar,Bottombar,RightSidebar,LeftSidebar} from '@/components/shared';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:'KGP Adda',
  description: 'A social media app for KGPians'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Topbar />

        <main>
          <LeftSidebar />

          <section className="main-container">
            <div className="w-full max-w-4xl">
              {children}
            </div>
          </section>

          <RightSidebar />
        </main>

        <Bottombar />
      </body>
    </html>
  );
}

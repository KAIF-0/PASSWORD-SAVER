import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../../components/navbar.js"; 
import Script from 'next/script';   

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pass-Saver",
  description: "Created by KAIF-0",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en"> 
      <body className={inter.className}>
      <div className="mt-14 max-w-screen-xl mx-auto px-2">
      <Navbar/>
      </div>
      {/* <div className="absolute inset-0 -z-10 h-full w-full bg-black-50 bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:14px_20px]"><div className="absolute bottom-0 left-0 right-0 top-0 -z-10 m-auto h-[510px] w-[410px] rounded-full bg-white opacity-20 blur-[100px]"></div></div>    */}
      {children}<Script src="https://cdn.lordicon.com/lordicon.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}

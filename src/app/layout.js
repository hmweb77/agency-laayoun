import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ديجيتال العيون",
  description: "ديجيتال العيون هي وكالة رقمية مبتكرة متخصصة في تقديم خدمات التسويق الرقمي، تصميم المواقع، إدارة وسائل التواصل الاجتماعي، وإنشاء المحتوى الإبداعي. نعمل مع شركات ومحترفين في العيون والمغرب لمساعدتهم على تعزيز حضورهم الرقمي وتحقيق أهدافهم التجارية",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}

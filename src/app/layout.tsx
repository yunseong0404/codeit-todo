import Header from "@/components/layout/header";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/moonspam/NanumSquare@2.0/nanumsquare.css"
        />
      </head>
      <body className="min-h-screen bg-white font-sans text-slate-900">
        <Header />
        <main className="max-w-[1200px] mx-auto px-4 sm:px-6 py-4 sm:py-6">{children}</main>
      </body>
    </html>
  );
}

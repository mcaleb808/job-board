import Providers from "./providers";
import "./globals.css";
import Header from "./components/Header";

export const metadata = {
  title: "Job Board",
  description: "Browse and apply for jobs.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-neutral-50 text-neutral-900 antialiased">
        <Providers>
          <div className="max-w-5xl mx-auto">
            <Header />
            <main className="px-4 py-6">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}

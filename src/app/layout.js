import Providers from './providers';
import './globals.css';

export const metadata = {
  title: 'Job Board',
  description: 'Browse and apply for jobs.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-neutral-50 text-neutral-900 antialiased">
        <Providers>
          <div className="max-w-5xl mx-auto">
            <header className="sticky top-0 z-10 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-neutral-200">
              <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3">
                <div className="h-8 w-8 rounded-xl bg-black text-white grid place-items-center font-bold">JB</div>
                <nav className="ml-auto flex gap-4 text-sm">
                  <a href="/jobs" className="hover:underline">Jobs</a>
                  <a href="/login" className="hover:underline">Login</a>
                  <a href="/register" className="hover:underline">Register</a>
                </nav>
              </div>
            </header>
            <main className="px-4 py-6">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}

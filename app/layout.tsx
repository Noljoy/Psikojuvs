'use client';

import { Playfair_Display } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import "./globals.css";

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  weight: ['400', '500', '600', '700', '800', '900']
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    // Giriş durumunu kontrol et
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    const storedUserRole = localStorage.getItem('userRole');
    
    setIsLoggedIn(!!storedIsLoggedIn);
    setUserRole(storedUserRole);

    // Admin sayfalarına erişim kontrolü
    if (pathname?.startsWith('/admin')) {
      if (!storedIsLoggedIn || storedUserRole !== 'admin') {
        router.push('/login');
      }
    }
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    setUserRole(null);
    router.push('/login');
  };

  return (
    <html lang="tr">
      <body className={playfair.className}>
        <nav className="nav-header">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="flex items-center gap-4">
              <div className="relative w-[120px] h-[120px] logo-wrapper group">
                <Image
                  src="/logo.png"
                  alt="Psikojuvs Logo"
                  fill
                  className="object-contain transition-all duration-300 group-hover:scale-110"
                  priority
                />
                <div className="logo-circle"></div>
              </div>
              <div className="flex items-center">
                <span className="text-4xl font-extrabold tracking-[.5em] text-accent-gold hover:text-dark-gold transition-all duration-300 uppercase">sikojuvs</span>
              </div>
            </Link>
            <div className="flex items-center space-x-4">
              {userRole === 'admin' && (
                <Link
                  href="/admin/dashboard"
                  className="text-accent-gold hover:text-dark-gold transition-colors px-5 py-3 rounded-lg hover:bg-light-gold/10 text-xl font-semibold"
                >
                  Yönetici Paneli
                </Link>
              )}
              {isLoggedIn ? (
                <>
                  <Link
                    href="/profile"
                    className="text-accent-gold hover:text-dark-gold transition-colors px-4 py-2 rounded-lg hover:bg-light-gold/10"
                  >
                    Profil
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Çıkış Yap
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-accent-gold hover:text-dark-gold transition-colors px-4 py-2 rounded-lg hover:bg-light-gold/10"
                  >
                    Giriş Yap
                  </Link>
                  <Link
                    href="/register"
                    className="bg-accent-gold text-primary-purple px-4 py-2 rounded-lg hover:bg-dark-gold transition-colors font-semibold"
                  >
                    Kayıt Ol
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}

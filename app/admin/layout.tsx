'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

// Sidebar menü öğeleri - sıralamayı değiştirdik
const menuItems = [
  {
    title: 'Dashboard',
    icon: '📊',
    path: '/admin',
    color: 'bg-blue-500/10'
  },
  {
    title: 'Test Yönetimi',
    icon: '📋',
    path: '/admin/tests',
    color: 'bg-purple-500/10'
  },
  {
    title: 'Forum Yönetimi',
    icon: '💬',
    path: '/admin/forum',
    color: 'bg-green-500/10'
  },
  {
    title: 'Kullanıcı Yönetimi',
    icon: '👥',
    path: '/admin/users',
    color: 'bg-yellow-500/10'
  },
  {
    title: 'Hakkımızda',
    icon: '📝',
    path: '/admin/about',
    color: 'bg-pink-500/10'
  }
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Admin kontrolü
    const checkAdmin = () => {
      const userRole = localStorage.getItem('userRole');
      if (userRole !== 'admin') {
        router.push('/login');
      } else {
        setIsAdmin(true);
      }
    };

    checkAdmin();
  }, [router]);

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Mobil Menü Butonu */}
      <button 
        onClick={() => setSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-primary-purple/30 rounded-lg text-accent-gold"
      >
        <span className="text-xl">☰</span>
      </button>

      {/* Admin Sidebar */}
      <div className={`
        w-64 bg-primary-purple/30 backdrop-blur-md p-6 flex flex-col 
        fixed lg:relative h-screen z-40
        ${isSidebarOpen ? 'left-0' : '-left-64'} 
        lg:left-0 transition-all duration-300
      `}>
        <div className="mb-8 mt-12 lg:mt-0">
          <h1 className="text-2xl font-bold text-accent-gold mb-2">Admin Panel</h1>
          <p className="text-light-purple/70 text-sm">Yönetici Kontrol Paneli</p>
        </div>
        
        <nav className="flex-1 flex flex-col space-y-2">
          {menuItems.map((item, index) => (
            <Link 
              key={index} 
              href={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 p-4 rounded-lg transition-all
                ${pathname === item.path 
                  ? `${item.color} text-accent-gold` 
                  : 'text-light-purple hover:bg-white/5 hover:text-accent-gold'
                }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>

        <div className="pt-6 border-t border-light-purple/20 mt-auto">
          <Link 
            href="/"
            className="flex items-center gap-3 p-3 rounded-lg text-light-purple hover:bg-white/5 hover:text-accent-gold transition-all"
          >
            <span className="text-xl">🏠</span>
            <span>Ana Sayfaya Dön</span>
          </Link>
          <button
            onClick={() => {
              localStorage.removeItem('userRole');
              router.push('/login');
            }}
            className="flex items-center gap-3 p-3 rounded-lg text-red-400 hover:bg-red-400/10 transition-all w-full mt-2"
          >
            <span className="text-xl">🚪</span>
            <span>Çıkış Yap</span>
          </button>
        </div>
      </div>

      {/* Overlay - Mobilde sidebar açıkken arka planı karartır */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Ana İçerik */}
      <div className="flex-1 p-4 lg:p-8 ml-0 lg:ml-64 mt-16 lg:mt-0">
        {children}
      </div>
    </div>
  );
} 
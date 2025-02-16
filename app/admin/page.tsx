'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// İstatistik kartları için tip tanımı
interface Stats {
  totalUsers: number;
  totalTests: number;
  totalForumPosts: number;
  pendingMessages: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalTests: 0,
    totalForumPosts: 0,
    pendingMessages: 0
  });

  useEffect(() => {
    // Mock veriler (daha sonra API'den gelecek)
    setStats({
      totalUsers: 150,
      totalTests: 8,
      totalForumPosts: 45,
      pendingMessages: 12
    });
  }, []);

  return (
    <div className="space-y-12">
      {/* Özet İstatistikler */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card p-6">
          <div className="flex items-center gap-4 mb-2">
            <span className="text-4xl">👥</span>
            <div>
              <h3 className="text-xl font-semibold text-accent-gold">Kullanıcılar</h3>
              <p className="text-3xl text-light-purple">{stats.totalUsers}</p>
            </div>
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center gap-4 mb-2">
            <span className="text-4xl">📊</span>
            <div>
              <h3 className="text-xl font-semibold text-accent-gold">Testler</h3>
              <p className="text-3xl text-light-purple">{stats.totalTests}</p>
            </div>
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center gap-4 mb-2">
            <span className="text-4xl">💬</span>
            <div>
              <h3 className="text-xl font-semibold text-accent-gold">Forum</h3>
              <p className="text-3xl text-light-purple">{stats.totalForumPosts}</p>
            </div>
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center gap-4 mb-2">
            <span className="text-4xl">✉️</span>
            <div>
              <h3 className="text-xl font-semibold text-accent-gold">Mesajlar</h3>
              <p className="text-3xl text-light-purple">{stats.pendingMessages}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Son Aktiviteler */}
      <div className="glass-card p-6">
        <h2 className="text-2xl font-semibold text-accent-gold mb-6">Son Aktiviteler</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-white/5 rounded-lg">
            <div className="flex items-center gap-4">
              <span className="text-2xl">👤</span>
              <div>
                <p className="text-light-purple">Yeni üye kaydı</p>
                <p className="text-sm text-light-purple/70">Ahmet Y.</p>
              </div>
            </div>
            <span className="text-sm text-light-purple/70">2 saat önce</span>
          </div>
          
          <div className="flex justify-between items-center p-4 bg-white/5 rounded-lg">
            <div className="flex items-center gap-4">
              <span className="text-2xl">📝</span>
              <div>
                <p className="text-light-purple">Yeni forum başlığı</p>
                <p className="text-sm text-light-purple/70">Stres Yönetimi Hakkında</p>
              </div>
            </div>
            <span className="text-sm text-light-purple/70">4 saat önce</span>
          </div>
          
          <div className="flex justify-between items-center p-4 bg-white/5 rounded-lg">
            <div className="flex items-center gap-4">
              <span className="text-2xl">📊</span>
              <div>
                <p className="text-light-purple">Yeni test eklendi</p>
                <p className="text-sm text-light-purple/70">Anksiyete Değerlendirme Testi</p>
              </div>
            </div>
            <span className="text-sm text-light-purple/70">6 saat önce</span>
          </div>
        </div>
      </div>
    </div>
  );
} 
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface UserProfile {
  username: string;
  email: string;
  name: string;
  surname: string;
  phone: string;
  role: string;
}

export default function Profile() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    surname: '',
    phone: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Giriş kontrolü
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userRole = localStorage.getItem('userRole');
    const username = localStorage.getItem('username');

    if (!isLoggedIn || !username) {
      router.push('/login');
      return;
    }

    // Kullanıcı bilgilerini getir
    const fetchProfile = async () => {
      try {
        const response = await fetch(`/api/users/${username}`);
        const data = await response.json();

        if (data.success) {
          setProfile(data.user);
          setFormData(prev => ({
            ...prev,
            username: data.user.username,
            name: data.user.name,
            surname: data.user.surname,
            phone: data.user.phone
          }));
        }
      } catch (error) {
        setError('Profil bilgileri alınamadı');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Şifre değişikliği kontrolü
    if (formData.newPassword || formData.currentPassword || formData.confirmPassword) {
      if (formData.newPassword !== formData.confirmPassword) {
        setError('Yeni şifreler eşleşmiyor');
        return;
      }

      if (formData.newPassword) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(formData.newPassword)) {
          setError('Yeni şifre güvenlik kriterlerini karşılamıyor');
          return;
        }
      }
    }

    try {
      const oldUsername = localStorage.getItem('username');
      const response = await fetch('/api/profile/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          oldUsername
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Profil başarıyla güncellendi');
        if (data.user.username !== profile?.username) {
          localStorage.setItem('username', data.user.username);
        }
        setProfile(data.user);
        
        // Form verilerini güncelle
        setFormData(prev => ({
          ...prev,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        }));
      } else {
        setError(data.message || 'Güncelleme sırasında bir hata oluştu');
      }
    } catch (error) {
      setError('Güncelleme sırasında bir hata oluştu');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-primary-purple/10">
        <div id="background-wrapper"></div>
        <main className="container mx-auto px-4 py-8 relative z-10">
          <div className="max-w-md mx-auto">
            <div className="glass-card p-8 rounded-lg">
              <p className="text-center text-light-purple">Yükleniyor...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-purple/10">
      <div id="background-wrapper"></div>
      <main className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-md mx-auto">
          <div className="glass-card p-8 rounded-lg">
            <h1 className="text-3xl font-black mb-8 text-accent-gold tracking-[.25em] uppercase border-b border-accent-gold/10 pb-4">
              Profil Düzenle
            </h1>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-3 rounded mb-4">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-accent-gold font-semibold mb-2">
                  Kullanıcı Adı
                </label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full p-3 rounded-lg bg-primary-purple/20 border border-accent-gold/20 focus:border-accent-gold text-light-purple focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-accent-gold font-semibold mb-2">Ad</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-3 rounded-lg bg-primary-purple/20 border border-accent-gold/20 focus:border-accent-gold text-light-purple focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-accent-gold font-semibold mb-2">Soyad</label>
                  <input
                    type="text"
                    value={formData.surname}
                    onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
                    className="w-full p-3 rounded-lg bg-primary-purple/20 border border-accent-gold/20 focus:border-accent-gold text-light-purple focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-accent-gold font-semibold mb-2">Telefon</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full p-3 rounded-lg bg-primary-purple/20 border border-accent-gold/20 focus:border-accent-gold text-light-purple focus:outline-none"
                />
              </div>

              <div className="border-t border-accent-gold/10 pt-4 mt-6">
                <h2 className="text-xl font-semibold mb-4 text-accent-gold">Şifre Değiştir</h2>
                
                <div>
                  <label className="block text-accent-gold font-semibold mb-2">Mevcut Şifre</label>
                  <input
                    type="password"
                    value={formData.currentPassword}
                    onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                    className="w-full p-3 rounded-lg bg-primary-purple/20 border border-accent-gold/20 focus:border-accent-gold text-light-purple focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-accent-gold font-semibold mb-2">Yeni Şifre</label>
                  <input
                    type="password"
                    value={formData.newPassword}
                    onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                    className="w-full p-3 rounded-lg bg-primary-purple/20 border border-accent-gold/20 focus:border-accent-gold text-light-purple focus:outline-none"
                  />
                  <p className="text-sm text-light-purple/70 mt-1">
                    En az 8 karakter, bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter
                  </p>
                </div>

                <div>
                  <label className="block text-accent-gold font-semibold mb-2">Yeni Şifre Tekrar</label>
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full p-3 rounded-lg bg-primary-purple/20 border border-accent-gold/20 focus:border-accent-gold text-light-purple focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center mt-6">
                <Link
                  href="/"
                  className="text-accent-gold hover:text-dark-gold transition-colors"
                >
                  Ana Sayfaya Dön
                </Link>
                <button
                  type="submit"
                  className="bg-accent-gold text-primary-purple px-6 py-3 rounded-lg hover:bg-dark-gold transition-colors font-semibold"
                >
                  Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
} 
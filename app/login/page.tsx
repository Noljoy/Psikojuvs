'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userRole', data.user.role);
        localStorage.setItem('username', data.user.username);
        
        if (data.user.role === 'admin') {
          router.push('/admin/dashboard');
        } else {
          router.push('/');
        }
      } else {
        setError(data.message || 'Giriş başarısız');
      }
    } catch (error) {
      setError('Giriş sırasında bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary-purple/10">
      <div id="background-wrapper"></div>
      <main className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-md mx-auto">
          <div className="glass-card p-8 rounded-lg">
            <h1 className="text-3xl font-black mb-8 text-accent-gold tracking-[.25em] uppercase border-b border-accent-gold/10 pb-4">
              Giriş Yap
            </h1>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded mb-4">
                {error}
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

              <div>
                <label className="block text-accent-gold font-semibold mb-2">
                  Şifre
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full p-3 rounded-lg bg-primary-purple/20 border border-accent-gold/20 focus:border-accent-gold text-light-purple focus:outline-none"
                  required
                />
              </div>

              <div className="flex justify-between items-center mt-6">
                <Link
                  href="/register"
                  className="text-accent-gold hover:text-dark-gold transition-colors text-sm"
                >
                  Hesabınız yok mu? Kayıt olun
                </Link>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`bg-accent-gold text-primary-purple px-6 py-3 rounded-lg hover:bg-dark-gold transition-colors font-semibold ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
} 
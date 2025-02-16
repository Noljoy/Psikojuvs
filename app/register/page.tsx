'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    kvkkAccepted: false
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!formData.kvkkAccepted) {
      setError('Kişisel verilerin işlenmesi hakkında bilgilendirmeyi kabul etmelisiniz');
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Şifreler eşleşmiyor');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        router.push('/login');
      } else {
        setError(data.message || 'Kayıt başarısız');
      }
    } catch (error) {
      setError('Kayıt sırasında bir hata oluştu');
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
              Kayıt Ol
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
                  E-posta
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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

              <div>
                <label className="block text-accent-gold font-semibold mb-2">
                  Şifre Tekrar
                </label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full p-3 rounded-lg bg-primary-purple/20 border border-accent-gold/20 focus:border-accent-gold text-light-purple focus:outline-none"
                  required
                />
              </div>

              <div className="mt-6 pt-6 border-t border-accent-gold/10">
                <div className="flex items-start mb-4">
                  <input
                    type="checkbox"
                    id="kvkkAccepted"
                    checked={formData.kvkkAccepted}
                    onChange={(e) => setFormData({ ...formData, kvkkAccepted: e.target.checked })}
                    className="mt-1 mr-3"
                    required
                  />
                  <label htmlFor="kvkkAccepted" className="text-light-purple text-sm">
                    <span>Kişisel verilerimin işlenmesine ilişkin </span>
                    <a
                      href="/kvkk"
                      target="_blank"
                      className="text-accent-gold hover:text-dark-gold underline"
                    >
                      Aydınlatma Metni
                    </a>
                    <span>'ni okudum ve kabul ediyorum.</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-between items-center mt-6">
                <Link
                  href="/login"
                  className="text-accent-gold hover:text-dark-gold transition-colors text-sm"
                >
                  Zaten hesabınız var mı? Giriş yapın
                </Link>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`bg-accent-gold text-primary-purple px-6 py-3 rounded-lg hover:bg-dark-gold transition-colors font-semibold ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? 'Kayıt Yapılıyor...' : 'Kayıt Ol'}
                </button>
              </div>
            </form>

            <div className="mt-8 pt-6 border-t border-accent-gold/10">
              <h2 className="text-lg font-semibold text-accent-gold mb-4">Şifre Gereksinimleri</h2>
              <ul className="list-disc list-inside space-y-2 text-light-purple">
                <li>En az 8 karakter uzunluğunda olmalı</li>
                <li>En az bir büyük harf içermeli</li>
                <li>En az bir küçük harf içermeli</li>
                <li>En az bir rakam içermeli</li>
                <li>En az bir özel karakter içermeli (!@#$%^&*)</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 
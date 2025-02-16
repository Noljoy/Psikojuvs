'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewBlogPost() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [userRole, setUserRole] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    image: ''
  });

  const categories = [
    'Stres Yönetimi',
    'Mindfulness',
    'İlişkiler',
    'Anksiyete',
    'Depresyon',
    'Kişisel Gelişim',
    'Terapi Yöntemleri',
    'Çocuk Psikolojisi',
    'Aile Danışmanlığı',
    'Travma ve İyileşme',
    'Özgüven Gelişimi',
    'İş Yaşamı ve Stres',
    'Sosyal İlişkiler',
    'Duygusal Zeka',
    'Uyku ve Ruh Sağlığı'
  ];

  useEffect(() => {
    // Yetki kontrolü
    const storedUserRole = localStorage.getItem('userRole');
    setUserRole(storedUserRole);

    if (!storedUserRole || (storedUserRole !== 'admin' && storedUserRole !== 'moderator')) {
      router.push('/login');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Gerçek uygulamada burada API çağrısı yapılacak
      // Şimdilik sadece console'a yazdırıyoruz
      console.log('Yeni blog yazısı:', formData);
      
      // Başarılı ekleme sonrası ana sayfaya yönlendir
      router.push('/');
    } catch (error) {
      setError('Blog yazısı eklenirken bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  if (!userRole || (userRole !== 'admin' && userRole !== 'moderator')) {
    return null;
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-[#F5E6D3] p-8 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-black text-green-900 tracking-[.25em] uppercase">
              Yeni Blog Yazısı
            </h1>
            <Link
              href="/"
              className="text-green-900 hover:text-green-800"
            >
              Ana Sayfaya Dön
            </Link>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-green-900 font-semibold mb-2">
                Başlık
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full p-3 rounded-lg border border-green-200 focus:outline-none focus:border-green-500"
                required
              />
            </div>

            <div>
              <label className="block text-green-900 font-semibold mb-2">
                Kategori
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full p-3 rounded-lg border border-green-200 focus:outline-none focus:border-green-500"
                required
              >
                <option value="">Kategori Seçin</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-green-900 font-semibold mb-2">
                Görsel URL
              </label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full p-3 rounded-lg border border-green-200 focus:outline-none focus:border-green-500"
                placeholder="https://example.com/image.jpg"
                required
              />
            </div>

            <div>
              <label className="block text-green-900 font-semibold mb-2">
                İçerik
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full p-3 rounded-lg border border-green-200 focus:outline-none focus:border-green-500"
                rows={15}
                required
                placeholder="Blog yazısının içeriğini buraya yazın..."
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className={`bg-green-900 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition-colors ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? 'Ekleniyor...' : 'Yazıyı Yayınla'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
} 
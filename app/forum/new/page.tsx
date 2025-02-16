'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewForumPost() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // API'ye gönder
      const response = await fetch('/api/forum/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          author: localStorage.getItem('username') || 'Anonim',
          createdAt: new Date().toISOString()
        }),
      });

      if (response.ok) {
        alert('Konunuz başarıyla oluşturuldu!');
        router.push('/forum');
      }
    } catch (error) {
      console.error('Konu oluşturulurken hata:', error);
      alert('Bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div id="background-wrapper"></div>
      <div className="max-w-2xl mx-auto relative z-10">
        <h1 className="text-3xl font-semibold text-accent-gold mb-8">Yeni Konu Aç</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-light-purple mb-2">
              Konu Başlığı
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full p-3 rounded-lg bg-white/10 border border-light-purple/20 text-light-purple focus:border-accent-gold focus:outline-none focus:ring-1 focus:ring-accent-gold"
              required
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-light-purple mb-2">
              İçerik
            </label>
            <textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              rows={8}
              className="w-full p-3 rounded-lg bg-white/10 border border-light-purple/20 text-light-purple focus:border-accent-gold focus:outline-none focus:ring-1 focus:ring-accent-gold"
              required
            ></textarea>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="animated-button"
            >
              Konu Aç
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 border-2 border-light-purple text-light-purple rounded-full hover:bg-light-purple/10 transition"
            >
              İptal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 
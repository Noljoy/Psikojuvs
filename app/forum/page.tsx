'use client';

import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface ForumPost {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  answers: ForumAnswer[];
}

interface ForumAnswer {
  id: number;
  content: string;
  author: string;
  isModerator: boolean;
  createdAt: string;
}

export default function Forum() {
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Kullanıcı giriş kontrolü
    const checkLoginStatus = () => {
      const loggedIn = localStorage.getItem('isLoggedIn');
      setIsLoggedIn(!!loggedIn);
      
      // Eğer giriş yapılmamışsa kayıt sayfasına yönlendir
      if (!loggedIn) {
        router.push('/register?redirect=forum');
      }
    };

    checkLoginStatus();

    // Örnek forum gönderileri
    const samplePosts: ForumPost[] = [
      {
        id: 1,
        title: 'Anksiyete ile Başa Çıkma',
        content: 'Son zamanlarda yoğun anksiyete yaşıyorum. Nasıl başa çıkabilirim?',
        author: 'Ayşe',
        createdAt: '2024-03-15',
        answers: [
          {
            id: 1,
            content: 'Düzenli egzersiz ve meditasyon pratikleri anksiyete semptomlarını azaltmada etkili olabilir. Ayrıca profesyonel destek almanızı öneririm.',
            author: 'moderator1',
            isModerator: true,
            createdAt: '2024-03-16'
          }
        ]
      },
      {
        id: 2,
        title: 'Uyku Düzeni Problemi',
        content: 'Geceleri uyumakta zorlanıyorum. Uyku düzenimi nasıl düzenleyebilirim?',
        author: 'Mehmet',
        createdAt: '2024-03-14',
        answers: []
      }
    ];
    setPosts(samplePosts);
  }, [router]);

  // Giriş yapılmamışsa loading veya boş sayfa göster
  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen p-8">
      <div id="background-wrapper"></div>
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-accent-gold">Forum</h1>
          <Link 
            href="/forum/new" 
            className="animated-button"
          >
            Yeni Konu Aç
          </Link>
        </div>

        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="forum-message">
              <Link href={`/forum/${post.id}`}>
                <h2 className="forum-title">{post.title}</h2>
                <p className="forum-text">{post.content}</p>
                <div className="forum-meta">
                  <span>{post.author}</span> • 
                  <span>{post.createdAt}</span> • 
                  <span>{post.answers.length} yanıt</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 
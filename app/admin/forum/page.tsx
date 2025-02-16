'use client';

import { useState } from 'react';

interface ForumPost {
  id: number;
  title: string;
  author: string;
  date: string;
  replies: number;
  status: 'active' | 'locked' | 'deleted';
}

export default function ForumAdmin() {
  const [posts, setPosts] = useState<ForumPost[]>([
    {
      id: 1,
      title: "Anksiyete ile Başa Çıkma Yöntemleri",
      author: "ahmetyilmaz",
      date: "2024-02-17",
      replies: 5,
      status: "active"
    },
    {
      id: 2,
      title: "Stres Yönetimi Hakkında",
      author: "mehmetdemir",
      date: "2024-02-16",
      replies: 3,
      status: "locked"
    }
  ]);

  return (
    <div className="relative z-0">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold text-accent-gold">Forum Yönetimi</h1>
          <div className="flex gap-4">
            <button className="animated-button">
              Yeni Başlık
            </button>
          </div>
        </div>

        <div className="glass-card p-6">
          <table className="w-full">
            <thead>
              <tr className="border-b border-light-purple/20">
                <th className="text-left p-3 text-accent-gold">Başlık</th>
                <th className="text-left p-3 text-accent-gold">Yazar</th>
                <th className="text-left p-3 text-accent-gold">Tarih</th>
                <th className="text-left p-3 text-accent-gold">Yanıtlar</th>
                <th className="text-left p-3 text-accent-gold">Durum</th>
                <th className="text-left p-3 text-accent-gold">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-b border-light-purple/10">
                  <td className="p-3 text-light-purple">{post.title}</td>
                  <td className="p-3 text-light-purple">{post.author}</td>
                  <td className="p-3 text-light-purple">{post.date}</td>
                  <td className="p-3 text-light-purple">{post.replies}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      post.status === 'active' ? 'bg-green-500/20 text-green-400' :
                      post.status === 'locked' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button className="p-2 text-accent-gold hover:bg-accent-gold/10 rounded">
                        Düzenle
                      </button>
                      <button className="p-2 text-yellow-400 hover:bg-yellow-400/10 rounded">
                        Kilitle
                      </button>
                      <button className="p-2 text-red-400 hover:bg-red-400/10 rounded">
                        Sil
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 
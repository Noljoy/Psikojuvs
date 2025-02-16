'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { blogPosts } from '../../data/blogPosts';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPost, setEditedPost] = useState<BlogPost | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    // Yetki kontrolü
    const storedUserRole = localStorage.getItem('userRole');
    if (!storedUserRole || (storedUserRole !== 'admin' && storedUserRole !== 'moderator')) {
      router.push('/login');
      return;
    }
    setUserRole(storedUserRole);
    setPosts(blogPosts);
  }, [router]);

  const handleEdit = (post: BlogPost) => {
    setSelectedPost(post);
    setEditedPost({ ...post });
    setIsEditing(true);
  };

  const handleUpdate = () => {
    if (!editedPost) return;

    // Gerçek uygulamada burada API çağrısı yapılacak
    setPosts(posts.map(post => 
      post.id === editedPost.id ? editedPost : post
    ));
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setIsEditing(false);
    setSelectedPost(null);
    setEditedPost(null);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Bu yazıyı silmek istediğinize emin misiniz?')) {
      // Gerçek uygulamada burada API çağrısı yapılacak
      setPosts(posts.filter(post => post.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-primary-purple/10">
      <div id="background-wrapper"></div>
      <main className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-black text-accent-gold tracking-[.25em] uppercase">
              Yönetici Paneli
            </h1>
            <div className="flex gap-4">
              <Link
                href="/admin/tests"
                className="bg-accent-gold text-primary-purple px-6 py-2 rounded-lg hover:bg-dark-gold transition-colors"
              >
                Test Yönetimi
              </Link>
              <Link
                href="/blog/new"
                className="bg-accent-gold text-primary-purple px-6 py-2 rounded-lg hover:bg-dark-gold transition-colors"
              >
                Yeni Yazı Ekle
              </Link>
              <Link
                href="/"
                className="bg-primary-purple/50 text-light-purple px-6 py-2 rounded-lg hover:bg-primary-purple/70 transition-colors"
              >
                Ana Sayfa
              </Link>
            </div>
          </div>

          {/* Blog Yazıları Listesi */}
          <div className="space-y-6">
            {posts.map((post) => (
              <div key={post.id} className="glass-card p-6 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-accent-gold mb-2">{post.title}</h2>
                    <p className="text-light-purple/80 mb-4">{post.excerpt}</p>
                    <span className="inline-block bg-accent-gold/20 text-accent-gold rounded-full px-3 py-1 text-sm font-semibold border border-accent-gold">
                      {post.category}
                    </span>
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleEdit(post)}
                      className="bg-accent-gold text-primary-purple px-4 py-2 rounded-lg hover:bg-dark-gold transition-colors"
                    >
                      Düzenle
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Sil
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Düzenleme Modalı */}
          {isEditing && editedPost && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="glass-card p-8 rounded-lg max-w-4xl w-full">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-accent-gold">Yazı Düzenle</h2>
                  <button
                    onClick={handleCloseModal}
                    className="text-light-purple hover:text-accent-gold transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-accent-gold font-semibold mb-2">Başlık</label>
                    <input
                      type="text"
                      value={editedPost.title}
                      onChange={(e) => setEditedPost({ ...editedPost, title: e.target.value })}
                      className="w-full p-3 rounded-lg bg-primary-purple/20 border border-accent-gold/20 focus:border-accent-gold text-light-purple focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-accent-gold font-semibold mb-2">Özet</label>
                    <input
                      type="text"
                      value={editedPost.excerpt}
                      onChange={(e) => setEditedPost({ ...editedPost, excerpt: e.target.value })}
                      className="w-full p-3 rounded-lg bg-primary-purple/20 border border-accent-gold/20 focus:border-accent-gold text-light-purple focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-accent-gold font-semibold mb-2">Kategori</label>
                    <input
                      type="text"
                      value={editedPost.category}
                      onChange={(e) => setEditedPost({ ...editedPost, category: e.target.value })}
                      className="w-full p-3 rounded-lg bg-primary-purple/20 border border-accent-gold/20 focus:border-accent-gold text-light-purple focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-accent-gold font-semibold mb-2">Görsel URL</label>
                    <input
                      type="text"
                      value={editedPost.image}
                      onChange={(e) => setEditedPost({ ...editedPost, image: e.target.value })}
                      className="w-full p-3 rounded-lg bg-primary-purple/20 border border-accent-gold/20 focus:border-accent-gold text-light-purple focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-accent-gold font-semibold mb-2">İçerik</label>
                    <textarea
                      value={editedPost.content}
                      onChange={(e) => setEditedPost({ ...editedPost, content: e.target.value })}
                      className="w-full p-3 rounded-lg bg-primary-purple/20 border border-accent-gold/20 focus:border-accent-gold text-light-purple focus:outline-none min-h-[300px]"
                    />
                  </div>
                  <div className="flex justify-end space-x-4 mt-6">
                    <button
                      onClick={handleCloseModal}
                      className="bg-primary-purple/50 text-light-purple px-6 py-2 rounded-lg hover:bg-primary-purple/70 transition-colors"
                    >
                      İptal
                    </button>
                    <button
                      onClick={handleUpdate}
                      className="bg-accent-gold text-primary-purple px-6 py-2 rounded-lg hover:bg-dark-gold transition-colors"
                    >
                      Kaydet
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 
'use client';

import Image from "next/image";
import { useState, useEffect } from "react";
import { blogPosts } from "../../data/blogPosts";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

interface Comment {
  id: number;
  postId: number;
  username: string;
  content: string;
  createdAt: string;
}

export default function BlogPost() {
  const params = useParams();
  const router = useRouter();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [userRole, setUserRole] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedPost, setEditedPost] = useState<any>(null);

  const post = blogPosts.find(post => post.id === parseInt(params.id as string));

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    const storedUsername = localStorage.getItem('username');
    const storedUserRole = localStorage.getItem('userRole');
    setIsLoggedIn(!!storedIsLoggedIn);
    setUsername(storedUsername || '');
    setUserRole(storedUserRole);

    if (post) {
      setEditedPost({ ...post });
    }

    const sampleComments: Comment[] = [
      {
        id: 1,
        postId: parseInt(params.id as string),
        username: "Ayşe",
        content: "Çok faydalı bir yazı olmuş, teşekkürler!",
        createdAt: "2024-02-12"
      },
      {
        id: 2,
        postId: parseInt(params.id as string),
        username: "Mehmet",
        content: "Bu konuda başka kaynak önerebilir misiniz?",
        createdAt: "2024-02-12"
      }
    ];
    setComments(sampleComments);
  }, [params.id, post]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLoggedIn) {
      setError("Yorum yapmak için giriş yapmalısınız");
      return;
    }

    if (!newComment.trim()) {
      setError("Yorum boş olamaz");
      return;
    }

    const newCommentObj: Comment = {
      id: comments.length + 1,
      postId: parseInt(params.id as string),
      username: username,
      content: newComment,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setComments([...comments, newCommentObj]);
    setNewComment("");
    setError("");
  };

  const handleDeleteComment = (commentId: number) => {
    if (window.confirm('Bu yorumu silmek istediğinize emin misiniz?')) {
      setComments(comments.filter(comment => comment.id !== commentId));
    }
  };

  const handleDeletePost = () => {
    if (window.confirm('Bu yazıyı silmek istediğinize emin misiniz?')) {
      router.push('/');
    }
  };

  const handleUpdatePost = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
  };

  const isModerator = userRole === 'moderator' || userRole === 'admin';

  if (isEditing) {
    return (
      <div className="min-h-screen bg-primary-purple/10">
        <div id="background-wrapper"></div>
        <main className="container mx-auto px-4 py-8 relative z-10">
          <form onSubmit={handleUpdatePost} className="max-w-4xl mx-auto glass-card p-8 rounded-lg">
            <div>
              <label className="block text-accent-gold font-semibold mb-2">Başlık</label>
              <input
                type="text"
                value={editedPost.title}
                onChange={(e) => setEditedPost({ ...editedPost, title: e.target.value })}
                className="w-full p-2 rounded-lg bg-primary-purple/20 border border-accent-gold/20 focus:border-accent-gold text-light-purple focus:outline-none"
                required
              />
            </div>

            <div className="mt-4">
              <label className="block text-accent-gold font-semibold mb-2">İçerik</label>
              <textarea
                value={editedPost.content}
                onChange={(e) => setEditedPost({ ...editedPost, content: e.target.value })}
                className="w-full p-4 rounded-lg bg-primary-purple/20 border border-accent-gold/20 focus:border-accent-gold text-light-purple focus:outline-none min-h-[400px]"
                required
              />
            </div>

            <div className="mt-4">
              <label className="block text-accent-gold font-semibold mb-2">Kategori</label>
              <input
                type="text"
                value={editedPost.category}
                onChange={(e) => setEditedPost({ ...editedPost, category: e.target.value })}
                className="w-full p-2 rounded-lg bg-primary-purple/20 border border-accent-gold/20 focus:border-accent-gold text-light-purple focus:outline-none"
                required
              />
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-6 py-2 bg-primary-purple/50 text-light-purple rounded-lg hover:bg-primary-purple/70 transition-colors"
              >
                İptal
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-accent-gold text-primary-purple rounded-lg hover:bg-dark-gold transition-colors"
              >
                Kaydet
              </button>
            </div>
          </form>
        </main>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-primary-purple/10">
        <div id="background-wrapper"></div>
        <main className="container mx-auto px-4 py-8 relative z-10">
          <div className="glass-card p-8 rounded-lg">
            <h1 className="text-3xl font-bold text-accent-gold">Yazı bulunamadı</h1>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-purple/10">
      <div id="background-wrapper"></div>
      <main className="container mx-auto px-4 py-8 relative z-10">
        <article className="max-w-4xl mx-auto">
          {isModerator && (
            <div className="glass-card p-6 rounded-lg mb-8">
              <div className="flex justify-between items-center">
                <Link
                  href="/blog/new"
                  className="bg-accent-gold text-primary-purple px-4 py-2 rounded-lg hover:bg-dark-gold transition-colors"
                >
                  Yeni Yazı Ekle
                </Link>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-accent-gold text-primary-purple px-4 py-2 rounded-lg hover:bg-dark-gold transition-colors"
                  >
                    Düzenle
                  </button>
                  <button
                    onClick={handleDeletePost}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Sil
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="glass-card overflow-hidden rounded-lg mb-8">
            <div className="relative h-96 w-full">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
          
          <div className="glass-card p-8 rounded-lg">
            <h1 className="text-4xl font-bold mb-4 text-accent-gold">{post.title}</h1>
            
            <div className="mb-8">
              <span className="inline-block bg-accent-gold/20 text-accent-gold rounded-full px-3 py-1 text-sm font-semibold border border-accent-gold">
                {post.category}
              </span>
            </div>

            <div className="prose prose-lg max-w-none">
              {post.content.split('\n').map((paragraph, index) => (
                paragraph.trim() && (
                  <p key={index} className="text-light-purple mb-4 leading-relaxed">
                    {paragraph.trim()}
                  </p>
                )
              ))}
            </div>

            {post.content.includes('Kaynakça:') ? null : (
              <div className="mt-12 pt-8 border-t border-accent-gold/20">
                <h2 className="text-2xl font-bold mb-4 text-accent-gold">Kaynakça</h2>
                <ul className="list-disc list-inside text-light-purple/90 space-y-2">
                  <li>American Psychological Association. (2020). Publication Manual of the APA (7th ed.)</li>
                  <li>World Health Organization. (2021). Mental Health and Psychosocial Support</li>
                  <li>Journal of Clinical Psychology (2022). "Latest Developments in Mental Health"</li>
                  <li>International Journal of Psychology (2021). "Evidence-based Practices"</li>
                  <li>Psychology Today Research Papers (2023). "Current Trends in Mental Health"</li>
                </ul>
              </div>
            )}

            {/* Yorumlar Bölümü */}
            <div className="mt-12 pt-8 border-t border-accent-gold/20">
              <h2 className="text-2xl font-bold mb-6 text-accent-gold">Yorumlar</h2>
              
              {/* Yorum Formu */}
              <form onSubmit={handleSubmit} className="mb-8">
                <div className="mb-4">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder={isLoggedIn ? "Yorumunuzu yazın..." : "Yorum yapmak için giriş yapın"}
                    className="w-full p-4 rounded-lg bg-primary-purple/20 border border-accent-gold/20 focus:border-accent-gold text-light-purple placeholder-light-purple/50 focus:outline-none"
                    rows={4}
                    disabled={!isLoggedIn}
                  />
                </div>
                {error && (
                  <p className="text-red-400 mb-4">{error}</p>
                )}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className={`px-6 py-2 rounded-lg text-primary-purple transition-colors ${
                      isLoggedIn 
                        ? "bg-accent-gold hover:bg-dark-gold" 
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                    disabled={!isLoggedIn}
                  >
                    Yorum Yap
                  </button>
                </div>
              </form>

              {/* Yorumlar Listesi */}
              <div className="space-y-6">
                {comments.map((comment) => (
                  <div key={comment.id} className="glass-card p-6 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-accent-gold">{comment.username}</h3>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-light-purple/70">{comment.createdAt}</span>
                        {isModerator && (
                          <button
                            onClick={() => handleDeleteComment(comment.id)}
                            className="text-red-400 hover:text-red-500"
                          >
                            Sil
                          </button>
                        )}
                      </div>
                    </div>
                    <p className="text-light-purple">{comment.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
} 
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Test } from '../../../data/tests';

export default function NewTest() {
  const router = useRouter();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [newTest, setNewTest] = useState<Omit<Test, 'id' | 'createdAt' | 'createdBy'>>({
    title: '',
    description: '',
    questions: [
      {
        id: 1,
        question: '',
        options: [
          { id: 1, text: '', value: 0 },
          { id: 2, text: '', value: 1 },
          { id: 3, text: '', value: 2 },
          { id: 4, text: '', value: 3 },
          { id: 5, text: '', value: 4 }
        ]
      }
    ]
  });

  useEffect(() => {
    const storedUserRole = localStorage.getItem('userRole');
    if (!storedUserRole || (storedUserRole !== 'admin' && storedUserRole !== 'moderator')) {
      router.push('/login');
      return;
    }
    setUserRole(storedUserRole);
  }, [router]);

  const handleAddQuestion = () => {
    setNewTest({
      ...newTest,
      questions: [
        ...newTest.questions,
        {
          id: newTest.questions.length + 1,
          question: '',
          options: [
            { id: 1, text: '', value: 0 },
            { id: 2, text: '', value: 1 },
            { id: 3, text: '', value: 2 },
            { id: 4, text: '', value: 3 },
            { id: 5, text: '', value: 4 }
          ]
        }
      ]
    });
  };

  const handleQuestionChange = (questionId: number, value: string) => {
    setNewTest({
      ...newTest,
      questions: newTest.questions.map(q =>
        q.id === questionId ? { ...q, question: value } : q
      )
    });
  };

  const handleOptionChange = (questionId: number, optionId: number, value: string) => {
    setNewTest({
      ...newTest,
      questions: newTest.questions.map(q =>
        q.id === questionId ? {
          ...q,
          options: q.options.map(o =>
            o.id === optionId ? { ...o, text: value } : o
          )
        } : q
      )
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Gerçek uygulamada burada API çağrısı yapılacak
      const username = localStorage.getItem('username') || '';
      const test: Test = {
        id: Date.now(),
        ...newTest,
        createdBy: username,
        createdAt: new Date().toISOString().split('T')[0]
      };

      console.log('Yeni test:', test);
      router.push('/admin/tests');
    } catch (error) {
      console.error('Test oluşturma hatası:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!userRole) return null;

  return (
    <div className="min-h-screen bg-primary-purple/10">
      <div id="background-wrapper"></div>
      <main className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-8 rounded-lg">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-black text-accent-gold tracking-[.25em] uppercase">
                Yeni Test Ekle
              </h1>
              <Link
                href="/admin/tests"
                className="bg-primary-purple/50 text-light-purple px-6 py-2 rounded-lg hover:bg-primary-purple/70 transition-colors"
              >
                Geri Dön
              </Link>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-accent-gold font-semibold mb-2">
                  Test Başlığı
                </label>
                <input
                  type="text"
                  value={newTest.title}
                  onChange={(e) => setNewTest({ ...newTest, title: e.target.value })}
                  className="w-full p-3 rounded-lg bg-primary-purple/20 border border-accent-gold/20 focus:border-accent-gold text-light-purple focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-accent-gold font-semibold mb-2">
                  Açıklama
                </label>
                <textarea
                  value={newTest.description}
                  onChange={(e) => setNewTest({ ...newTest, description: e.target.value })}
                  className="w-full p-3 rounded-lg bg-primary-purple/20 border border-accent-gold/20 focus:border-accent-gold text-light-purple focus:outline-none min-h-[100px]"
                  required
                />
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-accent-gold">Sorular</h2>
                  <button
                    type="button"
                    onClick={handleAddQuestion}
                    className="bg-accent-gold text-primary-purple px-4 py-2 rounded-lg hover:bg-dark-gold transition-colors"
                  >
                    Soru Ekle
                  </button>
                </div>

                {newTest.questions.map((question, qIndex) => (
                  <div key={question.id} className="glass-card p-4 rounded-lg">
                    <div className="mb-4">
                      <label className="block text-accent-gold font-semibold mb-2">
                        {qIndex + 1}. Soru
                      </label>
                      <input
                        type="text"
                        value={question.question}
                        onChange={(e) => handleQuestionChange(question.id, e.target.value)}
                        className="w-full p-3 rounded-lg bg-primary-purple/20 border border-accent-gold/20 focus:border-accent-gold text-light-purple focus:outline-none"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      {question.options.map((option) => (
                        <div key={option.id} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={option.text}
                            onChange={(e) => handleOptionChange(question.id, option.id, e.target.value)}
                            className="w-full p-2 rounded-lg bg-primary-purple/20 border border-accent-gold/20 focus:border-accent-gold text-light-purple focus:outline-none"
                            placeholder={`${option.id}. Seçenek`}
                            required
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end space-x-4">
                <Link
                  href="/admin/tests"
                  className="bg-primary-purple/50 text-light-purple px-6 py-3 rounded-lg hover:bg-primary-purple/70 transition-colors"
                >
                  İptal
                </Link>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`bg-accent-gold text-primary-purple px-6 py-3 rounded-lg hover:bg-dark-gold transition-colors ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? 'Ekleniyor...' : 'Testi Ekle'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
} 
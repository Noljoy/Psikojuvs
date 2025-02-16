'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

interface Test {
  id: number;
  title: string;
  description: string;
  questions: Question[];
}

export default function TestsAdmin() {
  const router = useRouter();
  const [tests, setTests] = useState<Test[]>([]);
  const [newTest, setNewTest] = useState({
    title: '',
    description: '',
    questions: [] as Question[]
  });
  const [currentQuestion, setCurrentQuestion] = useState({
    text: '',
    options: ['', '', '', ''],
    correctAnswer: 0
  });
  const [showNewTestForm, setShowNewTestForm] = useState(false);

  const handleAddQuestion = () => {
    if (currentQuestion.text && currentQuestion.options.every(opt => opt)) {
      setNewTest({
        ...newTest,
        questions: [
          ...newTest.questions,
          {
            id: newTest.questions.length + 1,
            ...currentQuestion
          }
        ]
      });
      // Soru eklendikten sonra formu temizle
      setCurrentQuestion({
        text: '',
        options: ['', '', '', ''],
        correctAnswer: 0
      });
    } else {
      alert('Lütfen tüm soru alanlarını doldurun.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newTest.questions.length === 0) {
      alert('En az bir soru eklemelisiniz.');
      return;
    }

    try {
      const response = await fetch('/api/admin/tests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newTest,
          id: tests.length + 1
        }),
      });

      if (response.ok) {
        alert('Test başarıyla oluşturuldu!');
        setNewTest({
          title: '',
          description: '',
          questions: []
        });
        router.refresh();
      }
    } catch (error) {
      console.error('Test oluşturulurken hata:', error);
      alert('Bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold text-accent-gold">Test Yönetimi</h1>
        <button
          onClick={() => setShowNewTestForm(true)}
          className="animated-button"
        >
          Yeni Test Ekle
        </button>
      </div>

      {/* Mevcut Testler */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tests.map((test) => (
          <div key={test.id} className="glass-card p-6">
            <h3 className="text-xl font-semibold text-accent-gold mb-2">{test.title}</h3>
            <p className="text-light-purple/80 mb-4">{test.description}</p>
            <div className="text-sm text-light-purple/60">
              {test.questions.length} Soru
            </div>
          </div>
        ))}
      </div>

      {/* Yeni Test Oluşturma Formu */}
      {showNewTestForm && (
        <div className="glass-card p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-accent-gold">Yeni Test Ekle</h2>
            <button
              onClick={() => setShowNewTestForm(false)}
              className="text-light-purple hover:text-accent-gold"
            >
              İptal
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-light-purple mb-2">Test Başlığı</label>
              <input
                type="text"
                value={newTest.title}
                onChange={(e) => setNewTest({...newTest, title: e.target.value})}
                className="w-full p-3 rounded-lg bg-white/10 border border-light-purple/20 text-light-purple"
                required
              />
            </div>

            <div>
              <label className="block text-light-purple mb-2">Test Açıklaması</label>
              <textarea
                value={newTest.description}
                onChange={(e) => setNewTest({...newTest, description: e.target.value})}
                className="w-full h-32 p-3 rounded-lg bg-white/10 border border-light-purple/20 text-light-purple"
                required
              />
            </div>

            {/* Soru Ekleme Bölümü */}
            <div className="border-t border-light-purple/20 pt-6">
              <h3 className="text-xl font-semibold text-accent-gold mb-4">Soru Ekle</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-light-purple mb-2">Soru Metni</label>
                  <input
                    type="text"
                    value={currentQuestion.text}
                    onChange={(e) => setCurrentQuestion({...currentQuestion, text: e.target.value})}
                    className="w-full p-3 rounded-lg bg-white/10 border border-light-purple/20 text-light-purple"
                  />
                </div>

                {currentQuestion.options.map((option, index) => (
                  <div key={index}>
                    <label className="block text-light-purple mb-2">
                      {index + 1}. Seçenek
                      {index === currentQuestion.correctAnswer && ' (Doğru Cevap)'}
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...currentQuestion.options];
                          newOptions[index] = e.target.value;
                          setCurrentQuestion({...currentQuestion, options: newOptions});
                        }}
                        className="flex-1 p-3 rounded-lg bg-white/10 border border-light-purple/20 text-light-purple"
                      />
                      <button
                        type="button"
                        onClick={() => setCurrentQuestion({...currentQuestion, correctAnswer: index})}
                        className={`px-4 py-2 rounded-lg ${
                          index === currentQuestion.correctAnswer
                            ? 'bg-accent-gold text-primary-purple'
                            : 'bg-white/10 text-light-purple'
                        }`}
                      >
                        Doğru Cevap
                      </button>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={handleAddQuestion}
                  className="w-full p-3 border-2 border-accent-gold text-accent-gold rounded-lg hover:bg-accent-gold/10 transition"
                >
                  Soruyu Ekle
                </button>
              </div>
            </div>

            {/* Eklenen Soruların Listesi */}
            {newTest.questions.length > 0 && (
              <div className="border-t border-light-purple/20 pt-6">
                <h3 className="text-xl font-semibold text-accent-gold mb-4">
                  Eklenen Sorular ({newTest.questions.length})
                </h3>
                <div className="space-y-4">
                  {newTest.questions.map((question, index) => (
                    <div key={index} className="p-4 bg-white/5 rounded-lg">
                      <p className="text-light-purple font-semibold mb-2">
                        {index + 1}. {question.text}
                      </p>
                      <div className="pl-4 space-y-1">
                        {question.options.map((option, optIndex) => (
                          <p
                            key={optIndex}
                            className={`text-light-purple/80 ${
                              optIndex === question.correctAnswer ? 'text-accent-gold font-semibold' : ''
                            }`}
                          >
                            {String.fromCharCode(65 + optIndex)}. {option}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              type="submit"
              className="animated-button w-full"
            >
              Testi Oluştur
            </button>
          </form>
        </div>
      )}
    </div>
  );
} 
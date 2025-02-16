'use client';

import { useState } from 'react';
import { tests } from '../data/tests';

export default function Tests() {
  const [selectedTest, setSelectedTest] = useState<number | null>(null);
  const [answers, setAnswers] = useState<{[key: number]: number}>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const handleTestSelect = (testId: number) => {
    setSelectedTest(testId);
    setAnswers({});
    setShowResults(false);
    setScore(0);
  };

  const handleAnswerSelect = (questionId: number, value: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const calculateResults = () => {
    if (!selectedTest) return;

    const test = tests.find(t => t.id === selectedTest);
    if (!test) return;

    const totalScore = Object.values(answers).reduce((sum, value) => sum + value, 0);
    setScore(totalScore);
    setShowResults(true);
  };

  const getResultMessage = () => {
    // Beck Depresyon Testi için sonuç değerlendirmesi
    if (selectedTest === 1) { // Beck Depresyon Testi
      if (score <= 9) return 'Minimal depresyon';
      if (score <= 16) return 'Hafif depresyon';
      if (score <= 29) return 'Orta şiddetli depresyon';
      return 'Şiddetli depresyon';
    }
    return '';
  };

  const selectedTestData = selectedTest ? tests.find(t => t.id === selectedTest) : null;

  return (
    <div className="min-h-screen bg-primary-purple/10">
      <div id="background-wrapper"></div>
      <main className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {!selectedTest ? (
            <>
              <h1 className="text-4xl font-black mb-8 text-accent-gold tracking-[.25em] uppercase text-center">
                Psikolojik Testler
              </h1>
              <div className="grid gap-6">
                {tests.map((test) => (
                  <div
                    key={test.id}
                    className="glass-card p-6 rounded-lg cursor-pointer hover:bg-primary-purple/30 transition-colors"
                    onClick={() => handleTestSelect(test.id)}
                  >
                    <h2 className="text-2xl font-bold text-accent-gold mb-2">{test.title}</h2>
                    <p className="text-light-purple/80">{test.description}</p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="glass-card p-8 rounded-lg">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-accent-gold">{selectedTestData?.title}</h2>
                <button
                  onClick={() => handleTestSelect(0)}
                  className="text-accent-gold hover:text-dark-gold transition-colors"
                >
                  Testlere Dön
                </button>
              </div>

              {!showResults ? (
                <>
                  <div className="space-y-8 mb-8">
                    {selectedTestData?.questions.map((question) => (
                      <div key={question.id} className="glass-card p-6 rounded-lg">
                        <p className="text-light-purple mb-4">{question.question}</p>
                        <div className="space-y-2">
                          {question.options.map((option) => (
                            <label
                              key={option.id}
                              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-primary-purple/20 cursor-pointer transition-colors"
                            >
                              <input
                                type="radio"
                                name={`question-${question.id}`}
                                value={option.value}
                                checked={answers[question.id] === option.value}
                                onChange={() => handleAnswerSelect(question.id, option.value)}
                                className="text-accent-gold focus:ring-accent-gold"
                              />
                              <span className="text-light-purple">{option.text}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={calculateResults}
                    disabled={Object.keys(answers).length !== selectedTestData?.questions.length}
                    className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                      Object.keys(answers).length === selectedTestData?.questions.length
                        ? 'bg-accent-gold text-primary-purple hover:bg-dark-gold'
                        : 'bg-primary-purple/50 text-light-purple cursor-not-allowed'
                    }`}
                  >
                    Sonuçları Göster
                  </button>
                </>
              ) : (
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-accent-gold mb-4">Test Sonucunuz</h3>
                  <p className="text-light-purple mb-2">Toplam Puan: {score}</p>
                  <p className="text-xl text-light-purple mb-6">{getResultMessage()}</p>
                  <p className="text-light-purple/80 mb-8">
                    Bu sonuçlar yalnızca bilgilendirme amaçlıdır ve kesin bir teşhis niteliği taşımaz. 
                    Profesyonel bir değerlendirme için lütfen bir uzmana başvurun.
                  </p>
                  <button
                    onClick={() => handleTestSelect(selectedTest)}
                    className="bg-accent-gold text-primary-purple px-6 py-3 rounded-lg hover:bg-dark-gold transition-colors font-semibold"
                  >
                    Testi Tekrarla
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 
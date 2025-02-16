'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Psychologist {
  id: number;
  name: string;
  title: string;
  bio: string;
  image: string;
}

export default function AdminAbout() {
  // Genel içerik için state
  const [generalContent, setGeneralContent] = useState({
    mainText: 'Psikojuvs olarak, ruh sağlığı alanında profesyonel ve güvenilir hizmet sunmayı amaçlıyoruz.',
    mission: 'Bireylerin ruhsal sağlığını korumak ve geliştirmek için profesyonel, etik ve bilimsel temelli hizmet sunmak.',
    vision: 'Ruh sağlığı alanında öncü, yenilikçi ve güvenilir bir platform olarak, toplumun her kesimine ulaşmak.'
  });

  // Psikologlar için state
  const [psychologists, setPsychologists] = useState<Psychologist[]>([
    {
      id: 1,
      name: 'Dr. Ayşe Yılmaz',
      title: 'Klinik Psikolog',
      bio: 'Uzun yıllar boyunca anksiyete ve depresyon tedavisi üzerine çalışmalar yapmış, deneyimli bir klinik psikolog.',
      image: '/images/team/default-profile.jpg'
    }
  ]);

  // Yeni psikolog ekleme için state
  const [newPsychologist, setNewPsychologist] = useState({
    name: '',
    title: '',
    bio: '',
    image: ''
  });

  // İçerik güncelleme fonksiyonu
  const handleContentUpdate = async () => {
    try {
      // API'ye gönder
      const response = await fetch('/api/admin/about/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(generalContent),
      });

      if (response.ok) {
        alert('İçerik başarıyla güncellendi!');
      }
    } catch (error) {
      alert('Bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  // Psikolog ekleme fonksiyonu
  const handleAddPsychologist = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newId = psychologists.length + 1;
      setPsychologists([...psychologists, { ...newPsychologist, id: newId }]);
      setNewPsychologist({ name: '', title: '', bio: '', image: '' });
      alert('Psikolog başarıyla eklendi!');
    } catch (error) {
      alert('Bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  // Psikolog silme fonksiyonu
  const handleDeletePsychologist = (id: number) => {
    if (window.confirm('Bu psikoloğu silmek istediğinizden emin misiniz?')) {
      setPsychologists(psychologists.filter(p => p.id !== id));
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-semibold text-accent-gold">Hakkımızda Sayfası Düzenleme</h1>

      {/* Genel İçerik Düzenleme */}
      <div className="glass-card p-6">
        <h2 className="text-2xl font-semibold text-accent-gold mb-4">Genel İçerik</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-light-purple mb-2">Ana Metin</label>
            <textarea
              value={generalContent.mainText}
              onChange={(e) => setGeneralContent({...generalContent, mainText: e.target.value})}
              className="w-full h-32 p-3 rounded-lg bg-white/10 border border-light-purple/20 text-light-purple"
            />
          </div>
          <div>
            <label className="block text-light-purple mb-2">Misyonumuz</label>
            <textarea
              value={generalContent.mission}
              onChange={(e) => setGeneralContent({...generalContent, mission: e.target.value})}
              className="w-full h-24 p-3 rounded-lg bg-white/10 border border-light-purple/20 text-light-purple"
            />
          </div>
          <div>
            <label className="block text-light-purple mb-2">Vizyonumuz</label>
            <textarea
              value={generalContent.vision}
              onChange={(e) => setGeneralContent({...generalContent, vision: e.target.value})}
              className="w-full h-24 p-3 rounded-lg bg-white/10 border border-light-purple/20 text-light-purple"
            />
          </div>
          <button
            onClick={handleContentUpdate}
            className="animated-button w-full"
          >
            İçeriği Güncelle
          </button>
        </div>
      </div>

      {/* Psikolog Ekleme Formu */}
      <div className="glass-card p-6">
        <h2 className="text-2xl font-semibold text-accent-gold mb-4">Yeni Psikolog Ekle</h2>
        <form onSubmit={handleAddPsychologist} className="space-y-4">
          <div>
            <label className="block text-light-purple mb-2">İsim</label>
            <input
              type="text"
              value={newPsychologist.name}
              onChange={(e) => setNewPsychologist({...newPsychologist, name: e.target.value})}
              className="w-full p-3 rounded-lg bg-white/10 border border-light-purple/20 text-light-purple"
              required
            />
          </div>
          <div>
            <label className="block text-light-purple mb-2">Unvan</label>
            <input
              type="text"
              value={newPsychologist.title}
              onChange={(e) => setNewPsychologist({...newPsychologist, title: e.target.value})}
              className="w-full p-3 rounded-lg bg-white/10 border border-light-purple/20 text-light-purple"
              required
            />
          </div>
          <div>
            <label className="block text-light-purple mb-2">Biyografi</label>
            <textarea
              value={newPsychologist.bio}
              onChange={(e) => setNewPsychologist({...newPsychologist, bio: e.target.value})}
              className="w-full h-32 p-3 rounded-lg bg-white/10 border border-light-purple/20 text-light-purple"
              required
            />
          </div>
          <div>
            <label className="block text-light-purple mb-2">Fotoğraf</label>
            <div className="flex gap-4 items-center">
              <div className="flex-1">
                <input
                  type="text"
                  value={newPsychologist.image}
                  onChange={(e) => setNewPsychologist({...newPsychologist, image: e.target.value})}
                  placeholder="/images/team/default-profile.jpg"
                  className="w-full p-3 rounded-lg bg-white/10 border border-light-purple/20 text-light-purple"
                  required
                />
                <p className="text-light-purple/60 text-sm mt-1">
                  Görsel yolu örnek: /images/team/fotograf.jpg
                </p>
              </div>
              <div>
                <label className="block px-4 py-2 bg-accent-gold/20 text-accent-gold rounded-lg cursor-pointer hover:bg-accent-gold/30 transition">
                  Fotoğraf Yükle
                  <input 
                    type="file" 
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      // Şimdilik sadece console'a yazdıralım
                      if (e.target.files?.[0]) {
                        console.log('Seçilen dosya:', e.target.files[0].name);
                      }
                    }}
                  />
                </label>
              </div>
            </div>
          </div>
          <button type="submit" className="animated-button w-full">
            Psikolog Ekle
          </button>
        </form>
      </div>

      {/* Mevcut Psikologlar */}
      <div className="glass-card p-6">
        <h2 className="text-2xl font-semibold text-accent-gold mb-4">Mevcut Psikologlar</h2>
        <div className="space-y-4">
          {psychologists.map((psych) => (
            <div key={psych.id} className="flex items-start gap-6 p-4 bg-white/5 rounded-lg">
              <div className="w-32 h-32 rounded-lg overflow-hidden">
                <img
                  src={psych.image}
                  alt={psych.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-accent-gold">{psych.name}</h3>
                <p className="text-light-purple">{psych.title}</p>
                <p className="text-light-purple/80 mt-2">{psych.bio}</p>
              </div>
              <button
                onClick={() => handleDeletePsychologist(psych.id)}
                className="text-red-400 hover:text-red-300"
              >
                Sil
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 
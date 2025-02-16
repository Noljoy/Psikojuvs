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

const psychologists = [
  {
    id: 1,
    name: 'Dr. Ayşe Yılmaz',
    title: 'Klinik Psikolog',
    bio: 'Uzun yıllar boyunca anksiyete ve depresyon tedavisi üzerine çalışmalar yapmış, deneyimli bir klinik psikolog.',
    image: 'https://via.placeholder.com/200' // placeholder görsel
  },
  {
    id: 2,
    name: 'Uzm. Psk. Mehmet Demir',
    title: 'Aile Danışmanı',
    bio: 'Aile ve çift terapisi konusunda uzmanlaşmış, 10 yılı aşkın deneyime sahip bir psikolog.',
    image: 'https://via.placeholder.com/200' // placeholder görsel
  }
];

export default function About() {
  const [aboutContent, setAboutContent] = useState('');

  return (
    <div className="min-h-screen p-8">
      <div id="background-wrapper"></div>
      <div className="max-w-4xl mx-auto relative z-10">
        <h1 className="text-3xl font-semibold text-accent-gold mb-8">Hakkımızda</h1>

        {/* Genel Tanıtım */}
        <div className="glass-card p-6 mb-12">
          <p className="text-light-purple leading-relaxed">
            Psikojuvs olarak, ruh sağlığı alanında profesyonel ve güvenilir hizmet sunmayı amaçlıyoruz. 
            Deneyimli uzman kadromuzla, sizlere en iyi desteği sağlamak için buradayız. 
            Modern terapi yöntemleri ve bilimsel yaklaşımlarla, kişisel gelişiminize katkıda bulunmayı hedefliyoruz.
          </p>
        </div>

        {/* Uzman Kadrosu */}
        <h2 className="text-2xl font-semibold text-accent-gold mb-6">Uzman Kadromuz</h2>
        <div className="space-y-8">
          {psychologists.map((psych) => (
            <div key={psych.id} className="glass-card p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/3">
                  <div className="relative w-full pt-[100%] rounded-lg overflow-hidden">
                    <Image
                      src={psych.image}
                      alt={psych.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="w-full md:w-2/3">
                  <h3 className="text-xl font-semibold text-accent-gold mb-2">{psych.name}</h3>
                  <p className="text-light-purple mb-4">{psych.title}</p>
                  <p className="text-light-purple/80 leading-relaxed">{psych.bio}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Misyon ve Vizyon */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-card p-6">
            <h3 className="text-xl font-semibold text-accent-gold mb-4">Misyonumuz</h3>
            <p className="text-light-purple/80 leading-relaxed">
              Bireylerin ruhsal sağlığını korumak ve geliştirmek için profesyonel, etik ve bilimsel temelli hizmet sunmak.
            </p>
          </div>
          <div className="glass-card p-6">
            <h3 className="text-xl font-semibold text-accent-gold mb-4">Vizyonumuz</h3>
            <p className="text-light-purple/80 leading-relaxed">
              Ruh sağlığı alanında öncü, yenilikçi ve güvenilir bir platform olarak, toplumun her kesimine ulaşmak.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 
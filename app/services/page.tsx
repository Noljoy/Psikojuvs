'use client';

import Link from 'next/link';

export default function Services() {
  return (
    <div className="min-h-screen bg-primary-purple/10">
      <div id="background-wrapper"></div>
      <main className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-8 rounded-lg">
            <h1 className="text-4xl font-black mb-8 text-accent-gold tracking-[.25em] uppercase border-b border-accent-gold/10 pb-4">
              Hizmetlerimiz
            </h1>

            <div className="space-y-8">
              <p className="text-xl text-light-purple/90 leading-relaxed">
                Uzman kadromuz ile bireysel danışmanlık, terapi ve rehberlik hizmetlerinden faydalanabilirsiniz. Stres yönetimi, kaygı, depresyon, ilişkiler veya kişisel gelişim konularında destek almak için hemen randevunuzu oluşturun. Size özel çözümler sunarak, zihinsel iyi oluşunuzu güçlendirmek ve yaşam kalitenizi artırmak için buradayız. İlk adımı atın, sağlıklı bir zihinsel yolculuğa birlikte çıkalım.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-card p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-accent-gold mb-4">Bireysel Danışmanlık</h3>
                  <p className="text-light-purple/80">Size özel, bire bir görüşmelerle profesyonel destek alın.</p>
                </div>

                <div className="glass-card p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-accent-gold mb-4">Terapi Seansları</h3>
                  <p className="text-light-purple/80">Uzman terapistlerimizle düzenli görüşmeler yapın.</p>
                </div>

                <div className="glass-card p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-accent-gold mb-4">Rehberlik Hizmetleri</h3>
                  <p className="text-light-purple/80">Yaşam koçluğu ve kariyer danışmanlığı hizmetleri.</p>
                </div>

                <div className="glass-card p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-accent-gold mb-4">Online Görüşmeler</h3>
                  <p className="text-light-purple/80">Uzaktan erişimle kesintisiz destek alın.</p>
                </div>
              </div>

              <div className="flex justify-center mt-8">
                <Link
                  href="/contact"
                  className="bg-accent-gold text-primary-purple px-8 py-3 rounded-lg hover:bg-dark-gold transition-colors font-semibold"
                >
                  Randevu Al
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 
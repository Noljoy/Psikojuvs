import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "../../app/data/blogPosts";

const categories = [
  'Stres Yönetimi',
  'Mindfulness',
  'İlişkiler',
  'Anksiyete',
  'Depresyon',
  'Kişisel Gelişim',
  'Terapi Yöntemleri',
  'Çocuk Psikolojisi',
  'Aile Danışmanlığı',
  'Travma ve İyileşme',
  'Özgüven Gelişimi',
  'İş Yaşamı ve Stres',
  'Sosyal İlişkiler',
  'Duygusal Zeka',
  'Uyku ve Ruh Sağlığı'
];

export default function Home() {
  return (
    <>
      <div id="background-wrapper"></div>
      <div className="min-h-screen">
        {/* Navigasyon */}
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Menü */}
            <div className="flex space-x-6">
              {[
                { name: 'Anasayfa', path: '/' },
                { name: 'Hakkımızda', path: '/about' },
                { name: 'Hizmetler', path: '/services' },
                { name: 'Blog', path: '/blog' },
                { name: 'İletişim', path: '/contact' }
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className="nav-link"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* Ana İçerik */}
        <main className="container mx-auto px-6 py-16">
          <div className="flex flex-col items-center text-center mb-16">
            <p className="text-xl text-light-purple/80 max-w-2xl mb-8">
              Uzman psikolog ve danışman kadromuzla, zihinsel iyi oluşunuzu destekliyor ve size özel rehberlik sunuyoruz. Bilimsel temellere dayanan yöntemlerle, farkındalık ve içsel dengeyi birlikte keşfedelim.
            </p>
            <div className="flex gap-6">
              <Link href="/login" className="animated-button">
                Giriş Yap
              </Link>
              <Link href="/register" className="px-8 py-3 border-2 border-light-purple text-light-purple rounded-full hover:bg-light-purple/10 transition">
                Kayıt Ol
              </Link>
            </div>
          </div>

          {/* Kategoriler */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <Link 
                key={index} 
                href={`/category/${encodeURIComponent(category)}`} 
                className="block"
              >
                <div className="category-card hover:cursor-pointer">
                  <div className="flex flex-col items-center">
                    <h3 className="text-xl font-semibold mb-4">{category}</h3>
                    <div className="flex justify-center space-x-2">
                      {['01', '02', '03'].map((num) => (
                        <span
                          key={num}
                          className="w-8 h-8 rounded-full bg-accent-gold/20 flex items-center justify-center text-sm text-accent-gold"
                        >
                          {num}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}

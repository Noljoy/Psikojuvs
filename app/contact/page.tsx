'use client';

import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setShowSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });

        // 5 saniye sonra başarı mesajını kaldır
        setTimeout(() => {
          setShowSuccess(false);
        }, 5000);
      } else {
        alert('Mesaj gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
      }
    } catch (error) {
      console.error('Form gönderimi sırasında hata:', error);
      alert('Mesaj gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div id="background-wrapper"></div>
      <div className="max-w-2xl mx-auto relative z-10">
        <h1 className="text-3xl font-semibold text-accent-gold mb-8">Uzmana Sor</h1>
        
        {showSuccess && (
          <div className="bg-green-500/20 border border-green-500/50 text-light-purple p-4 rounded-lg mb-6 animate-fade-in">
            <h3 className="text-xl font-semibold text-accent-gold mb-2">
              Mesajınız Başarıyla Gönderildi!
            </h3>
            <p>
              Değerli danışanımız, mesajınız uzman ekibimize iletilmiştir. 
              En kısa sürede {formData.email} adresinize dönüş yapılacaktır. 
              Bizi tercih ettiğiniz için teşekkür ederiz.
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-light-purple mb-2">
              Adınız
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full p-3 rounded-lg bg-white/10 border border-light-purple/20 text-light-purple focus:border-accent-gold focus:outline-none focus:ring-1 focus:ring-accent-gold"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-light-purple mb-2">
              E-posta Adresiniz
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full p-3 rounded-lg bg-white/10 border border-light-purple/20 text-light-purple focus:border-accent-gold focus:outline-none focus:ring-1 focus:ring-accent-gold"
              required
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-light-purple mb-2">
              Telefon Numaranız
            </label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full p-3 rounded-lg bg-white/10 border border-light-purple/20 text-light-purple focus:border-accent-gold focus:outline-none focus:ring-1 focus:ring-accent-gold"
              required
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-light-purple mb-2">
              Konu
            </label>
            <input
              type="text"
              id="subject"
              value={formData.subject}
              onChange={(e) => setFormData({...formData, subject: e.target.value})}
              className="w-full p-3 rounded-lg bg-white/10 border border-light-purple/20 text-light-purple focus:border-accent-gold focus:outline-none focus:ring-1 focus:ring-accent-gold"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-light-purple mb-2">
              Mesajınız
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              rows={6}
              className="w-full p-3 rounded-lg bg-white/10 border border-light-purple/20 text-light-purple focus:border-accent-gold focus:outline-none focus:ring-1 focus:ring-accent-gold"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="animated-button w-full"
          >
            Gönder
          </button>
        </form>
      </div>
    </div>
  );
} 
import { NextResponse } from 'next/server';

interface User {
  username: string;
  password: string;
  email: string;
  name: string;
  surname: string;
  phone: string;
  role: string;
  isActive: boolean;
}

// Geçici olarak kullanıcıları bellekte tutuyoruz
// Gerçek uygulamada bir veritabanı kullanılmalıdır
let users: User[] = [];

export async function GET(request: Request) {
  try {
    // URL'den username'i al
    const username = request.url.split('/').pop();

    if (!username) {
      return NextResponse.json({
        success: false,
        message: 'Kullanıcı adı belirtilmedi'
      }, { status: 400 });
    }

    // Kullanıcıyı bul
    const user = users.find(u => u.username === username);

    if (!user) {
      return NextResponse.json({
        success: false,
        message: 'Kullanıcı bulunamadı'
      }, { status: 404 });
    }

    // Şifreyi gizleyerek kullanıcı bilgilerini döndür
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      success: true,
      user: userWithoutPassword
    });

  } catch (error) {
    console.error('Kullanıcı bilgileri getirme hatası:', error);
    return NextResponse.json({
      success: false,
      message: 'Kullanıcı bilgileri alınırken bir hata oluştu'
    }, { status: 500 });
  }
} 
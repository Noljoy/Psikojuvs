import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

interface User {
  username: string;
  email: string;
  password: string;
  name: string;
  surname: string;
  phone: string;
  role: string;
  isActive: boolean;
}

// Geçici olarak kullanıcıları bellekte tutuyoruz
// Gerçek uygulamada bir veritabanı kullanılmalıdır
let users: User[] = [];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, email, password, name, surname, phone } = body;

    // Kullanıcı adı veya email kontrolü
    const userExists = users.find(
      user => user.username === username || user.email === email
    );

    if (userExists) {
      return NextResponse.json({
        success: false,
        message: 'Bu kullanıcı adı veya e-posta adresi zaten kullanılıyor'
      }, { status: 400 });
    }

    // Şifreyi hashleme
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Yeni kullanıcı oluştur
    const newUser: User = {
      username,
      email,
      password: hashedPassword,
      name,
      surname,
      phone,
      role: 'user',
      isActive: true
    };

    // Kullanıcıyı kaydet
    users.push(newUser);

    // Şifreyi gizleyerek kullanıcı bilgilerini döndür
    const { password: _, ...userWithoutPassword } = newUser;

    return NextResponse.json({
      success: true,
      message: 'Kayıt başarılı',
      user: userWithoutPassword
    });

  } catch (error) {
    console.error('Kayıt hatası:', error);
    return NextResponse.json({
      success: false,
      message: 'Kayıt sırasında bir hata oluştu'
    }, { status: 500 });
  }
} 
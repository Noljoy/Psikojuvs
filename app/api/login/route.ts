import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

// Admin ve moderatör şifrelerini hashleme
const adminPassword = 'Psikojuvsby2025?';
const moderatorPassword = 'Mod2024!1';

const salt = bcrypt.genSaltSync(10);
const hashedAdminPassword = bcrypt.hashSync(adminPassword, salt);
const hashedModeratorPassword = bcrypt.hashSync(moderatorPassword, salt);

// Geçici olarak kullanıcıları bellekte tutuyoruz
// Gerçek uygulamada bir veritabanı kullanılmalıdır
let users = [
  {
    username: 'psikojuvs',
    password: hashedAdminPassword,
    email: 'psikojuvs@gmail.com',
    name: 'Admin',
    surname: 'User',
    phone: '',
    role: 'admin',
    isActive: true
  },
  {
    username: 'moderator1',
    password: hashedModeratorPassword,
    email: 'moderator1@psikojuvs.com',
    name: 'Moderator',
    surname: 'One',
    phone: '',
    role: 'moderator',
    isActive: true
  }
];

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    // Kullanıcıyı bul
    const user = users.find(u => u.username === username);

    if (!user) {
      return NextResponse.json({
        success: false,
        message: 'Kullanıcı adı veya şifre hatalı'
      }, { status: 401 });
    }

    // Şifre kontrolü
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json({
        success: false,
        message: 'Kullanıcı adı veya şifre hatalı'
      }, { status: 401 });
    }

    if (!user.isActive) {
      return NextResponse.json({
        success: false,
        message: 'Hesabınız devre dışı bırakılmış'
      }, { status: 403 });
    }

    // Şifreyi gizleyerek kullanıcı bilgilerini döndür
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      success: true,
      message: 'Giriş başarılı',
      user: userWithoutPassword
    });

  } catch (error) {
    console.error('Giriş hatası:', error);
    return NextResponse.json({
      success: false,
      message: 'Giriş sırasında bir hata oluştu'
    }, { status: 500 });
  }
} 
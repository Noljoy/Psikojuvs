import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

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

export async function POST(req: Request) {
  try {
    const {
      username: newUsername,
      name,
      surname,
      phone,
      currentPassword,
      newPassword,
      oldUsername // Mevcut kullanıcı adı
    } = await req.json();

    // Kullanıcıyı bul
    const userIndex = users.findIndex(u => u.username === oldUsername);
    if (userIndex === -1) {
      return NextResponse.json({
        success: false,
        message: 'Kullanıcı bulunamadı'
      }, { status: 404 });
    }

    const user = users[userIndex];

    // Kullanıcı adı değişikliği kontrolü
    if (newUsername !== user.username) {
      const usernameExists = users.some(u => u.username === newUsername);
      if (usernameExists) {
        return NextResponse.json({
          success: false,
          message: 'Bu kullanıcı adı zaten kullanılıyor'
        }, { status: 400 });
      }
    }

    // Şifre değişikliği kontrolü
    if (currentPassword && newPassword) {
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return NextResponse.json({
          success: false,
          message: 'Mevcut şifre hatalı'
        }, { status: 400 });
      }

      // Yeni şifreyi hashle
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      user.password = hashedPassword;
    }

    // Kullanıcı bilgilerini güncelle
    const updatedUser = {
      ...user,
      username: newUsername || user.username,
      name: name || user.name,
      surname: surname || user.surname,
      phone: phone || user.phone
    };

    users[userIndex] = updatedUser;

    // Şifreyi gizleyerek kullanıcı bilgilerini döndür
    const { password: _, ...userWithoutPassword } = updatedUser;

    return NextResponse.json({
      success: true,
      message: 'Profil başarıyla güncellendi',
      user: userWithoutPassword
    });

  } catch (error) {
    console.error('Profil güncelleme hatası:', error);
    return NextResponse.json({
      success: false,
      message: 'Profil güncellenirken bir hata oluştu'
    }, { status: 500 });
  }
} 
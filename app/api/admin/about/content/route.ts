import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { content } = await request.json();
    
    // Burada veritabanına kaydetme işlemi yapılacak
    // Şimdilik sadece başarılı yanıt dönüyoruz
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('İçerik güncelleme hatası:', error);
    return NextResponse.json(
      { error: 'İçerik güncellenirken bir hata oluştu' },
      { status: 500 }
    );
  }
} 
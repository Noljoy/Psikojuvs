import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Burada veritabanından psikologları çekme işlemi yapılacak
    const psychologists = [
      {
        id: 1,
        name: 'Dr. Ayşe Yılmaz',
        title: 'Klinik Psikolog',
        bio: 'Uzun yıllar boyunca anksiyete ve depresyon tedavisi üzerine çalışmalar yapmış, deneyimli bir klinik psikolog.',
        image: 'https://via.placeholder.com/200'
      }
    ];
    
    return NextResponse.json({ psychologists });
  } catch (error) {
    return NextResponse.json(
      { error: 'Psikologlar getirilirken bir hata oluştu' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const psychologist = await request.json();
    
    // Burada veritabanına kaydetme işlemi yapılacak
    
    return NextResponse.json({ success: true, psychologist });
  } catch (error) {
    return NextResponse.json(
      { error: 'Psikolog eklenirken bir hata oluştu' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    
    // Burada veritabanından silme işlemi yapılacak
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Psikolog silinirken bir hata oluştu' },
      { status: 500 }
    );
  }
} 
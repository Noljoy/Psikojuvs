import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, email, phone, subject, message } = await req.json();

    // E-posta gönderimi için transporter oluştur
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // E-posta içeriği
    const mailOptions = {
      from: `"${name}" <${email}>`, // Gönderen kişinin adı ve e-postası
      replyTo: email, // Yanıt verilecek e-posta adresi
      to: process.env.RECIPIENT_EMAIL,
      subject: `Yeni İletişim Formu: ${subject}`,
      html: `
        <h2>Yeni İletişim Formu Mesajı</h2>
        <p><strong>Gönderen:</strong> ${name}</p>
        <p><strong>E-posta:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${phone}</p>
        <p><strong>Konu:</strong> ${subject}</p>
        <p><strong>Mesaj:</strong></p>
        <p>${message}</p>
      `
    };

    // E-postayı gönder
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ 
      success: true, 
      message: 'Mesajınız başarıyla gönderildi.' 
    });

  } catch (error) {
    console.error('E-posta gönderimi sırasında hata:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Mesaj gönderilirken bir hata oluştu.' 
    }, { status: 500 });
  }
} 
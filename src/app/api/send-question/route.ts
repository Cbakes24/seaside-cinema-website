import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const formData = await req.json();

    const {
      name,
      email,
      phone,
      subject,
      message,
    } = formData;

    const emailMessage = `
🎥 New Seaside Cinema Booking Request

Full Name: ${name}
Email: ${email}
Phone: ${phone}
Subject: ${subject}
Message: ${message}
    `;

    const { data, error } = await resend.emails.send({
      from: 'Seaside Cinema <booking@seasidecinemas.com>', // or your verified domain
      to: 'seasidecinemasd@gmail.com',
      subject: `Customer Quesiton - ${name}`,
      text: emailMessage,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error }, { status: 500 });
    }
    console.log('Resend data:', data);
    return NextResponse.json({ status: 'success', data });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

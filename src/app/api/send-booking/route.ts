import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const formData = await req.json();

    const {
      fullName,
      email,
      phone,
      date,
      time,
      guestCount,
      style,
      occasion,
      addons,
    } = formData;

    const message = `
🎥 New Seaside Cinema Booking Request

Full Name: ${fullName}
Email: ${email}
Phone: ${phone}
Date: ${date}
Time: ${time}
Guest Count: ${guestCount}
Style: ${style}
Occasion: ${occasion}
Add-ons: ${addons?.join(', ') || 'None'}
    `;

    const { data, error } = await resend.emails.send({
      from: 'Seaside Cinema <onboarding@resend.dev>', // or your verified domain
      to: 'corybaker24@gmail.com',
      subject: `🎟 Booking Request from ${fullName}`,
      text: message,
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

import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const formData = await req.json();
console.log("formDataaaaa Server sideee!!!!", formData);
    const {
      fullName,
      howHeard,
      email,
      phone,
      date,
      time,
      guestCount,
      selectedExperience,
      selectedPackage,
      selectedSeasonalHoliday,
      phoneType,
      addons,
      discountCode,
      discountAmount,
      totalPrice,
    } = formData;

    const message = `
🎥 New Seaside Cinema Booking Request

Full Name: ${fullName}
Email: ${email}
Phone: ${phone}
Date: ${date}
Time: ${time}
Guest Count: ${guestCount}
Experience: ${selectedExperience}
Package: ${selectedPackage}
Seasonal Holiday: ${selectedSeasonalHoliday || 'None'}
Phone Type: ${phoneType}
Add-ons: ${addons?.join(', ') || 'None'}
Discount Code: ${discountCode}
Discount Amount: ${discountAmount}
Total Price: ${totalPrice}

    `;

    const { data, error } = await resend.emails.send({
      from: 'Seaside Cinema <booking@seasidecinemas.com>', // or your verified domain
      to: 'seasidecinemasd@gmail.com',
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

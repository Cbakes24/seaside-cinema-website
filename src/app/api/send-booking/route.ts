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

    // Parse the time to 12-hour format
    const parsedTime = time.replace(/^(\d{2}):(\d{2})$/, (_: string, hours: string, minutes: string) => {
      const hour = parseInt(hours, 10);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const hour12 = hour % 12 || 12;
      return `${hour12}:${minutes} ${ampm}`;
    });

    // Format add-ons as bullet list
    const addonsList = addons?.length > 0 
      ? addons.map((addon: string) => `<li>${addon}</li>`).join('')
      : '<li>None</li>';

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

    const htmlMessage = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Booking Request</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            background-color: #f8f9fa;
        }
        .email-container {
            background-color: #ffffff;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            margin: 20px;
        }
        .header {
            background: linear-gradient(135deg, #38b2ac 0%, #ed8936 100%);
            color: white;
            padding: 30px 20px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 600;
        }
        .header p {
            margin: 10px 0 0 0;
            opacity: 0.9;
            font-size: 16px;
        }
        .content {
            padding: 30px 20px;
        }
        .booking-details {
            background-color: #f8f9fa;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        .section {
            margin-bottom: 25px;
        }
        .section-title {
            color: #38b2ac;
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 15px;
            border-bottom: 2px solid #e2e8f0;
            padding-bottom: 8px;
        }
        .detail-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px 0;
            border-bottom: 1px solid #e2e8f0;
        }
        .detail-row:last-child {
            border-bottom: none;
        }
        .detail-label {
            font-weight: 600;
            color: #4a5568;
            min-width: 120px;
        }
        .detail-value {
            color: #2d3748;
            text-align: right;
            flex: 1;
        }
        .price-section {
            background: linear-gradient(135deg, #38b2ac 0%, #ed8936 100%);
            color: white;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        .price-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 5px 0;
        }
        .total-price {
            font-size: 24px;
            font-weight: 700;
            border-top: 2px solid rgba(255, 255, 255, 0.3);
            padding-top: 10px;
            margin-top: 10px;
        }
        .footer {
            background-color: #2d3748;
            color: white;
            text-align: center;
            padding: 20px;
            font-size: 14px;
        }
        .highlight {
            background-color: #fed7d7;
            color: #c53030;
            padding: 2px 6px;
            border-radius: 4px;
            font-weight: 600;
        }
        .success {
            background-color: #c6f6d5;
            color: #22543d;
            padding: 2px 6px;
            border-radius: 4px;
            font-weight: 600;
        }
        @media (max-width: 600px) {
            .detail-row {
                flex-direction: column;
                align-items: flex-start;
                text-align: left;
            }
            .detail-value {
                text-align: left;
                margin-top: 4px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>🎬 New Booking Request</h1>
            <p>Seaside Cinema Beach Movie Nights</p>
        </div>
        
        <div class="content">
            <div class="section">
                <div class="section-title">👤 Customer Information</div>
                <div class="detail-row">
                    <span class="detail-label">Name:</span>
                    <span class="detail-value">${fullName}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Email:</span>
                    <span class="detail-value">${email}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Phone:</span>
                    <span class="detail-value">${phone} (${phoneType})</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">How Heard:</span>
                    <span class="detail-value">${howHeard}</span>
                </div>
            </div>

            <div class="section">
                <div class="section-title">📅 Event Details</div>
                <div class="detail-row">
                    <span class="detail-label">Date:</span>
                    <span class="detail-value">${date}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Time:</span>
                    <span class="detail-value">${parsedTime}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Guests:</span>
                    <span class="detail-value"><span class="highlight">${guestCount} people</span></span>
                </div>
            </div>

            <div class="section">
                <div class="section-title">🎭 Experience & Package</div>
                <div class="detail-row">
                    <span class="detail-label">Experience:</span>
                    <span class="detail-value">${guestCount} people -- ${selectedExperience}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Package:</span>
                    <span class="detail-value">${selectedPackage || 'None'}</span>
                </div>
                ${selectedSeasonalHoliday ? `
                <div class="detail-row">
                    <span class="detail-label">Holiday Theme:</span>
                    <span class="detail-value">${selectedSeasonalHoliday}</span>
                </div>
                ` : ''}
                <div class="detail-row">
                    <span class="detail-label">Add-ons:</span>
                    <span class="detail-value">
                        <ul style="margin: 0; padding-left: 20px; text-align: left;">
                            ${addonsList}
                        </ul>
                    </span>
                </div>
            </div>

            <div class="price-section">
                <div class="section-title" style="color: white; border-bottom-color: rgba(255,255,255,0.3);">💰 Pricing Summary</div>
                ${discountCode ? `
                <div class="price-row">
                    <span>Discount Code:</span>
                    <span class="success">${discountCode}</span>
                </div>
                <div class="price-row">
                    <span>Discount Amount:</span>
                    <span class="success">-$${discountAmount}</span>
                </div>
                ` : ''}
                <div class="price-row total-price">
                    <span>Total Price:</span>
                    <span>$${totalPrice}</span>
                </div>
            </div>

            <div style="text-align: center; margin-top: 30px; padding: 20px; background-color: #e6fffa; border-radius: 8px; border-left: 4px solid #38b2ac;">
                <p style="margin: 0; color: #2c7a7b; font-weight: 600;">
                    🎉 Ready to create magic! Please review and confirm this booking request.
                </p>
            </div>
        </div>

        <div class="footer">
            <p>Seaside Cinema Beach Movie Nights</p>
            <p>Creating unforgettable beach experiences since 2024</p>
        </div>
    </div>
</body>
</html>
    `;

    const { data, error } = await resend.emails.send({
      from: 'Seaside Cinema <booking@seasidecinemas.com>', // or your verified domain
      to: 'seasidecinemasd@gmail.com',
      subject: `🎟 Booking Request from ${fullName}`,
      html: htmlMessage,
      text: message, // Keep plain text as fallback
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

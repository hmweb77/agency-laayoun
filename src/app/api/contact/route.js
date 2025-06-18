// app/api/contact/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { name, email, phone, businessDescription } = await request.json();

    // Validate required fields
    if (!name || !email || !phone || !businessDescription) {
      return NextResponse.json(
        { error: 'جميع الحقول مطلوبة' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'صيغة الإيميل غير صحيحة' },
        { status: 400 }
      );
    }

    // EmailJS configuration
    const EMAILJS_CONFIG = {
      SERVICE_ID: process.env.EMAILJS_SERVICE_ID,
      TEMPLATE_ID: process.env.EMAILJS_TEMPLATE_ID,
      PUBLIC_KEY: process.env.EMAILJS_PUBLIC_KEY
    };

    // Validate EmailJS configuration
    if (!EMAILJS_CONFIG.SERVICE_ID || !EMAILJS_CONFIG.TEMPLATE_ID || !EMAILJS_CONFIG.PUBLIC_KEY) {
      console.error('Missing EmailJS configuration:', EMAILJS_CONFIG);
      return NextResponse.json(
        { error: 'إعدادات البريد الإلكتروني غير مكتملة' },
        { status: 500 }
      );
    }

    // Prepare template parameters
    const templateParams = {
      from_name: name,
      from_email: email,
      phone: phone,
      business_description: businessDescription,
      to_email: 'hmweb77@gmail.com',
      current_date: new Date().toLocaleDateString('ar-EG', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    console.log('Sending email with params:', templateParams);
    console.log('Using EmailJS config:', {
      service: EMAILJS_CONFIG.SERVICE_ID,
      template: EMAILJS_CONFIG.TEMPLATE_ID,
      publicKey: EMAILJS_CONFIG.PUBLIC_KEY?.substring(0, 8) + '...' // Hide full key in logs
    });

    // Send email using EmailJS REST API (corrected endpoint and payload)
    const emailjsResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: EMAILJS_CONFIG.SERVICE_ID,
        template_id: EMAILJS_CONFIG.TEMPLATE_ID,
        user_id: EMAILJS_CONFIG.PUBLIC_KEY,
        template_params: templateParams
      })
    });

    console.log('EmailJS response status:', emailjsResponse.status);
    console.log('EmailJS response headers:', [...emailjsResponse.headers.entries()]);

    if (!emailjsResponse.ok) {
      const errorText = await emailjsResponse.text();
      console.error('EmailJS error response:', errorText);
      
      let errorMessage = 'حدث خطأ في إرسال الطلب';
      
      if (emailjsResponse.status === 403) {
        errorMessage = 'خطأ في صلاحيات البريد الإلكتروني. تأكد من صحة مفاتيح EmailJS';
      } else if (emailjsResponse.status === 422) {
        errorMessage = 'خطأ في البيانات المرسلة. تأكد من إعدادات EmailJS';
      } else if (emailjsResponse.status === 400) {
        errorMessage = 'خطأ في طلب البريد الإلكتروني. تأكد من صحة المعلومات';
      }
      
      throw new Error(`EmailJS API error: ${emailjsResponse.status} - ${errorText}`);
    }

    const responseData = await emailjsResponse.text();
    console.log('EmailJS success response:', responseData);

    return NextResponse.json(
      { message: 'تم إرسال الطلب بنجاح!' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Email sending error:', error);
    
    // More specific error messages
    let errorMessage = 'حدث خطأ في إرسال الطلب. حاول مرة أخرى';
    
    if (error.message.includes('403')) {
      errorMessage = 'خطأ في صلاحيات البريد الإلكتروني. تأكد من صحة مفاتيح EmailJS';
    } else if (error.message.includes('422')) {
      errorMessage = 'خطأ في إعدادات البريد الإلكتروني. تأكد من صحة المعلومات';
    } else if (error.message.includes('400')) {
      errorMessage = 'خطأ في البيانات المرسلة. تأكد من ملء جميع الحقول بشكل صحيح';
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
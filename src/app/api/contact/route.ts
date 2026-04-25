import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const TO_EMAIL = "noripiton@gmail.com";
const FROM_EMAIL = "contact@resend.dev"; // 独自ドメイン設定後に変更

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, subject, message } = body as {
    name: string;
    email: string;
    subject: string;
    message: string;
  };

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: "必須項目が未入力です" }, { status: 400 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: "メールアドレスの形式が正しくありません" }, { status: 400 });
  }

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `[お問い合わせ] ${subject}`,
      text: `お名前: ${name}\nメール: ${email}\n件名: ${subject}\n\n${message}`,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "送信に失敗しました。時間をおいて再度お試しください。" }, { status: 500 });
  }
}

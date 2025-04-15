import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const allowedOrigins = [
  "http://localhost:3000",
  "https://interviewboostai.site",
];

export async function POST(req: Request) {
  const origin = req.headers.get("origin");

  if (origin && !allowedOrigins.includes(origin)) {
    return new NextResponse("Not allowed by CORS", { status: 403 });
  }

  try {
    const { name, email, message } = await req.json();

    // Create a transporter using SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_APP_PASSWORD,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: process.env.SENDER_EMAIL, // Send to yourself anuragchauhan1923@gmail.com
      subject: `New Contact Form Submission from ${name}`,
      text: `
          Name: ${name}
          Email: ${email}
          Message: ${message}
                `,
                html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}

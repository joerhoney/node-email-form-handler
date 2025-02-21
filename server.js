import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Email transporter setup
const transporter = nodemailer.createTransport({
  host: "smtp.your-email-provider.com",
  port: 587,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post("/send", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.RECIPIENT_EMAIL,
      subject: "New Contact Form Submission",
      text: message,
    });

    res.json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Email failed to send." });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

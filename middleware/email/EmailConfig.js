import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: "lsp7198@gmail.com",
    pass: "xfim qade zzja xjwy",
  },
});

export const sendEmail = async () => {
  try {
    const info = await transporter.sendMail({
    from: '"LSP" <lsp7198@gmail.com>',
    to: "sangimehran1@gmail.com",
    subject: "Hello ✔",
    text: "Hello world?", // plain‑text body
    html: "<b>Hello world?</b>", // HTML body
  });
  console.log(info)
  } catch (error) {
    console.log(error)
  }
}

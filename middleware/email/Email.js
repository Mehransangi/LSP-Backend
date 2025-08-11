import { transporter } from "./EmailConfig.js";
import { Verification_Email_Template } from "./emailTemplete.js";


export const sendVerificationCode = async (email , verificationCode) => {
  try {
    const info = await transporter.sendMail({
        from: '"LSP" <lsp7198@gmail.com>',
        to: email,
        subject: "Verification Code",
        text: "Verify", // plain‑text body
        html: Verification_Email_Template.replace('{verificationCode}', verificationCode), // HTML body
      });
      console.log(info)
  } catch (error) {
    console.log(error)
  }
}

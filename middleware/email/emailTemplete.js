export const Verification_Email_Template = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'>
      <title>Verify Your Email</title>
      <style>
          body {
              font-family: poppins;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
              color: #000000;
          }
          .container {
              max-width: 600px;
              margin: 30px auto;
              background: #ffffff;
              border-radius: 8px;
              box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
              overflow: hidden;
              border: 1px solid #ddd;
          }
          .header {
              background-color: #6896FF;
              color: white;
              padding: 20px;
              text-align: center;
              font-size: 26px;
              font-weight: bold;
          }
          .content {
              padding: 25px;
              color: #333;
              line-height: 1.5;
          }
          .verification-code {
              display: block;
              margin: 20px 0;
              font-size: 24px;
              color: #6896FF;
              background: #EFF3FD;
              border: 1px dashed #4CAF50;
              padding: 10px;
              text-align: center;
              border-radius: 5px;
              font-weight: bold;
              letter-spacing: 2px;
          }
          .footer {
              background-color: #f4f4f4;
              padding: 15px;
              text-align: center;
              color: #777;
              font-size: 12px;
              border-top: 1px solid #ddd;
          }
          p {
              margin: 0 0 15px;
              color: #000000;
              font-size: 14px;
          }
          .note {
              font-weight: bold;
              font-size: 16px;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">Verification of Your Email</div>
          <div class="content">
              <p>Hello,</p>
              <p class="note">Note: This code will expire in 15 minutes, Please Enter this code before the time expires, if the time has execceded the time limit then apply for a new code.</p>
              <p>Please confirm your email address by entering the code below:</p>
              <span class="verification-code">{verificationCode}</span>
              <p>If you did not asked for this code then no further action is required. If you have any questions, feel free to contact our support team.</p>
          </div>
          <div class="footer">
              <p>&copy; ${new Date().getFullYear()}LSP. All rights reserved.</p>
          </div>
      </div>
  </body>
  </html>
`;


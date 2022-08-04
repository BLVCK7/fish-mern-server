import nodemailer from 'nodemailer';

export const sendActivationMail = async (to, link) => {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: false,
    auth: {
      type: 'OAuth2',
      user: process.env.SMTP_USER, // generated ethereal user
      accessToken: process.env.SMTP_ACCESSTOKEN, // generated ethereal password
    },
  });

  transporter.sendMail({
    from: process.env.SMTP_USER,
    to,
    subject: 'Активация аккаунта на' + process.env.API_URL,
    text: '',
    html: ` (
            <div>
              <h1>Для активации перейдите по ссылке</h1>
              <a href="${link}">${link}</a>
            </div>
          )`,
  });
};

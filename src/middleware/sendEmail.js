const nodemailer = require('nodemailer');
const { StatusCodes } = require('http-status-codes');

const sendEmail = async (options) => {
  try {
    let transporter = nodemailer.createTransport({
      service: 'outlook',
      secure: false,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: options.email,
      subject: options.subject,
      html: options.html,
    };

    let mailInfo = await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return error;
      } else {
        console.log(info);
        return res(StatusCodes.OK).json({
          success: true,
        });
      }
    });
  } catch (error) {
    return error;
  }
};
sendEmail();

module.exports = sendEmail;

const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,     
      port: process.env.EMAIL_PORT,
      //service: process.env.EMAIL_SERVER,      
      secure: false,
      auth: {
        user: process.env.EMAIL_USERNAME,       
        pass: process.env.EMAIL_PASSWORD,        
      },
    });

    const mailOptions = {      
      from: process.env.EMAIL_SENDER,      
      to: options.email,      
      subject: options.subject,     
      html: options.html,
    };

    let mailInfo = await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log(info);
      }
    });
  } catch (error) {
    return error;
  }
};
sendEmail();

module.exports = sendEmail;

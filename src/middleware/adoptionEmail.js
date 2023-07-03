const sendGrid = require('@sendgrid/mail');
require('dotenv').config();

const mailer = async (options) => {
  sendGrid.setApiKey(process.env.SENDGRID_API_KEY);

  const message = {
    from: process.env.SENDGRID_VERIFIED_SENDER_IDENTITY,
    to: options.emailTo,
    subject: options.subject,
    text: options.text,
    dynamic_template_data: options.data,
    template_id: 'd-47ab6de80a91445687aefa87162dbe3b',
  };

  try {
    await sendGrid.send(message);
    return { success: true };
  } catch (error) {
    console.log(error);
    console.log(error.response.body.errors);
  }
};

module.exports = mailer;

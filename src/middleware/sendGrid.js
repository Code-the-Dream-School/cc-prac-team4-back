const sendGrid = require('@sendgrid/mail');
const emailTemplate = require('./emailTemplate');

const mailer = async (subject, content, sendTo, copyTo = '', text) => {
  sendGrid.setApiKey(process.env.SENDGRID_API_KEY);

  const SENT_FROM = 'testnata6122023@gmail.com';

  if (text === '') {
    text = undefined;
  }

  const message = {
    to: sendTo,
    from: SENT_FROM,
    subejct,
    cc: copyTo,
    text,
    html: emailTemplate(content),
  };

  try {
    await sendGrid.send(message);
    return { success: true };
  } catch (error) {
    console.error(error);
  }
};

module.exports = mailer;

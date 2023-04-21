const sgMail = require('@sendgrid/mail');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const Handlebars = require('handlebars');

// async..await is not allowed in global scope, must use a wrapper
function main() {
  const to = process.argv[2];
  const templateName = process.argv[3];

  const jsonPath = path.join(__dirname, '..');

  const html = fs.readFileSync(`${jsonPath}/Emails/${templateName}/${templateName}-email.html`, 'utf8');
  const subject = fs.readFileSync(`${jsonPath}/Emails/${templateName}/${templateName}-subject.txt`, 'utf8');
  const data = JSON.parse(fs.readFileSync(`${jsonPath}/Emails/${templateName}/${templateName}-data.json`, 'utf8'));

  const template = Handlebars.compile(html);
  const htmlToSend = template(data);

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to, // Change to your recipient
    from: 'support@carevine.us', // Change to your verified sender
    subject,
    html: htmlToSend,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("\x1b[32m", 'Email sent');
    })
    .catch(error => {
      console.error(error);
    });
}

main()

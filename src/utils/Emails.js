const nodemailer = require("nodemailer");

const emailConfigurationTest = (testAccount) => ({
  host: "smtp.ethereal.email",
  auth: testAccount,
});

const emailConfigurationProduction = {
  host: process.env.EMAIL_HOST,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  },
  secure: true
}

async function emailConfiguration() {
  if (process.env.NODE_ENV === 'production') {
    return emailConfigurationProduction;
  } else {
    const testAccount = await nodemailer.createTestAccount();
    return emailConfigurationTest(testAccount)
  }
}

class Email {
  async sendEmail() {

    const emailConfigurationInstance = await emailConfiguration();
    const transporter = nodemailer.createTransport(emailConfigurationInstance);
    const info = await transporter.sendMail(this);

    if(process.env.NODE_ENV !== 'production') {
      console.log(nodemailer.getTestMessageUrl(info));
    }
  }
}

class RegisterConfirmation extends Email {
  constructor(user, address) {
    super();
    this.from = "'FCamara' <noreply@fcamara.com>";
    this.to = user.email;
    this.subject = "Confirmação de Cadastro";
    this.text = `Olá! Confirme seu cadastro no nosso sistema de agendamento aqui: ${address}`;
    this.html = `<h2>Olá!</h2> Confirme seu cadastro no nosso sistema de agendamento aqui: <a href="${address}">${address}</a>`;
  }
}

module.exports = { RegisterConfirmation };

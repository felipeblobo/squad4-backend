const nodemailer = require("nodemailer");

class Email {
  async sendEmail() {
    const testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      auth: testAccount,
    });
    const info = await transporter.sendMail(this);

    console.log(nodemailer.getTestMessageUrl(info));
  }
}

class RegisterConfirmation extends Email {
  constructor(user, address) {
    super();
    (this.from = "'FCamara' <noreply@fcamara.com>"),
      (this.to = user.email),
      (this.subject = "Confirmação de Cadastro"),
      (this.text = `Olá! Confirme seu cadastro no nosso sistema de agendamento aqui: ${address}`);
    this.html = `<h2>Olá!</h2> Confirme seu cadastro no nosso sistema de agendamento aqui: <a href="${address}">${address}</a>`;
  }
}

module.exports = { RegisterConfirmation };

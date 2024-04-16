"use strict";
const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const { readFile } = require("fs").promises;
const path = require("path");
const moment = require("moment/moment");

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const sendSuccessfulPayment = async ({ customerEmail, totalPrice }) => {
  try {
    const email = process.env.EMAIL;
    const password = process.env.PASSWORD;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: email,
        pass: password,
      },
    });

    //HTML RECEIPT
    const htmlFile = await readFile(
      path.resolve(__dirname, "./template/paymentSuccessfulTemplate.html"),
      {
        encoding: "utf-8",
      }
    );

    const template = handlebars.compile(htmlFile);

    //Actual date
    const now = moment().unix();

    const replacements = {
      totalPrice: currencyFormatter.format(totalPrice),
      now: `${epochToDate(now)}`,
    };

    const htmlToSend = template(replacements);

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: email, // sender address
      to: customerEmail, // list of receivers
      subject: "Recibo de pago G Nerd", // Subject line
      html: htmlToSend, // html body
      attachments: [
        {
          filename: "logo.png",
          path: path.resolve(__dirname, "./template/logo.png"),
          cid: "logo",
        },
      ],
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.log("Error al enviar el correo a: " + error);
  }
};

const epochToDate = (epochDate) => {
  const date = new Date(epochDate * 1000);

  const day = date.toLocaleString("en-US", { day: "numeric" });
  const month = date.toLocaleString("es-MX", { month: "long" });
  const year = date.toLocaleString("en-US", { year: "numeric" });

  return `${day} de ${
    month.charAt(0).toUpperCase() + month.slice(1)
  } del ${year}`;
};

module.exports = {
  sendSuccessfulPayment,
};

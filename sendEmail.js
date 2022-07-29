import nodemailer from "nodemailer";
import { getDatabase } from "./saveEmailToBD.js";
import { reqCurrencyBTC } from "./getRate.js";

export async function sendEmailSubscriptions() {
  let rate = await reqCurrencyBTC();
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email", //
    port: 587,
    auth: {
      user: "daija.prosacco@ethereal.email",
      pass: "HN6MDuuATDqaxGzWsC",
    },
  });

  const users = await getDatabase();
  for (let i = 0; i < users.length; i++) {
    const user = users[i].email;
    console.log("user", user);
    await info(user);
  }

  async function info(user) {
    let status;
    try {
      status = await transporter.sendMail({
        from: '"Btc rate" <daija.prosacco@ethereal.email>',
        to: user, // Test email address
        subject: "I know current BCT currency",
        text: `BTC to UAH is ${rate}`,
        html: `<strong>BTC to UAH is ${rate}</strong>`,
      });
    } catch (err) {
      console.log("Sending error: " + err.message);
    }
    console.log("Message sent: %s", status && status.messageId);
  }
}

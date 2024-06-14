import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import config from "dotenv";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
config.config({ path: path.resolve(__dirname, "../../.env") });
const filePath = path.join(__dirname, "out/shorter.html");
let emailHtml = "";
try {
  emailHtml = fs.readFileSync(filePath, "utf8");
} catch (error) {
  console.error("Failed to read email HTML file:", error);
}
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAILER_LOGIN,
    pass: process.env.EMAILER_PASSWORD,
  },
});

async function sendEmail(to) {
  const options = {
    from: "mitflash56@gmail.com",
    to: "mitflash56@gmail.com",
    subject: "weekly personal newsletter",
    html: emailHtml,
  };
  await transporter.sendMail(options);
}

function send() {
  let emails = [];
  emails = JSON.parse(fs.readFileSync("emails.json", "utf8"));
  for (const email of emails) {
    sendEmail(email);
  }
}

send();

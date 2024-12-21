import { MailtrapClient } from "mailtrap"
import 'dotenv/config'

const TOKEN = process.env.MAILTRAP_API_TOKEN;

export const client = new MailtrapClient({
  token: TOKEN,
});

export const sender = {
  email: "hello@demomailtrap.com",
  name: "QuickFood",
};
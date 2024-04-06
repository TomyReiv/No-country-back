import nodemailer from "nodemailer";
import { GMAIL_PASS, GMAIL_USER } from "../utils/constants";

class EmailService {
    private transporter: any;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: GMAIL_USER,
                pass: GMAIL_PASS
            },
            tls: {
                rejectUnauthorized: false
            }
        });
    }

    sendEmail(from: string, to: string, subject: string, html: string, attachments: any[] = []) {
        return this.transporter.sendMail({
            from: 'aventuracompartida@email.com',
            to,
            subject,
            html,
            attachments
        });
    }
}

export default new EmailService();

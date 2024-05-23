import { Transporter, createTransport, SentMessageInfo } from "nodemailer";
import { Email } from "../../Configs/email";
export abstract class EmailProvider {
    protected transport: Transporter<SentMessageInfo>;
    constructor() {
        this.transport = createTransport({
            host: "smtp.gmail.com",
            port: Email.EMAIL_PORT as number | undefined,
            secure: false,
            auth: {
                user: Email.EMAIL_USER,
                pass: Email.EMAIL_PASSWORD,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });
    }
    abstract sendEmail(data: any): Promise<void>;
}

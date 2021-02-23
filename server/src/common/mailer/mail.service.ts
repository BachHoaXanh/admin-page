import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '../config/config.service';

const configs = new ConfigService('.env');

const USER = configs.get('USER');

@Injectable()
export class MailService {

    constructor(private readonly mailer: MailerService) {}

    private readonly logger = new Logger(MailerService.name);

    /**
     * Send Mail
     *
     * @param to: string
     * @param subject: string
     * @param content: string
     *
     * @return boolean
     */
    send(to: string, subject: string, content: string): void {
        this.mailer.sendMail({
            from: USER,
            to,
            subject,
            html: this.generateBodyContent(subject, content),
        }).then((success) => this.logger.log(success))
            .catch((err) => this.logger.error(err));
    }

    /**
     * Generate Template Body
     *
     * @param content: string
     *
     * @return body: string
     */
    generateBodyContent(subject: string, content: string): string {
        return `<div style="margin: 10px;">
                    <p>${content}</p>
                </div>
                <p style="color: red;">Please contact us if you have any questions.</p>
        `;
    }

}

import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AppService {

    constructor(private readonly mailer: MailerService) {}

    public example() {
        this.mailer.sendMail({
            to: 'lengoctienthanh@gmail.com',
            from: 'ntthom1511@gmail.com',
            subject: 'Testing Nestjs Mailer',
            text: 'aaaaaaaaaaaaaaaaaaaa',
            html: '<b> Welcome </b>b>',
        }).then((success) => {
            console.log(success);
        }).catch((err) => {
            console.log(err);
        });
    }

    getHello(): string {
        return 'Hello World!';
    }

}

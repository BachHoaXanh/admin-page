import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from './common/config/config.service';

const configs = new ConfigService('.env');

const USER = configs.get('USER');

@Injectable()
export class AppService {

    constructor(private readonly mailer: MailerService) {}

    public example() {
        this.mailer.sendMail({
            to: 'ntthom1511@gmail.com',
            from: USER,
            subject: 'Testing Nestjs Mailer',
            html: '<b> Welcome </b>',
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

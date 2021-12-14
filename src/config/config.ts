import dotenv from 'dotenv';
import { resolve } from 'path';

export default class Configurations {
    constructor() {
        dotenv.config({ path: resolve(__dirname, '../../.env') })
    }

    getPort() {
        return process.env.PORT;
    }

    getHost() {
        return process.env.HOST;
    }
    
    getEmail() {
        return {
            // service: process.env.SERVICE_MAIL || '',
            host: process.env.HOST_SMTP_MAIL || '',
            port: 465,
            secure: true,
            auth: {
                user: process.env.USER_MAIL || '',
                pass: process.env.PASS_MAIL || ''
            },
            tls: { rejectUnauthorized: false }
        };
    }

}

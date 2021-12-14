"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = require("path");
class Configurations {
    constructor() {
        dotenv_1.default.config({ path: path_1.resolve(__dirname, '../../.env') });
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
exports.default = Configurations;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mail_controller_1 = require("../controllers/mail.controller");
const router = express_1.Router();
router.route('/').post(mail_controller_1.enviarMail);
exports.default = router;

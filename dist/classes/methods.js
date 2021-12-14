"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const path_1 = __importDefault(require("path"));
const config_1 = __importDefault(require("../config/config"));
// Configuracion
const config = new config_1.default();
class Methods {
    static sendMail(context) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { contact, name, email, phone, subject, message } = context;
                const emailConfig = config.getEmail();
                const scl = 'Solicitud informativa del Cliente';
                const sar = 'Solicitud de asesoría sobre Asuntos regulatorios';
                const sda = 'Solicitud de asesoría sobre Despacho aduanero';
                const sln = 'Solicitud de cotización sobre Logística nacional';
                const sli = 'Solicitud de cotización sobre Logística internacional';
                let tipoContacto = '';
                if (contact == 'cliente') {
                    tipoContacto = scl;
                }
                if (contact == 'asuntos') {
                    tipoContacto = sar;
                }
                if (contact == 'despacho') {
                    tipoContacto = sda;
                }
                if (contact == 'nacional') {
                    tipoContacto = sln;
                }
                if (contact == 'internacional') {
                    tipoContacto = sli;
                }
                // console.log(emailConfig);
                let transporter = nodemailer_1.default.createTransport(emailConfig);
                const imagen1 = path_1.default.join(__dirname, '../public/images/TemplateEmail/Membrete_Fortrading.jpeg');
                const imagen2 = path_1.default.join(__dirname, '../public/images/TemplateEmail/Firma_Fortrading.jpeg');
                const mailOptions = {
                    from: `Cliente - Fortrading <${email}>`,
                    to: emailConfig.auth.user,
                    subject: `Fortrading | ${tipoContacto} - (${subject})`,
                    html: yield this.templateHtml({ contact, name, email, phone, subject, message, tipoContacto }),
                    attachments: [{
                            filename: 'Membrete_Fortrading.jpeg',
                            path: imagen1,
                            cid: 'logoFortrading'
                        }, {
                            filename: 'Firma_Fortrading.jpeg',
                            path: imagen2,
                            cid: 'firmaFortrading'
                        }]
                };
                const { messageId } = yield transporter.sendMail(mailOptions);
                // console.log('Message sent: %s', messageId);
                return resolve(messageId);
            }
            catch (error) {
                // console.log('error', error);
                return reject(error);
            }
        }));
    }
    static templateHtml(context) {
        return new Promise((resolve) => {
            return resolve(`
                <img src="cid:logoFortrading" alt="logoFortrading" style="display:block;width:25%;height:auto;margin-left:0;margin-bottom:10px">

                <h1 style="font-family: 'Roboto', sans-serif; color: #AC221D;">${context.tipoContacto}</h1>
            
                <hr style="width:100%; border-top: 2px solid #AC221D;">

                <h2 style="font-family: 'Roboto', sans-serif; color: #333;">Información de solicitante</h2>
                <ul>
                    <li><strong style="font-family: 'Roboto', sans-serif; font-weight: bold; color: #555; font-size: 20px;">Interesado: </strong></li><p style="font-family: 'Roboto', sans-serif; font-weight: bold; font-size: 18px; font-style: italic; text-align:justify; color: #555;">${context.name}</p>
                    <li><strong style="font-family: 'Roboto', sans-serif; font-weight: bold; color: #555; font-size: 20px;">Correo: </strong></li><p style="font-family: 'Roboto', sans-serif; font-weight: bold; font-size: 18px; font-style: italic; text-align:justify; color: #555;">${context.email}</p>
                    <li><strong style="font-family: 'Roboto', sans-serif; font-weight: bold; color: #555; font-size: 20px;">Teléfono: </strong></li><p style="font-family: 'Roboto', sans-serif; font-size: 18px; font-weight: bold; font-style: italic; text-align:justify; color: #555;">${context.phone}</p>
                </ul>
                <hr style="width:100%; border-top: 2px solid #AC221D;">
                <h2 style="font-family: 'Roboto', sans-serif; color: #333;">Descripción solicitud</h2>
                <p style="font-family: 'Roboto', sans-serif; font-size: 16px; font-weight: bold; font-style: italic; text-align:justify; color: #555;">${context.message}</p>
                
                <hr style="width:100%; border-top: 2px solid #AC221D;">
                
                <span style="font-family: 'Roboto', sans-serif; font-weight: bold; color: #AC221D; font-style: italic; font-weight: bold; text-align:center; padding-top: 50px; padding-bottom: 50px;">&quot;Para nosotros eres importante, nuestro deber es escucharte y atenderte.&quot;</span>
                
                <hr style="width:100%; border-top: 2px solid #AC221D;">
                
                <img src="cid:firmaFortrading" alt="firmaFortrading" style="display:block;width:25%;height:auto;margin-left:0;margin-bottom:10px">
                    
            `);
        });
    }
}
exports.default = Methods;

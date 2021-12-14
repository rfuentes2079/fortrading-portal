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
exports.enviarMail = void 0;
const methods_1 = __importDefault(require("../classes/methods"));
function enviarMail(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Se envia por email la nueva contraseña
            const sentEmail = yield methods_1.default.sendMail(req.body);
            return res.status(200).json({
                ok: true,
                mensaje: sentEmail
            });
        }
        catch (err) {
            return res.status(400).json({
                ok: false,
                mensaje: err
            });
        }
    });
}
exports.enviarMail = enviarMail;

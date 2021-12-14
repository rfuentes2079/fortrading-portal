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
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const index_routes_1 = __importDefault(require("../routes/index.routes"));
const mail_routes_1 = __importDefault(require("../routes/mail.routes"));
const config_1 = __importDefault(require("../config/config"));
const config = new config_1.default();
class Server {
    constructor() {
        this.app = express_1.default();
        this.settings();
        this.cros();
        this.middlewares();
        this.routes();
    }
    settings() {
        this.app.set('port', config.getPort());
    }
    cros() {
        this.app.use(cors_1.default({ origin: true, credentials: true }));
    }
    middlewares() {
        this.app.use(morgan_1.default('dev'));
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.json({ type: 'application/json' }));
        this.app.use(body_parser_1.default.json({ type: 'application/vnd.api+json' }));
        this.app.use(body_parser_1.default.json({ type: 'application/x-www-form-urlencoded' }));
        this.app.use(express_1.default.static(__dirname + '../../public'));
    }
    routes() {
        this.app.use(index_routes_1.default);
        this.app.use('/correo', mail_routes_1.default);
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            this.app.listen(this.app.get('port'));
            //   console.log(`servidor corriendo en el puerto ${this.app.get('port')}`); 
        });
    }
}
exports.default = Server;

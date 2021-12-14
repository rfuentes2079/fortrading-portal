import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cros from 'cors';
import morgan from 'morgan';
import indexRoutes from '../routes/index.routes';
import mailRoutes from '../routes/mail.routes';
import Configurations from '../config/config';

const config = new Configurations();

export default class Server {
    private app: Application;
    constructor() {
        this.app = express();
        this.settings();
        this.cros();
        this.middlewares();
        this.routes();
    }

    settings(){
        this.app.set('port', config.getPort())
    }

    cros() {
        this.app.use(cros({ origin: true, credentials: true }));
    }

    middlewares() {
        this.app.use(morgan('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.json({ type: 'application/json' }));
        this.app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
        this.app.use(bodyParser.json({ type: 'application/x-www-form-urlencoded' }));
        this.app.use(express.static(__dirname + '../../public'));
    }

    routes() {
      this.app.use(indexRoutes);
      this.app.use('/correo', mailRoutes);
    }

    async start() {
      this.app.listen( this.app.get('port'))
    //   console.log(`servidor corriendo en el puerto ${this.app.get('port')}`); 
    }
}

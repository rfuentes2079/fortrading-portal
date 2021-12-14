import { Request, Response } from 'express';
import Methods from '../classes/methods';

export async function enviarMail(req: Request, res: Response): Promise<Response> {
    try {
        // Se envia por email la nueva contraseña
        const sentEmail = await Methods.sendMail(req.body);
        return res.status(200).json({
            ok: true,
            mensaje: sentEmail
        });
    } catch (err) {
        return res.status(400).json({ 
            ok: false,
            mensaje: err
        });
    }

}

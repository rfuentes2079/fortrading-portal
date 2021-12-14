import { Request, Response } from 'express';

export function index(req: Request, res: Response): Response {
    return res.json({
        ok: true,
        message: 'Bienvenido api rest'
    })
}

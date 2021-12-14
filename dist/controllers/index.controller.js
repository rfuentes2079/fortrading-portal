"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.index = void 0;
function index(req, res) {
    return res.json({
        ok: true,
        message: 'Bienvenido api rest'
    });
}
exports.index = index;

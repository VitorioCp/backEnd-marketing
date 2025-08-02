"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
exports.login = login;
exports.verifyToken = verifyToken;
const auth_services_1 = require("../services/auth.services");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
async function register(req, res) {
    const { email, login, password } = req.body;
    if (!email || !login || !password) {
        return res.status(400).json({ error: "Preencha todos os campos" });
    }
    try {
        await (0, auth_services_1.registerUser)(email, login, password);
        res.status(201).json({ message: "Usuário registrado com sucesso" });
    }
    catch (err) {
        res.status(400).json({ error: "Email ou login já está em uso" });
    }
}
async function login(req, res) {
    const { identifier, password } = req.body;
    const result = await (0, auth_services_1.authenticateUser)(identifier, password);
    if (!result) {
        return res.status(401).json({ error: "Credenciais inválidas" });
    }
    res.json({ token: result.token });
}
function verifyToken(req, res) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: "Token não enviado" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, env_1.config.jwtSecret);
        return res.status(200).json({ ok: true, user: decoded });
    }
    catch (error) {
        return res.status(401).json({ error: "Token inválido" });
    }
}

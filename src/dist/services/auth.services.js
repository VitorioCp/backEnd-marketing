"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = registerUser;
exports.authenticateUser = authenticateUser;
const prisma_1 = __importDefault(require("../db/prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
async function registerUser(email, login, password) {
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    try {
        const user = await prisma_1.default.users.create({
            data: {
                email,
                login,
                password: hashedPassword
            }
        });
        return user;
    }
    catch (error) {
        if (error.code === 'P2002') {
            const meta = error.meta?.target;
            if (meta?.includes('email'))
                throw new Error('Email já cadastrado');
            if (meta?.includes('login'))
                throw new Error('Login já existe');
        }
        throw error;
    }
}
async function authenticateUser(identifier, password) {
    const user = await prisma_1.default.users.findFirst({
        where: {
            OR: [
                { email: identifier },
                { login: identifier }
            ]
        }
    });
    if (!user)
        return null;
    const isValid = await bcrypt_1.default.compare(password, user.password);
    if (!isValid)
        return null;
    const token = jsonwebtoken_1.default.sign({
        id: user.id,
        email: user.email,
        login: user.login
    }, env_1.config.jwtSecret, { expiresIn: '1h' });
    const { password: _, ...userWithoutPassword } = user;
    return {
        token,
        user: userWithoutPassword
    };
}

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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
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
function registerUser(email, login, password) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        try {
            const user = yield prisma_1.default.users.create({
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
                const meta = (_a = error.meta) === null || _a === void 0 ? void 0 : _a.target;
                if (meta === null || meta === void 0 ? void 0 : meta.includes('email'))
                    throw new Error('Email já cadastrado');
                if (meta === null || meta === void 0 ? void 0 : meta.includes('login'))
                    throw new Error('Login já existe');
            }
            throw error;
        }
    });
}
function authenticateUser(identifier, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma_1.default.users.findFirst({
            where: {
                OR: [
                    { email: identifier },
                    { login: identifier }
                ]
            }
        });
        if (!user)
            return null;
        const isValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isValid)
            return null;
        const token = jsonwebtoken_1.default.sign({
            id: user.id,
            email: user.email,
            login: user.login
        }, env_1.config.jwtSecret, { expiresIn: '1h' });
        const { password: _ } = user, userWithoutPassword = __rest(user, ["password"]);
        return {
            token,
            user: userWithoutPassword
        };
    });
}

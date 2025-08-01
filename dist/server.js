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
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const courses_routes_1 = __importDefault(require("./routes/courses.routes"));
const env_1 = require("./config/env");
const cors_1 = __importDefault(require("cors"));
const prisma_1 = __importDefault(require("./db/prisma"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express_1.default.json());
app.use("/auth", auth_routes_1.default);
app.use("/courses", courses_routes_1.default);
app.get("/", (req, res) => res.send("API estruturada com REST"));
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield prisma_1.default.$connect();
            console.log("✅ Conexão com o banco estabelecida");
            app.listen(env_1.config.port, () => {
                console.log(`🚀 Servidor rodando em http://localhost:${env_1.config.port}`);
            });
        }
        catch (error) {
            console.error("Erro ao conectar ao banco:", error);
            process.exit(1);
        }
    });
}
startServer();

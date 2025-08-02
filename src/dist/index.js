"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const env_1 = require("./config/env");
const cors_1 = __importDefault(require("cors"));
const prisma_1 = __importDefault(require("./db/prisma"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: ["http://localhost:3000", "https://course-manager-front-end-main.vercel.app"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express_1.default.json());
app.use("/auth", auth_routes_1.default);
app.get("/", (req, res) => {
    res.send("Bem-vindo ao Course Manager API!");
});
async function startServer() {
    try {
        await prisma_1.default.$connect();
        console.log("✅ Conexão com o banco estabelecida");
        app.listen(env_1.config.port, () => {
            console.log(`🚀 Servidor rodando em http://localhost:${env_1.config.port}`);
        });
    }
    catch (error) {
        console.error("Erro ao conectar ao banco:", error);
        process.exit(1);
    }
}
startServer();

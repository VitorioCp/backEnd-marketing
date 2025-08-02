import express from "express";
import authRoutes from "./routes/auth.routes";
import { config } from "./config/env";
import cors from "cors";
import prisma from "./db/prisma";

const app = express();

app.use(
  cors({
    origin: "https://marketin-site-frontend.gtrphk.easypanel.host", // Domínio do seu front-end
    credentials: true, // Permite envio de cookies/headers de auth
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());


app.use(express.json());

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Bem-vindo ao Course Manager API!");
});
async function startServer() {
  try {
    await prisma.$connect();
    console.log("✅ Conexão com o banco estabelecida");

    app.listen(config.port, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${config.port}`);
    });
  } catch (error) {
    console.error("Erro ao conectar ao banco:", error);
    process.exit(1);
  }
}

startServer();

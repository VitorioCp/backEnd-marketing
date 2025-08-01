import express from "express";
import authRoutes from "./routes/auth.routes";
import { config } from "./config/env";
import cors from "cors";
import prisma from "./db/prisma";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000","https://course-manager-front-end-main.vercel.app"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

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
import { Request, Response } from "express";
import { registerUser, authenticateUser } from "../services/auth.services";
import jwt from "jsonwebtoken";
import { config } from "../config/env";

export async function register(req: Request, res: Response) {
  const { email, login, password } = req.body;

  if (!email || !login || !password) {
    return res.status(400).json({ error: "Preencha todos os campos" });
  }

  try {
    await registerUser(email, login, password);
    res.status(201).json({ message: "Usuário registrado com sucesso" });
  } catch (err: any) {
    res.status(400).json({ error: "Email ou login já está em uso" });
  }
}

export async function login(req: Request, res: Response) {
  const { identifier, password } = req.body;

  const result = await authenticateUser(identifier, password);

  if (!result) {
    return res.status(401).json({ error: "Credenciais inválidas" });
  }

  res.json({ token: result.token });
}


export function verifyToken(req: Request, res: Response) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token não enviado" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    return res.status(200).json({ ok: true, user: decoded });
  } catch (error) {
    return res.status(401).json({ error: "Token inválido" });
  }
}
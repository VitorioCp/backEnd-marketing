import prisma from '../db/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../config/env';

export async function registerUser(email: string, login: string, password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  
  try {
    const user = await prisma.users.create({  
      data: {
        email,
        login, 
        password: hashedPassword
      }
    });

    return user;
  } catch (error: any) {  
    if (error.code === 'P2002') {
      const meta = error.meta?.target;
      if (meta?.includes('email')) throw new Error('Email já cadastrado');
      if (meta?.includes('login')) throw new Error('Login já existe');
    }
    throw error;
  }
}

export async function authenticateUser(identifier: string, password: string) {
  const user = await prisma.users.findFirst({ 
    where: {
      OR: [
        { email: identifier },
        { login: identifier }
      ]
    }
  });

  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return null;

  const token = jwt.sign(
    { 
      id: user.id,
      email: user.email,
      login: user.login 
    },
    config.jwtSecret,
    { expiresIn: '1h' }
  );

  const { password: _, ...userWithoutPassword } = user;

  return { 
    token, 
    user: userWithoutPassword 
  };
}
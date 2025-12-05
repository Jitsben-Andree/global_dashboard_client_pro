import prisma from '../lib/prisma.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import { createToken } from '../utils/jwt.js';

export const registerUser = async ({ email, password, name }) => {
  const userFound = await prisma.user.findUnique({ where: { email } });
  if (userFound) throw new Error('El email ya está en uso');

  const passwordHash = await hashPassword(password);

  const newUser = await prisma.user.create({
    data: { email, password: passwordHash, name },
  });

  const token = createToken({ id: newUser.id });
  return { user: { id: newUser.id, email: newUser.email, name: newUser.name }, token };
};

export const loginUser = async ({ email, password }) => {
  const userFound = await prisma.user.findUnique({ where: { email } });
  if (!userFound) throw new Error('Usuario no encontrado');

  const isMatch = await comparePassword(password, userFound.password);
  if (!isMatch) throw new Error('Contraseña incorrecta');

  const token = createToken({ id: userFound.id });
  return { user: { id: userFound.id, email: userFound.email, name: userFound.name }, token };
};
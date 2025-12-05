import * as authService from '../services/auth.service.js';

export const register = async (req, res) => {
  try {
    const { user, token } = await authService.registerUser(req.body);
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.json({ success: true, user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { user, token } = await authService.loginUser(req.body);
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.json({ success: true, user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  res.cookie('token', '', { expires: new Date(0) });
  return res.sendStatus(200);
};

export const verifyToken = async (req, res) => {
    // Endpoint para que el Frontend sepa si el usuario sigue logueado al recargar
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ message: "No autorizado" });
    
    // Aquí podrías validar contra la BD si el usuario aún existe
    res.json({ success: true, user: req.user });
}
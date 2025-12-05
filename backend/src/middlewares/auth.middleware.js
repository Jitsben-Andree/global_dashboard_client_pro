import jwt from 'jsonwebtoken';

export const authRequired = (req, res, next) => {
  try {
    // Buscamos el token en las cookies
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: 'No autorizado, token no encontrado' });
    }

    // Verificamos el token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json({ message: 'Token inválido' });
      
      // Guardamos el usuario decodificado en la petición
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
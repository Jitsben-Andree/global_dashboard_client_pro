// Valida que los datos enviados (req.body) cumplan con el esquema Zod
export const validateSchema = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    return res.status(400).json({ 
      message: 'Error de validación',
      errors: error.errors.map((e) => e.message) 
    });
  }
};
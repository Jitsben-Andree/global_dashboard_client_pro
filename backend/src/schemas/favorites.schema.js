import { z } from 'zod';

// Validación para agregar un favorito
export const addFavoriteSchema = z.object({
  entityType: z.enum(['COUNTRY', 'PROVINCE'], {
    required_error: "El tipo de entidad es requerido (COUNTRY o PROVINCE)",
    invalid_type_error: "El tipo debe ser COUNTRY o PROVINCE"
  }),
  entityId: z.string({
    required_error: "El ID de la entidad es requerido (ej: AR, PE)",
  }).min(1),
  entityName: z.string({
    required_error: "El nombre de la entidad es requerido",
  }).min(1),
});
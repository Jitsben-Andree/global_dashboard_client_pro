import prisma from '../lib/prisma.js';

export const getFavorites = async (req, res) => {
  try {
    const favorites = await prisma.favorite.findMany({
      where: { userId: req.user.id }
    });
    res.json({ success: true, data: favorites });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addFavorite = async (req, res) => {
  try {
    const { entityType, entityId, entityName } = req.body;
    
    // Evitar duplicados
    const existing = await prisma.favorite.findFirst({
      where: { userId: req.user.id, entityId, entityType }
    });

    if(existing) return res.status(400).json({ message: "Ya está en favoritos" });

    const newFav = await prisma.favorite.create({
      data: {
        userId: req.user.id,
        entityType,
        entityId,
        entityName
      }
    });
    res.json({ success: true, data: newFav });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeFavorite = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.favorite.delete({
      where: { id }
    });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const express = require('express');
const FichaSocialModel = require('../models/fichaSocial');
const UserModel = require('../models/user');
const authMiddleware = require('../auth');
const jwt = require('jsonwebtoken');
const config = require('../config');
const app = express();

app.post('/crearficha', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'asistente') {
      return res.status(403).json({ message: 'No tienes permiso para realizar esta acción' });
    }

    const fichaSocialData = req.body;

    fichaSocialData.usuarioId = req.user.userId;

    const usuario = await UserModel.findById(req.user.userId);
    if (usuario) {
      fichaSocialData.direccion = usuario.direccion;
      fichaSocialData.comuna = usuario.comuna;
      fichaSocialData.region = usuario.region;
    }

    const fichaSocial = new FichaSocialModel(fichaSocialData);
    await fichaSocial.save();

    res.status(201).json({ message: 'Ficha social creada exitosamente' });
  } catch (error) {
    res.status(400).json({ message: 'No se pudo crear la ficha social', error: error.message });
  }
});

app.get('/:id', authMiddleware, async (req, res) => {
  try {
    const fichaSocial = await FichaSocialModel.findById(req.params.id);

    if (!fichaSocial) {
      return res.status(404).json({ message: 'Ficha social no encontrada' });
    }

    res.json(fichaSocial);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la ficha social', error: error.message });
  }
});

app.put('/actualizarficha/:id', authMiddleware, async (req, res) => {
    try {
      if (req.user.role !== 'asistente') {
        return res.status(403).json({ message: 'No tienes permiso para realizar esta acción' });
      }
  
      const fichaSocialId = req.params.id;
      const fichaSocialData = req.body;
  
      const usuario = await UserModel.findById(req.user.userId);
  
      if (!usuario) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      if (
        fichaSocialData.direccion !== usuario.direccion ||
        fichaSocialData.comuna !== usuario.comuna ||
        fichaSocialData.region !== usuario.region
      ) {
        return res.status(400).json({ message: 'No puedes cambiar los datos de dirección, comuna o región en la ficha social si no coinciden con los datos del usuario' });
      }
  
      const fichaSocialActualizada = await FichaSocialModel.findByIdAndUpdate(fichaSocialId, fichaSocialData, { new: true });
  
      if (!fichaSocialActualizada) {
        return res.status(404).json({ message: 'Ficha social no encontrada' });
      }
      res.json({ message: 'Ficha social actualizada exitosamente', fichaSocial: fichaSocialActualizada });
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar la ficha social', error: error.message });
    }
  });
  
  app.delete('/eliminarficha/:id', authMiddleware, async (req, res) => {
    try {
      if (req.user.role !== 'asistente') {
        return res.status(403).json({ message: 'No tienes permiso para realizar esta acción' });
      }
  
      const fichaSocialId = req.params.id;
  
      const fichaSocialEliminada = await FichaSocialModel.findByIdAndDelete(fichaSocialId);
  
      if (!fichaSocialEliminada) {
        return res.status(404).json({ message: 'Ficha social no encontrada' });
      }
  
      res.json({ message: 'Ficha social eliminada exitosamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar la ficha social', error: error.message });
    }
  });
  

module.exports = app;

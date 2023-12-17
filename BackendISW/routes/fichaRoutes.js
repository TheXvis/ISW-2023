const express = require('express');
const FichaSocialModel = require('../models/fichaSocial');
const UserModel = require('../models/user');
const authMiddleware = require('../auth');
const jwt = require('jsonwebtoken');
const config = require('../config');
const app = express();

// Ruta para crear una ficha social
app.post('/crearficha', authMiddleware, async (req, res) => {
  try {
    // Asegúrate de que solo los asistentes sociales puedan crear fichas sociales
    if (req.user.role !== 'asistente') {
      return res.status(403).json({ message: 'No tienes permiso para realizar esta acción' });
    }

    // Obtén los datos de la ficha social del cuerpo de la solicitud
    const fichaSocialData = req.body;

    // Asocia la ficha social al asistente social que la está creando
    fichaSocialData.usuarioId = req.user.userId;

    // Autocompletar los campos de dirección, comuna y región con los datos del usuario
    const usuario = await UserModel.findById(req.user.userId);
    if (usuario) {
      fichaSocialData.direccion = usuario.direccion;
      fichaSocialData.comuna = usuario.comuna;
      fichaSocialData.region = usuario.region;
    }
    // Crea una nueva ficha social utilizando el modelo y guarda en la base de datos
    const fichaSocial = new FichaSocialModel(fichaSocialData);
    await fichaSocial.save();

    res.status(201).json({ message: 'Ficha social creada exitosamente' });
  } catch (error) {
    res.status(400).json({ message: 'No se pudo crear la ficha social', error: error.message });
  }
});

// Ruta para obtener una ficha social por su ID
app.get('/:id', authMiddleware, async (req, res) => {
  try {
    // Implementa la lógica para obtener una ficha social por su ID
    // Asegúrate de que solo los asistentes sociales puedan acceder a esta ruta

    // Ejemplo:
    const fichaSocial = await FichaSocialModel.findById(req.params.id);

    if (!fichaSocial) {
      return res.status(404).json({ message: 'Ficha social no encontrada' });
    }

    res.json(fichaSocial);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la ficha social', error: error.message });
  }
});

// Ruta para actualizar una ficha social por su ID
app.put('/actualizarficha/:id', authMiddleware, async (req, res) => {
    try {
      // Asegúrate de que solo los asistentes sociales puedan actualizar fichas sociales
      if (req.user.role !== 'asistente') {
        return res.status(403).json({ message: 'No tienes permiso para realizar esta acción' });
      }
  
      const fichaSocialId = req.params.id;
      const fichaSocialData = req.body;
  

      // Obtén el usuario actual
      const usuario = await UserModel.findById(req.user.userId);
  
      if (!usuario) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      // Verifica si los campos de dirección, comuna y región en la ficha social coinciden con los datos del usuario
      if (
        fichaSocialData.direccion !== usuario.direccion ||
        fichaSocialData.comuna !== usuario.comuna ||
        fichaSocialData.region !== usuario.region
      ) {
        return res.status(400).json({ message: 'No puedes cambiar los datos de dirección, comuna o región en la ficha social si no coinciden con los datos del usuario' });
      }
  
      // Implementa la lógica para actualizar la ficha social utilizando el modelo y el ID
      const fichaSocialActualizada = await FichaSocialModel.findByIdAndUpdate(fichaSocialId, fichaSocialData, { new: true });
  
      if (!fichaSocialActualizada) {
        return res.status(404).json({ message: 'Ficha social no encontrada' });
      }
  
      res.json({ message: 'Ficha social actualizada exitosamente', fichaSocial: fichaSocialActualizada });
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar la ficha social', error: error.message });
    }
  });
  
  // Ruta para eliminar una ficha social por su ID
  app.delete('/eliminarficha/:id', authMiddleware, async (req, res) => {
    try {
      // Asegúrate de que solo los asistentes sociales puedan eliminar fichas sociales
      if (req.user.role !== 'asistente') {
        return res.status(403).json({ message: 'No tienes permiso para realizar esta acción' });
      }
  
      const fichaSocialId = req.params.id;
  
      // Implementa la lógica para eliminar la ficha social utilizando el modelo y el ID
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

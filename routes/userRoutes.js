const UserModel = require('../models/user');
const AsModel = require('../models/as');
const authMiddleware = require('../auth');
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const config = require('../config');

app.post('/create-user', authMiddleware, async (req, res) => {
    const userData = req.body;
  
    try {
      const user = new UserModel(userData);
      await user.save();
      res.status(201).json({ message: 'Usuario creado exitosamente' });
    } catch (error) {
      res.status(400).json({ message: 'No se pudo crear el usuario', error: error.message });
    }
  });

  app.post('/login', async (req, res) => {
    const { rut, password } = req.body;
  
    try {
      const user = await UserModel.findOne({ rut, password });
  
      if (user) {
        const token = jwt.sign({userId: user._id, role: 'user'}, config.secretKey);
        res.json({token, userType: 'user'});
      } else {
        res.status(401).json({ message: 'Credenciales incorrectas' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error en la autenticación', error: error.message });
    }
  });

  app.delete('/delete-user/:_id', async (req, res) => {
    const _id = req.params._id;
    try {
      const user = await UserModel.findOneAndDelete ({ _id });
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      res.json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el usuario', error: error.message });
    }
  });

  app.post('/solicitar-asistencia', authMiddleware, async (req, res) => {
    if (req.user.role !== 'user') {
        return res.status(403).json({ message: 'No tienes permiso para realizar esta acción' });
    }

    const userId = req.user.userId;
    const { comuna } = req.body;

    const user = await UserModel.findById(userId);

    if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const asistenteSocial = await AsModel.findOne({ comuna });

    if (!asistenteSocial) {
        return res.status(404).json({ message: 'No hay asistentes sociales disponibles en tu zona' });
    }

    res.json({ message: 'Estos son los asistentes sociales disponibles en tu zona:', asistenteSocial });
});

// Ruta para actualizar un usuario por su ID
app.put('/update-user/:_id', authMiddleware, async (req, res) => {
  try {
    // Asegúrate de que solo los usuarios puedan actualizar su propio perfil
    if (req.user.role !== 'user') {
      return res.status(403).json({ message: 'No tienes permiso para realizar esta acción' });
    }

    const userId = req.user.userId; // Obtén el ID del usuario desde el token
    const userData = req.body;

    // Verifica que el usuario que desea actualizar sea el mismo que está autenticado
    if (userId !== req.params._id) {
      return res.status(403).json({ message: 'No tienes permiso para actualizar este usuario' });
    }

    // Elimina el atributo "zona" si existe en los datos del usuario
    if ('zona' in userData) {
      delete userData.zona;
    }

    // Implementa la lógica para actualizar el usuario utilizando el modelo y el ID
    const usuarioActualizado = await UserModel.findByIdAndUpdate(userId, userData, { new: true });

    if (!usuarioActualizado) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({ message: 'Usuario actualizado exitosamente', usuario: usuarioActualizado });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el usuario', error: error.message });
  }
});



  module.exports = app;
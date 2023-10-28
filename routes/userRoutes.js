const UserModel = require('../models/user');
const authMiddleware = require('../auth');
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.post('/create-user', async (req, res) => {
    const userData = req.body;
  
    try {
      const user = new UserModel(userData);
      await user.save();
      res.status(201).json({ message: 'Usuario creado exitosamente' });
    } catch (error) {
      res.status(400).json({ message: 'No se pudo crear el usuario', error: error.message });
    }
  });

  app.post('/login-user', async (req, res) => {
    const { rut, password } = req.body;
  
    try {
      const user = await UserModel.findOne({ rut, password });
  
      if (user) {
        res.json({ message: 'Inicio de sesión exitoso como usuario' });
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

  module.exports = app;
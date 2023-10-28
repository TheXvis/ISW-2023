const express = require('express');
const AsModel = require('../models/as');
const authMiddleware = require('../auth');
const jwt = require('jsonwebtoken');
const app = express();

app.post('/create-as', authMiddleware, async (req, res) => {

    if(req.user.role !== 'admin'){
      return res.status(403).json({ message: 'No tienes permiso para realizar esta acción' });
    }
  
    const asistenteSocialData = req.body;
  
    try {
      const asistenteSocial = new AsModel(asistenteSocialData);
      await asistenteSocial.save();
      res.status(201).json({ message: 'Asistente social creado exitosamente' });
    } catch (error) {
      res.status(400).json({ message: 'No se pudo crear el asistente social', error: error.message });
    }
  });
  
app.post('/login-as', async (req, res) => {
    const { rut, password } = req.body;
  
    try {
      const asistenteSocial = await AsModel.findOne({ rut, password });
  
      if (asistenteSocial) {
        res.json({ message: 'Inicio de sesión exitoso como asistente social' });
      } else {
        res.status(401).json({ message: 'Credenciales incorrectas' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error en la autenticación', error: error.message });
    }
});

app.delete('/delete-as/:_id', async (req, res) => {
    const _id = req.params._id;
    try {
      const asistenteSocial = await AsModel.findOneAndDelete ({ _id });
      if (!asistenteSocial) {
        return res.status(404).json({ message: 'Asistente social no encontrado' });
      }
      res.json({ message: 'Asistente social eliminado exitosamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el asistente social', error: error.message });
    }
});

module.exports = app;
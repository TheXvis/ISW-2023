const express = require('express');
const AsModel = require('../models/as');
const UserModel = require('../models/user');
const authMiddleware = require('../auth');
const jwt = require('jsonwebtoken');
const config = require('../config');
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

app.post('/login', async (req, res) => {
    const { _id, password } = req.body;

    try {
      const asistenteSocial = await AsModel.findOne({ _id, password });

      if (asistenteSocial) {
        const token = jwt.sign({userId: asistenteSocial._id, role: 'asistente'}, config.secretKey);
        res.json({token, userType: 'as'});
      } else {
        res.status(401).json({ message: 'Credenciales incorrectas' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error en la autenticación', error: error.message });
    }
});

app.delete('/delete-as/:_id', authMiddleware, async (req, res) => {
  if(req.user.role !== 'admin'){
    return res.status(403).json({ message: 'No tienes permiso para realizar esta acción' });
  }
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

app.post('/as-to-user', authMiddleware, async(req, res) =>{
  try{
    if(req.user.role !== 'asistente'){
      return res.status(403).json({message: 'No tienes permisos para realizar esta acción'});
    }
    const asId = req.user.userId;
    const {userId} = req.body;

    const asistenteSocial = await AsModel.findById(asId);

    if(!asistenteSocial){
      return res.status(404).json({ message: 'Asistente social no encontrado' });
    }

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    if(asistenteSocial.comuna !== user.comuna){
      return res.status(400).json({ message: 'El asistente social no está en la misma zona' });
    }
    
    user.asAsignado = {
      id: asId,
      nombre: asistenteSocial.name,
    };
    await user.save();

    res.json({message: 'Asignacion exitosa'});
  }catch(error){
    res.status(500).json({message: 'Error en la asignacion', error: error.message});
  }
});

app.put('/update-as/:_id', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'No tienes permiso para realizar esta acción' });
  }

  const _id = req.params._id;
  const asistenteSocialData = req.body;

  try {
    const asistenteSocial = await AsModel.findOneAndUpdate({ _id }, asistenteSocialData, { new: true });

    if (!asistenteSocial) {
      return res.status(404).json({ message: 'Asistente social no encontrado' });
    }

    res.json({ message: 'Asistente social actualizado exitosamente', asistenteSocial });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el asistente social', error: error.message });
  }
});


module.exports = app;
const mongoose = require('mongoose');

const ArchivoSchema = new mongoose.Schema({
  nombreOriginal: String,
  formato: String,
  fechaSubida: {
    type: Date,
    default: Date.now
  },
  tamaño: Number,
  rutUsuario: {
    type: String,
    ref: 'User' // Nombre del modelo de usuario
  },
  ruta: String
});

module.exports = mongoose.model('Archivo', ArchivoSchema);
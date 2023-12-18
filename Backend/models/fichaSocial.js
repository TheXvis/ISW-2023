const mongoose = require('mongoose');

const fichaSocialSchema = new mongoose.Schema({
  direccion: String,
  comuna: String,
  region: String,
  integrantes: [
    {
      nombre: String,
      edad: Number,
      parentesco: String,
      menor18: Boolean,
      mayor60: Boolean,
      discapacidad: Boolean,
    }
  ],
  ingresoMensual: Number,
  tramo: String,
  observaciones: String,
  usuarioId: {
    type: String,
    ref: 'User'
  }
});

module.exports = mongoose.model('FichaSocial', fichaSocialSchema);

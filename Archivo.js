const mongoose = require('mongoose');

const ArchivoSchema = new mongoose.Schema({
  nombreOriginal: String,
  formato: String,
  fechaSubida: {
    type: Date,
    default: Date.now
  },
  tamaño: Number,
  rutUser: String,
  ruta: String
});

module.exports = mongoose.model('Archivo', ArchivoSchema);
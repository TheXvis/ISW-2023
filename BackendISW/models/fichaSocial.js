const mongoose = require('mongoose');

const fichaSocialSchema = new mongoose.Schema({
  // Información del domicilio del hogar
  direccion: String,
  comuna: String,
  region: String,
  // Integrantes del hogar
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
  // Ingreso mensual del hogar
  ingresoMensual: Number,
  // Tramo de Calificación Socioeconómica
  tramo: String,
  // Datos complementarios que influyen en la calificación del hogar
  observaciones: String,
  // Usuario al que pertenece esta ficha social
  usuarioId: {
    type: String, // Cambiado a String para que coincida con el _id del usuario
    ref: 'User'  // Haciendo referencia al modelo de usuario
  }
});

module.exports = mongoose.model('FichaSocial', fichaSocialSchema);

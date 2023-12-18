const mongoose = require('mongoose');

const visitationRequestSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    asId: { type: mongoose.Schema.Types.ObjectId, ref: 'AsistenteSocial' },
    nombre: { type: String, required: true }, // Campo para el nombre
    fecha: { type: Date, required: true }, // Campo para la fecha
    hora: { type: String, required: true }, // Campo para la hora (puede ser una cadena)
    rut: { type: String, required: true }, // Campo para el Rut
    telefono: { type: String, required: true }, // Campo para el teléfono
    state: { type: String, enum: ['en revisión', 'aceptado', 'rechazado'], default: 'en revisión' },
});
  
module.exports = mongoose.model('VisitationRequest', visitationRequestSchema);

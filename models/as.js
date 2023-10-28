const mongoose = require('mongoose');

const asSchema = mongoose.Schema({
    _id: {type: String, alias: 'rut' ,required: true, minLength: 9},
    name: {type: String, required: true},
    password: {type: String, required: true},
    telefono: {type: String, required: true},
    correo: {type: String, required: true},
    zona: {type: String, required: true},
    role: {type: String, default: 'asistente', required: true}
  })

const AsModel = mongoose.model('As', asSchema);

module.exports = AsModel;
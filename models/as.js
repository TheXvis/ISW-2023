const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const asSchema = mongoose.Schema({
    _id: {type: String, alias: 'rut' ,required: true, minLength: 9},
    name: {type: String, required: true},
    password: {type: String, required: true},
    telefono: {type: String, required: true},
    correo: {type: String, required: true},
    direccion: {type: String, required: true},
    comuna: {type: String, required: true},
    region: {type: String, required: true},
    role: {type: String, default: 'asistente', required: true}
})

asSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

asSchema.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

const AsModel = mongoose.model('As', asSchema);

module.exports = AsModel;
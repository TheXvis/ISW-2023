const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    _id: {type: String, alias: 'rut' ,required: true, minLength: 9},
    name: {type: String, required: true},
    password: {type: String, required: true},
    telefono: {type: String, required: true},
    sueldo: {type: String, required: true},
    direccion: {type: String, required: true},
    comuna: {type: String, required: true},
    region: {type: String, required: true},
    ocupacion: {type: String, required: true},
    nacimiento: {type: String, required: true},
    role: {type: String, default: 'user', required: true},
    asAsignado:{id: String, nombre: String}
})

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.password);
};


const UserModel = mongoose.model('User', userSchema);

module.exports =  UserModel;
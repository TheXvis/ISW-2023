const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: {type: String, alias: 'rut' ,required: true, minLength: 9},
    name: {type: String, required: true},
    password: {type: String, required: true},
    telefono: {type: String, required: true},
    sueldo: {type: String, required: true},
    role: {type: String, default: 'user', required: true}
  })
const UserModel = mongoose.model('User', userSchema);

module.exports =  UserModel;
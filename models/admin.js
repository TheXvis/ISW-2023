const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
  _id: {type: String, alias: 'rut' ,required: true, minLength: 9},
  name: {type: String, required: true},
  password: {type: String, required: true},
  correo: {type: String, required: true},
  role: {type: String, default: 'admin', required: true}
})


const AdminModel = mongoose.model('Admin', adminSchema);

module.exports = AdminModel;
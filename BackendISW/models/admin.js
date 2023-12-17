const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const adminSchema = mongoose.Schema({
  _id: {type: String, alias: 'rut' ,required: true, minLength: 9},
  name: {type: String, required: true},
  password: {type: String, required: true},
  correo: {type: String, required: true},
  role: {type: String, default: 'admin', required: true}
})

adminSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

adminSchema.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

const AdminModel = mongoose.model('Admin', adminSchema);

module.exports = AdminModel;
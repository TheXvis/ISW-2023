const bcrypt = require('bcrypt');
const AdminModel = require('./models/admin');
const saltRounds = 10;
const mongoose = require('mongoose');
const UserModel = require('./models/user');
const AsModel = require('./models/as');

mongoose.connect('mongodb+srv://CharlyISW:proyectoisw@iswbdd.zytwiz1.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

AsModel.find().then(users => {
  users.forEach(user => {
    bcrypt.hash(user.password, saltRounds, (err, hash) => {
      if (err) {
        console.error(err);
        return;
      }

      AsModel.updateOne({ _id: user._id }, { password: hash })
        .then(() => console.log(`Updated password for user ${user._id}`))
        .catch(err => console.error(err));
    });
  });
});
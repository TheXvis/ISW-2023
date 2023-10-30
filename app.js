const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const auth = require('./auth');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://CharlyISW:proyectoisw@iswbdd.zytwiz1.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const UserModel = require('./models/user');
const AsModel = require('./models/as');
const AdminModel = require('./models/admin');
const FichaSocialModel = require('./models/fichaSocial');

const AdminRoutes = require('./routes/adminRoutes');
const UserRoutes = require('./routes/userRoutes');
const AsRoutes = require('./routes/asRoutes');
const FichaRoutes = require('./routes/fichaRoutes');

app.use('/ficha', FichaRoutes);
app.use('/admin', AdminRoutes);
app.use('/user', UserRoutes);
app.use('/as', AsRoutes);


app.get('/user-users', async (req, res) => {
    try {
      const userUsers = await UserModel.find();
      res.json(userUsers);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener usuarios normales', error: error.message });
    }
  });
  
  app.get('/as-users', async (req, res) => {
    try {
      const asUsers = await AsModel.find();
      res.json(asUsers);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener asistentes sociales', error: error.message });
    }
});
  
app.get('/admin-users', async (req, res) => {
    try {
      const adminUsers = await AdminModel.find();
      res.json(adminUsers);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener administradores', error: error.message });
    }
});

// Ruta para obtener una lista de todas las fichas sociales
app.get('/fichas', async (req, res) => {
  try {
    const fichasSociales = await FichaSocialModel.find();
    res.json(fichasSociales);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la lista de fichas sociales', error: error.message });
  }
});


app.listen(80, () => {
    console.log('Servidor en funcionamiento en el puerto 80');
});

const visitationRequestRoutes = require('./routes/visitationRequestRoutes');

app.use('/visitation-requests', visitationRequestRoutes);

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const auth = require('./auth');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const config = require('./config');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://CharlyISW:proyectoisw@iswbdd.zytwiz1.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const UserModel = require('./models/user');
const AsModel = require('./models/as');
const AdminModel = require('./models/admin');
const ArchivoModel = require('./models/Archivo');
const FichaSocialModel = require('./models/fichaSocial');

const AdminRoutes = require('./routes/adminRoutes');
const UserRoutes = require('./routes/userRoutes');
const AsRoutes = require('./routes/asRoutes');
const FichaRoutes = require('./routes/fichaRoutes');
const archivos = require('./routes/archivos');

app.use(cors());

app.use('/ficha', FichaRoutes);
app.use('/admin', AdminRoutes);
app.use('/user', UserRoutes);
app.use('/as', AsRoutes);
app.use('/documentos', archivos);


app.post('/login', async (req, res) => {
  const { _id, password } = req.body;


  const user = await UserModel.findOne({ _id }) || await AdminModel.findOne({ _id }) || await AsModel.findOne({ _id });

  if (!user) {
    return res.status(401).json({ message: 'Credenciales incorrectas' });
  }

  const userType = user instanceof AdminModel 
  ? 'admin' 
  : user instanceof UserModel 
    ? 'user' 
    : user instanceof AsModel 
      ? 'as'
      : 'unknown';

  const token = jwt.sign({ userId: user._id, role: userType }, config.secretKey);
  res.json({ token, userType });
});


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

app.get('/comunas', async (req, res) => {
  try {
      const result = await AsModel.find().distinct('comuna');
      res.json(result);
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error en encontrar comunas' });
  }
});

app.listen(80, () => {
    console.log('Servidor en funcionamiento en el puerto 80');
});

const visitationRequestRoutes = require('./routes/visitationRequestRoutes');
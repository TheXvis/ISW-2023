const express = require('express');
const multer = require('multer');
const Archivo = require('../models/Archivo');
const router = express.Router();
const fs = require('fs');
const auth = require('../auth');

// Configuración de multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // Directorio donde se almacenarán los archivos
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

const fileFilter = (req, file, cb) => {
  // Aceptar solo pdf, word e imágenes
  if (file.mimetype === 'application/pdf' || 
      file.mimetype === 'application/msword' || 
      file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
      file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});
// Ruta para obtener todos los archivos
router.get('/', async (req, res, next) => {
  try {
    let archivos;
    if (req.headers.authorization) {
      const userId = req.headers.authorization.split(' ')[1];
      archivos = await Archivo.find({ rutUsuario: userId });
    } else {
      archivos = await Archivo.find();
    }
    res.status(200).json({ archivos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los archivos', error: error.message });
  }
});
// Ruta para subir archivos
router.post('/upload', upload.single('file'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Formato de archivo no válido. Solo se permiten archivos PDF, Word e imágenes.' });
    }
    
    const userId = req.headers.authorization.split(' ')[1];

    const nuevoArchivo = new Archivo({
      nombreOriginal: req.file.originalname,
      formato: req.file.mimetype,
      tamaño: req.file.size,
      ruta: req.file.path, // Ruta donde se almacena el archivo en el servidor
      rutUsuario: userId, // ID del usuario que sube el archivo
    });

    await nuevoArchivo.save();

    res.status(201).json({ message: 'Archivo subido exitosamente', archivo: nuevoArchivo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al subir el archivo', error: error.message });
  }
});
// Ruta para eliminar un archivo por su ID
router.delete('/:archivoId', async (req, res, next) => {
  try {
    const archivoId = req.params.archivoId;
    // Eliminar el archivo por su ID
    await Archivo.findByIdAndDelete(archivoId);
    res.status(200).json({ message: 'Archivo eliminado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el archivo', error: error.message });
  }
});

// Ruta para ver un archivo por su ID
router.get('/ver/:id', async (req, res) => {
  try {
    const archivo = await Archivo.findById(req.params.id);

    if (!archivo) {
      return res.status(404).json({ message: 'Archivo no encontrado' });
    }

    // Lógica para enviar el archivo al frontend
    const filePath = archivo.ruta;

    // Verificar si el archivo existe en la ruta proporcionada
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        return res.status(404).json({ message: 'Archivo no encontrado en el servidor' });
      }

      // Establecer las cabeceras para la descarga
      res.setHeader('Content-Disposition', `inline; filename=${archivo.nombreOriginal}`);
      res.setHeader('Content-Type', archivo.formato); // Establece el tipo MIME del archivo

      // Enviar el archivo al frontend
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al descargar el archivo', error: error.message });
  }
});

// Ruta para descargar un archivo por su ID
router.get('/descargar/:id', async (req, res) => {
  try {
    const archivo = await Archivo.findById(req.params.id);

    if (!archivo) {
      return res.status(404).json({ message: 'Archivo no encontrado' });
    }

    // Lógica para enviar el archivo al frontend
    const filePath = archivo.ruta;

    // Verificar si el archivo existe en la ruta proporcionada
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        return res.status(404).json({ message: 'Archivo no encontrado en el servidor' });
      }

      // Establecer las cabeceras para la descarga
      res.setHeader('Content-Disposition', `attachment; filename=${archivo.nombreOriginal}`);
      res.setHeader('Content-Type', archivo.formato); // Establece el tipo MIME del archivo

      // Enviar el archivo al frontend
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al descargar el archivo', error: error.message });
  }
});


module.exports = router;

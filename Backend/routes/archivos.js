const express = require('express');
const multer = require('multer');
const Archivo = require('../models/Archivo');
const router = express.Router();
const fs = require('fs');

// Configuración de multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // Directorio donde se almacenarán los archivos
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});
const upload = multer({storage: storage});

// Ruta para obtener todos los archivos
router.get('/', async (req, res, next) => {
  try {
    const archivos = await Archivo.find();
    res.json(archivos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener archivos', error: error.message });
  }
});

// Ruta para subir archivos
router.post('/upload', upload.single('file'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No se ha seleccionado ningún archivo' });
    }

    const nuevoArchivo = new Archivo({
      nombreOriginal: req.file.originalname,
      formato: req.file.mimetype,
      tamaño: req.file.size,
      ruta: req.file.path, // Ruta donde se almacena el archivo en el servidor
      rutUsuario: String,
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

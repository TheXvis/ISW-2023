const VisitationRequest = require('./models/visitationRequestModel');

exports.createVisitationRequest = async (req, res) => {
    const { userId, asId, nombre, rut, fecha, telefono } = req.body;
    // Función para validar que el nombre solo contiene letras
    function isValidName(name) {
        const regex = /^[A-Za-z]+$/;
        return regex.test(name);
    }
    // Función para validar una cadena como fecha
    function isValidDate(dateString) {
        const date = new Date(dateString);
        return !isNaN(date) && date instanceof Date;
    }
    // Función para validar rut
    function isValidRut(rut) {
        // Formato válido: 11.111.111-1 o 11111111-1 (con o sin puntos y con guión)
        const rutRegex = /^0*(\d{1,3}(\.?\d{3}){2}-[\dkK])$/;
      
        if (!rutRegex.test(rut)) {
          return false;
        }
      
        // Elimina puntos y guiones para calcular el dígito verificador
        const cleanRut = rut.replace(/\.|-/g, '');
      
        // Extrae el dígito verificador y el cuerpo del Rut
        const rutDigits = cleanRut.slice(0, -1);
        const rutVerifier = cleanRut.slice(-1);
      
        // Cálculo del dígito verificador
        let sum = 0;
        let multiplier = 2;
      
        for (let i = rutDigits.length - 1; i >= 0; i--) {
          sum += parseInt(rutDigits.charAt(i)) * multiplier;
          multiplier = multiplier === 7 ? 2 : multiplier + 1;
        }
      
        const calculatedVerifier = (11 - (sum % 11)).toString();
      
        if (calculatedVerifier === '10') {
          calculatedVerifier = 'k';
        }
      
        if (calculatedVerifier === '11') {
          calculatedVerifier = '0';
        }
      
        return calculatedVerifier === rutVerifier.toLowerCase();
    }

    if (isValidName(nombre) && isValidDate(fecha) && isValidRut(rut)) {
        const visitationRequest = new VisitationRequest({
            userId,
            asId,
            nombre,
            rut,
            fecha,
            telefono,
            state: 'en revisión', // Estado inicial
        });
        await visitationRequest.save();
        res.status(201).json({ message: 'Solicitud de visita creada con éxito' });
    } else { 
        res.status(400).json({ message: 'Error al crear la solicitud de visita', error: 'Datos no válidos' });
    }
};

// Obtener las solicitudes de visita
exports.getAllVisitationRequests = async (req, res) => {
  try {
    const visitationRequests = await VisitationRequest.find();
    res.json(visitationRequests);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las solicitudes de visita', error: error.message });
  }
};

// Actualizar el estado de una solicitud de visita
exports.updateVisitationRequestState = async (req, res) => {
  try {
    const { requestId, newState } = req.body;
    await VisitationRequest.findByIdAndUpdate(requestId, { state: newState });
    res.json({ message: 'Estado de solicitud actualizado con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el estado de la solicitud', error: error.message });
  }
};

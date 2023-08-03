var express = require('express');
var router = express.Router();
const Cliente = require('../models/ahorro')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('insertar', { title: 'Insertar' });
});

// Ruta para mostrar el formulario de inserción de cliente
router.get('/insertar', (req, res) => {
  res.render('insertar');
});

router.post('/insertar', async (req, res) => {
  try {
    const { txtCedula, txtNombre, txtApellido1, txtApellido2, txtDeposito } = req.body;

    if (!txtCedula || !txtNombre || !txtApellido1 || !txtApellido2 || !txtDeposito) {
      throw new Error('Todos los campos marcados con * son requeridos.');
    }
    
    const nuevoCliente = new Cliente({
      cedula: Number(txtCedula),
      nombre: txtNombre,
      apellido1: txtApellido1,
      apellido2: txtApellido2,
      deposito: Number(txtDeposito)
    });

    await nuevoCliente.save();

    res.redirect('/index');
  } catch (error) {
    
    res.render('insertar', { error: error.message });
  }
});

module.exports = router;
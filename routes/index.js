var express = require('express');
var router = express.Router();
const Cliente = require('../models/ahorro')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Inicio' });
});

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

router.post('/modificar', async (req, res) => {
  const { txtCedula, txtNombre, txtApellido1, txtApellido2, txtDeposito, action,btnActualizar } = req.body;

  try {
    const usuarioEncontrado = await Cliente.findByCedula(txtCedula);

    const usuarioNuevo = await Cliente.findByCedula(txtCedula);
    if (!usuarioEncontrado) {
      return res.render('index', { mensaje: 'Cédula incorrecta' });
    }

    if (action === 'Buscar') {
      return res.render('modificar', { usuario: usuarioEncontrado, txtCedula });
    } else if (btnActualizar === 'Actualizar Datos') {
      usuarioNuevo.nombre = txtNombre;
      usuarioNuevo.apellido1 = txtApellido1;
      usuarioNuevo.apellido2 = txtApellido2;
      usuarioNuevo.deposito = Number(txtDeposito);
      await usuarioNuevo.save();
    }
    return res.render('index');

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
});

router.post('/eliminar', async (req, res) => {
  const { txtCedula, action } = req.body;

  try {
    const usuarioEncontrado = await Cliente.findByCedula(txtCedula);

    if (!usuarioEncontrado) {
      return res.render('index', { mensaje: 'Cedula incorrecta' });
    }

    if (action === 'Buscar') {
      return res.render('eliminar', { usuario: usuarioEncontrado, txtCedula });
    } else if (action === 'Eliminar') {
      await Cliente.deleteOne({ cedula: txtCedula });
      return res.render('index', { mensaje: 'Usuario eliminado correctamente' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
});

module.exports = router;

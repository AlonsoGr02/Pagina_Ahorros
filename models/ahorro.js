const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
  cedula: { type: String, required: true },
  nombre: { type: String, required: true },
  apellido1: { type: String, required: true },
  apellido2: { type: String, required: true },
  deposito: { type: Number, required: true }
});
clienteSchema.statics.findByCedula = async function (cedula) {

  return this.findOne({ cedula });

};

const Cliente = mongoose.model('Cliente', clienteSchema);

module.exports = Cliente;

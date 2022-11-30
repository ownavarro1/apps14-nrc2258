const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    validate: {
      validator: (v) => /^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$/.test(v),
      message: 'Digite nombre y apellido correctamente',
    },
    required: [true, 'Nombre y Apellidos Requerido'],
  },
  usuario: {
    type: String,
    required: [true, 'Nombre de usuario Requerido'],
  },
  password: {
    type: String,
    required: [true, 'password  Requerido'],
  },
  email: {
    type: String,
    validate: {
      validator: (v) => /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(v),
      message: 'Email Invalido',
    },
    required: [true, ' email Requerido'],
  },

}, { timestamps: true });

module.exports = mongoose.model('user', userSchema);

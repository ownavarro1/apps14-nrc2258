const express = require('express');
const bcrypt = require('bcrypt');
const userSchema = require('../models/user');

const router = express.Router();
// crear usuario
router.post('/users', (req, res) => {
  const {
    name, usuario, password, email,
  } = req.body;

  userSchema.findOne({ email }).then((userRegister) => {
    if (userRegister) {
      return res.json({ mensaje: 'Ya existe un usuario con ese correo' });
    } if (!name || !usuario || !email || !password) {
      return res.json({ mensaje: 'Falta el nombre / correo / contraseña' });
    }
    bcrypt.hash(password, 10, (error, contraseñaHasheada) => {
      if (error) res.json({ error });
      else {
        // eslint-disable-next-line new-cap
        const nuevoUser = new userSchema({
          name,
          usuario,
          email,
          password: contraseñaHasheada,
        });
        nuevoUser
          .save()
          .then((data) => res.json(data))
          .catch((err) => res.json({ message: err }));
      }
    });
  });
});

// obtener todos los usuarios
router.get('/users', (req, res) => {
  userSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});
// obtener un usuario en especifico
router.get('/users/:id', (req, res) => {
  const { id } = req.params;
  userSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});
// actualizar un usuario
router.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, age, email } = req.body;
  userSchema
    .updateOne({ _id: id }, { $set: { name, age, email } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});
// eliminar un usuario
router.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  userSchema
    .remove({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});
module.exports = router;

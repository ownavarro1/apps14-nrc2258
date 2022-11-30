const user = require('../models/user');

const getUserById = async (req, res) => {
  const { id } = req.user;

  if (id.length === 24) {
    user.findById(id).then((usuario) => {
      if (!usuario) {
        return res.json({
          mensaje: 'No se encontro ningun usuario con esa ID',
        });
      }
      const {
        _id, contraseña, __v, ...resto
      } = usuario._doc;
      res.json(resto);
    });
  } else {
    res.json({ mensaje: 'Estas enviando una contraseña incorrecta' });
  }
};

module.exports = getUserById;

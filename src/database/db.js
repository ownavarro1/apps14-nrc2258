const mongoose = require('mongoose');
require('dotenv').config();

const db = async () => {
  await mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('Conectado a la base de datos'))
    .catch((error) => console.error(error));
};

module.exports = db;

const express = require('express');
const cors = require('cors');
const db = require('./database/db');
const controllers = require('./controllers');
const verifyToken = require('./middlewares/verifyToken');
const userRoutes = require('./routes/users');

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 9000;

// Rutas
app.get('/', (req, res) => {
  res.send('Bienvenido a mi API');
});

app.use('/api', userRoutes);
app.get('/user', verifyToken, controllers.getUserById);
app.post('/register', controllers.register);
app.post('/login', controllers.login);

app.listen(port, () => {
  console.log('server listening on port :', port);
  db();
});

module.exports = app;

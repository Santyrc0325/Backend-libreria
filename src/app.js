const express = require('express');
const mongoose = require('mongoose');
const { Sequelize } = require('sequelize');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

mongoose.connect('mongodb+srv://admin:sLGZLzx59bDHj7lI@cluster0testeo.7iajvcj.mongodb.net/miBaseDeDatos?retryWrites=true&w=majority')
    .then(() => console.log('Conectado a MongoDB'))
    .catch((error) => console.error('No se pudo conectar a MongoDB', error));

const sequelize = new Sequelize('libreria', 'andresmosquera', 'abogadoColmenares123?*', {
    host: '35.225.222.50',
    port: 3306,
    dialect: 'mysql'
});

sequelize.authenticate()
    .then(() => console.log('Conectado a MySQL'))
    .catch((error) => console.error('No se pudo conectar a MySQL', error));

const authRoutes = require('./routes/authRoutes');
const librosRoutes = require('./routes/librosRoutes');
app.use('/api/auth', authRoutes);
app.use('/api/libros', librosRoutes);

app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));

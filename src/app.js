const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Conexión a MongoDB
mongoose.connect('mongodb+srv://admin:sLGZLzx59bDHj7lI@cluster0testeo.7iajvcj.mongodb.net/')
    .then(() => console.log('Conectado a MongoDB'))
    .catch((error) => console.error('No se pudo conectar a MongoDB', error));

// Uso de rutas
const authRoutes = require('./routes/authRoutes');
const librosRoutes = require('./routes/librosRoutes');
app.use('/api/auth', authRoutes);
app.use('/api/libros', librosRoutes);

app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));


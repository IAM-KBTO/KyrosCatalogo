const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Producto = require('./models/Producto');

const app = express();

// Middlewares: Permitir que el frontend (puerto 5173) hable con el backend (puerto 3000)
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect('mongodb+srv://cabeto_db_user:lacs1212@cluster0.ci0v2aj.mongodb.net/?appName=Cluster0')
  .then(() => console.log('Conectado a MongoDB...'))
  .catch(err => console.error('Error de conexión:', err));

// Rutas de la API

// 1. Catálogo: Devuelve todos los artículos
app.get('/api/productos', async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el catálogo' });
  }
});

// 2. Detalle: Devuelve un solo artículo por su ID de Mongo
app.get('/api/productos/:id', async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) return res.status(404).json({ error: 'No encontrado' });
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: 'ID inválido' });
  }
});

// 3. Venta: Resta 1 al stock del artículo
app.post('/api/vender/:id', async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (producto.stock > 0) {
      producto.stock -= 1;
      await producto.save(); // Guarda el nuevo stock en la base de datos
      res.json({ mensaje: 'Venta procesada con éxito', stockActual: producto.stock });
    } else {
      res.status(400).json({ error: 'No hay stock suficiente' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al procesar la venta' });
  }
});

// Levantar el servidor en el puerto 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API de KYROS corriendo en http://localhost:${PORT}`);
});
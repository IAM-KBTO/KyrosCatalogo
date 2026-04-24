const mongoose = require('mongoose');

// Definimos la estructura exacta que tendrán los artículos de KYROS
const productoSchema = new mongoose.Schema({
  nombre: { 
    type: String, 
    required: true 
  },
  precio: { 
    type: Number, 
    required: true 
  },
  stock: { 
    type: Number, 
    required: true,
    default: 0 
  },
  imagen: { 
    type: String, 
    required: true 
  },
  categoria: { 
    type: String, 
    required: true 
  }
}, {
  timestamps: true // Esto agrega automáticamente la fecha de creación y actualización
});

module.exports = mongoose.model('Producto', productoSchema);
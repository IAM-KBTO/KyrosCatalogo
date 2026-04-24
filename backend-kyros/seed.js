const mongoose = require('mongoose');
const Producto = require('./models/Producto');

// Tus datos de prueba actualizados sin el 'id' (MongoDB genera su propio _id automáticamente)
const productosKyros = [
  // Los 4 originales
  { nombre: "Módulo ESP32 con WiFi/Bluetooth", precio: 180.00, stock: 15, imagen: "https://images.unsplash.com/photo-1608564697071-ddf911d513a2?w=500&q=80", categoria: "Microcontroladores" },
  { nombre: "Sensor de Temperatura Industrial PT100", precio: 450.50, stock: 8, imagen: "https://images.unsplash.com/photo-1580584126903-c17d41830450?w=500&q=80", categoria: "Sensores" },
  { nombre: "Módulo de Relevadores 4 Canales", precio: 120.00, stock: 20, imagen: "https://images.unsplash.com/photo-1517077304055-6e89abf0ceb6?w=500&q=80", categoria: "Actuadores" },
  { nombre: "Cámara de Monitoreo Raspberry Pi", precio: 650.00, stock: 5, imagen: "https://images.unsplash.com/photo-1527443195645-1133f7f28990?w=500&q=80", categoria: "Visión" },

  // Los 16 nuevos
  { nombre: "Sensor de Humedad de Suelo Capacitivo", precio: 85.00, stock: 30, imagen: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&q=80", categoria: "Sensores" },
  { nombre: "Pantalla OLED 0.96 Pulgadas I2C", precio: 145.00, stock: 12, imagen: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=500&q=80", categoria: "Pantallas" },
  { nombre: "Módulo GPS Neo-6M con Antena", precio: 320.00, stock: 7, imagen: "https://images.unsplash.com/photo-1512418490979-92798cedec3d?w=500&q=80", categoria: "Comunicación" },
  { nombre: "Sensor Ultrasonido HC-SR04", precio: 55.00, stock: 40, imagen: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&q=80", categoria: "Sensores" },
  { nombre: "Fuente de Poder Industrial 12V 5A", precio: 380.00, stock: 10, imagen: "https://images.unsplash.com/photo-1558494949-ef010958384e?w=500&q=80", categoria: "Energía" },
  { nombre: "Módulo Lora SX1278 de Largo Alcance", precio: 290.00, stock: 6, imagen: "https://images.unsplash.com/photo-1563770660941-20978e870e26?w=500&q=80", categoria: "Comunicación" },
  { nombre: "Servomotor Industrial MG996R", precio: 195.00, stock: 18, imagen: "https://images.unsplash.com/photo-1531315630201-bb1529681475?w=500&q=80", categoria: "Actuadores" },
  { nombre: "Sensor de Corriente No Invasivo 30A", precio: 165.00, stock: 14, imagen: "https://images.unsplash.com/photo-159742324403d-21217e92bb03?w=500&q=80", categoria: "Sensores" },
  { nombre: "Pantalla LCD 16x2 con Adaptador I2C", precio: 110.00, stock: 25, imagen: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&q=80", categoria: "Pantallas" },
  { nombre: "Módulo Reloj de Tiempo Real DS3231", precio: 95.00, stock: 22, imagen: "https://images.unsplash.com/photo-1502920513543-d03891a9b48b?w=500&q=80", categoria: "Módulos" },
  { nombre: "Lector de Tarjetas MicroSD SPI", precio: 45.00, stock: 50, imagen: "https://images.unsplash.com/photo-1544244015-0cd4b3ffc6b0?w=500&q=80", categoria: "Módulos" },
  { nombre: "Convertidor de Voltaje Buck LM2596", precio: 65.00, stock: 35, imagen: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=500&q=80", categoria: "Energía" },
  { nombre: "Gabinete para Riel DIN Industrial", precio: 210.00, stock: 15, imagen: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&q=80", categoria: "Accesorios" },
  { nombre: "Sensor PIR de Movimiento HC-SR501", precio: 75.00, stock: 28, imagen: "https://images.unsplash.com/photo-1557853197-aefb550b6fdc?w=500&q=80", categoria: "Sensores" },
  { nombre: "Teclado Matricial 4x4 de Membrana", precio: 40.00, stock: 45, imagen: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80", categoria: "Accesorios" },
  { nombre: "Módulo Ethernet ENC28J60", precio: 135.00, stock: 12, imagen: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=500&q=80", categoria: "Comunicación" }
];

// Conexión a la base de datos local
mongoose.connect('mongodb+srv://cabeto_db_user:lacs1212@cluster0.ci0v2aj.mongodb.net/?appName=Cluster0')
  .then(async () => {
    console.log('Conectado a MongoDB...');
    
    // Limpiamos la colección por si ejecutamos el script varias veces
    await Producto.deleteMany({});
    console.log('Colección anterior eliminada.');

    // Insertamos los nuevos productos
    await Producto.insertMany(productosKyros);
    console.log('Catálogo de KYROS guardado en la base de datos.');

    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error de conexión:', err);
  });
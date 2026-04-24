# 🌐 KYROS - Catálogo de Monitoreo IoT

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

Plataforma web *Full-Stack* desarrollada para la comercialización y gestión de inventario de equipos de monitoreo industrial e Internet de las Cosas (IoT). 

Este proyecto implementa una arquitectura moderna separando la interfaz de usuario (Frontend) y la lógica de negocio/datos (Backend), asegurando escalabilidad y una experiencia de usuario fluida.

---

## ✨ Características Principales

* **Catálogo Dinámico:** Visualización en cuadrícula de sensores, microcontroladores y actuadores con renderizado optimizado.
* **Sistema de Enrutamiento:** Navegación instantánea tipo *Single Page Application* (SPA) sin recargas de página utilizando React Router.
* **Gestión de Inventario en Tiempo Real:** Las ventas descuentan automáticamente el stock directamente desde la base de datos en la nube.
* **Diseño UI/UX Moderno:** Interfaz minimalista y responsiva construida con Tailwind CSS, incluyendo feedback visual mediante notificaciones flotantes (Sonner).
* **Base de Datos NoSQL:** Esquemas de datos flexibles y escalables implementados con Mongoose y MongoDB Atlas.

---

## 🏗️ Arquitectura del Proyecto (Monorepo)

El repositorio contiene ambas partes de la aplicación:

```text
PROYECTOKYROS/
├── backend-kyros/       # API RESTful (Node.js + Express)
│   ├── models/          # Esquemas de Mongoose (Producto.js)
│   ├── server.js        # Configuración del servidor y endpoints
│   └── seed.js          # Script de inyección de datos iniciales
│
└── catalogo-kyros/      # Interfaz de Usuario (React + Vite)
    ├── src/             
    │   ├── App.jsx      # Rutas y vista del catálogo
    │   ├── Checkout.jsx # Vista de procesamiento de venta
    │   └── ProductoDetalle.jsx # Vista individual del equipo
    └── index.html       # Plantilla base
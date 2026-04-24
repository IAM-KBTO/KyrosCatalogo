import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Toaster } from 'sonner';
import ProductoDetalle from './ProductoDetalle';
import Checkout from './Checkout';

function App() {
  // 1. Creamos el estado para guardar los productos de la API
  const [productos, setProductos] = useState([]);

  // 2. Llamamos a tu backend en cuanto carga la pantalla
  useEffect(() => {
    fetch('http://localhost:3000/api/productos')
      .then(respuesta => respuesta.json())
      .then(datos => setProductos(datos))
      .catch(error => console.error("Error cargando el catálogo:", error));
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 font-sans text-slate-800 p-4 md:p-8">
        <Toaster position="top-right" richColors />

        <nav className="max-w-6xl mx-auto mb-8 bg-white px-6 py-4 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              KYROS<span className="text-blue-600">.</span>
            </h1>
          </div>
          <span className="text-sm font-semibold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
            Catálogo Principal
          </span>
        </nav>

        <main className="max-w-6xl mx-auto">
          <Routes>
            <Route 
              path="/" 
              element={
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* 3. Mapeamos los datos reales. OJO al _id de MongoDB */}
                  {productos.map((producto) => (
                    <div key={producto._id} className="bg-white rounded-2xl p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 transition-transform hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
                      
                      <div className="w-full h-48 bg-slate-100 rounded-xl mb-4 overflow-hidden flex items-center justify-center p-2">
                        <img src={producto.imagen} alt={producto.nombre} className="max-w-full max-h-full object-contain opacity-90 hover:opacity-100 transition-opacity mix-blend-multiply" />
                      </div>
                      
                      <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md uppercase tracking-wider">
                        {producto.categoria}
                      </span>
                      <h3 className="text-lg font-bold text-slate-800 mt-2 leading-tight">
                        {producto.nombre}
                      </h3>
                      <p className="text-2xl font-extrabold text-slate-900 my-3">
                        ${producto.precio.toFixed(2)}
                      </p>
                      
                      {/* El enlace ahora usa el _id dinámico */}
                      <Link to={`/producto/${producto._id}`} className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl transition-colors">
                        Ver detalles
                      </Link>
                    </div>
                  ))}
                </div>
              } 
            />
            
            <Route path="/producto/:id" element={<ProductoDetalle />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

export default function ProductoDetalle() {
  const { id } = useParams(); // Este es el _id largo de Mongo
  const navigate = useNavigate();
  
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Pedimos a la API unicamente el producto con este ID
    fetch(`http://localhost:3000/api/productos/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Producto no encontrado');
        return res.json();
      })
      .then(data => {
        setProducto(data);
        setCargando(false);
      })
      .catch(error => {
        console.error(error);
        setCargando(false);
      });
  }, [id]);

  if (cargando) {
    return <div className="text-center p-10 font-bold text-slate-500">Cargando información del equipo...</div>;
  }

  if (!producto) {
    return (
      <div className="bg-white p-8 rounded-[2rem] text-center shadow-sm">
        <h2 className="text-2xl font-bold text-slate-800">Producto no encontrado</h2>
        <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">Volver al catálogo</Link>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
      <Link to="/" className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-blue-600 mb-4 transition-colors">
        ← Volver al catálogo principal
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="bg-slate-50 rounded-2xl p-4 overflow-hidden h-56 md:h-72 flex items-center justify-center">
          <img src={producto.imagen} alt={producto.nombre} className="max-w-full max-h-full object-contain rounded-xl mix-blend-multiply" />
        </div>

        <div>
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md uppercase tracking-wider">
            {producto.categoria}
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-3 mb-2 leading-tight">
            {producto.nombre}
          </h2>
          <p className="text-slate-500 mb-4 text-sm md:text-base">
            Módulo ideal para la integración en los sistemas de monitoreo IoT de KYROS. Alta precisión y durabilidad industrial.
          </p>

          <div className="bg-slate-50 p-5 rounded-2xl mb-6 border border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-bold mb-1 uppercase tracking-wider">Precio Unitario</p>
              <p className="text-4xl font-black text-slate-900">
                ${producto.precio.toFixed(2)}
              </p>
            </div>
            <div className="bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-full text-sm font-bold flex items-center gap-1.5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              {producto.stock} en stock
            </div>
          </div>

          <button 
            onClick={() => navigate('/checkout', { state: { productoAVender: producto } })}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg py-3 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-95"
          >
            Vender Artículo
          </button>
        </div>
      </div>
    </div>
  );
}
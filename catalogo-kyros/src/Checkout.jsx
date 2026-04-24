import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { useState } from 'react';

export default function Checkout() {
  const navigate = useNavigate();
  // 1. Recibimos la información del producto que viene de la pantalla anterior
  const location = useLocation();
  const producto = location.state?.productoAVender;
  
  // Estado para bloquear el botón mientras procesa la venta
  const [procesando, setProcesando] = useState(false);

  // Si alguien entra directo a /checkout sin elegir producto, lo regresamos
  if (!producto) {
    return (
      <div className="text-center p-10 bg-white rounded-2xl">
        <h2 className="text-xl font-bold mb-4">No hay producto seleccionado</h2>
        <button onClick={() => navigate('/')} className="text-blue-600 font-bold hover:underline">Ir al Catálogo</button>
      </div>
    );
  }

  // Cálculos reales para el recibo
  const subtotal = producto.precio;
  const iva = subtotal * 0.16;
  const total = subtotal + iva;

  // 2. La función que habla con tu API
  const confirmarVenta = async (e) => {
    e.preventDefault();
    setProcesando(true);
    
    try {
      // Hacemos la petición POST al backend (el endpoint que creaste en server.js)
      const respuesta = await fetch(`http://localhost:3000/api/vender/${producto._id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(datos.error || 'Error al procesar la venta');
      }

      // Si todo sale bien, mostramos el éxito
      toast.success('¡Venta registrada con éxito!', {
        description: `El stock en MongoDB ahora es: ${datos.stockActual}`,
        duration: 4000,
      });

      // Regresamos al catálogo después de 1.5 segundos
      setTimeout(() => {
        navigate('/');
      }, 1500);

    } catch (error) {
      toast.error('No se pudo completar la venta', {
        description: error.message,
      });
      setProcesando(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 md:p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
      
      <Link to="/" className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-blue-600 mb-8 transition-colors">
        ← Cancelar y volver al catálogo
      </Link>

      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl">✓</div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">Confirmar Venta</h2>
      </div>

      <form onSubmit={confirmarVenta} className="space-y-6">
        
        {/* Datos del Cliente */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Datos del Cliente</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Nombre o Empresa</label>
              <input required type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Ej. Industrias Sinaloa" />
            </div>
          </div>
        </div>

        {/* Resumen REAL de la Orden conectada a MongoDB */}
        <div className="bg-blue-600 text-white p-6 rounded-2xl shadow-lg shadow-blue-200">
          <h4 className="text-blue-200 font-bold text-sm mb-4 border-b border-blue-500 pb-2">RESUMEN DEL EQUIPO</h4>
          
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold">{producto.nombre}</span>
            <span className="font-bold">${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between items-center text-blue-200 text-sm mb-4">
            <span>IVA (16%)</span>
            <span>${iva.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between items-center font-black text-2xl pt-4 border-t border-blue-500">
            <span>TOTAL</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Botón dinámico */}
        <button 
          type="submit"
          disabled={procesando}
          className={`w-full font-bold text-lg py-4 rounded-xl transition-all shadow-lg 
            ${procesando 
              ? 'bg-slate-400 cursor-not-allowed' 
              : 'bg-slate-900 hover:bg-slate-800 text-white active:scale-95'}`}
        >
          {procesando ? 'Procesando en MongoDB...' : 'Procesar y Finalizar Venta'}
        </button>
      </form>
    </div>
  );
}
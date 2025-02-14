'use client'

import { createClient } from '@/utils/supabase/client';
import { useState } from 'react';

// Crea el cliente de Supabase
const supabase = createClient();

export default function SendDataPage() {
  const [data, setData] = useState(''); // Estado para el input
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.from('notes').insert([{ title: data }]);
      if (error) throw error;
      setData(''); // Limpiar el campo de entrada
      alert('Datos enviados con éxito!');
    } catch (error) {
      setError('Error al enviar datos: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Enviar Datos a la Base de Datos</h1>
      <input
        type="text"
        value={data}
        onChange={(e) => setData(e.target.value)} // Cambia setInputData a setData
        placeholder="Escribe algo"
        required
      />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Enviando...' : 'Enviar'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
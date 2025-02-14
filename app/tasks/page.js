// app/tasks/page.js
'use client'

import { createClient } from '@/utils/supabase/client';
import { useState } from 'react';

const supabase = createClient();

export default function TaskPage() {
  const [task, setTask] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addTask = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.from('tasks').insert([{ task }]);
      if (error) throw error;
      setTask(''); // Limpiar el campo de entrada
      alert('Tarea agregada con éxito!');
    } catch (error) {
      setError('Error al agregar la tarea: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Agregar Nueva Tarea</h1>
      <form onSubmit={addTask}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Escribe tu tarea"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Agregando...' : 'Agregar Tarea'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
'use client'

import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';

const supabase = createClient();

export default function TaskPage() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]); // Estado para almacenar las tareas
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función para obtener las tareas de la base de datos
  const fetchTasks = async () => {
    const { data, error } = await supabase.from('tasks').select('*');
    if (error) {
      console.log('Error al obtener tareas:', error);
      setError('Error al obtener tareas: ' + error.message);
    } else {
      setTasks(data);
    }
  };

  // Llama a fetchTasks cuando el componente se monta
  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.from('tasks').insert([{ task }]);
      if (error) throw error;
      setTask(''); // Limpiar el campo de entrada
      alert('Tarea agregada con éxito!');
      fetchTasks(); // Vuelve a obtener la lista de tareas después de agregar una nueva
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

      <h2>Tareas Existentes</h2>
      <ul>
        {tasks.length > 0 ? (
          tasks.map((t) => (
            <li key={t.id}>{t.task}</li> // Asegúrate de que 'task' sea el nombre correcto de la columna
          ))
        ) : (
          <p>No hay tareas disponibles.</p>
        )}
      </ul>
    </div>
  );
}
"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

const supabase = createClient();

export default function TaskPage() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]); // Estado para almacenar las tareas
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función para obtener las tareas de la base de datos
  const fetchTasks = async () => {
    const { data, error } = await supabase.from("tasks").select("*");
    if (error) {
      console.log("Error al obtener tareas:", error);
      setError("Error al obtener tareas: " + error.message);
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
      const { error } = await supabase.from("tasks").insert([{ task }]);
      if (error) throw error;
      setTask(""); // Limpiar el campo de entrada
      alert("Tarea agregada con éxito!");
      fetchTasks(); // Vuelve a obtener la lista de tareas después de agregar una nueva
    } catch (error) {
      setError("Error al agregar la tarea: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Función para borrar una tarea

  const deleteTask = async (id) => {
    setLoading(true);

    setError(null);

    try {
      const { error } = await supabase.from("tasks").delete().eq("id", id);

      if (error) throw error;

      alert("Tarea eliminada con éxito!");

      fetchTasks(); // Vuelve a obtener la lista de tareas después de eliminar
    } catch (error) {
      setError("Error al eliminar la tarea: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Agregar Nueva Tarea</h1>

      <form onSubmit={addTask} className="mb-4">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Escribe tu tarea"
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "Agregando..." : "Agregar Tarea"}
        </button>
      </form>

      {error && <p className="text-red-500">{error}</p>}

      <h2 className="text-xl font-semibold mb-2">Tareas Existentes</h2>

      <ul className="space-y-2">
        {tasks.length > 0 ? (
          tasks.map((t) => (
            <li
              key={t.id}
              className="flex justify-between items-center p-2 border border-gray-200 rounded-md"
            >
              <span>{t.task}</span>

              <button
                onClick={() => deleteTask(t.id)}
                className="ml-4 text-red-500 hover:text-red-700"
              >
                Eliminar
              </button>
            </li>
          ))
        ) : (
          <p>No hay tareas disponibles.</p>
        )}
      </ul>
    </div>
  );
}

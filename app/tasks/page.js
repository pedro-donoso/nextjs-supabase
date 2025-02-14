"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

const supabase = createClient();

export default function TaskPage() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]); // Estado para almacenar las tareas
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [session, setSession] = useState(null); // Estado para la sesión del usuario

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
    const fetchSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) {
        console.error("Error al obtener la sesión:", error);
      } else {
        setSession(session);
      }
    };

    fetchSession();

    // Escucha cambios en la sesión
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });

    fetchTasks();

    return () => {
      subscription.unsubscribe();
    };
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
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Agregar Nueva Tarea
      </h1>

      {session ? (
        <form onSubmit={addTask} className="mb-4">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Escribe tu tarea"
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />

          <button
            type="submit"
            disabled={loading}
            style={{ backgroundColor: "#1E3A8A", color: "#FBBF24" }} // Colores en hexadecimal
            className="mt-4 w-full p-3 rounded-md text-white font-semibold hover:bg-blue-800 transition duration-200"
          >
            {loading ? "Agregando..." : "Agregar Tarea"}
          </button>
        </form>
      ) : (
        <p className="text-red-500 text-center">
          Inicia sesión para agregar tareas.
        </p>
      )}

      {error && <p className="text-red-500 text-center">{error}</p>}

      <h2 className="text-xl font-semibold mb-2 text-center">
        Tareas Existentes
      </h2>

      {session ? (
        <ul className="space-y-2">
          {tasks.length > 0 ? (
            tasks.map((t) => (
              <li
                key={t.id}
                className="flex justify-between items-center p-3 border border-gray-200 rounded-md hover:shadow-md transition duration-200"
              >
                <span className="text-gray-800">{t.task}</span>
                <button
                  onClick={() => deleteTask(t.id)}
                  className="text-red-500 hover:text-red-700 transition duration-200"
                >
                  Eliminar
                </button>
              </li>
            ))
          ) : (
            <p className="text-center text-gray-500">
              No hay tareas disponibles.
            </p>
          )}
        </ul>
      ) : (
        <p className="text-red-500 text-center">
          Inicia sesión para ver tus tareas.
        </p>
      )}
    </div>
  );
}

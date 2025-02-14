// src/app/tasks/page.js
"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import TaskForm from "@/components/TaskForm"; // Asegúrate de que la ruta sea correcta
import TaskList from "@/components/TaskList"; // Asegúrate de que la ruta sea correcta

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
        <TaskForm
          task={task}
          setTask={setTask}
          addTask={addTask}
          loading={loading}
        />
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
        <TaskList tasks={tasks} deleteTask={deleteTask} />
      ) : (
        <p className="text-red-500 text-center">
          Inicia sesión para ver tus tareas.
        </p>
      )}
    </div>
  );
}

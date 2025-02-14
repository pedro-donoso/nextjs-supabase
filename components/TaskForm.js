// src/components/TaskForm.js
import React from "react";

const TaskForm = ({ task, setTask, addTask, loading }) => {
  return (
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
  );
};

export default TaskForm;

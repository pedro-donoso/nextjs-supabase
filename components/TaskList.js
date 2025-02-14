// src/components/TaskList.js
import React from "react";

const TaskList = ({ tasks, deleteTask }) => {
  return (
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
        <p className="text-center text-gray-500">No hay tareas disponibles.</p>
      )}
    </ul>
  );
};

export default TaskList;

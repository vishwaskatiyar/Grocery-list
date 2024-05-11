import { useState, useEffect } from "react";
import Task from "./Task";

const App = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text) => {
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const toggleTask = (taskId) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, completed: !task.completed };
        }
        return task;
      })
    );
  };

  const clearCompletedTasks = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1
        className="text-3xl text-center
       font-bold mb-4"
      >
        LocalTasker
      </h1>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Enter task"
          className="border border-gray-300 p-2 rounded mr-2 flex-grow"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addTask(e.target.value);
              e.target.value = "";
            }
          }}
        />
        <button
          onClick={clearCompletedTasks}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Clear Completed
        </button>
      </div>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onDelete={deleteTask}
          onToggle={toggleTask}
        />
      ))}
    </div>
  );
};

export default App;

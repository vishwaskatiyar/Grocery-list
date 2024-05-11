import PropTypes from "prop-types";
import { useState } from "react";

const Task = ({ task, onDelete, onToggle }) => {
  const [checked, setChecked] = useState(task.completed);
  console.log(checked);

  const handleToggle = () => {
    setChecked(!checked);
    onToggle(task.id);
  };

  return (
    <div className="flex items-center justify-between border-b border-gray-300 py-2">
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={checked}
          onChange={handleToggle}
          className="form-checkbox h-5 w-5 text-blue-500"
        />
        <span
          className={`text-lg ${checked ? "line-through text-gray-500" : ""}`}
        >
          {task.text}
        </span>
      </label>
      <button
        onClick={() => onDelete(task.id)}
        className="text-red-500 hover:text-red-700"
      >
        Delete
      </button>
    </div>
  );
};

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default Task;

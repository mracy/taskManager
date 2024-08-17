import React, { useState } from 'react';
import './TaskItem.css'; // Import CSS for styling

function TaskItem({ task, onRemove, onEdit }) {
  const [isCompleted, setIsCompleted] = useState(task.completed || false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleToggleCompletion = () => {
    setIsCompleted(prev => !prev);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (editText.trim()) {
      onEdit(task.id, editText);
      setIsEditing(false);
    }
  };

  const handleRemove = () => {
    if (window.confirm('Are you sure you want to remove this task?')) {
      onRemove(task.id);
    }
  };

  return (
    <li className={`task-item ${isCompleted ? 'completed' : ''}`}>
      {isEditing ? (
        <form onSubmit={handleEditSubmit} className="edit-form">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="edit-input"
          />
          <button type="submit" className="save-button">Save</button>
          <button type="button" onClick={() => setIsEditing(false)} className="cancel-button">Cancel</button>
        </form>
      ) : (
        <>
          <span className="task-text" onClick={handleToggleCompletion}>
            {task.text}
          </span>
          <button onClick={() => setIsEditing(true)} className="edit-button">Edit</button>
          <button onClick={handleRemove} className="remove-button">Remove</button>
        </>
      )}
    </li>
  );
}

export default TaskItem;

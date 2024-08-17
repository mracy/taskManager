import React, { useState } from 'react';
import './AddTaskForm.css'; // Import CSS for styling

function AddTaskForm({ onAdd }) {
  const [taskText, setTaskText] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (taskText.trim()) {
      setLoading(true);
      try {
        await onAdd(taskText); // Assuming onAdd returns a promise
        setTaskText('');
        setError('');
      } catch (err) {
        setError('An error occurred while adding the task');
      } finally {
        setLoading(false);
      }
    } else {
      setError('Task cannot be empty');
    }
  };

  const handleClear = () => {
    setTaskText('');
    setError('');
  };

  return (
    <div className="add-task-form-container">
      <form onSubmit={handleSubmit} className="add-task-form">
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="Enter task"
          className="task-input"
          disabled={loading}
        />
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Adding...' : 'Add Task'}
        </button>
        <button type="button" onClick={handleClear} className="clear-button" disabled={loading}>
          Clear
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default AddTaskForm;

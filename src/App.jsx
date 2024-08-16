import React, { useState, useCallback, useMemo } from 'react';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';

function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = useCallback((text) => {
    setTasks(prevTasks => [...prevTasks, { id: Date.now(), text }]);
  }, []);

  const removeTask = useCallback((id) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  }, []);

  // Memoize tasks to avoid unnecessary re-renders
  const memoizedTasks = useMemo(() => tasks, [tasks]);

  return (
    <div className="app-container">
      <h1>Task Manager</h1>
      <AddTaskForm onAdd={addTask} />
      <TaskList tasks={memoizedTasks} onRemove={removeTask} />
    </div>
  );
}

export default App;

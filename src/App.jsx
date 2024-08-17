import React, { useState, useCallback, useMemo, useEffect } from 'react';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';
import './App.css'; // Import CSS for styling

function App() {
  const [tasks, setTasks] = useState([]);

  // Load tasks from local storage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  // Save tasks to local storage
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = useCallback((text) => {
    if (text.trim()) {
      setTasks(prevTasks => [...prevTasks, { id: Date.now(), text, completed: false }]);
    }
  }, []);

  const removeTask = useCallback((id) => {
    if (window.confirm('Are you sure you want to remove this task?')) {
      setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    }
  }, []);

  const editTask = useCallback((id, newText) => {
    setTasks(prevTasks => 
      prevTasks.map(task => task.id === id ? { ...task, text: newText } : task)
    );
  }, []);

  const toggleTaskCompletion = useCallback((id) => {
    setTasks(prevTasks => 
      prevTasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task)
    );
  }, []);

  // Memoize tasks to avoid unnecessary re-renders
  const memoizedTasks = useMemo(() => tasks, [tasks]);

  return (
    <div className="app-container">
      <h1>Task Manager</h1>
      <AddTaskForm onAdd={addTask} />
      <TaskList 
        tasks={memoizedTasks} 
        onRemove={removeTask} 
        onEdit={editTask} 
        onToggleCompletion={toggleTaskCompletion} 
      />
    </div>
  );
}

export default App;

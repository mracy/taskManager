import React, { useState, useMemo } from 'react';
import TaskItem from './TaskItem';
import './TaskList.css'; // Import CSS for styling

function TaskList({ tasks, onRemove, onEdit }) {
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('creation');

  const filteredTasks = useMemo(() => {
    if (filter === 'completed') {
      return tasks.filter(task => task.completed);
    }
    if (filter === 'pending') {
      return tasks.filter(task => !task.completed);
    }
    return tasks;
  }, [filter, tasks]);

  const sortedTasks = useMemo(() => {
    return [...filteredTasks].sort((a, b) => {
      if (sort === 'creation') {
        return b.id - a.id; // Assuming 'id' is a timestamp or sequential ID
      }
      if (sort === 'completion') {
        return b.completed - a.completed;
      }
      return 0;
    });
  }, [filteredTasks, sort]);

  return (
    <div className="task-list-container">
      <div className="task-list-controls">
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="filter-select">
          <option value="all">All Tasks</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="sort-select">
          <option value="creation">Sort by Creation Date</option>
          <option value="completion">Sort by Completion Status</option>
        </select>
      </div>
      {tasks.length === 0 ? (
        <p>No tasks available. Please add a task.</p>
      ) : (
        <ul>
          {sortedTasks.map(task => (
            <TaskItem key={task.id} task={task} onRemove={onRemove} onEdit={onEdit} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;

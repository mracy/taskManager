import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, onRemove }) {
  return (
    <div>
      {tasks.length === 0 ? (
        <p>No tasks available. Please add a task.</p>
      ) : (
        <ul>
          {tasks.map(task => (
            <TaskItem key={task.id} task={task} onRemove={onRemove} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;

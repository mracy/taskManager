import React from 'react';

function TaskItem({ task, onRemove }) {
  return (
    <li>
      {task.text}
      <button onClick={() => onRemove(task.id)}>Remove</button>
    </li>
  );
}

export default TaskItem;

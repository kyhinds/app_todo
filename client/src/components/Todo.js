import React, { useState } from 'react';

function Todo({ todo, toggleComplete, deleteTodo, updateTodoText }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setEditText(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      updateTodoText(todo.id, editText);
      setIsEditing(false);
    }
  };

  const handleBlur = () => {
    updateTodoText(todo.id, editText);
    setIsEditing(false);
  };

  return (
    <li className={`todo-item ${isEditing ? 'editing' : ''}`} onDoubleClick={handleDoubleClick}>
      {isEditing ? (
        <input
          className="edit-todo-input"
          type="text"
          value={editText}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <>
    <div className="todo-item">
        <input
            id={`todo-${todo.id}`}
            className="todo-checkbox"
            type="checkbox"
            checked={todo.isCompleted}
            onChange={() => toggleComplete(todo.id)}
            style={{ display: 'none' }} 
        />
        <label htmlFor={`todo-${todo.id}`} className="todo-label"></label>
        <span className={`todo-text ${todo.isCompleted ? 'completed' : ''}`}>
            {todo.text}
        </span>
        <button className="delete-button" onClick={() => deleteTodo(todo.id)}>X</button>
        </div>
        </>
      )}
    </li>
  );
}

export default Todo;

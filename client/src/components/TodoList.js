import React, { useState } from 'react';
import Todo from './Todo';
import '../App.css'; 


function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all'); 
  const updateTodoText = (id, newText) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, text: newText } : todo)));
  };

  const addTodo = (e) => {
    e.preventDefault();
    const newTodo = {
      id: Date.now(),
      text: input,
      isCompleted: false
    };
    setTodos([...todos, newTodo]);
    setInput('');
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo)));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.isCompleted));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') {
      return !todo.isCompleted;
    } else if (filter === 'completed') {
      return todo.isCompleted;
    }
    return true;
  });

  const itemsLeft = todos.filter(todo => !todo.isCompleted).length;

  return (
    <div style={{width:'33%'}} className="outer-todo-list-container">
      <h1>Todo List</h1>
      <div className="todo-list-container">
      <form onSubmit={addTodo}>
        <input
          className='input-box'
          style={{ width: '100%', boxSizing: 'border-box', fontSize:22 }} 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What needs to be done?"
        />
      </form>
      <ul>
        {filteredTodos.map(todo => (
          <Todo
            key={todo.id}
            todo={todo}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
            updateTodoText={updateTodoText}
          />
        ))}
      </ul>
      {todos.length > 0 && ( 
          <div className='bottom-tabs'>
            <span className="items-left">{itemsLeft} items left</span>
            <button onClick={() => setFilter('all')} className={`filter-button ${filter === 'all' ? 'active' : ''}`}>All</button>
            <button onClick={() => setFilter('active')} className={`filter-button ${filter === 'active' ? 'active' : ''}`}>Active</button>
            <button onClick={() => setFilter('completed')} className={`filter-button ${filter === 'completed' ? 'active' : ''}`}>Completed</button>
            <button onClick={clearCompleted} className="filter-button">Clear completed</button>
          </div>
        )}
    </div>
    </div>
  );
}

export default TodoList;

import React, { useState } from 'react';
import './App.css';

const App = (props) => {
  const [todoText, setTodoText] = useState('');
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [completed, setCompleted] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editIndex === null) {
      setTodos([...todos, todoText]);
    } else {
      const newTodos = [...todos];
      newTodos[editIndex] = todoText;
      setTodos(newTodos);
      setEditIndex(null);
    }
    setTodoText('');
  };

  const handleDelete = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const handleEdit = (index) => {
    setTodoText(todos[index]);
    setEditIndex(index);
  };

  const handleComplete = (e, index) => {
    if (e.target.name === 'complete') {
      setCompleted([...completed, index]);
    } else {
      const temp = [...completed];
      temp.splice(index, 1)
      setCompleted(temp);
    }
    const newTodos = [...todos];
    setTodos(newTodos);
    
  };


  return (
    <div className="todo-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={todoText}
          onChange={(event) => setTodoText(event.target.value)}
        />
        <button type="submit">{editIndex === null ? 'Add Todo' : 'Update Todo'}</button>
      </form>
      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li key={index}>
            <span className={completed.includes(index) ? 'strike' : ''}>{todo}</span>
            <button onClick={() => handleDelete(index)}>Delete</button>
            <button onClick={() => handleEdit(index)}>Edit</button>
            <button name={!completed.includes(index) ? 'complete' : 'uncomplete' }  onClick={(e) => handleComplete(e, index)}>{!completed.includes(index) ? 'mark complete' : 'mark uncomplete'}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;


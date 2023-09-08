import React, { useState, useEffect } from 'react';
import { TodoList } from './TodoList';
import { AddTodoForm } from './AddTodoForm';

const initialTodos: Todo[] = [
  {
    text: "Walk the dog",
    complete: false,
  },
  {
    text: "Write app",
    complete: true,
  },
];

function App() {
  const [todos, setTodos] = useState(() => {
    // Check if todos exist in local storage
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : initialTodos;
  });
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    //Save todos to local storage whenever it changes
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const toggleTodo = (selectedTodo: Todo) => {
    const newTodos = todos.map((todo: any) => {
      if (todo === selectedTodo) {
        return {
          ...todo,
          complete: !todo.complete,
        };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const addTodo: AddTodo = (text: string) => {
    const newTodo = { text, complete: false };
    setTodos([...todos, newTodo]);
  }

  return (
    <>
      <TodoList 
        todos={todos.filter((todo: any) => {
          if (filter === "All") {
            return true;
          } else if (filter === "Complete") {
            return todo.complete;
          } else if (filter === "InProgress") {
            return !todo.complete;
          }
          return false;
        })} 
        toggleTodo={toggleTodo} 
      />
      <AddTodoForm 
        addTodo={addTodo}
      />
      <div>
        <button 
          onClick={() => setFilter("All")}
          style={{ marginRight: "10px" }}  
        >
          All
        </button>
        <button
          onClick={() => setFilter("Complete")}
          style={{ marginRight: "10px" }}
        >
          Copmlete
        </button>
        <button
          onClick={() => setFilter("InProgress")}
          style={{ marginRight: "10px" }}
        >
          InProgress
        </button>
      </div>
    </>
  )
}

export default App;

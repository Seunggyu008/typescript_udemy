import GlobalStyle from './GlobalStyle';

import React, { useState } from 'react';
import TodoList from './components/TodoList';
import NewTodo from './components/NewTodo';
import { Todo } from './todo.model';

const App: React.FC = () => {
  //in typescript, if empty array is passed in as a state,
  //typescript expects an empty array
  const [todos, setTodos] = useState<Todo[]>([]);

  const todoDeleteHandler = (todoId: string) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== todoId);
    });
  };

  const todoAddHandler = (text: string) => {
    setTodos((prevTodos) => [
      ...prevTodos,
      {
        id: Math.random().toString(),
        text: text,
      },
    ]);
  };

  return (
    <div className='App'>
      <GlobalStyle />
      <NewTodo onAddTodo={todoAddHandler} />
      <TodoList items={todos} onDeleteTodo={todoDeleteHandler} />
    </div>
  );
};

export default App;

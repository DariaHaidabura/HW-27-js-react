import React, { useEffect, useState } from "react";

import "./App.scss";
import Task from "./components/Task";

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    try {
      fetch("http://localhost:3004/todos")
        .then((response) => response.json())
        .then((data) => setTodos(data));
    } catch {
      alert("Ошибка при запрсе данных.");
    }
  }, []);

  const createNewTodo = async (e) => {
    e.preventDefault();
    try {
      const data = { task: inputValue, complited: false };
      let res = await fetch("http://localhost:3004/todos", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": "token-value",
        },
        body: JSON.stringify(data),
      });
      let todo = await res.json();
      setTodos([...todos, todo]);
    } catch {
      alert("Не удалось создать новую задачу.");
    }
  };

  const changeStatus = (e, data) => {
    e.preventDefault();
    try {
      data.complited = !data.complited;
      fetch("http://localhost:3004/todos/" + data.id, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": "token-value",
        },
        body: JSON.stringify(data),
      }).then(() => {
        let updatedTodos = todos.map((todo) => {
          if (todo.id === data.id) {
            todo.completed = !todo.completed;
          }
          return todo;
        });
        setTodos(updatedTodos);
      });
    } catch {
      alert("Не удалось обновить статус задачи.");
    }
  };

  const deleteTodo = (e, data) => {
    e.preventDefault();
    try {
      fetch("http://localhost:3004/todos/" + data.id, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": "token-value",
        },
      });
      let updatedTodos = todos.filter((el) => el.id !== data.id);
      setTodos(updatedTodos);
    } catch {
      alert("Не удалось удалить задачу.");
    }
  };

  const onFilterTodos = (e) => {
    e.preventDefault();
    const filtredTodos = todos.filter((todo) =>
      todo.task.toLowerCase().includes(inputValue.toLowerCase())
    );
    setTodos(filtredTodos);
  };

  const onInputValueChanged = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <form>
      <input
        onChange={onInputValueChanged}
        value={inputValue}
        type="text"
      ></input>
      <button onClick={(e) => createNewTodo(e)} className="btn">
        Create
      </button>
      <button onClick={(e) => onFilterTodos(e)} className="btn">
        Find
      </button>
      <Task todos={todos} changeStatus={changeStatus} deleteTodo={deleteTodo} />
    </form>
  );
}

export default App;

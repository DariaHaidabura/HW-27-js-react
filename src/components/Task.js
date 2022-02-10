import React from "react";
import "./TaskCss.scss";

function Task({ todos, changeStatus, deleteTodo }) {
  return (
    <ul id="list">
      {todos.map((todo) => (
        <li className={`${todo.complited ? "green" : "yellow"}`} key={todo.id}>
          {todo.task}
          <button onClick={(e) => deleteTodo(e, todo)}>Удалить</button>
          <button onClick={(e) => changeStatus(e, todo)} className="btn-status">
            Cтатус
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Task;

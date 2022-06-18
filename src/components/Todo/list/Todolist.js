import { Fragment, useEffect, useState } from "react";
import { db } from "../../../db/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import TodoItem from "../todoItem/TodoItem";
import classes from "./TodoList.module.css";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    onSnapshot(collection(db, "list"), (snapshot) => {
      setTodos(
        snapshot.docs.map((doc) => {
          return { item: doc.data(), id: doc.id };
        })
      );
    });
  }, []);

  const uid = localStorage.getItem("id");

  const filteredUid = todos.filter((todo) => todo.item.user_id === uid);
  const sortingTodos = filteredUid.sort(
    (a, b) => a.item.createdAtTime - b.item.createdAtTime
  );
  let context;
  if (sortingTodos.length === 0) {
    context = <h2>Nothing to do? let`s add some !</h2>;
  }
  if (sortingTodos.length > 0) {
    context = sortingTodos.map((todo) => {
      return (
        <TodoItem
          title={todo.item.title}
          description={todo.item.description}
          createdAt={todo.item.createdAt}
          endUntil={todo.item.endUntil}
          startAt={todo.item.startAt}
          key={todo.id}
          id={todo.id}
          endUntilTime={todo.item.endUntilTime}
          startAtTime={todo.item.startAtTime}
          completed={todo.item.completed}
        />
      );
    });
  }
  const hour = new Date().getHours();
  let greeting = "Good ";
  if (hour >= 0 && hour <= 6) {
    greeting += `Night`;
  }
  if (hour > 6 && hour <= 11) {
    greeting += `Morning`;
  }
  if (hour > 11 && hour <= 18) {
    greeting += `Afternoon`;
  }
  if (hour > 18 && hour <= 23) {
    greeting += `Evening`;
  }

  return (
    <Fragment>
      <h2>{greeting}</h2>
      <div
        className={
          sortingTodos.length >= 3 ? classes.container_row : classes.container
        }
      >
        {context}
      </div>
    </Fragment>
  );
};
export default TodoList;

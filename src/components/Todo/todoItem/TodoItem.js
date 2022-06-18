import { useState } from "react";
import { Card } from "react-bootstrap";
import ChangeTodo from "../change/ChangeTodo";
import { db } from "../../../db/firebase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import {
  Trash,
  Pen,
  Calendar2Date,
  Calendar2CheckFill,
} from "react-bootstrap-icons";

import classes from "./todoitem.module.css";
const TodoItem = (props) => {
  const [todoChange, setTodoChange] = useState(false);
  const [isCompleted, setIsCompleted] = useState(props.completed);

  const deleteItem = () => {
    deleteDoc(doc(db, "list", props.id));
  };
  const editItem = (e) => {
    e.preventDefault();
    setTodoChange(true);
  };
  const seeNew = () => {
    setTodoChange(false);
  };
  const markAsCompleted = () => {
    const toUpdated = doc(db, "list", props.id);
    updateDoc(toUpdated, { completed: !isCompleted });
    setIsCompleted(!isCompleted);
  };
  const closeModal = () => {
    setTodoChange(false);
  };
  let context;
  if (!todoChange) {
    context = (
      <Card
        className={isCompleted ? classes.card_completed : classes.card}
        style={{ width: "30rem", height: "14rem", margin: "6px" }}
      >
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>{props.description}</Card.Text>
          <Card.Text>
            Start at:
            {props.startAt}
            <Calendar2Date className={classes.icon} />
          </Card.Text>
          <Card.Text>
            {props.endUntil && "End until:"}
            {props.endUntil} <Calendar2CheckFill className={classes.icon} />
          </Card.Text>
        </Card.Body>
        <Trash className={classes.btn_x} onClick={deleteItem} />
        <Pen className={classes.change_btn} onClick={editItem} />
        {!isCompleted && (
          <span className={classes.completed}>
            Completed? <input onChange={markAsCompleted} type="checkbox" />
          </span>
        )}
        {isCompleted && (
          <span className={classes.completed}>
            Not completed? <input onChange={markAsCompleted} type="checkbox" />
          </span>
        )}
      </Card>
    );
  }
  if (todoChange) {
    context = (
      <ChangeTodo
        title={props.title}
        description={props.description}
        id={props.id}
        onChange={seeNew}
        onClose={closeModal}
      />
    );
  }

  return context;
};
export default TodoItem;

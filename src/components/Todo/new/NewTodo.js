import { useRef, useState } from "react";
import { Card } from "react-bootstrap";
import { db } from "../../../db/firebase";
import { collection, addDoc } from "firebase/firestore";
import { Plus, X } from "react-bootstrap-icons";
import Modal from "../../Home/Modal/Modal";
import classes from "./Newtodo.module.css";

const NewTodo = (props) => {
  const [errorTitle, setErrorTitle] = useState(true);
  const [errorDescription, setErrorDescription] = useState(true);
  const [errorDateEnd, setErrorDateEnd] = useState(true);
  const [errorDateStart, setErrorDateStart] = useState(true);
  const [errorDateRange, setErrorDateRange] = useState(true);
  const titleInputRef = useRef();
  const descriptionInputRef = useRef();
  const startedAtInputRef = useRef();
  const endUntilInputRef = useRef();
  const today = new Date().getTime();
  let isDisabled = true;
  if (
    errorTitle ||
    errorDescription ||
    errorDateEnd ||
    errorDateStart ||
    errorDateRange
  ) {
    isDisabled = true;
  } else {
    isDisabled = false;
  }

  const titleChangeHandler = () => {
    setTimeout(() => {
      if (titleInputRef.current.value.trim().length > 2) {
        setErrorTitle(null);
      } else {
        setErrorTitle({ message: "Please enter valid title" });
        return;
      }
    }, 1000);
  };
  const descChangeHandler = () => {
    setTimeout(() => {
      if (descriptionInputRef.current.value.trim().length > 2) {
        setErrorDescription(null);
      } else {
        setErrorDescription({ message: "Please enter valid description" });
        return;
      }
    }, 1000);
  };
  const dateStartChangeHandler = () => {
    dateEndChangeHandler();
    if (new Date(startedAtInputRef.current.value).getTime() < today) {
      setErrorDateStart({ message: "Please enter valid date" });
      return;
    } else {
      setErrorDateStart(null);
    }
  };
  const dateEndChangeHandler = () => {
    if (new Date(endUntilInputRef.current.value).getTime() < today) {
      setErrorDateEnd({ message: "Please enter valid date" });
    }
    if (
      new Date(endUntilInputRef.current.value).getTime() <
      new Date(startedAtInputRef.current.value).getTime()
    ) {
      setErrorDateRange({
        message: "The end date must end after the start date",
      });
      return;
    } else {
      setErrorDateEnd(null);
      setErrorDateRange(null);
    }
  };
  const submitFormHandler = (e) => {
    e.preventDefault();
    console.log(endUntilInputRef.current.value);
    const enteredTitle = titleInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const createdAt = new Date();
    const endUntil = endUntilInputRef.current.value.replace("T", " ");
    const startAt = startedAtInputRef.current.value.replace("T", " ");
    const newTodo = {
      title: enteredTitle,
      description: enteredDescription,
      createdAt: createdAt.toDateString(),
      createdAtTime: createdAt.getTime(),
      startAt,
      endUntil,
      completed: false,
      user_id: localStorage.getItem("id"),
    };
    addDoc(collection(db, "list"), newTodo);
    titleInputRef.current.value =
      descriptionInputRef.current.value =
      endUntilInputRef.current.value =
      startedAtInputRef.current.value =
        "";
    props.onClose();
  };
  const closeModal = () => {
    props.onClose();
  };
  return (
    <Modal onClose={closeModal}>
      <div className={classes.centered}>
        <form method="POST" onSubmit={submitFormHandler}>
          <Card
            style={{
              width: "30rem",
              height: "24rem",
              margin: "6px",
              border: "none",
            }}
          >
            <div>
              <X onClick={closeModal} className={classes.close_add} />
            </div>
            <Card.Body>
              <Card.Title>Add new todo</Card.Title>
              <Card.Title>
                <input
                  id="title"
                  name="title"
                  type="text"
                  min="2"
                  required
                  placeholder="Title"
                  ref={titleInputRef}
                  onInput={titleChangeHandler}
                />
                {errorTitle && (
                  <span className={classes.error}>{errorTitle.message}</span>
                )}
              </Card.Title>
              <Card.Title>
                <textarea
                  rows="2"
                  id="description"
                  name="description"
                  type="text"
                  min="2"
                  required
                  placeholder="Description"
                  ref={descriptionInputRef}
                  onInput={descChangeHandler}
                />
                {errorDescription && (
                  <span className={classes.error}>
                    {errorDescription.message}
                  </span>
                )}
              </Card.Title>
              <Card.Title>
                <label htmlFor="startAt">Start at:</label>
                <input
                  id="StartAt"
                  name="StartAt"
                  type="datetime-local"
                  ref={startedAtInputRef}
                  onInput={dateStartChangeHandler}
                />
                {errorDateStart && (
                  <span className={classes.error}>
                    {errorDateStart.message}
                  </span>
                )}
              </Card.Title>
              <Card.Title>
                <label htmlFor="endUntil">End Until:</label>
                <input
                  id="EndUntil"
                  name="EndUntil"
                  type="datetime-local"
                  ref={endUntilInputRef}
                  onInput={dateEndChangeHandler}
                />
                {errorDateEnd && (
                  <span className={classes.error}>{errorDateEnd.message}</span>
                )}
              </Card.Title>
              {errorDateRange && (
                <span className={classes.error}>{errorDateRange.message}</span>
              )}
            </Card.Body>
            <div className={classes.centered}>
              <button
                disabled={isDisabled}
                className={classes.new_btn}
                type="submit"
              >
                <Plus className={classes.plus} />
              </button>
            </div>
          </Card>
        </form>
      </div>
    </Modal>
  );
};
export default NewTodo;

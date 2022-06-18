import { Fragment, useState } from "react";
import TodoList from "../components/Todo/list/Todolist";
import NewTodo from "../components/Todo/new/NewTodo";
import { Plus } from "react-bootstrap-icons";
import classes from "./Todopage.module.css";
import Navbar from "../components/Home/Nav/Navbar";
const TodoPage = () => {
  const [add, setAdd] = useState(false);
  const seeAddNew = () => {
    setAdd(true);
  };
  const hideAdd = () => {
    setAdd(false);
  };
  const isLogIn = localStorage.getItem("id");
  let isDisabled = false;
  if (!isLogIn) {
    isDisabled = true;
  }
  return (
    <Fragment>
      <Navbar />
      <TodoList />
      {!add && (
        <div className={classes.centered_plus}>
          <button disabled={isDisabled} onClick={seeAddNew}>
            <Plus className={classes.plus}></Plus>
          </button>
        </div>
      )}
      {add && <NewTodo onClose={hideAdd} />}
    </Fragment>
  );
};

export default TodoPage;

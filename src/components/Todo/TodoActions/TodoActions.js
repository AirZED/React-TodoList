import { useContext } from "react";

import { BiTrash } from "react-icons/bi";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { FaTrashRestoreAlt } from "react-icons/fa";

import TodoContext from "../../../store/todo-context";
import UIContext from "../../../store/UIContext";

import classes from "./TodoActions.module.css";

const TodoActions = (props) => {
  const todoContext = useContext(TodoContext);
  const UICtx = useContext(UIContext);

  const markTodoAsDoneHandler = () => {
    todoContext.markTodoAsDone(props.id);
  };

  const showDeleteModal = () => {
    UICtx.showBackDropHandler(props.id);
  };

  const restoreTodoHandler = () => {
    todoContext.restoreTodo(props.id);
  };

  return (
    <ul className={classes["todo-actions"]}>
      {!props.inactive && (
        <IoCheckmarkDoneCircle
          onClick={markTodoAsDoneHandler}
          title="Mark Todo as done"
        />
      )}
      {!props.deleted && (
        <BiTrash onClick={showDeleteModal} title="Delete Todo" />
      )}
      {props.deleted && (
        <FaTrashRestoreAlt onClick={restoreTodoHandler} title="Restore Todo" />
      )}
    </ul>
  );
};

export default TodoActions;

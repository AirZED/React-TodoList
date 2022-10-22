import { useContext } from "react";
import UIContext from "../../store/UIContext";
import TodoContext from "../../store/todo-context";

import { MdOutlineCancel } from "react-icons/md";

import classes from "./ConfirmDeleteModal.module.css";

const ConfirmDeleteModal = (props) => {
  const UICtx = useContext(UIContext);
  const TodoCtx = useContext(TodoContext);

  const recycleTodo = () => {
    TodoCtx.markTodoAsDeleted(UICtx.id);
    UICtx.hideBackdropHandler();
  };

  const deleteTodo = () => {
    TodoCtx.removeTodo(UICtx.id);
    UICtx.hideBackdropHandler();
  };

  return (
    <div className={classes["delete-modal"]}>
      <div className={classes["text-section"]}>
        <MdOutlineCancel className={classes.icon} />
        <p>Are you sure you want to delete a Todo???</p>
      </div>
      <div>
        <div className={classes.actions}>
          <button
            className={`${classes.button} ${classes.delete}`}
            onClick={deleteTodo}
          >
            Delete
          </button>
          <button
            className={`${classes.button} ${classes.recycle}`}
            onClick={recycleTodo}
          >
            Move to Recycle Bin
          </button>
        </div>
        <button
          onClick={UICtx.hideBackdropHandler}
          className={`${classes.button} ${classes.cancel}`}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;

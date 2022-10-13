import { BiTrash } from "react-icons/bi";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { FaTrashRestoreAlt } from "react-icons/fa";

import classes from "./TodoActions.module.css";

const TodoActions = (props) => {
  return (
    <ul className={classes["todo-actions"]}>
      {!props.inactive && <IoCheckmarkDoneCircle />}
      {!props.deleted && <BiTrash />}
      {props.deleted && <FaTrashRestoreAlt />}
    </ul>
  );
};

export default TodoActions;

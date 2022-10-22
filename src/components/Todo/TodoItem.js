import { TiTick } from "react-icons/ti";

import TodoActions from "./TodoActions/TodoActions";

import classes from "./TodoItem.module.css";

const TodoItem = (props) => {
  const todoClassName = props.inactive
    ? `${classes.item} ${classes.inactive}`
    : classes.item;


  return (
    <li className={todoClassName}>
      <div className={classes["item-body"]}>
        <button className={classes.tickbox}>
          {props.inactive && <TiTick />}
        </button>
        <p>{props.todo}</p>
      </div>
      <TodoActions
        id={props.id}
        deleted={props.deleted}
        inactive={props.inactive}
      />
    </li>
  );
};

export default TodoItem;

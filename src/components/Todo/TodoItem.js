import { TiTick } from "react-icons/ti";

import TodoActions from "./TodoActions/TodoActions";

import classes from "./TodoItem.module.css";

const TodoItem = (props) => {
  return (
    <li className={classes.item}>
      <div className={classes["item-body"]}>
        <button className={classes.tickbox}>
          {props.inactive && <TiTick />}
        </button>
        <p>{props.todo}</p>
      </div>
      <TodoActions deleted={props.deleted} inactive={props.inactive} />
    </li>
  );
};

export default TodoItem;

import classes from "./TodoItem.module.css";

const TodoItem = (props) => {
  return (
    <li className={classes.item}>
      <div className={classes.tickbox}></div>
      <p>{props.todo}</p>
    </li>
  );
};

export default TodoItem;

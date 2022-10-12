import { useState, useContext } from "react";

//imported Components
import TodoContext from "../../store/todo-context";

//imported StyleSheet
import classes from "./NewTodoForm.module.css";

const NewTodoForm = (props) => {
  const TodoCtx = useContext(TodoContext);

  //todo input state initialization
  const [enteredTodo, setEnteredTodo] = useState("");

  const onTodoEnterHandler = (event) => {
    setEnteredTodo(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (enteredTodo.trim() === "") {
      return;
    }

    TodoCtx.addTodo({
      todo: enteredTodo,
      id: Date.now(),
      deleted: false,
      active: true,
    });

    setEnteredTodo("");
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <input
        type="text"
        value={enteredTodo}
        onChange={onTodoEnterHandler}
        placeholder="Add New Todo"
      />
      <button type="submit">+</button>
    </form>
  );
};

export default NewTodoForm;

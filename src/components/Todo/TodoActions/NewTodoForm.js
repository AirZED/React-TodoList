import { useState, useContext, useEffect } from "react";

//imported Components
import TodoContext from "../../../store/todo-context";

//imported StyleSheet
import classes from "./NewTodoForm.module.css";

const NewTodoForm = (props) => {
  const TodoCtx = useContext(TodoContext);
  const { items } = TodoCtx;
  const { fetched } = TodoCtx;

  //todo input state initialization
  const [enteredTodo, setEnteredTodo] = useState("");

  const onTodoEnterHandler = (event) => {
    setEnteredTodo(event.target.value);
  };

  useEffect(() => {
    
    if (!fetched) {
      return;
    }
    //Checks and does not Post data on app initialization

    const postTodos = async () => {
      try {
        const response = await fetch(
          "https://starthub-todolist-default-rtdb.firebaseio.com/todos.json",
          {
            method: "PUT",
            body: JSON.stringify(items),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to Post Todo");
        }

        const data = await response.json();
        return data;
      } catch (error) {
        return error;
      }
    };

    //running async fnc
    postTodos()
      .then((data) => {
        // console.log("Posting" + data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [items, fetched]);

  const submitHandler = (event) => {
    event.preventDefault();

    if (enteredTodo.trim() === "") {
      return;
    }

    TodoCtx.addTodo({
      todo: enteredTodo,
      id: Date.now(),
      deleted: false,
      inactive: false,
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

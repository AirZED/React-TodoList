import { useContext, Fragment, useState, useEffect } from "react";

//imported Components
import TodoItem from "./TodoItem";
import NewTodoForm from "./TodoActions/NewTodoForm";
import Button from "../UI/Button";

//imported Context
import TodoContext from "../../store/todo-context";

//imported StyleSheet
import classes from "./Todos.module.css";

const Todos = (props) => {
  const [showDeletedTodos, setShowDeletedTodos] = useState(false);
  const TodoCtx = useContext(TodoContext);

  const NormalTodos = TodoCtx.items.filter((each) => !each.deleted);
  const DeletedTodos = TodoCtx.items.filter((each) => each.deleted);

  const TodoList = NormalTodos.map((each) => (
    <TodoItem todo={each.todo} key={each.id} inactive={each.inactive} />
  ));

  const RecycledTodoList = DeletedTodos.map((each) => (
    <TodoItem todo={each.todo} key={each.id} deleted={true} />
  ));

  useEffect(() => {
    const fetchTodos = async () => {
      const data = await fetch(
        "https://starthub-todolist-default-rtdb.firebaseio.com/todos.json"
      );

      if (!data.ok) {
        throw new Error("Could not fetch todos");
      }

      const response = await data.json();
      const todosArr = [];

      for (const key in response) {
        todosArr.push({
          id: key,
          todo: response[key].todo,
          inactive: response[key].inactive,
          deleted: response[key].deleted,
        });
      }

      console.log(todosArr);
    };

    try {
      fetchTodos();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const showDeletedTodosHandler = () => {
    setShowDeletedTodos((state) => !state);
  };

  const TodoActions = (
    <Button onShow={showDeletedTodosHandler}>
      {showDeletedTodos ? "Hide Deleted Todos" : "View Deleted Todos"}
    </Button>
  );

  return (
    <Fragment>
      <NewTodoForm />
      <section className={classes.main}>
        <ul className={classes.list}>{TodoList}</ul>
      </section>
      <section className={classes.main}>
        {TodoActions}
        {showDeletedTodos && (
          <ul className={classes.list}>{RecycledTodoList}</ul>
        )}
      </section>
    </Fragment>
  );
};

export default Todos;

import { useContext, Fragment, useState, useEffect } from "react";

//imported Components
import TodoItem from "./TodoItem";
import NewTodoForm from "./TodoActions/NewTodoForm";
import Button from "../UI/Button";
import LoadingSpinner from "../UI/LoadingSpinner";
import ErrorComponent from "../UI/ErrorComponent";

//imported Context
import TodoContext from "../../store/todo-context";
import UIContext from "../../store/UIContext";

//imported StyleSheet
import classes from "./Todos.module.css";

const Todos = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);
  const [showDeletedTodos, setShowDeletedTodos] = useState(false);
  const TodoCtx = useContext(TodoContext);
  const UICtx = useContext(UIContext);
  const { replaceTodo } = TodoCtx;

  const NormalTodos = TodoCtx.items.filter((each) => each && !each.deleted);
  const DeletedTodos = TodoCtx.items.filter((each) => each && each.deleted);

  const TodoList = NormalTodos?.map((each) => (
    <TodoItem
      todo={each.todo}
      key={each.id}
      inactive={each.inactive}
      id={each.id}
    />
  ));

  const RecycledTodoList = DeletedTodos?.map((each) => (
    <TodoItem
      todo={each.todo}
      key={each.id}
      deleted={true}
      id={each.id}
      inactive={each.inactive}
    />
  ));

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch(
        "https://starthub-todolist-default-rtdb.firebaseio.com/todos.json"
      );
      if (!response.ok || (response.status < 200 && response.status > 300)) {
        throw new ErrorComponent("Could not fetch todos");
      }

      const data = await response.json();
      if (!data) {
        return [];
      }

      return data;
    };

    fetchTodos()
      .then((data) => {
        replaceTodo(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsError(error.message);
        setIsLoading(false);
      });
  }, [replaceTodo]);

  const showDeletedTodosHandler = () => {
    setShowDeletedTodos((state) => !state);
  };

  const TodoActions = (
    <Button onShow={showDeletedTodosHandler} bg="#51aa75" hoverBg="#51aa75">
      {showDeletedTodos ? "Hide Deleted Todos" : "View Deleted Todos"}
    </Button>
  );

  const LoadedTodoSection = (
    <Fragment>
      <section className={classes.main}>
        {NormalTodos.length === 0 && <h2>Null Normal Todos</h2>}
        {NormalTodos && NormalTodos.length > 0 && (
          <ul className={classes.list}>{TodoList}</ul>
        )}
      </section>
      {UICtx.showRecycledTodo && (
        <section className={classes.main}>
          {RecycledTodoList.length === 0 && <h2>Null Recycled Todos</h2>}
          {RecycledTodoList && RecycledTodoList.length > 0 && (
            <Fragment>
              {TodoActions}
              {showDeletedTodos && (
                <ul className={classes.list}>{RecycledTodoList}</ul>
              )}
            </Fragment>
          )}
        </section>
      )}
    </Fragment>
  );

  return (
    <Fragment>
      <NewTodoForm />
      {isError && !isLoading && <ErrorComponent>{isError}</ErrorComponent>}
      {isLoading && !isError && <LoadingSpinner />}
      {!isLoading && !isError && TodoCtx.items.length < 1 && (
        <h1>Null Todos</h1>
      )}
      {!isError && !isLoading && TodoCtx.items.length > 0 && LoadedTodoSection}
    </Fragment>
  );
};

export default Todos;

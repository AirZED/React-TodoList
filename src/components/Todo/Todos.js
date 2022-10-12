import { useContext, Fragment } from "react";

//imported Components
import TodoItem from "./TodoItem";
import NewTodoForm from "./NewTodoForm";

//imported Context
import TodoContext from "../../store/todo-context";

//imported StyleSheet
import classes from "./Todos.module.css";

const Todos = (props) => {
  const TodoCtx = useContext(TodoContext);

  const NormalTodos = TodoCtx.items.filter((each) => !each.deleted);
  const DeletedTodos = TodoCtx.items.filter((each) => each.deleted);

  const TodoList = DeletedTodos.map((each) => (
    <TodoItem todo={each.todo} key={each.id} />
  ));

  return (
    <Fragment>
      <NewTodoForm />
      <ul className={classes.list}>{TodoList}</ul>
    </Fragment>
  );
};

export default Todos;

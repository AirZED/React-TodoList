import { useContext } from "react";

import UIContext from "../../store/UIContext";
import TodoContext from "../../store/todo-context";

import classes from "./Nav.module.css";

const Nav = (props) => {
  const UICtx = useContext(UIContext);
  const TodoCtx = useContext(TodoContext);

  return (
    <nav className={classes.nav}>
      <h2>Mfoniso</h2>
      <ul>
        <li onClick={UICtx.showRecycleBinHandler}>View Recyled Bin</li>
        <li onClick={TodoCtx.clearAllTodos}>Clear All Todos</li>
      </ul>
    </nav>
  );
};

export default Nav;

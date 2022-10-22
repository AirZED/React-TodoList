import React, { useReducer, useCallback } from "react";
import TodoContext from "./todo-context";

const initialState = {
  items: [],
  fetched: false,
};

const TodoReducer = (state, action) => {
  if (action.type === "REPLACE_TODOS") {
    return { items: [...action.val], fetched: false };
  }
  if (action.type === "ADD-TODO") {
    return {
      items: [...state.items, action.val],
      fetched: true,
    };
  }
  if (action.type === "RESTORE_TODO") {
    const todoIndex = state.items.findIndex((each) => each.id === action.val);
    state.items[todoIndex].deleted = false;
    return {
      items: state.items,
      fetched: true,
    };
  }
  if (action.type === "REMOVE_TODO") {
    return {
      items: state.items.filter((todo) => todo.id !== action.val),
      fetched: true,
    };
  }
  if (action.type === "MARK_AS_DONE") {
    const todoIndex = state.items.findIndex((each) => each.id === action.val);
    state.items[todoIndex].inactive = true;

    return {
      items: [...state.items],
      fetched: true,
    };
  }

  if (action.type === "DELETE_TODO") {
    const todoIndex = state.items.findIndex((each) => each.id === action.val);
    state.items[todoIndex].deleted = true;

    return {
      items: [...state.items],
      fetched: true,
    };
  }
  if (action.type === "CLEAR_ALL_TODOS") {
    return {
      items: [],
      fetched: true,
    };
  }

  return initialState;
};

const TodosContextProvider = (props) => {
  const [todoState, todoDispatchFn] = useReducer(TodoReducer, initialState);

  const addTodoHandler = (todo) => {
    todoDispatchFn({ type: "ADD-TODO", val: todo });
  };

  const replaceTodosHandler = useCallback((items) => {
    todoDispatchFn({ type: "REPLACE_TODOS", val: items });
  }, []);

  const removeTodoHandler = (id) => {
    todoDispatchFn({ type: "REMOVE_TODO", val: id });
  };

  const markTodoAsDoneHandler = (id) => {
    todoDispatchFn({ type: "MARK_AS_DONE", val: id });
  };

  const markTodoAsDeletedHandler = (id) => {
    todoDispatchFn({ type: "DELETE_TODO", val: id });
  };

  const restoreTodoHandler = (id) => {
    todoDispatchFn({ type: "RESTORE_TODO", val: id });
  };

  const clearAllTodosHandler = () => {
    todoDispatchFn({ type: "CLEAR_ALL_TODOS" });
  };

  const todoContextValues = {
    items: todoState.items,
    fetched: todoState.fetched,
    addTodo: addTodoHandler,
    replaceTodo: replaceTodosHandler,
    removeTodo: removeTodoHandler,
    markTodoAsDone: markTodoAsDoneHandler,
    markTodoAsDeleted: markTodoAsDeletedHandler,
    restoreTodo: restoreTodoHandler,
    clearAllTodos: clearAllTodosHandler,
  };

  return (
    <TodoContext.Provider value={todoContextValues}>
      {props.children}
    </TodoContext.Provider>
  );
};

export default TodosContextProvider;

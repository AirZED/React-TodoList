import React, { useReducer } from "react";

const UIContext = React.createContext({
  backdropIsActive: false,
  showBackDropHandler: () => {},
  hideBackdropHandler: () => {},
  id: null,
  showRecycleBinHandler: () => {},
});

const initialState = {
  backdropIsActive: false,
  id: null,
  showRecycledTodo: false,
};

const uiStateReducer = (state, action) => {
  if (action.type === "SHOW_BACKDROP") {
    if (!action.val) {
      return;
    }
    return {
      backdropIsActive: true,
      id: action.val,
      showRecycledTodo: state.showRecycledTodo,
    };
  }
  if (action.type === "HIDE_BACKDROP") {
    return {
      backdropIsActive: false,
      id: null,
      showRecycledTodo: state.showRecycledTodo,
    };
  }
  if (action.type === "SHOW_RECYCLE_BIN") {
    return {
      backdropIsActive: state.backdropIsActive,
      id: state.id,
      showRecycledTodo: !state.showRecycledTodo,
    };
  }
  return initialState;
};

export const UIContextProvider = (props) => {
  const [uiState, dispatchUIFn] = useReducer(uiStateReducer, initialState);

  const showBackDropHandler = (id) => {
    dispatchUIFn({ type: "SHOW_BACKDROP", val: id });
  };

  const hideBackdropHandler = () => {
    dispatchUIFn({ type: "HIDE_BACKDROP" });
  };

  const showRecycleBinHandler = () => {
    dispatchUIFn({ type: "SHOW_RECYCLE_BIN" });
  };

  const uiStateValue = {
    backdropIsActive: uiState.backdropIsActive,
    id: uiState.id,
    showRecycledTodo: uiState.showRecycledTodo,
    showBackDropHandler,
    hideBackdropHandler,
    showRecycleBinHandler,
  };

  return (
    <UIContext.Provider value={uiStateValue}>
      {props.children}
    </UIContext.Provider>
  );
};

export default UIContext;

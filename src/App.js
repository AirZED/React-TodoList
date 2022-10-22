import { Fragment, useContext } from "react";

import UIContext from "./store/UIContext";

import Todos from "./components/Todo/Todos";
import Card from "./components/UI/Card";
import Portal from "./components/Layout/Portal";
import Nav from "./components/Nav/Nav";

import "./App.css";

function App() {
  const UICtx = useContext(UIContext);  

  return (
    <Fragment>
      <Nav/>
      {UICtx.backdropIsActive && <Portal />}
      <Card>
        <Todos />
      </Card>
    </Fragment>
  );
}

export default App;

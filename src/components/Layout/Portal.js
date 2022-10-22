import { Fragment } from "react";
import ReactDOM from "react-dom";

import Backdrop from "./Backdrop";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

const Portal = (props) => {
  const backdropDomElement = document.getElementById("backdrop");
  return ReactDOM.createPortal(
    <Fragment>
      <Backdrop>
        <ConfirmDeleteModal />
      </Backdrop>
    </Fragment>,
    backdropDomElement
  );
};

export default Portal;

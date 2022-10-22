
import classes from "./Backdrop.module.css";


const Backdrop = (props) => {
  return <div className={classes.modal}>{props.children}</div>;
};



export default Backdrop;

import classes from "./ErrorComponent.module.css";

const ErrorComponent = (props) => {
  return <h2 className={classes.center}>{props.children}</h2>;
};

export default ErrorComponent;

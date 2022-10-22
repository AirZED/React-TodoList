import classes from "./LoadingSpinner.module.css";

const LoadingSpinner = () => {
  return (
    <div className={classes["spinner-parent"]}>
      <div className={classes.spinner}></div>
    </div>
  );
};

export default LoadingSpinner;

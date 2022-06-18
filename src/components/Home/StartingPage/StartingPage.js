import { Fragment } from "react";
import GoogleAuth from "../../auth/GoogleAuth";
import classes from "./StartingPage.module.css";
const StartingPage = () => {
  return (
    <Fragment>
      <section>
        <h1>Welcome to the Todo app!</h1>
        <h2>Please login or register to get started</h2>
        <GoogleAuth />
      </section>
    </Fragment>
  );
};

export default StartingPage;

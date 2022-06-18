import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  auth,
  logInWithEmailAndPassword,
  signInWithGoogle,
  registerWithEmailAndPassword,
} from "../../db/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Google } from "react-bootstrap-icons";
import classes from "./GoogleAuth.module.css";
const GoogleAuth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const [isRegister, setIsRegister] = useState(true);
  const [errorEmail, setErrorEmail] = useState(true);
  const [errorPassword, setErrorPassword] = useState(true);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const userLogIn = localStorage.getItem("id");

  const validateEmail = (mail) => {
    return String(mail)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const loginFn = () => {
    logInWithEmailAndPassword(email, password);
  };
  const googleLoginFn = () => {
    signInWithGoogle();
  };

  const changeForm = () => {
    setIsRegister(!isRegister);
  };

  const emailChangeHandler = () => {
    setTimeout(() => {
      if (validateEmail(emailInputRef.current.value)) {
        setErrorEmail(null);
      } else {
        setErrorEmail({ message: "Please enter valid email" });
        return;
      }
    }, 1000);
  };
  const passwordChangeHandler = () => {
    setTimeout(() => {
      if (passwordInputRef.current.value.trim() >= 6) {
        setErrorPassword(null);
      } else {
        setErrorPassword({ message: "Password must be at least 6 digits" });
        return;
      }
    }, 1000);
  };
  let form;
  let isDisabled = true;

  if (errorEmail || errorPassword) {
    isDisabled = true;
  } else {
    isDisabled = false;
  }
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      return;
    }
    if (userLogIn) {
      navigate(`user/${user.uid}/todoList`);
    }
  }, [loading, navigate, userLogIn, user]);
  if (isRegister) {
    form = (
      <div className={classes.login}>
        <div className={classes.login__container}>
          <h5>Todo app</h5>
          <input
            type="email"
            className={classes.login__textBox}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail Address"
            ref={emailInputRef}
            onInput={emailChangeHandler}
          />
          {errorEmail && (
            <span className={classes.error}>{errorEmail.message}</span>
          )}
          <input
            type="password"
            className={classes.login__textBox}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            ref={passwordInputRef}
            onInput={passwordChangeHandler}
          />
          {errorPassword && (
            <span className={classes.error}>{errorPassword.message}</span>
          )}
          <button
            disabled={isDisabled}
            className={classes.login__btn}
            onClick={loginFn}
          >
            Login
          </button>
          <button
            className={`${classes.login__btn} ${classes.login__google}`}
            onClick={googleLoginFn}
          >
            <Google className={classes.google_logo} /> Login with Google
          </button>
          <div>
            <p className={classes.change} onClick={changeForm}>
              I don`t have an account
            </p>
          </div>
        </div>
      </div>
    );
  }
  if (!isRegister) {
    form = (
      <div className={classes.login}>
        <div className={classes.login__container}>
          <h5>Todo app</h5>
          <input
            type="email"
            className={classes.login__textBox}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail Address"
            ref={emailInputRef}
            onInput={emailChangeHandler}
          />
          {errorEmail && (
            <span className={classes.error}>{errorEmail.message}</span>
          )}
          <input
            type="password"
            className={classes.login__textBox}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            ref={passwordInputRef}
            onInput={passwordChangeHandler}
          />
          {errorPassword && (
            <span className={classes.error}>{errorPassword.message}</span>
          )}
          <button
            disabled={isDisabled}
            className={classes.login__btn}
            onClick={() => registerWithEmailAndPassword(email, password)}
          >
            Sign up
          </button>
          <div>
            <p className={classes.change} onClick={changeForm}>
              I have an account
            </p>
          </div>
        </div>
      </div>
    );
  }

  return form;
};
export default GoogleAuth;

import classes from "./Modal.module.css";
import { Fragment } from "react";
import ReactDOM from "react-dom";
import { Card } from "react-bootstrap";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

const ModalOverlay = (props) => {
  return (
    <Card className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </Card>
  );
};

const portalEL = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalEL)}
      {ReactDOM.createPortal(
        <div className={classes.centered}>
          <ModalOverlay>{props.children}</ModalOverlay>
        </div>,
        portalEL
      )}
    </Fragment>
  );
};
export default Modal;


import { Fragment } from "react";
import Footer from "../Footer/footer";
import "./layout.css";

const Layout = (props) => {
  return (
    <Fragment>
      <main>
        <div className="children">{props.children}</div>
        <Footer />
      </main>
    </Fragment>
  );
};
export default Layout;

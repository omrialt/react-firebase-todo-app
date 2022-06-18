import { useNavigate } from "react-router-dom";
import classes from "./Notfound.module.css";
const NotFound = () => {
  const navigate = useNavigate();
  const goToHomePage = () => {
    navigate("/");
  };
  return (
    <div>
      <h1>Page not found!, please login or register first</h1>
      <p onClick={goToHomePage}>Go to Homepage</p>
    </div>
  );
};
export default NotFound;

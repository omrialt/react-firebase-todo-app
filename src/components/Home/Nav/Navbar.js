import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { logout } from "../../../db/firebase";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const getHomePage = () => {
    logout();
    navigate("/");
  };

  return (
    <Nav as="ul">
      <Nav.Item as="li">
        <Nav.Link eventKey="link-1">
          <Link onClick={() => getHomePage()} to={"/"}>
            Logout
          </Link>
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};
export default Navbar;

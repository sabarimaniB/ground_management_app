import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Navbar.css";
import userLogo from "../assets/userlogo.png";
import { UserContext } from "../components/UserContext";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          <span>Turf Time</span>
        </Link>

        <div className={`hamburger ${isOpen ? "active" : ""}`} onClick={toggleMenu}>
          <span></span><span></span><span></span>
        </div>

        <ul className={`nav-links ${isOpen ? "active" : ""}`}>
          <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
          <li><Link to="/grounds" onClick={toggleMenu}>Grounds</Link></li>
          <li><Link to="/booking" onClick={toggleMenu}>My Bookings</Link></li>

          {user?.role === "provider" && (
            <li><Link to="/admin" onClick={toggleMenu}>Create Ground</Link></li>
          )}

          {!user ? (
            <li className="login-item">
              <Link to="/login" onClick={toggleMenu} className="login-link">
                <img src={userLogo} alt="User" className="user-logo" />
                <span>Login</span>
              </Link>
            </li>
          ) : (
            <li className="login-item user-info">
              <span className="username">{user.username}</span> &nbsp;&nbsp;&nbsp;
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Navbar.css";
import userLogo from "../assets/userlogo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch("http://localhost:5000/api/auth/me", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUser(data.user); // Assuming backend returns { user: { username, role, email } }
        localStorage.setItem("user", JSON.stringify(data.user));
      } catch (error) {
        console.error("Error fetching user info:", error);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="logo">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4H6zM3.5 6h17M17 12a5 5 0 1 1-10 0 5 5 0 0 1 10 0z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 12v3m0 0l-2-2m2 2l2-2"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Turf Time</span>
        </Link>

        {/* Search bar */}
        <div className="search-bar">
          <input type="text" placeholder="Search grounds..." />
          <button>Search</button>
        </div>

        {/* Hamburger icon */}
        <div className={`hamburger ${isOpen ? "active" : ""}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Nav Links */}
        <ul className={`nav-links ${isOpen ? "active" : ""}`}>
          <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
          <li><Link to="/grounds" onClick={toggleMenu}>Grounds</Link></li>
          <li><Link to="/booking" onClick={toggleMenu}>My Bookings</Link></li>

          {/* Admin Access */}
          {user?.role === "admin" && (
            <li><Link to="/admin" onClick={toggleMenu}>Admin</Link></li>
          )}

          {/* Provider Access */}
          {user?.role === "provider" && (
            <li><Link to="/create-ground" onClick={toggleMenu}>Create Ground</Link></li>
          )}

          {/* Not logged in */}
          {!user && (
            <li className="login-item">
              <Link to="/login" onClick={toggleMenu} className="login-link">
                <img src={userLogo} alt="User account" className="user-logo" />
                <span className="login-text">Login</span>
              </Link>
            </li>
          )}

          {/* Logged in user */}
          {user && (
            <li className="login-item user-info">
              <img src={userLogo} alt="User account" className="user-logo" />
              <span className="username">{user.username}</span>
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

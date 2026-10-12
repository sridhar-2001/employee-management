
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="navbar">
      <Link to="/" className="logo">
        EmployeeHub
      </Link>

      <div className="navbar-actions">
        <span className="navbar-text">
          Employee Management System
        </span>

        <button
          className="theme-button"
          onClick={toggleTheme}
        >
          {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
      </div>
    </header>
  );
}

export default Navbar;


import { Link, Outlet, useLocation } from "react-router-dom";

function Departments() {
  const location = useLocation();
  const isDepartmentSelected =
    location.pathname !== "/departments";

  return (
    <div>
      <div className="page-heading">
        <div>
          <h1>Departments</h1>
          <p>Explore employees by department.</p>
        </div>
      </div>

      <div className="department-grid">
        <Link to="Engineering" className="department-card">
          <span>💻</span>
          <h3>Engineering</h3>
          <p>Software development and technology</p>
        </Link>

        <Link to="HR" className="department-card">
          <span>👥</span>
          <h3>Human Resources</h3>
          <p>People, recruitment and employee support</p>
        </Link>

        <Link to="Finance" className="department-card">
          <span>💰</span>
          <h3>Finance</h3>
          <p>Budgets and financial operations</p>
        </Link>

        <Link to="Marketing" className="department-card">
          <span>📈</span>
          <h3>Marketing</h3>
          <p>Branding and business growth</p>
        </Link>

        <Link to="Support" className="department-card">
          <span>🎧</span>
          <h3>Support</h3>
          <p>Customer service and assistance</p>
        </Link>

        <Link to="IT" className="department-card">
          <span>🖥️</span>
          <h3>IT</h3>
          <p>Infrastructure and technical support</p>
        </Link>
      </div>

      {isDepartmentSelected && (
        <div className="section-card department-content">
          <Outlet />
        </div>
      )}
    </div>
  );
}

export default Departments;

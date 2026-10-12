
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Dashboard() {
  const employees = useSelector(
    (state) => state.employees.list
  );

  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    departments: 0,
    newJoiners: 0,
  });

  useEffect(() => {
    const departmentNames = [
      ...new Set(employees.map((emp) => emp.department).filter(Boolean)),
    ];

    setStats({
      total: employees.length,
      active: employees.filter(
        (emp) => emp.status === "Active"
      ).length,
      departments: departmentNames.length,
      newJoiners: employees.filter((emp) => {
        if (!emp.joinDate) return false;

        const joined = new Date(emp.joinDate);
        const daysAgo = (Date.now() - joined.getTime()) /
          (1000 * 60 * 60 * 24);

        return daysAgo >= 0 && daysAgo <= 30;
      }).length,
    });
  }, [employees]);

  return (
    <div>
      <div className="page-heading">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome to your employee management system.</p>
        </div>

        <Link className="primary-button" to="/employees/add">
          + Add Employee
        </Link>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <p>Total Employees</p>
          <h2>{stats.total}</h2>
        </div>

        <div className="stat-card">
          <p>Active Employees</p>
          <h2>{stats.active}</h2>
        </div>

        <div className="stat-card">
          <p>Departments</p>
          <h2>{stats.departments}</h2>
        </div>

        <div className="stat-card">
          <p>New Joiners (30 days)</p>
          <h2>{stats.newJoiners}</h2>
        </div>
      </div>

      <div className="section-card">
        <h2>Recent Employees</h2>

        {employees.length === 0 ? (
          <div className="empty-state">
            <p>No employees available yet.</p>
            <Link to="/employees">View Employees</Link>
          </div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {employees.slice(-5).reverse().map((emp) => (
                  <tr key={emp.id}>
                    <td>{emp.firstName || emp.name || "Employee"}</td>
                    <td>{emp.email}</td>
                    <td>{emp.department || "Not assigned"}</td>
                    <td>{emp.status || "Active"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;

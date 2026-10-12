
import { useParams, Link, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import EmployeeForm from "../components/EmployeeForm";

function EmployeeDetails() {
  const { id } = useParams();
const [searchParams, setSearchParams] = useSearchParams();

const [isEditing, setIsEditing] = useState(
  searchParams.get("edit") === "true"
);
  const employee = useSelector((state) =>
    state.employees.list.find(
      (emp) => String(emp.id) === id
    )
  );

  if (!employee) {
    return (
      <div className="section-card">
        <h2>Employee not found</h2>
        <Link to="/employees">Back to Employees</Link>
      </div>
    );
  }

  if (isEditing) {
    return (
      <div>
        <div className="page-heading">
          <h1>Edit Employee</h1>
          <button
            className="cancel-button"
            onClick={() => setIsEditing(false)}
          >
            Cancel Editing
          </button>
        </div>

        <EmployeeForm employee={employee} />
      </div>
    );
  }

  return (
    <div>
      <div className="page-heading">
        <div>
          <h1>Employee Details</h1>
          <p>View and manage employee information.</p>
        </div>

        <div className="form-actions">
          <button
            className="primary-button"
            onClick={() => setIsEditing(true)}
          >
            Edit Employee
          </button>

          <Link to="/employees" className="cancel-button">
            Back
          </Link>
        </div>
      </div>

      <div className="employee-profile section-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {employee.firstName?.charAt(0)}
            {employee.lastName?.charAt(0)}
          </div>

          <div>
            <h2>{employee.firstName} {employee.lastName}</h2>
            <p>{employee.department}</p>
            <span className="status-badge">
              {employee.status || "Active"}
            </span>
          </div>
        </div>

        <div className="details-grid">
          <div>
            <label>Employee ID</label>
            <p>{employee.id}</p>
          </div>

          <div>
            <label>Email</label>
            <p>{employee.email}</p>
          </div>

          <div>
            <label>Phone</label>
            <p>{employee.phone || "Not provided"}</p>
          </div>

          <div>
            <label>Department</label>
            <p>{employee.department || "Not assigned"}</p>
          </div>

          <div>
            <label>Age</label>
            <p>{employee.age || "Not provided"}</p>
          </div>

          <div>
            <label>Joining Date</label>
            <p>{employee.joinDate || "Not provided"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDetails;

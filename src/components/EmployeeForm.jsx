
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addEmployee, updateEmployee } from "../redux/employeeSlice";

function EmployeeForm({ employee }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const employees = useSelector((state) => state.employees.list);
  const nameRef = useRef(null);

  const [form, setForm] = useState({
    firstName: employee?.firstName || "",
    lastName: employee?.lastName || "",
    email: employee?.email || "",
    phone: employee?.phone || "",
    department: employee?.department || "Engineering",
    age: employee?.age || "",
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (
      !form.firstName.trim() ||
      !form.lastName.trim() ||
      !form.email.trim() ||
      !form.phone.trim() ||
      !form.department
    ) {
      setError("Please fill in all required fields.");
      nameRef.current?.focus();
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!/^[0-9+\-\s()]{7,20}$/.test(form.phone)) {
      setError("Please enter a valid phone number.");
      return;
    }

    const duplicateEmail = employees.some(
      (emp) =>
        emp.email.toLowerCase() === form.email.trim().toLowerCase() &&
        emp.id !== employee?.id
    );

    if (duplicateEmail) {
      setError("This email address is already registered.");
      return;
    }

    const employeeData = {
      ...form,
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      age: form.age ? Number(form.age) : "",
      id: employee?.id ?? Date.now(),
      status: employee?.status || "Active",
      joinDate: employee?.joinDate || new Date().toISOString().slice(0, 10),
    };

    if (employee) {
      dispatch(updateEmployee(employeeData));
    } else {
      dispatch(addEmployee(employeeData));
    }
    window.dispatchEvent(
  new CustomEvent("app-notification", {
    detail: {
      type: "SUCCESS",
      message: employee
        ? "Employee updated successfully!"
        : "Employee added successfully!",
    },
  })
);

    navigate("/employees");
  }

  return (
    <form className="employee-form section-card" onSubmit={handleSubmit}>
      <h2>{employee ? "Edit Employee" : "Add New Employee"}</h2>

      {error && <p className="form-error">{error}</p>}

      <div className="form-grid">
        <div className="form-field">
          <label>First Name *</label>
          <input
            ref={nameRef}
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            required
            placeholder="Enter first name"
          />
        </div>

        <div className="form-field">
          <label>Last Name *</label>
          <input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            required
            placeholder="Enter last name"
          />
        </div>

        <div className="form-field">
          <label>Email *</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="name@example.com"
          />
        </div>

        <div className="form-field">
          <label>Phone Number *</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            placeholder="Enter phone number"
          />
        </div>

        <div className="form-field">
          <label>Department *</label>
          <select
            name="department"
            value={form.department}
            onChange={handleChange}
            required
          >
            <option>Engineering</option>
            <option>IT</option>
            <option>HR</option>
            <option>Finance</option>
            <option>Marketing</option>
            <option>Sales</option>
            <option>Support</option>
            <option>Operations</option>
          </select>
        </div>

        <div className="form-field">
          <label>Age</label>
          <input
            type="number"
            name="age"
            value={form.age}
            onChange={handleChange}
            min="18"
            max="100"
            placeholder="Enter age"
          />
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="primary-button">
          {employee ? "Update Employee" : "Save Employee"}
        </button>

        <button
          type="button"
          className="cancel-button"
          onClick={() => navigate("/employees")}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default EmployeeForm;
